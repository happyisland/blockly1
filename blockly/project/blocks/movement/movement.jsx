/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * movement.jsx version 1.0
 * 
 * block custom define
 * 
 * feature start block, goto start block
 * 
 */
'use strict';
var FieldColourAdapter = require('../../../engine/adapter/field_colour_adapter');
var FieldTimeAdapter = require('../../../engine/adapter/field_time_adapter');
var FieldDropDownAdapter = require('../../../engine/adapter/field_dropdown_adapter');
var FieldNumberAdapter = require('../../../engine/adapter/field_number_adapter');
var FieldVariableAdapter = require('../../../engine/adapter/field_variable_adapter');
var blocklyDatas = require('../../../engine/service/blockly_datas');
var colours = require('../../../engine/service/colours');
var RobatCommand = require('../../../engine/service/robat_command');
var CommandSequence = require('../../../engine/common/program/command_sequence');
var programManager = require('../../../engine/common/program/program_manager');
var ubtUtils = require('../../../engine/common/utils/utils');
var $ = require('jquery');
module.exports = function (Blocks) {
    Blocks['movement_servo_change_angle'] = {
        init: function init() {
            /**
            var json = {
                "message0": "servoNo%2 rotate %1",
                "args0": [
                    {
                    "type": "input_value",
                    "name": "VAR",
                    "variable": "item"
                    },
                    {
                    "type": "field_number",
                    "name": "VALUE1",
                    "value": 0
                    }
                ],
                "message1": "servoNo%2 rotate %1",
                "args1": [
                    {
                    "type": "input_value",
                    "name": "VAR",
                    "variable": "item"
                    },
                    {
                    "type": "field_number",
                    "name": "VALUE3"
                    }
                ],
                "message2": "servoNo%2 rotate %1",
                "args2": [
                    {
                    "type": "input_value",
                    "name": "VAR",
                    "variable": "item"
                    },
                    {
                    "type": "field_number",
                    "name": "VALUE5"
                    }
                ],
                
                "previousStatement": null,
                "nextStatement": null,
                "inputsInline": false,
                "colour": Blockly.Blocks.math.HUE,
                "helpUrl": Blockly.Msg.MATH_CHANGE_HELPURL          
            };
            */
        
           var json =  {
            "message0": "servos %1 action",
            "args0": [
                {"type": "input_value", "name": "SERVOS", "check": "Array"}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120}          
            this.jsonInit(json);
            
            /**
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#88ef52");
            this.itemCount_ = 8;
            //this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
            //this.setOutput(true, 'Array');
            this.appendDummyInput().appendField('servos');
            for (var i = 0 ; i < this.itemCount_; i++ ) {
                //this.appendValueInput("angle")
                //.setCheck("Number");
               // this.appendDummyInput()
                //.appendField("times");
                this.appendDummyInput().appendField('servo number').appendField(new Blockly.FieldTextInput(i+1),'servoNumber'+(i+1))
                .appendField("rotate angle").appendField(new Blockly.FieldNumber((i+1)*10),'angle'+(i+1));
                
            }

            this.appendDummyInput().appendField('in').appendField(new Blockly.FieldTextInput(400),'time').appendField('mills');
             */
            
        }
    };

    Blocks['movement_servo_change_angle_multi'] = {
        init :function init() {
            /**
            var json =  {
            "message0": "servos %1 action",
            "args0": [
                {"type": "field_input", "name": "SERVOS", "check": "Number", "value":100}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120}          
            this.jsonInit(json);
             */
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(colours['id_moves'].primary);
            var image = new Blockly.FieldImage("./images/toolbar/icon_servo.png", 18, 18, "servo");
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput().appendField(MSG['id_servos']).appendField(new FieldColourAdapter("#eee",
            function(index) {
                this.sourceBlock_.updateShape_(index);                
            }),'servoGroup');
            this.appendDummyInput("servo_3").appendField(MSG['id_in']).appendField(new FieldTimeAdapter("400",function(index) {
                this.sourceBlock_.updateTime(index);
            },'timeAdjust'),'TIME');
            this.appendDummyInput('servo_4').appendField(MSG['id_millsecond']);
            this.setInputsInline(true);
            // 增加默认的显示
            var servoId = MSG['servo_id'];
            var servoAngle = MSG['servo_angle'];
            this.getField('servoGroup').setText(servoId + ':' + servoAngle);
            var servoArr = blocklyDatas.getServoIds();
            var len = servoArr.length;
            for (var i = 0 ; i <len; i++ ) {
                var fieldInputText = new Blockly.FieldTextInput('');
                fieldInputText.setVisible(false);
                this.appendDummyInput("servoInput"+i).appendField(fieldInputText,'servo'+ servoArr[i]);
            }
        },

        updateTime :function updateTime(params) {
           var time = params.time;
           this.setFieldValue(time,'TIME');
        },

        popupTimeDialog : function popupTimeDialog() {
            var time = this.getFieldValue('TIME');
            console.log(time);
            var objParams = {};
            if (!time ||　time =='') {
                time = 400;
            }
            objParams.time = time;
            return objParams;
        },

        updateShape_ : function updateShape_(param) {
            var text = '';
            var isShowHidden = false;
            var index = 0;
            var textValue = '';
            for (var i = 0 ; i < param.length; i++) {
                this.removeInput('servoInput'+i);
                if (param[i].isClose == true) {
                    //如果是打开的才存储值,这里的id是舵机的ID                               
                    if (param[i].type ==1) {
                        if (param[i].angle != '') {
                            var variable = new FieldVariableAdapter(param[i].angle);
                            variable.setVisible(false);
                            this.appendDummyInput("servoInput"+i).appendField(variable,'servo'+ param[i].servoId);
                            this.setInputsInline(true);
                        } else {
                            param[i].angle = '0';
                            param[i].type = 0;
                            var fieldInputText = new Blockly.FieldTextInput(param[i].angle+'');
                            fieldInputText.setVisible(false);
                            this.appendDummyInput("servoInput"+i).appendField(fieldInputText,'servo'+ param[i].servoId);
                            this.setInputsInline(true);
                        }
                        
                    } else {
                        var fieldInputText = new Blockly.FieldTextInput(param[i].angle+'');
                        fieldInputText.setVisible(false);
                        this.appendDummyInput("servoInput"+i).appendField(fieldInputText,'servo'+ param[i].servoId);
                        this.setInputsInline(true);
                    }
                    textValue +=  param[i].servoId + ":" +param[i].angle+',';                
                    if (index >1) {
                        isShowHidden = true;
                        continue;
                    } else {
                        text += param[i].servoId + ":" +param[i].angle+(param[i].type == 0 ? '°,' :',');  
                    }
                    index++;
                }
                
                //this.removeInput('servo'+i);
                //this.appendValueInput('servo'+i).appendField('servo'+i).appendField(' rotate angle');
                //this.appendDummyInput().appendField('servo'+i).appendField(' rotate ' +(i*10)+ ' degree');
            }
            this.setFieldValue(textValue.substring(0,textValue.length-1), 'servoGroup');
            if (text == '') {
                var servoId = MSG['servo_id'];
                var servoAngle = MSG['servo_angle'];
                this.getField('servoGroup').setText(servoId + ':' + servoAngle);
                this.setFieldValue(servoId + ':' + servoAngle,'servoGroup'); //fix bug 2017-01-04
            } else {
                this.getField('servoGroup').setText(text.substring(0,text.length-1) + (isShowHidden? '...':''));
            }
            this.setDisabled(false);
            
        },
        popupService : function popupService() {
            var servoArr = blocklyDatas.getServoIds();
            var length = servoArr.length;
            var arrMultiServoToPopup = [];
            for (var i = 0 ; i < length; i++ ) {
                var tempObj = {};
                //舵机ID
                tempObj.servoId = servoArr[i];
                var variableStr = this.getFieldValue('servo'+servoArr[i]);
                var field = this.getField('servo'+servoArr[i]);
                if (variableStr && field instanceof FieldVariableAdapter) {
                        tempObj.type = 1;
                        tempObj.angle = variableStr;
                        tempObj.isClose = true;
                } else  if (variableStr && field instanceof Blockly.FieldTextInput){
                        tempObj.isClose = true;
                        tempObj.type = 0 ;
                        tempObj.angle = variableStr;
                } else {
                        tempObj.isClose = false;
                        tempObj.type = 0 ;
                        tempObj.angle = '';
                }
                arrMultiServoToPopup.push(tempObj);
            }  
            console.log(arrMultiServoToPopup);  
            return arrMultiServoToPopup;
        }, 
        popupKey : 'servoAngle',
        convertValueToText : function convertValueToText(value, name) {
            if ('servoGroup' == name) {
                 if (value.indexOf('#')> -1) {
                    return;
                 }
                 var index = value.indexOf(',');
                 if (index == -1) {
                     var angle = value.split(':');
                     this.getField(name).setText(value+ (isNaN(angle[1]) ? '':'°'));
                     return;
                 }
                 var firstText = value.substring(index+1);
                 var secondText = value.substring(0,index);
                 var secondIndex = firstText.indexOf(',');
                 if (secondIndex == -1) {
                     var showText = secondText +(isNaN(secondText.split(':')[1]) ? '':'°') +',' + firstText +(isNaN(firstText.split(':')[1]) ? '':'°');
                     this.getField(name).setText(showText);
                     return;
                 }
                 var showText = '';
                 var firstText  = value.substring(0,index);
                 var secondText = value.substring(index+1, index+secondIndex+1);
                 showText+=firstText + (isNaN(firstText.split(':')[1]) ? '':'°')+',' ;
                 showText+=secondText+(isNaN(secondText.split(':')[1]) ? '':'°');
                 this.getField(name).setText(showText + '...');
                 return;
            }
            var servoArr = blocklyDatas.getServoIds();
            var len = servoArr.length;
            for (var i = 0 ; i <len; i++ ) {
                if (name == ('servo'+ servoArr[i])) {
                    var variable = this.getFieldValue('servo'+ servoArr[i]);
                    this.removeInput('servoInput'+i);
                    if (variable !='' && isNaN(variable)) {
                        var variable = new FieldVariableAdapter(variable);
                        variable.setVisible(false);
                        this.appendDummyInput("servoInput"+i).appendField(variable,'servo'+ servoArr[i]);
                    } else if (variable !='' && !isNaN(variable)) {
                        var fieldInputText = new Blockly.FieldTextInput(variable);
                        fieldInputText.setVisible(false);
                        this.appendDummyInput("servoInput"+i).appendField(fieldInputText,'servo'+ servoArr[i]);
                    }
                }          
            }
             
          }
    };

    Blocks['movement_servo_change_angle_single'] = {
        init : function init() {
            var servos = blocklyDatas.getDataByKey('servos');
            var servosArray = [];
            if (servos) {
                var servoIds = servos.split('|');
                var len = servoIds.length;
                for (var i = 0 ;i < len; i++) {
                    var tempObj = [];
                    tempObj[0] = servoIds[i];
                    tempObj[1] = servoIds[i];
                    servosArray.push(tempObj);
                }
            }
            if (servosArray.length == 0) {
                servosArray.push(['id1',1]);
            } 
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(colours['id_moves'].primary);
            var image = new Blockly.FieldImage("./images/toolbar/icon_servo.png", 18, 18, "servo");
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput('servo').appendField(MSG['id_servo']).appendField(new FieldDropDownAdapter(servosArray),'SERVO_ID'); 
            this.appendDummyInput('servo1').appendField(MSG['id_rotate']);
            this.appendValueInput("ANGLE").setCheck('Number');
            this.appendDummyInput('servo2').appendField(MSG['id_degree']);
            this.appendDummyInput("servo3").appendField(MSG['id_in']).appendField(new FieldNumberAdapter('400', 0 ,5000,
                    1,function(value){
                        if (isNaN(value)) {
                            return 400;
                        }
                        if (value > 5000) {
                            return 5000;
                        } else if (value < 0) {
                            return 0;
                        } else {
                            return value;
                        }
                    }),'TIME');
            this.appendDummyInput('servo4').appendField(MSG['id_millsecond']);
            this.setInputsInline(true);
        }
    };

    Blocks['movement_servo_rotate_circle'] = {
        init : function init() {
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(colours['id_moves'].primary);
            var image = new Blockly.FieldImage("./images/toolbar/icon_servo.png", 18, 18, "servo");
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput("servos").appendField(MSG['id_rotate_circle']).appendField(new FieldColourAdapter("#eee",
            function(param) {
                this.sourceBlock_.updateShape_(param);              
            }),'servoGroup');
            this.setInputsInline(true);
            // 增加默认的显示
            var servoId = MSG['servo_id'];
            var servoDireaction = MSG['servo_direction'];
            var servoSpeed = MSG['servo_speed'];
            this.getField('servoGroup').setText(servoId+':' + servoDireaction + ':' + servoSpeed);
        },
        updateShape_ : function updateShape_(param) {
            var isShowHidden = false;
            var text = '';
            var index = 0;
            this.getField('servoGroup').setText('');
            var blockValueArr = []
            for (var i = 0 ; i < param.length; i++) {
                if (param[i].isClose == true) {
                    var tempObj = {};
                    tempObj.servoId = param[i].servoId;
                    if (param[i].direction == '-') {//顺时针
                        tempObj.direction = '2';  
                    } else if(param[i].direction == '+'){//逆时针
                        tempObj.direction = '1';
                    }else{//停止
                        tempObj.direction = '3';
                    }
                    tempObj.speed = param[i].speed;
                    blockValueArr.push(tempObj);
                    if (index > 1) {
                        isShowHidden = true;
                        continue;
                    } else {
                        if(param[i].direction=='s'){
                            text += param[i].servoId + ":" +"■";
                        }else{
                            text += param[i].servoId + ":" +param[i].direction;
                            text += param[i].speed;
                        }
                        text += ',';

                    }
                    index++;
                    
                }
                
            }
            this.setFieldValue(JSON.stringify(blockValueArr), 'servoGroup');
            if (text =='') {
                // 增加默认的显示
                var servoId = MSG['servo_id'];
                var servoDireaction = MSG['servo_direction'];
                var servoSpeed = MSG['servo_speed'];
                this.getField('servoGroup').setText(servoId+':' + servoDireaction + ':' + servoSpeed);
                this.setFieldValue(servoId+':' + servoDireaction + ':' + servoSpeed,'servoGroup');  //fix bug 2017-01-04             
            } else {
                this.getField('servoGroup').setText(text.substring(0,text.length-1)  + (isShowHidden? '...':''));
            }
            this.setDisabled(false);
        } , 
        popupService : function popupService() {
            var servoArr = blocklyDatas.getCircleServosIds();
            var length = servoArr.length;
            var arrMultiServoToPopup = [];
            var servoGroupValue = this.getFieldValue('servoGroup');
            var blockGroup = '';
            if (servoGroupValue && servoGroupValue!='' && servoGroupValue.indexOf('#') < 0 && servoGroupValue.indexOf('ID') < 0 ) { // fix bug 20170104
            //if (servoGroupValue && servoGroupValue!='' && servoGroupValue.indexOf('#') < 0 ) {
                blockGroup = JSON.parse(servoGroupValue);
            }
            for (var i = 0 ; i < length; i++ ) {
                var tempObj = {};
                //舵机ID,初始化赋值为默认值
                tempObj.servoId = servoArr[i];
                tempObj.direction = '-';
                tempObj.speed = 'VS';
                tempObj.isClose = false;
                for (var j = 0 ; j < blockGroup.length; j++) {
                    //从block取出来的值
                    var tempBlockObj = blockGroup[j];                 
                    var blockServoId = tempBlockObj.servoId;
                    var blockDirection = tempBlockObj.direction;
                    var blockSpeed =  tempBlockObj.speed;
                    if (blockServoId == tempObj.servoId ) {
                        if (blockDirection == '2') {
                            tempObj.direction = '-';
                        } else if(blockDirection == '1') {
                            tempObj.direction = '+';
                        } else {
                            tempObj.direction = 's';
                        }
                        //tempObj.direction = blockDirection;
                        tempObj.speed = blockSpeed;
                        tempObj.isClose = true;
                    }
                    
                }
                arrMultiServoToPopup.push(tempObj);
            }    
            console.log("传递到页面的值：");
            console.log(arrMultiServoToPopup);
            // 本地调试数据 
            // if(arrMultiServoToPopup.length==0){
            //     for(var k=0;k<6;k++){
            //         var tempObj1 = {};
            //         //舵机ID,初始化赋值为默认值
            //         tempObj1.servoId = "1";
            //         tempObj1.direction = '-';
            //         tempObj1.speed = 'VS';
            //         tempObj1.isClose = false;
            //         arrMultiServoToPopup.push(tempObj1);
            //     }
            // }
            return arrMultiServoToPopup;
        } , 
        popupKey : 'rotateServo'
          ,
        convertValueToText : function convertValueToText(value, name) {
            if (name == 'servoGroup' ) {
                if (value.indexOf('#')> -1) {
                    // 增加默认的显示
                    var servoId = MSG['servo_id'];
                    var servoDireaction = MSG['servo_direction'];
                    var servoSpeed = MSG['servo_speed'];
                    this.getField('servoGroup').setText(servoId+':' + servoDireaction + ':' + servoSpeed);
                    return;
                }
                /** fix bug 2017-01-04 */
                if (value.indexOf('ID') > -1) {
                    return; 
                }
                
                var jsonValue = JSON.parse(value);
                var len = jsonValue.length;
                var text = '';
                var isShowHidden = false;
                for (var i = 0 ; i <len; i++ ) {
                    var servoObj = jsonValue[i];
                    if (servoObj.direction == '2') {
                        servoObj.direction = '-'; 
                    } else if(servoObj.direction == '1') {
                        servoObj.direction = '+';
                    } else {
                        servoObj.direction = 's';
                    }
                    if (i> 1) {
                        isShowHidden = true;
                        continue;
                    } else {
                        if(servoObj.direction=='s'){
                            text += servoObj.servoId + ":" +"■";
                        }else{
                            text += servoObj.servoId + ":" +servoObj.direction;
                            text += servoObj.speed;
                        }
                        text += ',';
                       
                    }                  
                }
                this.getField('servoGroup').setText(text.substring(0,text.length-1) + (isShowHidden? '...':''));
            }
        }
    };

    Blocks['movement_servo_power_control'] = {
        init : function init() {
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(colours['id_moves'].primary);
            var image = new Blockly.FieldImage("./images/toolbar/icon_servo.png", 18, 18, "servo");
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput("servos").appendField(MSG['id_servo']).appendField(new FieldColourAdapter("#eee",
            function(param) {
                this.sourceBlock_.updateShape_(param);              
            }),'servoGroup');
            this.setInputsInline(true);
            this.getField('servoGroup').setText(MSG['id_all']+':'+MSG['id_lock']);
            var servoArr = blocklyDatas.getServoIds();
            var len = servoArr.length;
            var result = [];
            for (var i = 0 ; i < len ; i++) {
                var temp = {};
                temp.servoId = servoArr[i];
                temp.power = 'on';
                result.push(temp);
            }
            var jsonValue = JSON.stringify(result);
            this.setFieldValue(jsonValue, 'servoGroup');
        },
        updateShape_ : function updateShape_(param) {
            var isShowHidden = false;
            var text = '';
            this.getField('servoGroup').setText('');
            var index = 0;
            var len = param.length;
            for (var i = 0 ; i < len; i++) {           
                var power = param[i].power;
                if (power == 'off') {
                    index++; 
                    if ( index > 2) {                 
                        isShowHidden = true;
                        continue;
                    } else {
                        text += param[i].servoId;
                        text += " " + MSG['id_unlock'];
                        text += ',';
                    }             
                }            
            }
            this.setFieldValue(JSON.stringify(param), 'servoGroup');
            if (text != '') { 
                if (len == index ) {
                    this.getField('servoGroup').setText(MSG['id_all']+':'+MSG['id_unlock']);  
                }  else {
                    this.getField('servoGroup').setText(text.substring(0,text.length-1)  + (isShowHidden? '...':''));
                }     
                
            } else {
                this.getField('servoGroup').setText(MSG['id_all']+':'+MSG['id_lock']);          
            }
            
        },
        popupKey : 'servoStatus'
        , 
        popupService : function popupService()  {
            var servoArr = blocklyDatas.getServoIds();
            var len = servoArr.length;
            var servoGroupValue = this.getFieldValue('servoGroup');
            var blockGroup = '';
            if (servoGroupValue && servoGroupValue!='' && servoGroupValue.indexOf('#') < 0 ) {
                blockGroup = JSON.parse(servoGroupValue);
            }       
            if (blockGroup == '') {
                var result = [];
                for (var i = 0 ; i < len; i++ ) {
                    var temp = {};
                    temp.servoId = servoArr[i];
                    temp.power = 'on';
                    result.push(temp);
                }  
                return  result; 
            } else {
                return blockGroup;
            }     
        } ,
        convertValueToText : function convertValueToText(value, name) {
            if (name == 'servoGroup') {
                if (value.indexOf('#')> -1) {
                    return;
                }
                var isShowHidden = false;
                var jsonValue = JSON.parse(value);
                var text = '';
                var index = 0;
                var len = jsonValue.length;
                for (var i = 0 ; i < len; i++) {           
                    var power = jsonValue[i].power;
                    if (power == 'off') {
                        index++;   
                        if (index >2) {
                            isShowHidden = true;
                            continue;
                        } else {
                            text += jsonValue[i].servoId;
                            text += " " + MSG['id_unlock'];
                            text += ',';
                        }                                        
                    }            
                }
                if (text != '') { 
                    if (len == index ) {
                        this.getField('servoGroup').setText(MSG['id_all']+':'+MSG['id_unlock']);  
                    }  else {
                        this.getField('servoGroup').setText(text.substring(0,text.length-1)  + (isShowHidden? '...':''));
                    }                      
                } else {
                    this.getField('servoGroup').setText(MSG['id_all']+':'+MSG['id_lock']);          
                }
            }
        }
    };

    Blocks['movement_servo_status_read'] = {
        init : function init() {
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(colours['id_moves'].primary);
            var image = new Blockly.FieldImage("./images/toolbar/icon_servo.png", 18, 18, "servo");
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput("servos").appendField(MSG['id_run_to']).appendField(new FieldColourAdapter("",
            function(param) {
                this.sourceBlock_.updateShape_(param);              
            }),'servoPosture');
            this.appendDummyInput("servo3").appendField(MSG['id_in']).appendField(new FieldTimeAdapter("400",function(index) {
                this.sourceBlock_.updateTime(index);
            },'timeAdjust'),'TIME');
            this.appendDummyInput('servo4').appendField(MSG['id_millsecond']);
            var textField = new Blockly.FieldTextInput('');
            textField.setVisible(false);
            this.appendDummyInput("servosGroup").appendField(textField,'servoGroup');
            this.setInputsInline(true);
            var movementGesture = MSG['movement_gesture'];
            this.getField('servoPosture').setText(movementGesture);
        } ,
        updateTime :function updateTime(params) {
           var time = params.time;
           this.setFieldValue(time,'TIME');
        },

        popupTimeDialog : function popupTimeDialog() {
            var time = this.getFieldValue('TIME');
            console.log(time);
            var objParams = {};
            if (!time ||　time =='') {
                time = 400;
            }
            objParams.time = time;
            return objParams;
        },
        updateShape_ : function updateShape_(param) {
            if ((param && param.length ==0) || (param && param.name =='')) {
                param.name = MSG['posture_named_popup_placeholder'];
            }
            // 更新 block 块值
            this.getField('servoPosture').setText(param.name);
            this.setFieldValue(param.name,'servoPosture');
            //获取程序运行的索引，用于掉电回读后还原为原来的索引
            var programRunnerIndex = programManager.getProgramRunnerIndex();
            //将索引设置为-1
            programManager.setProgramRunnerIndex(-1);
            //发送读取角度的命令
            var commandSequence = new CommandSequence();
            var sendFn = function() {
                console.log('send command');
                if (window.blocklyObj) {
                    var readStatusCommand = new RobatCommand('getPosture');
                    readStatusCommand.send();
                } else {
                    ubtUtils.sendTimeout(function() {
                        var readStatusCommand = new RobatCommand('getPosture');
                        readStatusCommand.send();
                    },function() {
                        window.continueSteps(-1);
                    },3000);
                }              
            };
            var that = this;          
            commandSequence.push(sendFn); 
            var readFn = function() {
                console.log('read command');
                ubtUtils.sendTimeout(function() {
                        $.ajax({
                            type: "POST",//请求方式
                            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
                            data: "text",//数据类型text xml json  script  jsonp
                            async: false,
                            error: function (xhr) {  //读取错误
                                return null;
                            },
                            success: function (mes) {
                                if (mes!='') {
                                    var result = mes.split('|');
                                    if (result[0] == 'success') {
                                        that.setFieldValue(result[1],'servoGroup');                                     
                                        var servoArr = JSON.parse(result[1]);                                      
                                    }
                                }
                            }
                        });
                    },function() {
                        window.continueSteps(-1);
                        programManager.setProgramRunnerIndex(programRunnerIndex);
                    },50);           
            };
            commandSequence.push(readFn);
            var obj = commandSequence.run().then(function(resolve) {
                commandSequence.run();
            });
            
        } , 
        popupService : function popupService()  {
            var blueStatus =  blocklyDatas.getDataByKey('blueState');
            if(window.blocklyObj == undefined){
                blueStatus =true;
            }
            if(blueStatus == 0 || blueStatus==false || !blueStatus){//未连接
                this.popupKey = 'postureLink';
                return {};
            } else {
                this.popupKey = 'postureNamed';
            }
            var servoArr = blocklyDatas.getServoIds();
            var servoStr = servoArr.join(',');
            var pwerOnCommand = new RobatCommand('servoPowerOn|'+servoStr);
            pwerOnCommand.send();
            var result = this.getField('servoPosture').getText();
            if (result!='') {
                return {'name':result};
            }
        } , 
        popupKey : 'postureNamed',
        convertValueToText : function convertValueToText(value, name) {
            if (name == 'servoPosture' ) {
                if (value.indexOf('#')> -1 || value =='') {
                    var movementGesture = MSG['movement_gesture'];
                    this.getField('servoPosture').setText(movementGesture);
                    return;
                 }
                this.getField(name).setText(value);
            }
        }
    };
}
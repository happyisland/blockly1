/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * logix.jsx version 1.0
 * 
 * block custom define
 * 
 * feature start block, goto start block
 * 
 */
'use strict';
var colours = require('../../../engine/service/colours');
var FieldDropDownAdapter = require('../../../engine/adapter/field_dropdown_adapter');
var FieldNumberAdapter = require('../../../engine/adapter/field_number_adapter');
var FieldDefaultIdAdapter = require('../../../engine/adapter/field_default_id_adapter');
var SensorCondition = require('../../../engine/common/condition/sensor_condition');
var sensorConditionValue = require('../../../engine/common/condition/sensor_condition_value');
var blocklyDatas = require('../../../engine/service/blockly_datas');
var ubtBlocklyUtils = require('../../../engine/common/utils/blockly_utils');
var programBranchGenerator = require('../../../engine/common/condition/program_branch_generator');
var Map = require('./../../../engine/common/utils/map');
var _ = require('lodash');
module.exports = function (Blocks) {
    Blocks['program_start'] = {
        init: function init() {
            this.setPreviousStatement(false);
            this.setNextStatement(true);
            this.setColour(colours['id_start'].primary);
            this.setDeletable(false);
            var image = new Blockly.FieldImage("./images/toolbar/icon_play.png", 18, 18, "start");
            //var image = new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 50, 50, "*");     
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput().appendField(MSG['id_when_start']);
            this.setInputsInline(true);
        }
    };

    Blocks['program_goto_start'] = {
        init: function init() {
            this.setPreviousStatement(true);
            this.setNextStatement(false);
            this.setColour(colours['id_start'].primary);
            var image = new Blockly.FieldImage("./images/toolbar/go_back.png", 18, 18, "go_back");
            //var image = new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 50, 50, "*");     
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput().appendField(MSG['id_go_to_start']);
            this.setInputsInline(true);
        }
    };

    Blocks['program_goto_condition'] = {
        init: function init() {
            var that = this;
            this.setPreviousStatement(false);
            this.setNextStatement(true);
            this.setColour(colours['id_start'].primary);
            var branchId = new Blockly.FieldTextInput(programBranchGenerator.getBranch()+'');
            branchId.setVisible(false);  
            this.appendDummyInput('branch').appendField(branchId,'PROGRAM_BRANCH');
            var image = new Blockly.FieldImage("./images/toolbar/icon_play.png", 18, 18, "start");   
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput('sensorType').appendField(new FieldDropDownAdapter([[MSG['id_sensor_IR_sensor'], "Infrared"], [MSG['id_sensor_touch_sensor'], "Touch"]], function(params){
                blocklyDatas.getDataByKey('sensor_condition').setSensorType(params);
                //that.removeInput('sensorId');
                var input = that.getInput('sensorId');              
                input.removeField('SENSOR_ID');
                if (params == 'Touch') {              
                    input.appendField(new FieldDropDownAdapter(blocklyDatas.getTouchIdArr()), "SENSOR_ID");
                    that.setFieldValue('0','VALUE');
                } else {
                    input.appendField(new FieldDropDownAdapter(blocklyDatas.getInfraredIdArr()), "SENSOR_ID");
                }
                return params;
            }), "SENSOR").appendField('ID');
            this.appendDummyInput('sensorId').appendField(new FieldDropDownAdapter(blocklyDatas.getInfraredIdArr(),function(params){
                blocklyDatas.getDataByKey('sensor_condition').setSensorId(params);
                return params;
            }), "SENSOR_ID");
            this.appendDummyInput('operator').appendField(new FieldDropDownAdapter([[">", "GT"], ["<", "LT"], ["=", "EQ"],["≠", "NEQ"]],function name(params) {
                blocklyDatas.getDataByKey('sensor_condition').setOperator(params);
                return params;
            }), "OP")
            .appendField(new FieldNumberAdapter('0', -118 ,118,
                    1,function(value){
                        var result = 0;
                        value = parseInt(value);
                        var sensor = that.getFieldValue('SENSOR');
                        if (isNaN(value)) {
                            result = 0;
                        }
                        if (sensor == 'Infrared' ) {
                            if (value > 100) {
                                result = 100;
                            } else if (value < 0) {
                                result = 0;
                            } else {
                                result = value;
                            }
                        } else {
                            if (value > 3) {
                                result = 3;
                            } else if (value < 0) {
                                result = 0;
                            } else {
                                result = value;
                            }
                        } 
                        blocklyDatas.getDataByKey('sensor_condition').setValue(result); 
                        return result;                                                        
                    }), "VALUE");
                    
            this.setInputsInline(true);
            var sensorCondition = new SensorCondition('Infrared', 'GT' , 0);
            blocklyDatas.setKeyData('sensor_condition', sensorCondition);
        },
        convertValueToText : function convertValueToText(value, name) {
            if ('SENSOR' == name) {
                this.setFieldValue(value, 'SENSOR');
            }
            if ('OP' == name) {
                this.setFieldValue(value, 'OP');
            }
            if ('VALUE' == name) {
                this.setFieldValue(value, 'VALUE');
            }
            if ('SENSOR_ID' == name) {
                this.setFieldValue(value, 'SENSOR_ID');
            }
            if ('PROGRAM_BRANCH' == name) {
                this.setFieldValue(value, 'PROGRAM_BRANCH');
            }
            var sensor = this.getFieldValue('SENSOR');
            var operator = this.getFieldValue('OP');
            var value = this.getFieldValue('VALUE');
            var sensorId = this.getFieldValue('SENSOR_ID');
            var branchId = this.getFieldValue('PROGRAM_BRANCH');
            var sensorCondition = new SensorCondition(sensor, operator , value, sensorId,branchId);
            blocklyDatas.setKeyData('sensor_condition', sensorCondition); 
        }
    };

    Blocks['handleCondition'] = function(type) {
        var allCondition = sensorConditionValue.getAllCondition(type);
        var needRefresh = blocklyDatas.getDataByKey('needRefresh');
        if (!allCondition || allCondition.length == 0 || needRefresh) {
            allCondition = sensorConditionValue.initAllCondition(type);
            if (needRefresh && (type =='program_goto_touch_condition' || type =='program_goto_infrared_condition')) {
                //blocklyDatas.setKeyData('needRefresh', false);
            }
        }
        var existCondition = blocklyDatas.getDataByKey(type);
        if (existCondition) {
            var tempCondition = allCondition;
            for (var i = 0 ;i < existCondition.length; i++) {
                tempCondition = _.without(tempCondition, existCondition[i]);
            }
            var selectCondition = tempCondition;
        } else {
            selectCondition = allCondition;
        } 
        //console.log('allCondition:'+allCondition); 
        //console.log('existCondition:'+existCondition);
        //console.log('selectCondition:'+selectCondition);
        return selectCondition;
    };

    Blocks['program_goto_phone_condition'] = {
        init: function init() {
            this.setPreviousStatement(false);
            this.setNextStatement(true);
            this.setColour(colours['id_start'].primary);
            /**
            var allCondition = sensorConditionValue.getAllCondition('program_goto_phone_condition');
            if (!allCondition) {
                allCondition = sensorConditionValue.initAllCondition('program_goto_phone_condition');
            }
            var existCondition = blocklyDatas.getDataByKey('program_goto_phone_condition');
            if (existCondition) {
                var tempCondition = allCondition;
                for (var i = 0 ;i < existCondition.length; i++) {
                    tempCondition = _.without(tempCondition, existCondition[i]);
                }
                var selectCondition = tempCondition;
            } else {
                selectCondition = allCondition;
            } 
            console.log('allCondition:'+allCondition); 
            console.log('existCondition:'+existCondition);
            console.log('selectCondition:'+selectCondition);
            var defaultValue = '';
            if (selectCondition.length == 0) {
                defaultValue = 'left';
            } else {
                defaultValue = selectCondition[0];
            }
           */
            var selectCondition = Blocks['handleCondition']('program_goto_phone_condition');
            var defaultValue = '';
            if (selectCondition.length == 0) {
                defaultValue = 'left';
            } else {
                defaultValue = selectCondition[0];
            }
            //将默认的条件写入程序块
            var branchId = new Blockly.FieldTextInput(programBranchGenerator.getBranch()+'');
            branchId.setVisible(false);  
            this.appendDummyInput('branch').appendField(branchId,'PROGRAM_BRANCH');
            var sensorType = new Blockly.FieldTextInput('phone');
            sensorType.setVisible(false);  
            this.appendDummyInput('sendor').appendField(sensorType,'SENSOR');
            var operator = new Blockly.FieldTextInput('EQ');
            operator.setVisible(false);  
            this.appendDummyInput('operator').appendField(operator,'OP');
            var sensorId = new Blockly.FieldTextInput('0');
            sensorId.setVisible(false);  
            this.appendDummyInput('sensorId').appendField(sensorId,'SENSOR_ID');
            var value = new Blockly.FieldTextInput(defaultValue);
            value.setVisible(false);  
            this.appendDummyInput('value').appendField(value,'VALUE');

            var image = new Blockly.FieldImage("./images/toolbar/icon_phone_pad.png", 18, 18, "start");   
            this.appendDummyInput('images').appendField(image);
            this.appendDummyInput('phone_text').appendField(MSG['phone_pad']);
            var deviceTilt = new Blockly.FieldDeviceTilt(defaultValue, function(param) {
                this.sourceBlock_.updateShape_(param);
            });
            this.appendDummyInput().appendField(deviceTilt, 'TILT_TYPE');
            this.setInputsInline(true);
            this.blockEnabled = false;
        },
        handleAllCondition :function handleAllCondition() {
            return ['left','right','swing','up','down'];
        },
        popupKey : 'deviceTilt',
        popupService : function popupService() {
            var direction = this.getFieldValue('TILT_TYPE');
            var objData = {};
            objData.direction = direction;
            this.oldDirection = direction;
            return objData;
        },

        updateShape_ : function updateShape_(param) {
            var that = this;
            var direction = param.direction;
            this.setFieldValue(direction, 'TILT_TYPE');
            this.setFieldValue(direction,'VALUE');
            //更新数据中心的值，判断是否有重复的条件
            var result = blocklyDatas.getDataByKey('program_goto_phone_condition');
            if (!result) {
                var result = [];
                result.push(value);
                blocklyDatas.setKeyData('program_goto_phone_condition',result);
            } else {
                if (!this.disabled) {
                    this.handleChange(that.oldDirection, result);
                    /**
                    _.remove(result,function(param){
                        return param == that.oldDirection;
                    });
                     */
                }             
                if(_.includes(result,direction) ) {   
                    this.setDisabled(true);
                } else {
                    this.setDisabled(false);                  
                    result.push(direction);
                }
            }

            var msgKey = 'tilt_'+ direction;
            var msgText = MSG[msgKey];
            this.getField('TILT_TYPE').setText(msgText);
        } ,
        convertValueToText : function convertValueToText(value,name) {
            if (name == 'TILT_TYPE') {
                var msgKey = 'tilt_'+ value;
                var msgText = MSG[msgKey];
                this.getField('TILT_TYPE').setText(msgText);
                this.blockEnabled = true;
            }        
        },
        validate :function validate() {         
            if (this.blockEnabled) {  
                var value = this.getFieldValue('VALUE');
                var result = blocklyDatas.getDataByKey('program_goto_phone_condition');
                if (!result) {
                    var result = [];
                    result.push(value);
                    blocklyDatas.setKeyData('program_goto_phone_condition',result);
                } else {
                    if (_.includes(result,value) && this.blockEnabled) {
                        this.setDisabled(true);
                    } else {
                        result.push(value);
                    }
                }
            }      
        }, 

        handleChange : function handleChange(value, result) {
            //如果当前存在一个不可用的条件一样的块，则让这个块可用
            var phoneConditionBlocks = ubtBlocklyUtils.findBlocksByType('program_goto_phone_condition');
            var isDelete = true; 
            for(var i= 0 ; i< phoneConditionBlocks.length; i++) {
                var block = phoneConditionBlocks[i];
                if (block.getFieldValue('VALUE') == value && block.disabled == true) {
                    block.setDisabled(false);
                    isDelete = false;
                    break;
                }
            }
            if (isDelete) {
                _.remove(result,function(param){
                    return param == value;
                });
            }
        },
        deleteCallback :function deleteCallback() {
            var value = this.getFieldValue('VALUE');
            var result = blocklyDatas.getDataByKey('program_goto_phone_condition');       
            if (!this.disabled) {            
                this.handleChange(value, result);
            }
        }
    };

    Blocks['program_goto_touch_condition'] = {
        init : function init() {
            this.setPreviousStatement(false);
            this.setNextStatement(true);
            this.setColour(colours['id_start'].primary);
            
            var selectCondition = Blocks['handleCondition']('program_goto_touch_condition');
            //处理可以选择的条件，比如选择剩下可选的传感器数据
            var selLength = selectCondition.length;
            if (selLength > 0) {
                var allObj = {};
                for (var i = 0 ; i < selLength ; i++) {
                    var sensorObj =  selectCondition[i].split(':');
                    var sensorId = sensorObj[0];
                    var status = sensorObj[1];
                    if (allObj[sensorId]) {
                        allObj[sensorId].push(status);
                    } else {
                        allObj[sensorId] = [];
                        allObj[sensorId].push(status);
                    }
                }
                console.log(allObj);
                var sensorId = _.keys(allObj);
                var touchIdArr = [];
                for (var i = 0 ; i< sensorId.length; i++) {
                    var objArr = [];
                    objArr[0] = 'ID-'+sensorId[i];
                    objArr[1] = sensorId[i];
                    touchIdArr.push(objArr);
                }
                var statusData = allObj[sensorId[0]];
                var valueShow = statusData[0];
                var textShow = this.statusMap[valueShow];
            } else {
                touchIdArr = blocklyDatas.getTouchIdArr();
                valueShow = '1';
                textShow = 'click';
            }
            console.log(touchIdArr);
            //将默认的条件写入程序块
            var branchId = new Blockly.FieldTextInput(programBranchGenerator.getBranch()+'');
            branchId.setVisible(false);  
            this.appendDummyInput('branch').appendField(branchId,'PROGRAM_BRANCH');
            var sensorType = new Blockly.FieldTextInput('touch');
            sensorType.setVisible(false);  
            this.appendDummyInput('sensor').appendField(sensorType,'SENSOR');
            var operator = new Blockly.FieldTextInput('EQ');
            operator.setVisible(false);  
            this.appendDummyInput('operator').appendField(operator,'OP');
            var value = new Blockly.FieldTextInput(valueShow); 
            value.setVisible(false);  
            this.appendDummyInput('value').appendField(value,'VALUE');
            //添加可以显示的块信息
            var image = new Blockly.FieldImage("./images/toolbar/icon_touch_sensor.png", 18, 18, "start");   
            this.appendDummyInput('images').appendField(image).appendField(MSG['touch_sensor']);;
            var touchArr = blocklyDatas.getTouchIds();
            var adapter = '';
            if (touchArr && touchArr[0] == 'ID') {//未连接红外传感器
                adapter = new FieldDefaultIdAdapter('ID',function() {               
                },'touch');
            } else {
                adapter = new FieldDropDownAdapter(touchIdArr);
            }
            this.appendDummyInput('touch_sensor_input')
                .appendField(adapter, "SENSOR_ID");
            this.appendDummyInput()
                .appendField(MSG['status']);   
            var touchSensor = new Blockly.FieldTouchSensor(textShow, valueShow+'', function(params) {
                this.sourceBlock_.updateShape_(params);
            });
            this.appendDummyInput()
                .appendField(touchSensor, 'STATUS');
            this.blockEnabled = false;
            this.setInputsInline(true);
        } ,
        handleAllCondition :function handleAllCondition() {
            var result= [];
            var touchArr = blocklyDatas.getTouchIds();
            var status = [1,2,3];
            if (touchArr && touchArr[0]!='ID') {
                for (var i = 0 ; i< touchArr.length; i++) {
                    for (var j = 0; j < status.length; j++) {
                        result.push(touchArr[i]+':'+ status[j]);
                    }
                }
            }
            
            return result;
        } , 
        statusMap : ["release","click", "db_click", "press_hold"],
        popupKey : 'touchSensor', 
        popupService : function popupService() {
            var status = this.getFieldValue('STATUS');
            var sensorId = this.getFieldValue('SENSOR_ID');
            var objData = {};
            objData.status = status;
            objData.sensorId = sensorId;
            objData.global = 'global';
            this.saveOldData();
            return objData;
        }, 
        saveOldData : function saveOldData() {
            var status = this.getFieldValue('STATUS');
            var sensorId = this.getFieldValue('SENSOR_ID');
            this.oldData = sensorId+':'+ status;
        },
        updateValidate :function updateValidate() {
            var  that = this;
            var status = this.getFieldValue('STATUS');
            var sensorId = this.getFieldValue('SENSOR_ID');
            var result = blocklyDatas.getDataByKey('program_goto_touch_condition');
            if (!result) {
                var result = [];
                result.push(sensorId+':'+ status);           
                blocklyDatas.setKeyData('program_goto_touch_condition',result);
            } else {
                if (!this.disabled) {
                    var oldStatus = that.oldData.split(':')[1];
                    var oldsensorId = that.oldData.split(':')[0];
                    this.handleChange(oldStatus, oldsensorId,result);
                    /**
                    _.remove(result,function(param){
                        return param == that.oldData;
                    });
                     */
                } 
                if (_.includes(result,sensorId+':'+ status)) {
                    this.setDisabled(true);
                } else {
                    this.setDisabled(false);
                    result.push(sensorId+':'+ status);
                }
            }
        },
        updateShape_ : function updateShape_(param) {
            // 从block 弹出窗口中获得的值为 0, 1, 2, 3, 分别对应 '松开'，'单击', '双击', '长按'
            // 与U3D 返回的值一致
            var status = param.status;
            var msgKey = '';
            // 映射转换，获取多语言显示的key值
            var valMap = ["release","click", "db_click", "press_hold"];
            for(var idx = 0; idx < valMap.length; idx++){
                if(idx == status){
                    msgKey = valMap[idx];
                }
            }
            this.setFieldValue(status, 'STATUS');  
            this.setFieldValue(status, 'VALUE');   
            this.updateValidate();  
            // 获取多语言显示文本
            var msgText = MSG[msgKey];
            this.getField('STATUS').setText(msgText);
        } ,
        convertValueToText : function convertValueToText(value ,name) {
            if (name == 'STATUS') {
                var msgKey = '';
                // 映射转换，获取多语言显示的key值
                var valMap = ["release","click", "db_click", "press_hold"];
                for(var idx = 0; idx < valMap.length; idx++){
                    if(idx == value){
                        msgKey = valMap[idx];
                    }
                }
                var msgText = MSG[msgKey];
                this.getField('STATUS').setText(msgText);
                this.blockEnabled = true;
                return;
            }

            if (name == 'SENSOR_ID') {
                var touchArr = blocklyDatas.getTouchIds();
                if(touchArr[0] == 'ID' && !isNaN(value)) {//断开连接
                    var input = this.getInput("touch_sensor_input");
                    input.removeField('SENSOR_ID');
                    var touchArray = [];
                    var temp= [];
                    temp[0] = 'ID-'+value;
                    temp[1] = value;
                    touchArray.push(temp);
                    var adapter = new FieldDropDownAdapter(touchArray);
                    input.appendField(adapter,'SENSOR_ID');
                }
                if (touchArr[0] == 'ID' && value == 'ID' ) {
                    this.setDisabled(true);
                    return;
                } 

                if (value == 'ID' && touchArr[0] != 'ID') {
                    var input = this.getInput("touch_sensor_input");
                    input.removeField('SENSOR_ID');
                    var adapter = new FieldDefaultIdAdapter('ID',function() {               
                    },'touch');
                    input.appendField(adapter,'SENSOR_ID');
                    return;
                }
            }           
        }, 
        validate :function validate() {
            if (this.blockEnabled) {  
                var status = this.getFieldValue('STATUS');
                var sensorId = this.getFieldValue('SENSOR_ID');
                var result = blocklyDatas.getDataByKey('program_goto_touch_condition');
                if (!result) {
                    var result = [];
                    if (sensorId =='ID') {
                        return;
                    }
                    if (this.disabled) {
                        return;
                    }
                    result.push(sensorId+':'+ status);
                    blocklyDatas.setKeyData('program_goto_touch_condition',result);
                } else {
                    if (_.includes(result,sensorId+':'+ status) && this.blockEnabled) {
                        this.setDisabled(true);
                    } else {
                        if (this.disabled) {
                            return;
                        }
                        result.push(sensorId+':'+ status);
                    }
                }
            }  
        },
        handleChange : function handleChange(status, sensorId, result) {
            //如果当前存在一个不可用的条件一样的块，则让这个块可用
            var touchConditionBlocks = ubtBlocklyUtils.findBlocksByType('program_goto_touch_condition');
            var isDelete = true; 
            for(var i= 0 ; i< touchConditionBlocks.length; i++) {
                var block = touchConditionBlocks[i];
                if (block.getFieldValue('STATUS') == status && block.getFieldValue('SENSOR_ID') == sensorId && block.disabled == true) {
                    block.setDisabled(false);
                    isDelete = false;
                    break;
                }
            }
            if (isDelete) {
                _.remove(result,function(param){
                    return param == (sensorId +':' + status);
                });
            }
        },
        deleteCallback :function deleteCallback() {
            var sensorId = this.getFieldValue('SENSOR_ID');
            var status = this.getFieldValue('STATUS');
            var result = blocklyDatas.getDataByKey('program_goto_touch_condition');       
            if (!this.disabled) {
                this.handleChange(status,sensorId, result);               
            }
        }
    };

    Blocks['program_goto_infrared_condition'] = {
        init : function init() {
            var selectCondition = Blocks['handleCondition']('program_goto_infrared_condition');
            var valueShow = '10';
            if (selectCondition.length == 0) {
                var infraredIds = blocklyDatas.getInfraredIdArr();
            } else {
                var touchIdArr = [];
                for (var i = 0 ; i < selectCondition.length; i++) {
                    var objArr = [];
                    objArr[0] = 'ID-'+selectCondition[i];
                    objArr[1] = selectCondition[i];
                    touchIdArr.push(objArr);
                }  
                infraredIds = touchIdArr;
            }
            this.selectIds = infraredIds;
            this.selectCondition = selectCondition;
            //将默认的条件写入程序块
            var branchId = new Blockly.FieldTextInput(programBranchGenerator.getBranch()+'');
            branchId.setVisible(false);  
            this.appendDummyInput('branch').appendField(branchId,'PROGRAM_BRANCH');
            var sensorType = new Blockly.FieldTextInput('infrared');
            sensorType.setVisible(false);  
            this.appendDummyInput('sensor').appendField(sensorType,'SENSOR');
            /**
            var operator = new Blockly.FieldTextInput('EQ');
            operator.setVisible(false);  
            this.appendDummyInput('operator').appendField(operator,'OP');
             */
            var value = new Blockly.FieldTextInput(valueShow); 
            value.setVisible(false);  
            this.appendDummyInput('value').appendField(value,'VALUE');
            this.setPreviousStatement(false);
            this.setNextStatement(true);
            this.setColour(colours['id_start'].primary);
            this.appendDummyInput("infrared_sensor_images")
                .appendField(new Blockly.FieldImage("./images/toolbar/icon_infrared_sensor.png", 18, 18, "infrared_sensor"))
                .appendField(MSG['ir_sensor']);
            var infraredArr = blocklyDatas.getInfraredIds();
            var adapter = '';
            if (infraredArr && infraredArr[0] == 'ID') {//未连接红外传感器
                adapter = new FieldDefaultIdAdapter('ID',function() {

                },'infrared');
            } else {
                adapter = new FieldDropDownAdapter(infraredIds);
            }
            this.appendDummyInput("infrared_sensor_input").appendField(adapter, "SENSOR_ID");
            this.appendDummyInput("infrared_sensor_operator").appendField(MSG['id_sensor_reflectance_between_obstacle'])
                .appendField(new FieldDropDownAdapter([["<=", "LTE"],[">=", "GTE"]]), "OP")
                .appendField(" ");
            var FieldInfraredSensor = new Blockly.FieldInfraredSensor("10", function(param) { 
                this.sourceBlock_.updateText(param);
            });
            this.appendDummyInput().appendField(FieldInfraredSensor, 'DISTANCE');
            this.setInputsInline(true);
        },
        popupService : function popupService() {
            var map = new Map();
            map.put("GT", ">");
            map.put("LT", "<");
            map.put("EQ", "=");
            map.put("NEQ", "≠");
            var curValue = _.trim(this.getFieldValue('DISTANCE'));
            var sensorId = this.getFieldValue('SENSOR_ID');
            var opType = this.getFieldValue('OP');
            var objData = {};
            objData.changeValue = curValue;
            objData.sensorId = sensorId;
            objData.opType = map.get(opType);
            return objData;
        },
        updateText : function updateShape_(param) {
            var changeValue = param.changeValue;
            this.setFieldValue(changeValue+'', 'DISTANCE');
            this.setFieldValue(changeValue+'', 'VALUE');  
            this.getField('DISTANCE').setText('  '+changeValue+'  ');
            //this.updateValidate();
        },
        handleAllCondition :function handleAllCondition() {
            var infreredIds = blocklyDatas.getInfraredIds();
            if (infreredIds[0]!='ID') {
                return infreredIds;
            } else {
                return [];
            }
            
        },
        convertValueToText : function convertValueToText(value ,name) {
            if (name =='DISTANCE') {
                this.getField('DISTANCE').setText('  ' +value + '  ');
                this.blockEnabled = true;
                return;
            }
            if (name == 'SENSOR_ID') {
                var infraredArr = blocklyDatas.getInfraredIds();
                if(infraredArr[0] == 'ID' && !isNaN(value)) {//断开连接
                    var input = this.getInput("infrared_sensor_input");
                    input.removeField('SENSOR_ID');
                    var infraredArray = [];
                    var temp= [];
                    temp[0] = 'ID-'+value;
                    temp[1] = value;
                    infraredArray.push(temp);
                    var adapter = new FieldDropDownAdapter(infraredArray);
                    input.appendField(adapter,'SENSOR_ID');
                }
                if (infraredArr[0] == 'ID' && value == 'ID' ) {
                    this.setDisabled(true);
                    return;
                } 

                if (value == 'ID' && infraredArr[0] != 'ID') {
                    var input = this.getInput("infrared_sensor_input");
                    input.removeField('SENSOR_ID');
                    var adapter = new FieldDefaultIdAdapter('ID',function() {               
                    },'infrared');
                    input.appendField(adapter,'SENSOR_ID');
                    return;
                }
                if (value != 'ID' && infraredArr[0] != 'ID') {
                    var selectIds = this.selectIds;
                    if (!_.includes(this.selectCondition, value)) {
                        var input = this.getInput("infrared_sensor_input");
                        input.removeField('SENSOR_ID');
                        var adapter = new FieldDropDownAdapter(selectIds);
                        input.appendField(adapter,'SENSOR_ID');
                    }
                }
            } 
        },
        saveOldData : function saveOldData() {
            var sensorId = this.getFieldValue('SENSOR_ID');
            this.oldData = sensorId;
        },
        updateValidate :function updateValidate() {
            var  that = this;
            var sensorId = this.getFieldValue('SENSOR_ID');
            var result = blocklyDatas.getDataByKey('program_goto_infrared_condition');
            if (!result) {
                var result = [];
                result.push(sensorId);           
                blocklyDatas.setKeyData('program_goto_infrared_condition',result);
            } else {
                if (!this.disabled) {
                    var oldsensorId = that.oldData;
                    this.handleChange(oldsensorId,result);
                    /**
                    _.remove(result,function(param){
                        return param == that.oldData;
                    });
                     */
                } 
                if (_.includes(result,sensorId)) {
                    this.setDisabled(true);
                } else {
                    this.setDisabled(false);
                    result.push(sensorId);
                }
            }
        },
        validate :function validate() {
            if (this.blockEnabled) {  
                var sensorId = this.getFieldValue('SENSOR_ID');
                var result = blocklyDatas.getDataByKey('program_goto_infrared_condition');
                if (!result) {
                    var result = [];
                    if (sensorId =='ID') {
                        return;
                    }
                    if (this.disabled) {
                        return;
                    }
                    result.push(sensorId);
                    blocklyDatas.setKeyData('program_goto_infrared_condition',result);
                } else {
                    if (_.includes(result,sensorId) && this.blockEnabled) {
                        this.setDisabled(true);
                    } else {
                        if (this.disabled) {
                            return;
                        }
                        result.push(sensorId);
                    }
                }
            }  
        },
        handleChange : function handleChange(sensorId, result) {
            //如果当前存在一个不可用的条件一样的块，则让这个块可用
            var infraredConditionBlocks = ubtBlocklyUtils.findBlocksByType('program_goto_infrared_condition');
            var isDelete = true; 
            for(var i= 0 ; i< infraredConditionBlocks.length; i++) {
                var block = infraredConditionBlocks[i];
                if (block.getFieldValue('SENSOR_ID') == sensorId && block.disabled == true) {
                    block.setDisabled(false);
                    isDelete = false;
                    break;
                }
            }
            if (isDelete) {
                _.remove(result,function(param){
                    return param == (sensorId);
                });
            }
        },
        deleteCallback :function deleteCallback() {
            var sensorId = this.getFieldValue('SENSOR_ID');
            var result = blocklyDatas.getDataByKey('program_goto_infrared_condition');       
            if (!this.disabled) {
                this.handleChange(sensorId, result);               
            }
        }
    };
    
}
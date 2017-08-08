
'use strict';
var createFunctionString = require('../../engine/common/utils/create_function_string');
var ubtUtils = require('../../engine/common/utils/utils');
var $ = require('jquery');
var blocklyDatas = require('../../engine/service/blockly_datas');
module.exports = function(Swift) {

    // 舵机组[]在[]毫秒 旋转角度
    // TODO:要修改
    Swift['movement_servo_change_angle_multi'] = function(block) {
        var text = block.getFieldValue('servoGroup');
        var time = block.getFieldValue('TIME');
        //获取变量的值
        var variables = block.getVars();
        //分隔字符串得到舵机ID和旋转角度（角度可能是变量）
        var servoObj = text.split(',');
        if (time == '' || text.indexOf('#') > -1 ) {
            return '';
        }
        var variableStr = '';
        var variableValueStr = '[';
        var valueStr = '';
        var code = 'changeServos(ms:'+ time+', varCount:' +variables.length+ ', ';
        for (var i = 0 ; i < servoObj.length; i++ ) {
            var temp = servoObj[i].split(':');
            var servoId = temp[0];
            var angleCode = temp[1];  
            if(angleCode == ''){
                angleCode = 0;
            }    
            if ($.inArray(angleCode,variables) >= 0) {
                angleCode = Blockly.Swift.variableDB_.getName(
                   block.getFieldValue('servo'+ servoId), Blockly.Variables.NAME_TYPE);
                variableStr += angleCode+',';
                variableValueStr += '{servoId:'+servoId + ', type:1, angle:""},';
            } else {
                if (!angleCode) {
                    angleCode = '';
                }

                if (!servoId) {
                    return '';
                }

                valueStr += '{servoId:'+servoId + ', type:0, angle:'+ angleCode +'},';
            }      
        }
        if (valueStr == '') {
            variableValueStr = variableValueStr.substring(0, variableValueStr.length-1);
        } else if (variableStr == '') {
            valueStr = valueStr.substring(0, valueStr.length-1);
        } else {
            variableValueStr = variableValueStr.substring(0, variableValueStr.length-1);
            variableValueStr +=',';
            valueStr = valueStr.substring(0, valueStr.length-1);
        }
        variableValueStr +=valueStr
        variableValueStr +=']';
        code +=variableStr;
        code +=variableValueStr;
        code +=')\n';
        return code;
    };

    // 某个舵机在某段时间内旋转角度
    Swift['movement_servo_change_angle_single'] = function(block) {
        var servoId = block.getFieldValue('SERVO_ID');
        var time = block.getFieldValue('TIME');
        var angle = Blockly.Swift.valueToCode(block, 'ANGLE', Blockly.Swift.ORDER_ATOMIC);
        var code = 'changeServo({servo:'+servoId+ ', ms:'+time+'}, angle:'+angle+')\n';
        return code;
    };

    // 旋转360°(轮模式)
     // TODO:要修改
    Swift['movement_servo_rotate_circle'] = function(block) {
        var servoGroup = block.getFieldValue('servoGroup');
        if (servoGroup.indexOf('#') > -1 ) {
            return 'rotateCircle()\n';
        }
        var code = 'rotateCircle('+servoGroup+')\n';
        return code;
    };

    // 控制舵机上电去电（锁住舵机）
    Swift['movement_servo_power_control'] = function(block) {
        var servoGroup = block.getFieldValue('servoGroup');
        if (servoGroup.indexOf('#') > -1 ) {
            return '';
        }
        var JsonServoGroup = JSON.parse(servoGroup);
        //var servos = blocklyDatas.getDataByKey('servos');
        //var arrServos = servos.split('|');
        var servoOff = '';
        var servoOn = '';
        for (var i = 0 ; i< JsonServoGroup.length; i++) {
            var servoId = JsonServoGroup[i].servoId
            if (JsonServoGroup[i].power == 'off') {
                servoOff += servoId+ ',';   
            } else {
                servoOn += servoId+',';
            }                        
        }
        if (servoOn!='') {
            servoOn = '"'+servoOn.substring(0,servoOn.length-1) + '"';
        }
        if (servoOff!='') {
            servoOff = '"'+servoOff.substring(0,servoOff.length-1)+ '"';
        }      
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.05]
        });

        var code = '';
        if (servoOn != '')
        {
            code = ubtUtils.functionString({
		        functionName: 'servoPowerOn',
		        parameters: [servoOn]
		    });

            code = code.substr(0,code.length-2);  // 去掉分号和换行符
            code += "\n";
        }

        if (servoOff != ''){

            code += ubtUtils.functionString({
                functionName: 'servoPowerOff',
                parameters: [servoOff]
            });

            code = code.substr(0,code.length-2);  // 去掉分号和换行符
            code += "\n";
        }

        return code;

    };

    // 读取舵机当前角度值
    Swift['movement_servo_status_read'] = function(block) {
        var servoGroupStr = block.getFieldValue('servoGroup');
        if (servoGroupStr == '') {
            return 'changeServoAngle()\n';
        }
        var servoGroupArr = JSON.parse(servoGroupStr);
        var circleServosArr = blocklyDatas.getCircleServosIds();
        var time = block.getFieldValue('TIME');
        var servoResultArr = [];
        for (var i = 0 ; i < servoGroupArr.length; i++) {
            var objTemp = {};
            var isCircle = false;
            for (var j = 0 ; j < circleServosArr.length; j++) {
                var circleId = circleServosArr[j];
                if (circleId ==  servoGroupArr[i].servo) {
                    isCircle = true;
                    break;
                }
            }
            if (!isCircle) {
                objTemp.servo = servoGroupArr[i].servo;
                objTemp.degree = servoGroupArr[i].degree;
                objTemp.ms =  time;
                servoResultArr.push(objTemp);
            }
            
        }
        console.log(servoResultArr);
        var paramStr = JSON.stringify(servoResultArr);
        var code = 'changeServoAngle('+paramStr+')\n';
        return code;
    };

};
/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * sensors.js version 1.0
 *
 * custom define js generator
 *
 * feature actions block
 * create by hsp 0906
 * 感应
 *
 */
'use strict';
module.exports = function (JavaScript) {
    /*红外传感器*/
    JavaScript['sensor_infrared_sensor_distance'] = function(block) {

        var sensor_id = block.getFieldValue('SENSOR_ID');    
        var code = 'queryInfraredDistance("' + sensor_id + '") ? getInfraredData(): 0';
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
    /*触碰传感器*/
    JavaScript['sensor_touch_sensor_status'] = function(block) {

        var sensor_id = block.getFieldValue('SENSOR_ID');
        var code = 'queryTouchStatus(' + sensor_id + ') ? getTouchData(): 0';
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
    /*陀螺仪*/
    JavaScript['sensor_gyroscope_sensor_angle'] = function(block) {

        var sensor_id = block.getFieldValue('SENSOR_ID');
        var axie = block.getFieldValue('AXIE');
        var code = 'queryGyroscopeAngle("' + sensor_id + '","' + axie + '") ? getGyroscopeData("'+axie+'") : 0';
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
    /*舵机*/
    JavaScript['sensor_servo_angle'] = function(block) {
  
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var code = 'queryServoAngle("' + sensor_id + '") ? getServoData("' + sensor_id + '") : 0';
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
    /*设置陀螺仪角度为0*/
    JavaScript['sensor_set_gyrocope_to_zero'] = function(block) {      
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var code = 'setGyroscopeZero("' + sensor_id + '");\n'; 
        code += 'saveStandard("' + sensor_id + '");\n'
        return code;
    };


};

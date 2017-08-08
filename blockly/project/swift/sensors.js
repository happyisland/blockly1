
'use strict';
module.exports = function (Swift) {
    /*红外传感器*/
    Swift['sensor_infrared_sensor_distance'] = function(block) {

        var sensor_id = block.getFieldValue('SENSOR_ID');    
        var code = 'queryInfraredDistance(ID:' + sensor_id + ')';
        return [code, Blockly.Swift.ORDER_NONE];
    };
    /*触碰传感器*/
    Swift['sensor_touch_sensor_status'] = function(block) {

        var sensor_id = block.getFieldValue('SENSOR_ID');
        var code = 'queryTouchStatus(ID:' + sensor_id + ')';
        return [code, Blockly.Swift.ORDER_NONE];
    };
    /*陀螺仪*/
    Swift['sensor_gyroscope_sensor_angle'] = function(block) {

        var sensor_id = block.getFieldValue('SENSOR_ID');
        var axie = block.getFieldValue('AXIE');
        var code = 'queryGyroscopeAngle(ID:' + sensor_id + ', axie:' + axie + ')';
        return [code, Blockly.Swift.ORDER_NONE];
    };
    /*舵机*/
    Swift['sensor_servo_angle'] = function(block) {
  
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var code = 'queryServoAngle(ID:' + sensor_id + ')';
        return [code, Blockly.Swift.ORDER_NONE];
    };
    /*设置陀螺仪角度为0*/
    Swift['sensor_set_gyrocope_to_zero'] = function(block) {      
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var code = 'setGyroscopeZero(ID:' + sensor_id + ')\n'; 

        return code;
    };


};

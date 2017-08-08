/**
 * Created by ubt on 2016/9/1.
 */

'use strict';
var _= require('lodash');
module.exports = function (Swift) {
    Swift['event_mainboard_power'] = function (block) {
        // TODO: Assemble Swift into code variable.
        var code = 'queryModelLowPowerStatus(true)';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Swift.ORDER_NONE];
    };

    Swift['event_infrared_sensor'] = function (block) {
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var ref_distance = _.trim(block.getFieldValue('DISTANCE'));
       
        var code = 'queryInfraredDistanceStatus(ID:' + sensor_id + ', referValue:' + ref_distance + ')';
      
        return [code, Blockly.Swift.ORDER_NONE];
    };

    Swift['event_touch_sensor'] = function (block) {
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var ref_status = block.getFieldValue('STATUS');
    
        var code = 'queryTouchStatus(ID:' + sensor_id + ', referValue:' + ref_status + ')';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Swift.ORDER_NONE];
    };

    Swift['event_gyroscope'] = function (block) {
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var axie = block.getFieldValue('AXIE');
        var op = block.getFieldValue('OP');
        var ref_angle = _.trim(block.getFieldValue('ANGLE'));
        // TODO: Assemble Swift into code variable.
        var code = 'queryGyroscopeAngleStatus(ID:' + sensor_id + ', axie:' + axie + ', operator:' + op + ', referValue:' + ref_angle + ')';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Swift.ORDER_NONE];
    };

    Swift['event_phone_pad_tilt'] = function (block) {
        var direction = block.getFieldValue('TILT_TYPE');
        // TODO: Assemble Swift into code variable.
        var code = 'queryPhoneTiltStatus(direction:' + direction + ')';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Swift.ORDER_NONE];
    };
};


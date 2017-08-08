/**
 * Created by ubt on 2016/9/1.
 */

'use strict';
var _= require('lodash');
module.exports = function (JavaScript) {
    JavaScript['event_mainboard_power'] = function (block) {
        // TODO: Assemble JavaScript into code variable.
        var code = 'queryModelPowerStatus(true) ? getModelPowerStatus(): 0';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    JavaScript['event_infrared_sensor'] = function (block) {
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var ref_distance = _.trim(block.getFieldValue('DISTANCE'));
        var op = block.getFieldValue('OP');
        var code = 'queryInfraredDistance("' + sensor_id + '") ? getInfraredDataStatus("' + sensor_id + '","' + ref_distance + '","'+op+'"): 0';
      
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    JavaScript['event_touch_sensor'] = function (block) {
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var ref_status = block.getFieldValue('STATUS');
    
        var code = 'queryTouchStatus("' + sensor_id + '") ? getTouchDataStatus("' + sensor_id + '","' + ref_status + '"): 0';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    JavaScript['event_gyroscope'] = function (block) {
        var sensor_id = block.getFieldValue('SENSOR_ID');
        var axie = block.getFieldValue('AXIE');
        var op = block.getFieldValue('OP');
        var ref_angle = _.trim(block.getFieldValue('ANGLE'));
        // TODO: Assemble JavaScript into code variable.
        var code = 'queryGyroscopeAngle("' + sensor_id + '","' + axie + '") ? getGyroscopeDataStatus("' + sensor_id + '","' + axie + '","' + op + '","' + ref_angle + '") : 0';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    JavaScript['event_phone_pad_tilt'] = function (block) {
        var direction = block.getFieldValue('TILT_TYPE');
        // TODO: Assemble JavaScript into code variable.
        var code = 'queryPhoneDirection ("' + direction + '") ? getPhoneTiltStatus("' + direction + '"): 0';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
};


'use strict';
var createFunctionString = require('../../engine/common/utils/create_function_string');
var ubtUtils = require('../../engine/common/utils/utils');
module.exports = function(Swift) {
    Swift['program_start'] = function(block) {
        var code = '//runProgram()\n';
        return code;
    };

    Swift['program_goto_start'] = function(block) {
        var code ='//runProgramAgain()\n';
     	return code;
    };

    Swift['statement_emotion_rgb_all_color_picker'] = function(block) {
        return '';
    };

    Swift['program_goto_condition'] = function(block) {
        var code ='when condition satisfied\n';
        return code;
    };

    Swift['program_goto_phone_condition'] = function(block) {
       var value = block.getFieldValue('VALUE');
       var code ='//when phone turn '+ value +'\n';
        return code;
    };

    Swift['program_goto_touch_condition'] = function(block) {
        var sensorId = block.getFieldValue('SENSOR_ID');
        var status = block.getFieldValue('STATUS');
        var valMap = ["release","click", "db_click", "press_hold"];
        var code ='//when touchSensor'+sensorId+' '+valMap[status]+'\n';
        return code;
    };

    Swift['program_goto_infrared_condition'] = function(block) {
        var sensorId = block.getFieldValue('SENSOR_ID');
        var operqtorValue = block.getField('OP').getText();  
        var distance = block.getFieldValue('DISTANCE'); 
        var code ='//when infraredSensor'+sensorId+' distance between obstacle '+operqtorValue+ distance+'\n';
        return code;
    };

};
/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * start.js version 1.0
 * 
 * custom define js generator
 * 
 * feature start block, goto start block 
 * 
 */
'use strict';
var createFunctionString = require('../../../engine/common/utils/create_function_string');
var ubtUtils = require('../../../engine/common/utils/utils');
module.exports = function(JavaScript) {
    JavaScript['program_start'] = function(block) {
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var code = '';
        code = code + delayCode + ''; 
        return code;
    };

    JavaScript['program_goto_start'] = function(block) {
     
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var code ='';
        code = delayCode + code;
        code += "wwGotoStart();\n";
	    return code;
    };

    JavaScript['program_goto_condition'] = function(block) {
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var code = '';
        code = code + delayCode + ''; 
        return code;
    };

    JavaScript['program_goto_phone_condition'] = function(block) {
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var code = '';
        code = code + delayCode + ''; 
        return code;
    };

    JavaScript['program_goto_touch_condition'] = function(block) {
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var code = '';
        code = code + delayCode + ''; 
        return code;
    };

    JavaScript['program_goto_infrared_condition'] = function(block) {
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var code = '';
        code = code + delayCode + ''; 
        return code;
    };

};
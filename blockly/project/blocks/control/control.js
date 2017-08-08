/*
 * Copyright (c) 2016 UBT Company
 */

/**
 * logix.js version 1.0
 * 
 * custom define js generator
 * 
 * feature start block, goto start block 
 * 
 */
'use strict';
var createFunctionString = require('../../../engine/common/utils/create_function_string');
var ubtUtils = require('../../../engine/common/utils/utils');
module.exports = function (JavaScript) {

    JavaScript['custom_control_if'] = function (block) {

        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });

        var argument = Blockly.JavaScript.valueToCode(block, 'CUSTOM_CONTROL_IF', Blockly.JavaScript.ORDER_ATOMIC)|| 'false';
        var branch = Blockly.JavaScript.statementToCode(block, 'CUSTOM_CONTROL_DO0');

        var code = 'if (' + argument + ') {\n  ' + delayCode  + branch + '}\n';

        return code;
    };

    JavaScript['custom_control_if_else'] = function (block) {

        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });

        var value_custom_control_if = Blockly.JavaScript.valueToCode(block, 'CUSTOM_CONTROL_IF', Blockly.JavaScript.ORDER_ATOMIC)|| 'false';
        var statements_custom_control_do0 = Blockly.JavaScript.statementToCode(block, 'CUSTOM_CONTROL_DO0');
        var statements_custom_control_do1 = Blockly.JavaScript.statementToCode(block, 'CUSTOM_CONTROL_DO1');
        
        var code = 'if (' + value_custom_control_if + ') {\n  ';
        code += delayCode;
        code += statements_custom_control_do0 + '} else {\n  ';
        code += delayCode + statements_custom_control_do1 + '}\n';
        
        return code;
    };

    JavaScript['custom_control_repeat_while_until'] = function (block) {

        var delayCode = ubtUtils.functionString({
            functionName: 'addDelayCommand',
            parameters: [0.1]
        });

        var until = block.getFieldValue('MODE') == 'UNTIL';
        var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
            until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
                Blockly.JavaScript.ORDER_NONE) || 'false';
        var branch = Blockly.JavaScript.statementToCode(block, 'DO');
        branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
        if (until) {
            argument0 = '!' + argument0;
        }
        return 'var LoopTrap = 1000;\nwhile (' + argument0 + ') {\n' + delayCode + branch + '}\n';
    };

    JavaScript['custom_control_while_do'] = function (block) {

        var delayCode = ubtUtils.functionString({
            functionName: 'addDelayCommand',
            parameters: [0.1]
        });

        var until = false;
        var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
            until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
                Blockly.JavaScript.ORDER_NONE) || 'false';
        var branch = Blockly.JavaScript.statementToCode(block, 'DO');
        branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
        if (until) {
            argument0 = '!' + argument0;
        }
        return 'var LoopTrap = 1000;\nwhile (' + argument0 + ') {\n' + delayCode + branch + '}\n';
    };

    JavaScript['custom_control_do_while'] = function (block) {

        var delayCode = ubtUtils.functionString({
            functionName: 'addDelayCommand',
            parameters: [0.1]
        });

        var until = true;
        var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
            until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
                Blockly.JavaScript.ORDER_NONE) || 'false';
        var branch = Blockly.JavaScript.statementToCode(block, 'DO');
        branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
        if (until) {
            argument0 = '!' + argument0;
        }
        return 'var LoopTrap = 1000;\nwhile (' + argument0 + ') {\n' + delayCode + branch + '}\n';
    };

    JavaScript['custom_control_wait_for'] = function (block) {

        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var branch='';
        branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
        var argument = Blockly.JavaScript.valueToCode(block, 'CUSTOM_CONTROL_WAIT_FOR', Blockly.JavaScript.ORDER_ATOMIC) || false;
        
        var code = 'var LoopTrap = 2000;\nwhile (!' + argument + ') {\n  ';
        code += delayCode + branch+ '}\n';

        return code;
    };

    JavaScript['custom_control_repeat_times'] = function (block) {

        var delayCode = ubtUtils.functionString({
            functionName: 'addDelayCommand',
            parameters: [0.05]
        });

        var repeats = Blockly.JavaScript.valueToCode(block, 'CUSTOM_CONTROL_REPEAT_TIMES', Blockly.JavaScript.ORDER_ATOMIC);
        var branch = Blockly.JavaScript.statementToCode(block, 'CUSTOM_CONTROL_DO0');
        //branch = JavaScript.addLoopTrap(branch, block.id);

        var code = '';
        var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
            'count', Blockly.Variables.NAME_TYPE);
        var endVar = repeats;
        if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
            var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
                'repeat_end', Blockly.Variables.NAME_TYPE);
            code += 'var ' + endVar + ' = ' + repeats + ';\n';
        }

        code += 'for (var ' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {\n' + '  '+ delayCode +
        branch + '}\n';
        return code;
    };

    JavaScript['custom_control_wait_seconds'] = function (block) {

        var argument = Blockly.JavaScript.valueToCode(block, 'CUSTOM_CONTROL_WAIT_SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
        var parametersValue = [];
        if (!isNaN(argument)) {
            argument = argument/1000;
            parametersValue.push(argument);
        } else {
            parametersValue.push(argument);
            parametersValue.push(1);
        }   
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: parametersValue
        });

        var code = delayCode;
        
        return code;
    };


   JavaScript['custom_control_break'] = function (block) {
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });
        var code = '';
        code += 'break;\n';
        code = delayCode + code;
        return code;
   };
};
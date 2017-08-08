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
var createFunctionString = require('../../engine/common/utils/create_function_string');
var ubtUtils = require('../../engine/common/utils/utils');
module.exports = function (Swift) {

    Swift['custom_control_if'] = function (block) {

        var argument = Blockly.Swift.valueToCode(block, 'CUSTOM_CONTROL_IF', Blockly.Swift.ORDER_ATOMIC)|| 'false';
        var branch = Blockly.Swift.statementToCode(block, 'CUSTOM_CONTROL_DO0');

        var code = '';
        if (branch) {
            code = 'if ' + argument + ' {\n  ' + branch + '}\n';
        } else {
            code = 'if ' + argument + ' {\n' + branch + '}\n';
        }
       
        return code;
    };

    Swift['custom_control_if_else'] = function (block) {

        var value_custom_control_if = Blockly.Swift.valueToCode(block, 'CUSTOM_CONTROL_IF', Blockly.Swift.ORDER_ATOMIC)|| 'false';
        var statements_custom_control_do0 = Blockly.Swift.statementToCode(block, 'CUSTOM_CONTROL_DO0');
        var statements_custom_control_do1 = Blockly.Swift.statementToCode(block, 'CUSTOM_CONTROL_DO1');
        
        var space_do0 = '';
        if (statements_custom_control_do0 ) {
            space_do0 = '  ';
        }

        var space_do1 = '';
        if (statements_custom_control_do1 ) {
            space_do1 = '  ';
        }

        var code = 'if ' + value_custom_control_if + ' {\n' + space_do0;
        code += statements_custom_control_do0 + '} else {\n' + space_do1;
        code += statements_custom_control_do1 + '}\n';
        
        return code;
    };

    Swift['custom_control_repeat_while_until'] = function (block) {

        var delayCode = ubtUtils.functionString({
            functionName: 'addDelayCommand',
            parameters: [0.1]
        });

        var until = block.getFieldValue('MODE') == 'UNTIL';
        var argument0 = Blockly.Swift.valueToCode(block, 'BOOL',
            until ? Blockly.Swift.ORDER_LOGICAL_NOT :
                Blockly.Swift.ORDER_NONE) || 'false';
        var branch = Blockly.Swift.statementToCode(block, 'DO');
        branch = Blockly.Swift.addLoopTrap(branch, block.id);
        if (until) {
            argument0 = '!' + argument0;
        }
        return 'while ' + argument0 + ' {\n'+ branch + '}\n';
    };

    Swift['custom_control_while_do'] = function (block) {

        var delayCode = ubtUtils.functionString({
            functionName: 'addDelayCommand',
            parameters: [0.1]
        });

        var until = false;
        var argument0 = Blockly.Swift.valueToCode(block, 'BOOL',
            until ? Blockly.Swift.ORDER_LOGICAL_NOT :
                Blockly.Swift.ORDER_NONE) || 'false';
        var branch = Blockly.Swift.statementToCode(block, 'DO');
        branch = Blockly.Swift.addLoopTrap(branch, block.id);
        if (until) {
            argument0 = '!' + argument0;
        }
        return 'while (' + argument0 + ') {\n' + delayCode + branch + '}\n';
    };

    Swift['custom_control_do_while'] = function (block) {

        var delayCode = ubtUtils.functionString({
            functionName: 'addDelayCommand',
            parameters: [0.1]
        });

        var until = true;
        var argument0 = Blockly.Swift.valueToCode(block, 'BOOL',
            until ? Blockly.Swift.ORDER_LOGICAL_NOT :
                Blockly.Swift.ORDER_NONE) || 'false';
        var branch = Blockly.Swift.statementToCode(block, 'DO');
        branch = Blockly.Swift.addLoopTrap(branch, block.id);
        if (until) {
            argument0 = '!' + argument0;
        }
        return 'while (' + argument0 + ') {\n' + delayCode + branch + '}\n';
    };

    Swift['custom_control_wait_for'] = function (block) {

        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
        });

        var argument = Blockly.Swift.valueToCode(block, 'CUSTOM_CONTROL_WAIT_FOR', Blockly.Swift.ORDER_ATOMIC) || false;
        
        var code = 'while !' + argument + ' {\n  ';
        code += '}\n';

        return code;
    };

    Swift['custom_control_repeat_times'] = function (block) {

        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.05]
        });

        var repeats = Blockly.Swift.valueToCode(block, 'CUSTOM_CONTROL_REPEAT_TIMES', Blockly.Swift.ORDER_ATOMIC);
        var branch = Blockly.Swift.statementToCode(block, 'CUSTOM_CONTROL_DO0');
        branch = Swift.addLoopTrap(branch, block.id);
        
        var space = '';
        if (branch){
            space = '  ';
        }


        var code = '';
        var loopVar = Blockly.Swift.variableDB_.getDistinctName(
            'count', Blockly.Variables.NAME_TYPE);
        var endVar = repeats;
        if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
            var endVar = Blockly.Swift.variableDB_.getDistinctName(
                'repeat_end', Blockly.Variables.NAME_TYPE);
            code += 'var ' + endVar + ' = ' + repeats + ';\n';
        }


        code = 'for ' + loopVar + ' in 1...' + repeats + ' {\n' + space;
        code += branch + '}\n';

        return code;
    };

    Swift['custom_control_wait_seconds'] = function (block) {

        var argument = Blockly.Swift.valueToCode(block, 'CUSTOM_CONTROL_WAIT_SECONDS', Blockly.Swift.ORDER_ATOMIC);
        
        var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [argument]
        });

        var code = delayCode;
        code = code.substr(0,code.length-2);  // 去掉分号
        code += "\n";

        return code;
    };
};
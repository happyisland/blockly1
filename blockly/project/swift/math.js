/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 UBTech Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Math blocks for Blockly.
 * @author chao.he@ubtrobot.com (Thinker)
 */
'use strict'
var createFunctionString = require('../../engine/common/utils/create_function_string')
var ubtUtils = require('../../engine/common/utils/utils');
module.exports = function (Swift) {
  Swift['custom_math_num'] = function (block) {
    var code = parseFloat(block.getFieldValue('NUM'))

    return [code, Blockly.Swift.ORDER_ATOMIC]
  }

  Swift['custom_math_variables_get'] = function (block) {

    // console.log('Blockly.Swift.variableDB_'+Blockly.Swift.variableDB_)
    var code = Blockly.Swift.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE)
    return [code, Blockly.Swift.ORDER_ATOMIC]
  }

  Swift['custom_math_variables_set'] = function (block) {
    var argument0 = Blockly.Swift.valueToCode(block, 'VALUE',
        Blockly.Swift.ORDER_ASSIGNMENT) || '0'
    var varName = Blockly.Swift.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  
      var code = varName + ' = ' + argument0 + '\n';
    
    return code;
  }

  Swift['custom_math_constrain'] = function (block) {
    var argument0 = Blockly.Swift.valueToCode(block, 'VALUE',
        Blockly.Swift.ORDER_COMMA) || '0'
    var argument1 = Blockly.Swift.valueToCode(block, 'LOW',
        Blockly.Swift.ORDER_COMMA) || '0'
    var argument2 = Blockly.Swift.valueToCode(block, 'HIGH',
        Blockly.Swift.ORDER_COMMA) || 'Infinity'
    var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')'
    return [code, Blockly.Swift.ORDER_FUNCTION_CALL]
  }

  Swift['custom_math_random_int'] = function (block) {
    var argument0 = Blockly.Swift.valueToCode(block, 'FROM',
        Blockly.Swift.ORDER_COMMA) || '0'
    var argument1 = Blockly.Swift.valueToCode(block, 'TO',
        Blockly.Swift.ORDER_COMMA) || '0'
    var functionName = Blockly.Swift.provideFunction_(
       'mathRandomInt',
       ['func ' + Blockly.Swift.FUNCTION_NAME_PLACEHOLDER_ +
         '(a, b) {',
         '  if a > b {',
         '    // Swap a and b to ensure a is smaller.',
         '    var c = a',
         '    a = b',
         '    b = c',
         '  }',
         '  return Math.floor(Math.random() * (b - a + 1) + a)',
         '}'])
    var code = functionName + '(' + argument0 + ', ' + argument1 + ')'
    //var code = 'mathRandomInt' + '(' + argument0 + ', ' + argument1 + ')'
    return [code, Blockly.Swift.ORDER_FUNCTION_CALL]
  }

  Swift['custom_math_logic_compare'] = function (block) {

    // Comparison operator.
    var OPERATORS = {
      'EQ': '==',
      'NEQ': '!=',
      'LT': '<',
      'LTE': '<=',
      'GT': '>',
      'GTE': '>='
    }
    var operator = OPERATORS[block.getFieldValue('OP')]
    var order = (operator == '==' || operator == '!=') ?
      Blockly.Swift.ORDER_EQUALITY : Blockly.Swift.ORDER_RELATIONAL
    var argument0 = Blockly.Swift.valueToCode(block, 'A', order) || '0'
    var argument1 = Blockly.Swift.valueToCode(block, 'B', order) || '0'
    
    if (!argument0 || argument0 == NaN){
      argument0 = '0';
    }

    if (!argument1 || argument1 == NaN){
      argument1 = '0';
    }
    
    var code = argument0 + ' ' + operator + ' ' + argument1
    return [code, order]
  }

  Swift['custom_math_add_minus'] = function (block) {
    var OPERATORS = {
      'ADD': [' + ', Blockly.Swift.ORDER_ADDITION],
      'MINUS': [' - ', Blockly.Swift.ORDER_SUBTRACTION],
      'MULTIPLY': [' * ', Blockly.Swift.ORDER_MULTIPLICATION],
      'DIVIDE': [' / ', Blockly.Swift.ORDER_DIVISION],
      'POWER': [null, Blockly.Swift.ORDER_COMMA] // Handle power separately.
    }
    var tuple = OPERATORS[block.getFieldValue('OPERATOR')]
    var operator = tuple[0]
    var order = tuple[1]
    var argument0 = Blockly.Swift.valueToCode(block, 'FIRST_EXPRESSION', order) || '0'
    var argument1 = Blockly.Swift.valueToCode(block, 'SECOND_EXPRESSION', order) || '0'
    var code
    // Power in Swift requires a special case since it has no operator.
    if (!operator) {
      code = 'Math.pow(' + argument0 + ', ' + argument1 + ')'
      return [code, Blockly.Swift.ORDER_FUNCTION_CALL]
    }
    code = argument0 + operator + argument1
    return [code, order]
  }

  Swift['custom_math_logic_and'] = function (block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? Blockly.Swift.ORDER_LOGICAL_AND :
      Blockly.Swift.ORDER_LOGICAL_OR;
    var argument0 = Blockly.Swift.valueToCode(block, 'A', order);
    var argument1 = Blockly.Swift.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
      // If there are no arguments, then the return value is false.
      argument0 = 'false';
      argument1 = 'false';
    } else {
      // Single missing arguments have no effect on the return value.
      var defaultArgument = (operator == '&&') ? 'true' : 'false';
      if (!argument0) {
        argument0 = defaultArgument;
      }
      if (!argument1) {
        argument1 = defaultArgument;
      }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  }

  Swift['custom_math_logic_not'] = function (block) {
    var order = Blockly.Swift.ORDER_LOGICAL_NOT
    var argument0 = Blockly.Swift.valueToCode(block, 'CUSTOM_MATH_LOGIC_NOT', order) || 'true'
    var code = '!' + argument0
    return [code, order]
  }

  Swift['custom_math_variable_change'] = function (block) {

    var OPERATORS = {
      'ADD': [' + ', Blockly.Swift.ORDER_ADDITION],
      'MINUS': [' - ', Blockly.Swift.ORDER_SUBTRACTION],
    }
    var tuple = OPERATORS[block.getFieldValue('OP')]
    var dropdown_op = tuple[0]

    var dropdown_var = Blockly.Swift.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var value_value_input = Blockly.Swift.valueToCode(block, 'value_input', Blockly.Swift.ORDER_ATOMIC) || 0;
    
    var code =  dropdown_var + ' = ' + dropdown_var + dropdown_op + value_value_input + ';\n';
    return code;
  }

}

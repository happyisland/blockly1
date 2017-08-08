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
var createFunctionString = require('../../../engine/common/utils/create_function_string')
var ubtUtils = require('../../../engine/common/utils/utils');
module.exports = function (JavaScript) {
  JavaScript['custom_math_num'] = function (block) {
    var code = parseFloat(block.getFieldValue('NUM'))

    return [code, Blockly.JavaScript.ORDER_ATOMIC]
  }

  JavaScript['custom_math_variables_get'] = function (block) {

    // console.log('Blockly.JavaScript.variableDB_'+Blockly.JavaScript.variableDB_)
    var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE)
    return [code, Blockly.JavaScript.ORDER_ATOMIC]
  }

  JavaScript['custom_math_variables_set'] = function (block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0'
    var varName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
      var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.05]
        });
      var code = varName + ' = ' + argument0 + ';\n';
      code = delayCode + code ;
    return code;
  }

  JavaScript['custom_math_constrain'] = function (block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var argument1 = Blockly.JavaScript.valueToCode(block, 'LOW',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var argument2 = Blockly.JavaScript.valueToCode(block, 'HIGH',
        Blockly.JavaScript.ORDER_COMMA) || 'Infinity'
    var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')'
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
  }

  JavaScript['custom_math_random_int'] = function (block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var functionName = Blockly.JavaScript.provideFunction_(
       'mathRandomInt',
       ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
         '(a, b) {',
         '  if (a > b) {',
         '    // Swap a and b to ensure a is smaller.',
         '    var c = a;',
         '    a = b;',
         '    b = c;',
         '  }',
         '  return Math.floor(Math.random() * (b - a + 1) + a);',
         '}'])
    var code = functionName + '(' + argument0 + ', ' + argument1 + ')'
    //var code = 'mathRandomInt' + '(' + argument0 + ', ' + argument1 + ')'
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
  }

  JavaScript['custom_math_logic_compare'] = function (block) {

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
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0'
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0'

    if (!argument0 || argument0 == NaN){
      argument0 = '0';
    }

    if (!argument1 || argument1 == NaN){
      argument1 = '0';
    }

    var code = argument0 + ' ' + operator + ' ' + argument1
    return [code, order]
  }

  JavaScript['custom_math_add_minus'] = function (block) {
    var OPERATORS = {
      'ADD': [' + ', Blockly.JavaScript.ORDER_ADDITION],
      'MINUS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
      'MULTIPLY': [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
      'DIVIDE': [' / ', Blockly.JavaScript.ORDER_DIVISION],
      'POWER': [null, Blockly.JavaScript.ORDER_COMMA] // Handle power separately.
    }
    var tuple = OPERATORS[block.getFieldValue('OPERATOR')]
    var operator = tuple[0]
    var order = tuple[1]
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FIRST_EXPRESSION', order) || '0'
    var argument1 = Blockly.JavaScript.valueToCode(block, 'SECOND_EXPRESSION', order) || '0'
    var code
    // Power in JavaScript requires a special case since it has no operator.
    if (!operator) {
      code = 'Math.pow(' + argument0 + ', ' + argument1 + ')'
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
    }
    code = argument0 + operator + argument1
    return [code, order]
  }

  JavaScript['custom_math_logic_and'] = function (block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
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

  JavaScript['custom_math_logic_not'] = function (block) {
    var order = Blockly.JavaScript.ORDER_LOGICAL_NOT
    var argument0 = Blockly.JavaScript.valueToCode(block, 'CUSTOM_MATH_LOGIC_NOT', order) || 'true'
    var code = '!' + argument0
    return [code, order]
  }

  JavaScript['custom_math_variable_change'] = function (block) {

    var OPERATORS = {
      'ADD': [' + ', Blockly.JavaScript.ORDER_ADDITION],
      'MINUS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
    }
    var tuple = OPERATORS[block.getFieldValue('OP')]
    var dropdown_op = tuple[0]

    var dropdown_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var value_value_input = Blockly.JavaScript.valueToCode(block, 'value_input', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    
    var code =  dropdown_var + ' = ' + dropdown_var + dropdown_op + value_value_input + ';\n';
    return code;
  }

}

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 UBTech Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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
'use strict';
var FieldNumberAdapter = require('../../../engine/adapter/field_number_adapter');
var FieldVariableAdapter = require('../../../engine/adapter/field_variable_adapter');
var NumberValidateFacroty = require('../../../engine/common/validate/number_validate');
var colours = require('../../../engine/service/colours');
module.exports = function (Blocks) {

    Blockly.Blocks.math.HUE = 330;

    Blocks['custom_math_num'] = {
        init: function init() {
            this.appendDummyInput()
                .appendField(new FieldNumberAdapter('1', -100000 ,100000,
                    1,function(value, customType ){
                        value = NumberValidateFacroty.createValidator(customType).validate(value);
                        return parseInt(value);
                        /** 
                        if (customType && (customType == 'id_show_led' || customType == 'id_show_emoji'
                        || customType == 'custom_control_repeat_times' || customType == 'custom_control_wait_seconds')) {
                            
                        } else {
                            if (isNaN(value)) {
                                return 0;
                            }
                            if (value > 9999) {
                                return 9999;
                            } else if (value < -9999) {
                                return -9999;
                            } else {
                                return value;
                            }
                        } 
                        */                     
                    }), 'NUM');
            this.setOutput(true, "Number");
            this.setColour(colours['id_math'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };



    Blocks['custom_math_variables_get'] = {

        init: function init() {
            this.setHelpUrl('');
            this.setColour(colours['id_math'].primary);
            this.appendDummyInput()
                .appendField(new FieldVariableAdapter(
                    Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR');
            this.setOutput(true);
            this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
            this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        },
        contextMenuType_: 'custom_math_variables_set',
        /**
         * Add menu option to create getter/setter block for this setter/getter.
         * @param {!Array} options List of menu options to add to.
         * @this Blockly.Block
         */
        customContextMenu: function (options) {
            var option = { enabled: true };
            var name = this.getFieldValue('VAR');
            option.text = this.contextMenuMsg_.replace('%1', name);
            var xmlField = goog.dom.createDom('field', null, name);
            xmlField.setAttribute('name', 'VAR');
            var xmlBlock = goog.dom.createDom('block', null, xmlField);
            xmlBlock.setAttribute('type', this.contextMenuType_);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
        }
    };

    Blocks['custom_math_variables_set'] = {

        init: function init() {
            /**
            this.jsonInit({
                "message0": Blockly.Msg.VARIABLES_SET,
                "args0": [
                    {
                        "type": "field_variable",
                        "name": "VAR",
                        "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME
                    },
                    {
                        "type": "input_value",
                        "name": "VALUE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": Blockly.Blocks.variables.HUE,
                "tooltip": Blockly.Msg.VARIABLES_SET_TOOLTIP,
                "helpUrl": Blockly.Msg.VARIABLES_SET_HELPURL
            });
             */
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.appendDummyInput("SET").appendField(MSG['id_set']).appendField(new FieldVariableAdapter(
                    Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR');
            this.appendValueInput("VALUE").setCheck('Number').appendField('=');
            this.setColour(colours['id_math'].primary);
            this.setInputsInline("true");
            this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        },
        contextMenuType_: 'custom_math_variables_get',
        customContextMenu: Blocks['custom_math_variables_get'].customContextMenu
    };

    Blocks['custom_math_constrain'] = {

        init: function init() {
            this.jsonInit({
                "message0": Blockly.Msg.MATH_CONSTRAIN_TITLE,
                "args0": [
                    {
                        "type": "input_value",
                        "name": "VALUE",
                        "check": "Number"
                    },
                    {
                        "type": "input_value",
                        "name": "LOW",
                        "check": "Number"
                    },
                    {
                        "type": "input_value",
                        "name": "HIGH",
                        "check": "Number"
                    }
                ],
                "inputsInline": true,
                "output": "Number",
                "colour": 330,
                "tooltip": Blockly.Msg.MATH_CONSTRAIN_TOOLTIP
                
            });
            this.setColour(colours['id_math'].primary);
        }
    };

    Blocks['custom_math_random_int'] = {

        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg.MATH_RANDOM_INT_TITLE,
                "args0": [
                    {
                        "type": "input_value",
                        "name": "FROM",
                        "check": "Number"
                    },
                    {
                        "type": "input_value",
                        "name": "TO",
                        "check": "Number"
                    }
                ],
                "inputsInline": true,
                "output": "Number",
                "colour": Blockly.Blocks.math.HUE,
                "tooltip": Blockly.Msg.MATH_RANDOM_INT_TOOLTIP
                
            });
            this.setColour(colours['id_math'].primary);
        }
    };

    Blocks['custom_math_logic_compare'] = {
        init: function init() {
            var rtlOperators = [
                ['=', 'EQ'],
                ['\u2260', 'NEQ'],
                ['>', 'LT'],
                ['\u2265', 'LTE'],
                ['<', 'GT'],
                ['\u2264', 'GTE']
            ];
            var ltrOperators = [
                ['=', 'EQ'],
                ['\u2260', 'NEQ'],
                ['<', 'LT'],
                ['\u2264', 'LTE'],
                ['>', 'GT'],
                ['\u2265', 'GTE']
            ];
            var OPERATORS = this.RTL ? rtlOperators : ltrOperators;
            this.setHelpUrl('');
            this.setColour(colours['id_math'].primary);
            this.setOutput(true, 'Boolean');
            this.appendValueInput('A');
            this.appendValueInput('B')
                .appendField(new Blockly.FieldDropdownAdapter(OPERATORS), 'OP');
            this.setInputsInline(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var op = thisBlock.getFieldValue('OP');
                var TOOLTIPS = {
                    'EQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                    'NEQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                    'LT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                    'LTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                    'GT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                    'GTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
                };
                return TOOLTIPS[op];
            });
            this.prevBlocks_ = [null, null];
        },
        /**
         * Called whenever anything on the workspace changes.
         * Prevent mismatched types from being compared.
         * @param {!Blockly.Events.Abstract} e Change event.
         * @this Blockly.Block
         */
        onchange: function (e) {
            var blockA = this.getInputTargetBlock('A');
            var blockB = this.getInputTargetBlock('B');
            // Disconnect blocks that existed prior to this change if they don't match.
            if (blockA && blockB &&
                !blockA.outputConnection.checkType_(blockB.outputConnection)) {
                // Mismatch between two inputs.  Disconnect previous and bump it away.
                // Ensure that any disconnections are grouped with the causing event.
                Blockly.Events.setGroup(e.group);
                for (var i = 0; i < this.prevBlocks_.length; i++) {
                    var block = this.prevBlocks_[i];
                    if (block === blockA || block === blockB) {
                        block.unplug();
                        block.bumpNeighbours_();
                    }
                }
                Blockly.Events.setGroup(false);
            }
            this.prevBlocks_[0] = blockA;
            this.prevBlocks_[1] = blockB;
        }
    };

    Blocks['custom_math_add_minus'] = {
        init: function () {
            this.appendValueInput("FIRST_EXPRESSION")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdownAdapter([["+", "ADD"], ["-", "MINUS"], ["x", "MULTIPLY"], ["÷", "DIVIDE"]]), "OPERATOR");
            this.appendValueInput("SECOND_EXPRESSION")
                .setCheck("Number");
            this.setOutput(true, "Number");
            this.setColour(colours['id_math'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blocks['custom_math_logic_and'] = {
        init: function init() {
            var OPERATORS =
                [[Blockly.Msg.LOGIC_OPERATION_AND, 'AND'],
                    [Blockly.Msg.LOGIC_OPERATION_OR, 'OR']];
            this.setHelpUrl('');
            this.setColour(colours['id_math'].primary);
            this.setOutput(true, 'Boolean');
            this.appendValueInput('A')
                .setCheck('Boolean');
            this.appendValueInput('B')
                .setCheck('Boolean')
                .appendField(new Blockly.FieldDropdownAdapter(OPERATORS), 'OP');
            this.setInputsInline(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var op = thisBlock.getFieldValue('OP');
                var TOOLTIPS = {
                    'AND': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
                    'OR': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
                };
                return TOOLTIPS[op];
            });
        }
    };

    Blocks['custom_math_logic_not'] = {
        init: function init() {
            this.appendValueInput("CUSTOM_MATH_LOGIC_NOT")
                .setCheck("Boolean")
                .appendField(MSG['id_math_not']);
            this.appendDummyInput();
            this.setOutput(true, "Boolean");
            this.setColour(colours['id_math'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blocks['custom_math_variable_change'] = {
        init: function init() {
            this.appendValueInput("value_input")
                .setCheck("Number")
                .appendField(new Blockly.FieldVariableAdapter(Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
                .appendField(new Blockly.FieldDropdownAdapter([["+", "ADD"], ["-", "MINUS"]]), "OP");
            this.appendDummyInput();
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(colours['id_math'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
            this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        },
        contextMenuType_: 'variables_set',
  
        customContextMenu: function (options) {
            var option = { enabled: true };
            var name = this.getFieldValue('VAR');
            option.text = this.contextMenuMsg_.replace('%1', name);
            var xmlField = goog.dom.createDom('field', null, name);
            xmlField.setAttribute('name', 'VAR');
            var xmlBlock = goog.dom.createDom('block', null, xmlField);
            xmlBlock.setAttribute('type', this.contextMenuType_);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
        }
    };

}
/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * logix.jsx version 1.0
 * 
 * block custom define
 * 
 * feature start block, goto start block
 * 
 */
'use strict';
var colours = require('../../../engine/service/colours');
module.exports = function (Blocks) {

    Blocks['custom_control_if'] = {
        init: function init() {
            this.setPreviousStatement(true);
            this.appendValueInput("CUSTOM_CONTROL_IF")
                .setCheck('Boolean')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
            this.appendStatementInput("CUSTOM_CONTROL_DO0")
                .setCheck(null)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
            this.setNextStatement(true, null);
            this.setColour(colours['id_control'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blocks['custom_control_if_else'] = {
        init: function init() {
            this.appendValueInput("CUSTOM_CONTROL_IF")
                .setCheck('Boolean')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
            this.appendStatementInput("CUSTOM_CONTROL_DO0")
                .setCheck(null);
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
            this.appendStatementInput("CUSTOM_CONTROL_DO1")
                .setCheck(null)
                .setAlign(Blockly.ALIGN_CENTRE);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(colours['id_control'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blocks['custom_control_repeat_while_until'] = {
        init: function init() {
            var OPERATORS =
                [[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
                    [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];
            this.setHelpUrl('');
            this.setColour(colours['id_control'].primary);
            this.appendValueInput('BOOL')
                .setCheck('Boolean')
                .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
            this.appendStatementInput('DO')
                .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var op = thisBlock.getFieldValue('MODE');
                var TOOLTIPS = {
                    'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                    'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
                };
                return TOOLTIPS[op];
            });
        }
    };

    Blocks['custom_control_while_do'] = {
        init: function init() {
            this.setHelpUrl('');
            this.setColour(colours['id_control'].primary);
            this.appendValueInput('BOOL')
                .setCheck('Boolean')
                .appendField(MSG['id_while']);
            //this.appendDummyInput().appendField('条件满足');
            this.appendStatementInput('DO')
                .appendField(MSG['id_repeat']);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip('');
        }
    };

    Blocks['custom_control_do_while'] = {
        init: function init() {
            this.setHelpUrl('');
            this.setColour(colours['id_control'].primary);
            this.appendStatementInput('DO')
                .appendField(MSG['id_repeat']);
            this.appendValueInput('BOOL')
                .setCheck('Boolean')
                .appendField(MSG['id_until']);
            //this.appendDummyInput().appendField('条件满足执行结束');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip('');
        }
    };

    Blocks['custom_control_wait_for'] = {
        init: function init() {
            this.appendValueInput("CUSTOM_CONTROL_WAIT_FOR")
                .setCheck('Boolean')
                .appendField(MSG['id_control_wait_for']);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(colours['id_control'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blocks['custom_control_repeat_times'] = {
        init: function init() {
            this.appendValueInput("CUSTOM_CONTROL_REPEAT_TIMES")
                .setCheck("Number")
                .appendField(MSG['id_control_repeat']);
            this.appendDummyInput()
                .appendField(MSG['id_control_repeat_times']);
            this.appendStatementInput("CUSTOM_CONTROL_DO0")
                .setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(colours['id_control'].primary);
            this.setTooltip('');
            this.setHelpUrl(''); 
        }
    };

    Blocks['custom_control_wait_seconds'] = {
        init: function init() {
            this.appendValueInput("CUSTOM_CONTROL_WAIT_SECONDS")
                .setCheck("Number")
                .appendField(MSG['id_control_wait']);
            this.appendDummyInput()
                .appendField(MSG['id_control_seconds']);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(colours['id_control'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blocks['custom_control_break'] = {
        init: function init() {
            this.appendDummyInput("CUSTOM_CONTROL_BREAK")
                .appendField(MSG['id_control_break']);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(colours['id_control'].primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

}
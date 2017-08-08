/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.movements');

goog.require('Blockly.Blocks');


// 自定义块
// 设置舵机状态
Blockly.Blocks['set_servo_status'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "RUN_LIGHT")
        .appendField("Set servo ")
        .appendField(new Blockly.FieldDropdown([["servo1", "SERVO1"], ["servo2", "SERVO2"], ["servo3", "SERVO3"]]), "SERVO")
        .appendField("Rotate angle")
        .appendField(new Blockly.FieldAngle(90), "ANGLE")
        .appendField("in")
        .appendField(new Blockly.FieldNumber(0, 0, 2000, 1), "SPEED")
        .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


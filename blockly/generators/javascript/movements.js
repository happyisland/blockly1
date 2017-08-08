/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.movements');

goog.require('Blockly.JavaScript');





// 自定义块代码
// 设置舵机状态
Blockly.JavaScript['set_servo_status'] = function(block) {
  var checkbox_run_light = block.getFieldValue('RUN_LIGHT') == 'TRUE';
  var dropdown_servo = block.getFieldValue('SERVO');
  var angle_angle = block.getFieldValue('ANGLE');
  var number_speed = block.getFieldValue('SPEED');
  // TODO: Assemble JavaScript into code variable.
  var code = 'setServoStatus();\n';
  return code;
};
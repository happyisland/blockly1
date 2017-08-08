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
  JavaScript['id_show_play_effects'] = function (block) {
    var text_effect = block.getFieldValue('Effect');
    console.log(text_effect);
    var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
    });
    var code = 'playEffect(\''+text_effect+'\');\n';
    code = code + delayCode + '\n';
    return code; 
  };

    JavaScript['id_show_play_tune'] = function(block) { 
      var text_tune = block.getFieldValue('Tune');
      // TODO: Assemble JavaScript into code variable.
      
      var delayCode = ubtUtils.functionString({
          functionName: 'addDelayCommand',
          parameters: [0.1]
      });
      var code = 'playTune(\''+text_tune+'\');\n';
      code = code + delayCode + '\n';
      return code;
    };

    JavaScript['id_show_emoji'] = function (block) {
      var text_emotion = block.getFieldValue('Emotion');
      console.log("我是shwo/show.js 打印出来的----》");
      console.log(text_emotion);
      var value_value_input = Blockly.JavaScript.valueToCode(block, 'value_input', Blockly.JavaScript.ORDER_ATOMIC);
      console.log(value_value_input);
      var json_emotion = JSON.parse(text_emotion);
      text_emotion = JSON.stringify(json_emotion.lightArray);
      if (!isNaN(value_value_input)) {
          var code = 'setEmoji(\''+text_emotion+'\',\''+value_value_input +'\');\n';
      } else {
          var code = 'setEmoji(\''+text_emotion+'\','+value_value_input +');\n';
      }
      
      return code;
    };

    JavaScript['id_show_led'] = function (block) {
      var text_light = block.getFieldValue('Light');
      console.log("我是shwo/show.js打印出来的----》");
      console.log(text_light);
      var json_light = JSON.parse(text_light);
      text_light = JSON.stringify(json_light.lightArray);
      var value_name = Blockly.JavaScript.valueToCode(block, 'value_input', Blockly.JavaScript.ORDER_ATOMIC);
      // TODO: Assemble JavaScript into code variable.
      var code = '';
      if (!isNaN(value_name)) {
          code = 'setLEDs(\''+text_light+'\',\''+value_name+'\');\n';
      } else {
          code = 'setLEDs(\''+text_light+'\','+value_name+');\n';
      }
      
      return code;
    };
    JavaScript['id_show_scenelight'] = function (block) {
      var text_emotion = block.getFieldValue('Emotion');
      console.log("我是shwo/show.js打印出来的----》");
      console.log(text_emotion);
      var value_value_input = Blockly.JavaScript.valueToCode(block, 'value_input', Blockly.JavaScript.ORDER_ATOMIC);
      console.log(value_value_input);
      var json_emotion = JSON.parse(text_emotion);
      text_emotion = JSON.stringify(json_emotion.lightArray);
      if (!isNaN(value_value_input)) {
          var code = 'setEmoji(\''+text_emotion+'\',\''+value_value_input +'\');\n';
      } else {
          var code = 'setEmoji(\''+text_emotion+'\','+value_value_input +');\n';
      }
      
      return code;
    };

};
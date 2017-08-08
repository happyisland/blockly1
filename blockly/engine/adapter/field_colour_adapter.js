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
 * @fileoverview Colour input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldColourAdapter');

goog.require('Blockly.Field');

var OpenDialog = require('../index/popup_dialog.jsx');
var React = require('react');
var ReactDOM =  require('react-dom');
var blocklyDatas = require('../../engine/service/blockly_datas');
var ServoAngleComponent = require('../../engine/test/set_servo_angle.jsx');
var RotateServoComponent = require('../../engine/test/rotate_servo.jsx');
var $ = require('jquery');
var FieldVariableAdapter  = require('./field_variable_adapter');
var eventsListener = require('../common/events_listener');
var RobatCommand = require('../service/robat_command');
var BlockInfoDialog = require('./../test/block_info_dialog.jsx');
//保存动作
var SaveActionComponent = require('../../engine/test/save_action.jsx');
var popupShow = require('../common/dialog/popup_show');



/**
 * Class for a colour input field.
 * @param {string} colour The initial colour in '#rrggbb' format.
 * @param {Function=} opt_validator A function that is executed when a new
 *     colour is selected.  Its sole argument is the new colour value.  Its
 *     return value becomes the selected colour, unless it is undefined, in
 *     which case the new colour stands, or it is null, in which case the change
 *     is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldColourAdapter = function(colour, opt_validator) {
  Blockly.FieldColourAdapter.superClass_.constructor.call(this, colour, opt_validator);
  this.setText(Blockly.Field.NBSP + Blockly.Field.NBSP + Blockly.Field.NBSP);
};
goog.inherits(Blockly.FieldColourAdapter, Blockly.Field);

/**
 * By default use the global constants for colours.
 * @type {Array.<string>}
 * @private
 */
Blockly.FieldColourAdapter.prototype.colours_ = null;

/**
 * By default use the global constants for columns.
 * @type {number}
 * @private
 */
Blockly.FieldColourAdapter.prototype.columns_ = 0;

/**
 * Install this field on a block.
 */
Blockly.FieldColourAdapter.prototype.init = function() {
  Blockly.FieldColourAdapter.superClass_.init.call(this);
  this.borderRect_.style['fillOpacity'] = 1;
  this.setValue(this.getValue());
};

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldColourAdapter.prototype.CURSOR = 'default';

/**
 * Close the colour picker if this input is being deleted.
 */
Blockly.FieldColourAdapter.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldColourAdapter.superClass_.dispose.call(this);
};

/**
 * Return the current colour.
 * @return {string} Current colour in '#rrggbb' format.
 */
Blockly.FieldColourAdapter.prototype.getValue = function() {
  return this.colour_;
};

/**
 * Set the colour.
 * @param {string} colour The new colour in '#rrggbb' format.
 */
Blockly.FieldColourAdapter.prototype.setValue = function(colour) {
  if (this.sourceBlock_ && Blockly.Events.isEnabled() &&
      this.colour_ != colour) {
    Blockly.Events.fire(new Blockly.Events.Change(
        this.sourceBlock_, 'field', this.name, this.colour_, colour));
  }
  this.colour_ = colour;
  /*if (this.borderRect_) {
    this.borderRect_.style.fill = colour;
  }*/
};

/**
 * Get the text from this field.  Used when the block is collapsed.
 * @return {string} Current text.
 */
Blockly.FieldColourAdapter.prototype.getText = function() {
  var colour = this.colour_;
  // Try to use #rgb format if possible, rather than #rrggbb.
  var m = colour.match(/^#(.)\1(.)\2(.)\3$/);
  if (m) {
    colour = '#' + m[1] + m[2] + m[3];
  }
  return colour;
};

Blockly.FieldColourAdapter.prototype.getTextSpacial = function() {
  return this.text_;
};


/**
 * Number of columns in the palette.
 */
Blockly.FieldColourAdapter.COLUMNS = 7;

/**
 * Set a custom colour grid for this field.
 * @param {Array.<string>} colours Array of colours for this block,
 *     or null to use default (Blockly.FieldColourAdapter.COLOURS).
 * @return {!Blockly.FieldColourAdapter} Returns itself (for method chaining).
 */
Blockly.FieldColourAdapter.prototype.setColours = function(colours) {
  this.colours_ = colours;
  return this;
};

/**
 * Set a custom grid size for this field.
 * @param {number} columns Number of columns for this block,
 *     or 0 to use default (Blockly.FieldColourAdapter.COLUMNS).
 * @return {!Blockly.FieldColourAdapter} Returns itself (for method chaining).
 */
Blockly.FieldColourAdapter.prototype.setColumns = function(columns) {
  this.columns_ = columns;
  return this;
};

/**
 * Create a palette under the colour field.
 * @private
 */
Blockly.FieldColourAdapter.prototype.showEditor_ = function() {
  var thisField = this;
  var callback = function(index) {
      if (thisField.validator_) {
          thisField.validator_(index);
      }
      eventsListener.trigger('canvas changed');
  };
  var block = this.sourceBlock_;
  //如果当前的块不可用
  if (block.disabled && !!angular) {
    var dom = angular.element($("#bodyContent")).scope();
    dom.systemHintShow(MSG['servo_mode_error'],'error');
  }
  var arrMultiServoToPopup = block.popupService();
  if (!!angular) {
    var dom = angular.element($("#bodyContent")).scope();
    if (block['popupKey'] === 'postureLink') {
        var dom = angular.element($("#bodyContent")).scope();
        dom.indexBus('blueConnect');
        return;
    }
  }
  
  var updateFieldValues = function() {
      ReactDOM.unmountComponentAtNode(document.getElementById("infoShower"));
      $('#infoShower').empty();
  };
  //获取轮模式的舵机的数目
  var circleServos = blocklyDatas.getCircleServosIds();
  //获取普通模式舵机的数目
  var commonServos = blocklyDatas.getServoIds();
  var modelType = blocklyDatas.getDataByKey('modelType');
  //只有自己建立的模型才可以切换舵机模式
  if (modelType != '0') {
      if ((circleServos.length == 1 && circleServos[0] =='ID' 
        && block['popupKey'] == 'rotateServo') || (commonServos.length == 1 && commonServos[0] =='ID'
        && block['popupKey'] == 'servoAngle')) {
        if (block['popupKey'] == 'rotateServo') {
          var showInfo = MSG['no_circle_servo_info'];
        } else {
          showInfo = MSG['no_common_servo_info'];
        }
        ReactDOM.render(
          React.createElement(BlockInfoDialog, 
            {
              onSuccess:  updateFieldValues, 
              showInfo: showInfo 
            }
          ), document.getElementById("infoShower")
        );
        return;
    }
  }
  
  if (!!angular) {
    dom.popupShow(block['popupKey'],arrMultiServoToPopup,callback);
  } else {
    if (!popupShow.isShowAlert(block['popupKey'], arrMultiServoToPopup)) {
        return;
    }
    var removeComponent = function() {
      ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
      $("#business_container").empty();
    };
    var servoAnglePopfunc =function() {
      ReactDOM.render(
        React.createElement(ServoAngleComponent,
          {
            onRemove:removeComponent,
            arrMultiServoToPopup:arrMultiServoToPopup,
            callback:callback
          }
        ), document.getElementById("business_container")
      );
    };
    
    var rotateServoPopfunc =function() {
      ReactDOM.render(
        React.createElement(RotateServoComponent,
          {
            onRemove:removeComponent,
            arrMultiServoToPopup:arrMultiServoToPopup,
            callback:callback
          }
        ), document.getElementById("business_container")
      );

    };
    //保存动作
    var saveActionPopfunc = function(){
        ReactDOM.render(
            React.createElement(SaveActionComponent,
                {
                    onRemove:removeComponent,
                    arrMultiServoToPopup:arrMultiServoToPopup,
                    callback:callback
                }
            ), document.getElementById("business_container")
        );
    };

    var popupObj = {
      'servoAngle': servoAnglePopfunc,
      'rotateServo': rotateServoPopfunc,
      'postureNamed':saveActionPopfunc
    };
    popupObj[block['popupKey']]();
  }
   
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldColourAdapter;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldColourAdapter; });
} else {
    this.FieldColourAdapter = Blockly.FieldColourAdapter;
}

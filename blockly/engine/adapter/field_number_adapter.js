/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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
 * @fileoverview Field for numbers. Includes validator and numpad on touch.
 * @author tmickel@mit.edu (Tim Mickel)
 */
'use strict';

goog.provide('Blockly.FieldNumberAdapter');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.FieldTextInput');
goog.require('goog.math');
goog.require('goog.userAgent');
var colours = require('../service/colours');


/**
 * Return an appropriate restrictor, depending on whether this FieldNumber
 * allows decimal or negative numbers.
 * @param {boolean} decimalAllowed Whether number may have decimal/float component.
 * @param {boolean} negativeAllowed Whether number may be negative.
 * @return {!RegExp} Regular expression for this FieldNumber's restrictor.
 */
var getNumRestrictor = function(decimalAllowed, negativeAllowed) {
  var pattern = "[\\d]"; // Always allow digits.
  if (decimalAllowed) {
    pattern += "|[\\.]";
  }
  if (negativeAllowed) {
    pattern += "|[-]";
  }
  return new RegExp(pattern);
};

/**
 * Class for an editable number field.
 * In scratch-blocks, the min/max/precision properties are only used
 * to construct a restrictor on typable characters, and to inform the pop-up numpad on touch devices.
 * These properties are included here (i.e. instead of just accepting a decimalAllowed, negativeAllowed)
 * to maintain API compatibility with Blockly and Blockly for Android.
 * @param {string} value The initial value of the field.
 * @param {number=} opt_min Minimum number allowed.
 * @param {number=} opt_max Maximum number allowed.
 * @param {number=} opt_precision Step allowed between numbers
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldNumberAdapter = function(value, opt_min, opt_max, opt_precision, opt_validator) {
  this.decimalAllowed_ = (typeof opt_precision == 'undefined') || isNaN(opt_precision) ||
    (opt_precision == 0) ||
    (Math.floor(opt_precision) != opt_precision);
  this.negativeAllowed_ = (typeof opt_min == 'undefined') || isNaN(opt_min) || opt_min < 0;
  var numRestrictor = getNumRestrictor(this.decimalAllowed_, this.negativeAllowed_);
  Blockly.FieldNumberAdapter.superClass_.constructor.call(this, value, opt_validator, numRestrictor);
  Blockly.FieldNumberAdapter.superClass_.setRestrictor(numRestrictor);
};
goog.inherits(Blockly.FieldNumberAdapter, Blockly.FieldTextInput);

/**
 * Fixed width of the num-pad drop-down, in px.
 * @type {number}
 * @const
 */
Blockly.FieldNumberAdapter.DROPDOWN_WIDTH = 168;
// Blockly.FieldNumberAdapter.DROPDOWN_WIDTH_PHONE = 108;

Blockly.FieldNumberAdapter.GRID_UNIT = 2;

Blockly.FieldNumberAdapter.FIELD_Y_OFFSET = -12 * Blockly.FieldNumberAdapter.GRID_UNIT;

Blockly.FieldNumberAdapter.MIN_BLOCK_Y = 12 * Blockly.FieldNumberAdapter.GRID_UNIT;

/**
 * Extra padding to add between the block and the num-pad drop-down, in px.
 * @type {number}
 * @const
 */
Blockly.FieldNumberAdapter.DROPDOWN_Y_PADDING = -15;

/**
 * Buttons for the num-pad, in order from the top left.
 * Values are strings of the number or symbol will be added to the field text
 * when the button is pressed.
 * @type {Array.<string>}
 * @const
 */
 // Calculator order
Blockly.FieldNumberAdapter.NUMPAD_BUTTONS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'];

Blockly.FieldNumberAdapter.NUMPAD_BUTTONS_NAGATIVE = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0'];

/**
 * Src for the delete icon to be shown on the num-pad.
 * @type {string}
 * @const
 */
Blockly.FieldNumberAdapter.NUMPAD_DELETE_ICON = 'data:image/svg+xml;utf8,' +
  '<svg ' +
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">' +
  '<path d="M28.89,11.45H16.79a2.86,2.86,0,0,0-2,.84L9.09,1' +
  '8a2.85,2.85,0,0,0,0,4l5.69,5.69a2.86,2.86,0,0,0,2,.84h12' +
  '.1a2.86,2.86,0,0,0,2.86-2.86V14.31A2.86,2.86,0,0,0,28.89' +
  ',11.45ZM27.15,22.73a1,1,0,0,1,0,1.41,1,1,0,0,1-.71.3,1,1' +
  ',0,0,1-.71-0.3L23,21.41l-2.73,2.73a1,1,0,0,1-1.41,0,1,1,' +
  '0,0,1,0-1.41L21.59,20l-2.73-2.73a1,1,0,0,1,0-1.41,1,1,0,' +
  '0,1,1.41,0L23,18.59l2.73-2.73a1,1,0,1,1,1.42,1.41L24.42,20Z"/></svg>';

/**
 * Currently active field during an edit.
 * Used to give a reference to the num-pad button callbacks.
 * @type {?FieldNumberAdapter}
 * @private
 */
Blockly.FieldNumberAdapter.activeField_ = null;

/**
 * Set the constraints for this field.
 * @param {number=} opt_min Minimum number allowed.
 * @param {number=} opt_max Maximum number allowed.
 * @param {number=} opt_precision Step allowed between numbers
 */
Blockly.FieldNumberAdapter.prototype.setConstraints_ = function(opt_min, opt_max, opt_precision) {
  this.decimalAllowed_ = (typeof opt_precision == 'undefined') || isNaN(opt_precision) ||
    (opt_precision == 0) ||
    (Math.floor(opt_precision) != opt_precision);
  this.negativeAllowed_ = (typeof opt_min == 'undefined') || isNaN(opt_min) || opt_min < 0;
};

/**
 * Show the inline free-text editor on top of the text and the num-pad if appropriate.
 * @private
 */
Blockly.FieldNumberAdapter.prototype.showEditor_ = function() {
  //如果块存在于flyout中，则不弹出数字键盘
  if (this.sourceBlock_ && this.sourceBlock_.parentBlock_
   && this.sourceBlock_.parentBlock_.flyoutRect_) {
    return;
  }
  Blockly.FieldNumberAdapter.activeField_ = this;
  // Do not focus on mobile devices so we can show the num-pad
  var showNumPad =
      goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD;
  Blockly.FieldNumberAdapter.superClass_.showEditor_.call(this, true, showNumPad);
  // Show a numeric keypad in the drop-down on touch
  if (showNumPad) {
    this.showNumPad_();
  }
};

Blockly.FieldNumberAdapter.prototype.showNumPad_ = function() {
  // If there is an existing drop-down someone else owns, hide it immediately and clear it.
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();

  var contentDiv = Blockly.DropDownDiv.getContentDiv();
  contentDiv.className = "blocklyDropDownContent numberKey";
  // Accessibility properties
  contentDiv.setAttribute('role', 'menu');
  contentDiv.setAttribute('aria-haspopup', 'true');

  // Add numeric keypad buttons
  var buttons;
  if (this.negativeAllowed_) {
       buttons = Blockly.FieldNumberAdapter.NUMPAD_BUTTONS_NAGATIVE;
  } else {
       buttons = Blockly.FieldNumberAdapter.NUMPAD_BUTTONS;
  }
  
  for (var i = 0, buttonText; buttonText = buttons[i]; i++) {
    var button = document.createElement('button');
    button.setAttribute('role', 'menuitem');
    if (window.screen.availHeight >= 600) {
        button.setAttribute('class', 'blocklyNumPadButton');
    } else {
        button.setAttribute('class', 'blocklyNumPadButton_phone');
    }
    
    button.title = buttonText;
    button.innerHTML = buttonText;
    Blockly.bindEvent_(button, 'mousedown', button,
	  Blockly.FieldNumberAdapter.numPadButtonTouch_);
    if (buttonText == '.' && !this.decimalAllowed_) {
      // Don't show the decimal point for inputs that must be round numbers
      button.setAttribute('style', 'visibility: hidden');
    }
    contentDiv.appendChild(button);
  }
  // Add erase button to the end
  var eraseButton = document.createElement('button');
  eraseButton.setAttribute('role', 'menuitem');
  if  (window.screen.availHeight >= 600) {
      eraseButton.setAttribute('class', 'blocklyNumPadButton');
  } else {
      eraseButton.setAttribute('class', 'blocklyNumPadButton_phone');
  }
   
  eraseButton.title = 'Delete';
  var eraseImage = document.createElement('img');
  eraseImage.src = Blockly.FieldNumberAdapter.NUMPAD_DELETE_ICON;
  eraseButton.appendChild(eraseImage);
  Blockly.bindEvent_(eraseButton, 'mousedown', null,
      Blockly.FieldNumberAdapter.numPadEraseButtonTouch_);
  contentDiv.appendChild(eraseButton);

  // Set colour and size of drop-down
  Blockly.DropDownDiv.setColour(Blockly.Colours.numPadBackground, colours.numPadBorder);
  if (window.screen.availHeight >= 600) {
    contentDiv.style.width = Blockly.FieldNumberAdapter.DROPDOWN_WIDTH + 'px';
  } else {
    //contentDiv.style.width = Blockly.FieldNumberAdapter.DROPDOWN_WIDTH_PHONE + 'px';  
    // contentDiv.style.width = Blockly.FieldNumberAdapter.DROPDOWN_WIDTH_PHONE + 'px';
  }
  

  // Calculate positioning for the drop-down
  // sourceBlock_ is the rendered shadow field input box
  var scale = this.sourceBlock_.workspace.scale;
  //var bBox = this.sourceBlock_.getHeightWidth();
  var bBox= this.getSize();
  var bWidth = bBox.width *scale;
  var bHeight = bBox.height *scale;
  //bBox.width *= scale;
  //bBox.height *= scale;
  var position = this.getAbsoluteXY_();
  // If we can fit it, render below the shadow block
  var primaryX = position.x + bWidth / 2;
  var primaryY = position.y + bHeight + Blockly.FieldNumberAdapter.DROPDOWN_Y_PADDING;
  // If we can't fit it, render above the entire parent block
  var secondaryX = primaryX;
  var secondaryY = position.y - (Blockly.FieldNumberAdapter.MIN_BLOCK_Y * scale) - (Blockly.FieldNumberAdapter.FIELD_Y_OFFSET * scale);

  Blockly.DropDownDiv.setBoundsElement(this.sourceBlock_.workspace.getParentSvg().parentNode);
  Blockly.DropDownDiv.show(this, primaryX, primaryY, secondaryX, secondaryY, this.onHide_.bind(this));
};

/**
 * Call for when a num-pad button is touched.
 * Determine what the user is inputting, and update the text field appropriately.
 */
Blockly.FieldNumberAdapter.numPadButtonTouch_ = function() {
  // String of the button (e.g., '7')
  var spliceValue = this.innerHTML;
  // Old value of the text field
  var oldValue = Blockly.FieldTextInput.htmlInput_.value;
  // Determine the selected portion of the text field
  var selectionStart = Blockly.FieldTextInput.htmlInput_.selectionStart;
  var selectionEnd = Blockly.FieldTextInput.htmlInput_.selectionEnd;
  // Splice in the new value
  var newValue = oldValue.slice(0, selectionStart) + spliceValue + oldValue.slice(selectionEnd);
  // Updates the display. The actual setValue occurs when the field is stopped editing.
  Blockly.FieldTextInput.htmlInput_.value = newValue;
  // Resize and scroll the text field appropriately
  Blockly.FieldNumberAdapter.superClass_.resizeEditor_.call(Blockly.FieldNumberAdapter.activeField_);
  Blockly.FieldTextInput.htmlInput_.setSelectionRange(newValue.length, newValue.length);
  Blockly.FieldTextInput.htmlInput_.scrollLeft = Blockly.FieldTextInput.htmlInput_.scrollWidth;
  Blockly.FieldNumberAdapter.activeField_.validate_();
};

/**
 * Call for when the num-pad erase button is touched.
 * Determine what the user is asking to erase, and erase it.
 */
Blockly.FieldNumberAdapter.numPadEraseButtonTouch_ = function() {
  // Old value of the text field
  var oldValue = Blockly.FieldTextInput.htmlInput_.value;
  // Determine what is selected to erase (if anything)
  var selectionStart = Blockly.FieldTextInput.htmlInput_.selectionStart;
  var selectionEnd = Blockly.FieldTextInput.htmlInput_.selectionEnd;
  // Cut out anything that was previously selected
  var newValue = oldValue.slice(0, selectionStart) + oldValue.slice(selectionEnd);
  if (selectionEnd - selectionStart == 0) { // Length of selection == 0
    // Delete the last character if nothing was selected
    newValue = oldValue.slice(0, selectionStart - 1) + oldValue.slice(selectionStart);
  }
  // Update the display to show erased value.
  Blockly.FieldTextInput.htmlInput_.value = newValue;
  // Resize and scroll the text field appropriately
  Blockly.FieldNumberAdapter.superClass_.resizeEditor_.call(Blockly.FieldNumberAdapter.activeField_);
  Blockly.FieldTextInput.htmlInput_.setSelectionRange(newValue.length, newValue.length);
  Blockly.FieldTextInput.htmlInput_.scrollLeft = Blockly.FieldTextInput.htmlInput_.scrollWidth;
  Blockly.FieldNumberAdapter.activeField_.validate_();
};

/**
 * Callback for when the drop-down is hidden.
 */
Blockly.FieldNumberAdapter.prototype.onHide_ = function() {
  // Clear accessibility properties
  Blockly.DropDownDiv.content_.removeAttribute('role');
  Blockly.DropDownDiv.content_.removeAttribute('aria-haspopup');
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldNumberAdapter;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldNumberAdapter; });
} else {
    this.FieldNumberAdapter = Blockly.FieldNumberAdapter;
}

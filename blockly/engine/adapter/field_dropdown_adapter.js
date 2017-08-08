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
 * @fileoverview Dropdown input field.  Used for editable titles and variables.
 * In the interests of a consistent UI, the toolbox shares some functions and
 * properties with the context menu.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldDropdownAdapter');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuItem');
goog.require('goog.userAgent');


/**
 * Class for an editable dropdown field.
 * @param {(!Array.<!Array.<string>>|!Function)} menuGenerator An array of
 *     options for a dropdown list, or a function which generates these options.
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected, with the newly selected value as its sole argument.
 *     If it returns a value, that value (which must be one of the options) will
 *     become selected in place of the newly selected option, unless the return
 *     value is null, in which case the change is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldDropdownAdapter = function(menuGenerator, opt_validator) {
    this.menuGenerator_ = menuGenerator;
    console.log("***********************"+this.menuGenerator_);
    this.trimOptions_();
    var firstTuple = this.getOptions_()[0];

    // Call parent's constructor.
    Blockly.FieldDropdownAdapter.superClass_.constructor.call(this, firstTuple[1],
        opt_validator);
};
goog.inherits(Blockly.FieldDropdownAdapter, Blockly.Field);

/**
 * Horizontal distance that a checkmark ovehangs the dropdown.
 */
Blockly.FieldDropdownAdapter.CHECKMARK_OVERHANG = 25;

/**
 * Android can't (in 2014) display "▾", so use "▼" instead.
 */
Blockly.FieldDropdownAdapter.ARROW_CHAR = goog.userAgent.ANDROID ? '\u25BC' : '\u25BE';

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldDropdownAdapter.prototype.CURSOR = 'default';

Blockly.FieldDropdownAdapter.GRID_UNIT = 2;

Blockly.FieldDropdownAdapter.FIELD_Y_OFFSET = -12 * Blockly.FieldDropdownAdapter.GRID_UNIT;

Blockly.FieldDropdownAdapter.MIN_BLOCK_Y = 12 * Blockly.FieldDropdownAdapter.GRID_UNIT;

/**
 * Extra padding to add between the block and the num-pad drop-down, in px.
 * @type {number}
 * @const
 */
Blockly.FieldDropdownAdapter.DROPDOWN_Y_PADDING = -15;

/**
 * Install this dropdown on a block.
 */
Blockly.FieldDropdownAdapter.prototype.init = function() {
    if (this.fieldGroup_) {
        // Dropdown has already been initialized once.
        return;
    }
    // Add dropdown arrow: "option ▾" (LTR) or "▾ אופציה" (RTL)
    this.arrow_ = Blockly.createSvgElement('tspan', {}, null);
    this.arrow_.appendChild(document.createTextNode(
        this.sourceBlock_.RTL ? Blockly.FieldDropdownAdapter.ARROW_CHAR + ' ' :
            ' ' + Blockly.FieldDropdownAdapter.ARROW_CHAR));

    Blockly.FieldDropdownAdapter.superClass_.init.call(this);
    // If not in a shadow block, draw a box.
    if (!this.sourceBlock_.isShadow()) {
        this.box_ = Blockly.createSvgElement('rect', {
            'rx': Blockly.BlockSvg.CORNER_RADIUS,
            'ry': Blockly.BlockSvg.CORNER_RADIUS,
            'x': 0,
            'y': 0,
            'width': this.size_.width,
            'height': this.size_.height,
            'stroke': this.sourceBlock_.getColour()
        }, this.fieldGroup_);
    }
    // Force a reset of the text to add the arrow.
    var text = this.text_;
    this.text_ = null;
    this.setText(text);
};

/**
 * Create a dropdown menu under the text.
 * @private
 */
Blockly.FieldDropdownAdapter.prototype.showEditor_ = function() {
    // If there is an existing drop-down someone else owns, hide it immediately and clear it.
    Blockly.DropDownDiv.hideWithoutAnimation();
    Blockly.DropDownDiv.clearContent();

    var contentDiv = Blockly.DropDownDiv.getContentDiv();
    contentDiv.className = "blocklyDropDownContent";
    var thisField = this;
    var sourceBlock_ = thisField.sourceBlock_;
    if (sourceBlock_.saveOldData) {
        sourceBlock_.saveOldData();
    }
    function callback(e) {
        var menuItem = e.target;
        if (menuItem) {
            var value = menuItem.getValue();
            var oldValue = value;
            if (thisField.sourceBlock_ && thisField.validator_) {
                // Call any validation function, and allow it to override.
                value = thisField.validator_(value, thisField);
            }
            if (value !== null) {
                thisField.setValue(value);
                if (sourceBlock_.updateValidate && sourceBlock_.type == 'program_goto_touch_condition') { 
                    sourceBlock_.updateValidate();
                }else if(sourceBlock_.updateValidate && sourceBlock_.type == 'program_goto_infrared_condition'){
                    sourceBlock_.updateValidate();
                }

            } else {
                if (Blockly.Msg.RENAME_VARIABLE != oldValue && Blockly.Msg.NEW_VARIABLE != oldValue) {
                     thisField.setValue(oldValue);
                }
               
            }
        }
        Blockly.DropDownDiv.hide();
    }


    var menu = new goog.ui.Menu();
    menu.setRightToLeft(this.sourceBlock_.RTL);
    var options = this.getOptions_();
    for (var i = 0; i < options.length; i++) {
        var text = options[i][0];  // Human-readable text.
        var value = options[i][1]; // Language-neutral value.
        var menuItem = new goog.ui.MenuItem(text);
        menuItem.setRightToLeft(this.sourceBlock_.RTL);
        menuItem.setValue(value);
        menuItem.setCheckable(true);
        menu.addChild(menuItem, true);
        menuItem.setChecked(value == this.value_);
    }
    // Listen for mouse/keyboard events.
    goog.events.listen(menu, goog.ui.Component.EventType.ACTION, callback);
    // Listen for touch events (why doesn't Closure handle this already?).
    function callbackTouchStart(e) {
        var control = this.getOwnerControl(/** @type {Node} */ (e.target));
        // Highlight the menu item.
        control.handleMouseDown(e);
    }
    function callbackTouchEnd(e) {
        var control = this.getOwnerControl(/** @type {Node} */ (e.target));
        // Activate the menu item.
        control.performActionInternal(e);
    }
    //menu.getHandler().listen(menu.getElement(), goog.events.EventType.TOUCHSTART,
        //callbackTouchStart);
    //menu.getHandler().listen(menu.getElement(), goog.events.EventType.TOUCHEND,
        //callbackTouchEnd);

    // Record windowSize and scrollOffset before adding menu.
    menu.render(contentDiv);
    var menuDom = menu.getElement();
    Blockly.addClass_(menuDom, 'blocklyDropdownMenu');
    // Record menuSize after adding menu.
    var menuSize = goog.style.getSize(menuDom);
    // Recalculate height for the total content, not only box height.
    menuSize.height = menuDom.scrollHeight;

    var primaryColour = (this.sourceBlock_.isShadow()) ?
        this.sourceBlock_.parentBlock_.getColour() : this.sourceBlock_.getColour();
    //var temp_position = this.getAbsoluteXY_();

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
    var primaryY = position.y + bHeight + Blockly.FieldDropdownAdapter.DROPDOWN_Y_PADDING;
    // If we can't fit it, render above the entire parent block
    var secondaryX = primaryX;
    var secondaryY = position.y - (Blockly.FieldDropdownAdapter.MIN_BLOCK_Y * scale) - (Blockly.FieldDropdownAdapter.FIELD_Y_OFFSET * scale);
    Blockly.DropDownDiv.setColour(primaryColour, this.sourceBlock_.getColour());
    //Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_,temp_obj);
    Blockly.DropDownDiv.setBoundsElement(this.sourceBlock_.workspace.getParentSvg().parentNode);
    Blockly.DropDownDiv.show(this, primaryX, primaryY, secondaryX, secondaryY, this.onHide_.bind(this));
    menu.setAllowAutoFocus(true);
    menuDom.focus();
};

/**
 * Factor out common words in statically defined options.
 * Create prefix and/or suffix labels.
 * @private
 */
Blockly.FieldDropdownAdapter.prototype.trimOptions_ = function() {
    this.prefixField = null;
    this.suffixField = null;
    var options = this.menuGenerator_;
    if (!goog.isArray(options) || options.length < 2) {
        return;
    }
    var strings = options.map(function(t) {return t[0];});
    var shortest = Blockly.shortestStringLength(strings);
    var prefixLength = Blockly.commonWordPrefix(strings, shortest);
    var suffixLength = Blockly.commonWordSuffix(strings, shortest);
    if (!prefixLength && !suffixLength) {
        return;
    }
    if (shortest <= prefixLength + suffixLength) {
        // One or more strings will entirely vanish if we proceed.  Abort.
        return;
    }
    if (prefixLength) {
        this.prefixField = strings[0].substring(0, prefixLength - 1);
    }
    if (suffixLength) {
        this.suffixField = strings[0].substr(1 - suffixLength);
    }
    // Remove the prefix and suffix from the options.
    var newOptions = [];
    for (var i = 0; i < options.length; i++) {
        var text = options[i][0];
        var value = options[i][1];
        text = text.substring(prefixLength, text.length - suffixLength);
        newOptions[i] = [text, value];
    }
    this.menuGenerator_ = newOptions;
};

/**
 * Return a list of the options for this dropdown.
 * @return {!Array.<!Array.<string>>} Array of option tuples:
 *     (human-readable text, language-neutral name).
 * @private
 */
Blockly.FieldDropdownAdapter.prototype.getOptions_ = function() {
    if (goog.isFunction(this.menuGenerator_)) {
        return this.menuGenerator_.call(this);
    }
    return /** @type {!Array.<!Array.<string>>} */ (this.menuGenerator_);
};

/**
 * Get the language-neutral value from this dropdown menu.
 * @return {string} Current text.
 */
Blockly.FieldDropdownAdapter.prototype.getValue = function() {
    return this.value_;
};

/**
 * Set the language-neutral value for this dropdown menu.
 * @param {string} newValue New value to set.
 */
Blockly.FieldDropdownAdapter.prototype.setValue = function(newValue) {
    if (newValue === null || newValue === this.value_) {
        return;  // No change if null.
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue;
    // Look up and display the human-readable text.
    var options = this.getOptions_();
    for (var i = 0; i < options.length; i++) {
        // Options are tuples of human-readable text and language-neutral values.
        if (options[i][1] == newValue) {
            this.setText(options[i][0]);
            return;
        }
    }
    // Value not found.  Add it, maybe it will become valid once set
    // (like variable names).
    this.setText(newValue);
};

/**
 * Set the text in this field.  Trigger a rerender of the source block.
 * @param {?string} text New text.
 */
Blockly.FieldDropdownAdapter.prototype.setText = function(text) {
    if (text === null || text === this.text_) {
        // No change if null.
        return;
    }
    this.text_ = text;
    this.updateTextNode_();

    if (this.textElement_) {
        // Update class for dropdown text.
        // This class is reset every time updateTextNode_ is called.
        this.textElement_.setAttribute('class',
                this.textElement_.getAttribute('class') + ' blocklyDropdownText'
        );
        // Insert dropdown arrow.
        if (this.sourceBlock_.RTL) {
            this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild);
        } else {
            this.textElement_.appendChild(this.arrow_);
        }
    }

    if (this.sourceBlock_ && this.sourceBlock_.rendered) {
        this.sourceBlock_.render();
        this.sourceBlock_.bumpNeighbours_();
    }
};

/**
 * Close the dropdown menu if this input is being deleted.
 */
Blockly.FieldDropdownAdapter.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldDropdownAdapter.superClass_.dispose.call(this);
};

/**
 * Callback for when the drop-down is hidden.
 */
Blockly.FieldDropdownAdapter.prototype.onHide_ = function() {
  // Clear accessibility properties
};


if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldDropdownAdapter;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldDropdownAdapter; });
} else {
    this.FieldDropdownAdapter = Blockly.FieldDropdownAdapter;
}

/**
 * Description: field extension 扩展
 * Author: Created by ubt
 * Date: 2016/9/7
 */
'use strict';
goog.require('Blockly.Field');
module.exports = function() {   

    Blockly.FieldTextInput.prototype.setRestrictor = function(restrictor) {
        this.restrictor_ = restrictor;
    };

    /**
     * Key codes that are whitelisted from the restrictor.
     * These are only needed and used on Gecko (Firefox).
     * See: https://github.com/LLK/scratch-blocks/issues/503.
     */
    Blockly.FieldTextInput.GECKO_KEYCODE_WHITELIST = [
        97, // Select all, META-A.
        99, // Copy, META-C.
        118, // Paste, META-V.
        120 // Cut, META-X.
        ];

    /**
     * Handle a change to the editor.
     * @param {!Event} e Keyboard event.
     * @private
     */
    Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(e) {
        // Check if the key matches the restrictor.
        if (e.type === 'keypress' && this.restrictor_) {
            var keyCode;
            var isWhitelisted = false;
            if (goog.userAgent.GECKO) {
            // e.keyCode is not available in Gecko.
            keyCode = e.charCode;
            // Gecko reports control characters (e.g., left, right, copy, paste)
            // in the key event - whitelist these from being restricted.
            // < 32 and 127 (delete) are control characters.
            // See: http://www.theasciicode.com.ar/ascii-control-characters/delete-ascii-code-127.html
            if (keyCode < 32 || keyCode == 127) {
                isWhitelisted = true;
            } else if (e.metaKey || e.ctrlKey) {
                // For combos (ctrl-v, ctrl-c, etc.), Gecko reports the ASCII letter
                // and the metaKey/ctrlKey flags.
                isWhitelisted = Blockly.FieldTextInput.GECKO_KEYCODE_WHITELIST.indexOf(keyCode) > -1;
            }
            } else {
            keyCode = e.keyCode;
            }
            var char = String.fromCharCode(keyCode);
            if (!isWhitelisted && !this.restrictor_.test(char) && e.preventDefault) {
            // Failed to pass restrictor.
            e.preventDefault();
            return;
            }
        }
        var htmlInput = Blockly.FieldTextInput.htmlInput_;
        // Update source block.
        var text = htmlInput.value;
        if (text !== htmlInput.oldValue_) {
            htmlInput.oldValue_ = text;
            this.setValue(text);
            this.validate_();
        } else if (goog.userAgent.WEBKIT) {
            // Cursor key.  Render the source block to show the caret moving.
            // Chrome only (version 26, OS X).
            this.sourceBlock_.render();
        }
        this.resizeEditor_();
        Blockly.svgResize(this.sourceBlock_.workspace);
    };

    /**
 * Show the inline free-text editor on top of the text.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldTextInput.prototype.showEditor_ = function(opt_quietInput,opt_readOnly) {
    this.workspace_ = this.sourceBlock_.workspace;
    var quietInput = opt_quietInput || false;
    var readOnly = opt_readOnly || false;
    if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
                        goog.userAgent.IPAD)) {
        // Mobile browsers have issues with in-line textareas (focus & keyboards).
        var newValue = window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_);
        if (this.sourceBlock_ && this.validator_) {
        var override = this.validator_(newValue);
        if (override !== undefined) {
            newValue = override;
        }
        }
        this.setValue(newValue);
        return;
    }

    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
    var div = Blockly.WidgetDiv.DIV;
    // Create the input.
    var htmlInput = goog.dom.createDom('input', 'blocklyHtmlInput');
    htmlInput.setAttribute('spellcheck', this.spellcheck_);
    if (readOnly) {
        htmlInput.setAttribute('readonly', 'true');
    }
    var fontSize =
        (Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale) + 'pt';
    div.style.fontSize = fontSize;
    htmlInput.style.fontSize = fontSize;
    /** @type {!HTMLInputElement} */
    Blockly.FieldTextInput.htmlInput_ = htmlInput;
    div.appendChild(htmlInput);

    htmlInput.value = htmlInput.defaultValue = this.text_;
    htmlInput.oldValue_ = null;
    this.validate_();
    this.resizeEditor_();
    if (quietInput) {
        htmlInput.focus();
        htmlInput.select();
    }

    // Bind to keydown -- trap Enter without IME and Esc to hide.
    htmlInput.onKeyDownWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keydown', this, this.onHtmlInputKeyDown_);
    // Bind to keyup -- trap Enter; resize after every keystroke.
    htmlInput.onKeyUpWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
    // Bind to keyPress -- repeatedly resize when holding down a key.
    htmlInput.onKeyPressWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
    htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
    this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);
    };

    /**
     * Set the text in this field.
     * @param {?string} text New text.
     * @override
     */
    Blockly.FieldTextInput.prototype.setValue = function(text) {
    if (text === null) {
        return;  // No change if null.
    }
    if (this.sourceBlock_ && this.validator_) {
        var validated;
        if (this.sourceBlock_.type == 'custom_math_num' && this.sourceBlock_.parentBlock_) {
            var customType = this.sourceBlock_.parentBlock_.type;
            validated = this.validator_(text, customType);
        } else {
            validated = this.validator_(text);
        }
        //var validated = this.validator_(text);
        // If the new text is invalid, validation returns null.
        // In this case we still want to display the illegal result.
        if (validated !== null && validated !== undefined) {
        text = validated;
        }
    }
    Blockly.Field.prototype.setValue.call(this, text);
    };  
    
};
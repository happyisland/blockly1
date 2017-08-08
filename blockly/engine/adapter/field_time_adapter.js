/**
 * Created by ubt on 2016/9/8.
 */

'use strict';

goog.require('Blockly.FieldDeviceTilt');
goog.require('Blockly.Field');

var $ = require('jquery');
var React = require('react');
var ReactDOM =  require('react-dom');
var BlockTimeSelect = require('../../engine/test/block_time_select.jsx');
Blockly.FieldTimeAdapter = function(text, opt_validator, popupKey) {
    Blockly.FieldTimeAdapter.superClass_.constructor.call(this, text, opt_validator);
    this.setText(text);
    this.popupKey = popupKey;
};
goog.inherits(Blockly.FieldTimeAdapter, Blockly.Field);


/**
 * render the block
 * @private
 */
Blockly.FieldTimeAdapter.prototype.showEditor_ = function() {
    var thisField = this;
    var callback = function(index) {
        if (thisField.validator_) {
             thisField.validator_(index);
        }
    };
    var block = this.sourceBlock_;
    var objToPopup = block.popupTimeDialog();
    //如果当前的块不可用
    if (block.disabled &&　!!angular) {
        var dom = angular.element($("#bodyContent")).scope();
        dom.systemHintShow(MSG['servo_mode_error'],'error');
    }
    
    if (!!angular) {
        var dom = angular.element($("#bodyContent")).scope();
        dom.popupShow(this.popupKey,objToPopup,callback);
    } else {
        var removeTimeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
            $("#business_container").empty();
        };
        ReactDOM.render(React.createElement(BlockTimeSelect, 
            {onSuccess:removeTimeComponent, currentValue:objToPopup.time,callback:callback}),
            document.getElementById("business_container"));
    }
    
    //dom.popupShow("deviceTilt");
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldTimeAdapter;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldTimeAdapter; });
} else {
    this.FieldTimeAdapter = Blockly.FieldTimeAdapter;
}
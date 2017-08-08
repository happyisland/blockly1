/**
 * Created by ubt on 2016/9/8.
 */

'use strict';

goog.require('Blockly.FieldDeviceTilt');
goog.require('Blockly.Field');

var $ = require('jquery');
var eventsListener = require('../common/events_listener');
var React = require('react');
var ReactDOM =  require('react-dom');
var BlockPhoneSelect = require('../../engine/test/block_phone_select.jsx');
Blockly.FieldDeviceTilt = function(value, opt_validator) {
    Blockly.FieldDeviceTilt.superClass_.constructor.call(this, value, opt_validator);
    var text = MSG['tilt_'+value];
    this.setText(text);
    this.setValue(value);
};
goog.inherits(Blockly.FieldDeviceTilt, Blockly.Field);

Blockly.FieldDeviceTilt.prototype.setValue = function(value) {
    this._value = value;
};

Blockly.FieldDeviceTilt.prototype.getValue = function() {
    return this._value;
};

Blockly.FieldDeviceTilt.prototype.getText = function() {
    return MSG['tilt_'+this._value]; 
};

/**
 * render the block
 * @private
 */
Blockly.FieldDeviceTilt.prototype.showEditor_ = function() {
    var thisField = this;
    var callback = function(index) {
        if (thisField.validator_) {
             thisField.validator_(index);
        }
        eventsListener.trigger('canvas changed');
    };
    var block = this.sourceBlock_;
    var arrMultiServoToPopup = block.popupService();
    if (!!angular) {
        var dom = angular.element($("#bodyContent")).scope();
        dom.popupShow(block['popupKey'],arrMultiServoToPopup,callback);  
    } else {
        var removePhoneComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
            $("#business_container").empty();
        };
        ReactDOM.render(React.createElement(BlockPhoneSelect,
             {onSuccess:removePhoneComponent,status:arrMultiServoToPopup.direction,callback:callback}), document.getElementById("business_container"));
    }
    
    //dom.popupShow("deviceTilt");
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldDeviceTilt;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldDeviceTilt; });
} else {
    this.FieldDeviceTilt = Blockly.FieldDeviceTilt;
}
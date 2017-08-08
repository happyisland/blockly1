/**
 * Created by ubt on 2016/9/8.
 */

'use strict';

goog.require('Blockly.FieldGyroscopeAngleAdapter');
goog.require('Blockly.Field');

var $ = require('jquery');
var eventsListener = require('../common/events_listener');
var React = require('react');
var ReactDOM =  require('react-dom');
var popupShow = require('../common/dialog/popup_show');
var BlockGyroSelect = require('../../engine/test/block_gyro_select.jsx');

Blockly.FieldGyroscopeAngleAdapter = function(value, opt_validator) {
    Blockly.FieldGyroscopeAngleAdapter.superClass_.constructor.call(this, value, opt_validator);
    var text = MSG[value];
    this.setText(text);
    this.setValue(value);
};
goog.inherits(Blockly.FieldGyroscopeAngleAdapter, Blockly.Field);

Blockly.FieldGyroscopeAngleAdapter.prototype.setValue = function(value) {
    this._value = value;
};

Blockly.FieldGyroscopeAngleAdapter.prototype.getValue = function() {
    return this._value;
};

Blockly.FieldGyroscopeAngleAdapter.prototype.getText = function() {
    return MSG[this._value]; 
};

/**
 * render the block
 * @private
 */
Blockly.FieldGyroscopeAngleAdapter.prototype.showEditor_ = function() {
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
        /**
        var blueStatus =  blocklyDatas.getDataByKey('blueState');
        if (!blueStatus || blueStatus =='0') {
            dataService.command('blueConnect'); 
            return;
        }
        */
        if (!popupShow.isShowAlert(block['popupKey'], arrMultiServoToPopup)) {
            return;
        }
        var removeGyroComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
            $("#business_container").empty();
        };
        ReactDOM.render(React.createElement(BlockGyroSelect, 
            {onSuccess:removeGyroComponent, gyroData:arrMultiServoToPopup,callback:callback}),
            document.getElementById("business_container"));
    }
    
    //dom.popupShow("deviceTilt");
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldGyroscopeAngleAdapter;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldGyroscopeAngleAdapter; });
} else {
    this.FieldGyroscopeAngleAdapter = Blockly.FieldGyroscopeAngleAdapter;
}
/**
 * Description: Field for entering params of touch sensor
 * Author: Created by ubt
 * Date: 2016/9/2
 */

'use strict';

goog.provide('Blockly.FieldTouchSensor');
goog.require('Blockly.Field');

require('./block_extension')(Blockly.Block);
var $ = require('jquery');
var eventsListener = require('../common/events_listener');
var BlockTouchSelect = require('../../engine/test/block_touch_select.jsx');
var TouchSensorSetting = require('../../project/popup/touch_sensor_setting.jsx');
var React = require('react');
var ReactDOM =  require('react-dom');
var popupShow = require('../common/dialog/popup_show');

Blockly.FieldTouchSensor = function(key, val, opt_validator) {
    Blockly.FieldTouchSensor.superClass_.constructor.call(this, val, opt_validator);
    var text = MSG[key];
    this.setText(text);
    this.setValue(val);
};
goog.inherits(Blockly.FieldTouchSensor, Blockly.Field);

Blockly.FieldTouchSensor.prototype.setValue = function(value) {
    this._value = value;
};

Blockly.FieldTouchSensor.prototype.getValue = function() {
    return this._value;
};

Blockly.FieldTouchSensor.prototype.getText = function() {
    return MSG[this._value]; 
};

/**
 * render the block
 * @private
 */
Blockly.FieldTouchSensor.prototype.showEditor_ = function() {
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
        var removeTouchComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
            $("#business_container").empty();
        };
        ReactDOM.render(React.createElement(BlockTouchSelect,
             {onSuccess:removeTouchComponent,status:arrMultiServoToPopup.status,callback:callback, data:arrMultiServoToPopup}), document.getElementById("business_container"));
    }
    //var dom = angular.element($("#bodyContent")).scope();
    //dom.popupShow(block['popupKey'],arrMultiServoToPopup,callback);
};



if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldTouchSensor;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldTouchSensor; });
} else {
    this.FieldTouchSensor = Blockly.FieldTouchSensor;
}
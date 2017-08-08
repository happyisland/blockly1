/**
 * Created by ubt on 2016/9/8.
 */

'use strict';

goog.require('Blockly.FieldDisplayEmotion');
goog.require('Blockly.Field');
var React = require('react');
var ReactDOM =  require('react-dom');
var $ = require('jquery');
var eventsListener = require('../common/events_listener');
var popupShow = require('../common/dialog/popup_show');
var LEDComponent = require('../../engine/test/led_component.jsx');

Blockly.FieldDisplayEmotion = function(text, value, opt_validator) {
    Blockly.FieldDisplayEmotion.superClass_.constructor.call(this, text, opt_validator);
    this.setText(text);
    this.setValue(value);
};
goog.inherits(Blockly.FieldDisplayEmotion, Blockly.Field);

Blockly.FieldDisplayEmotion.prototype.setValue = function(value) {
    this._value = value;
};

Blockly.FieldDisplayEmotion.prototype.getValue = function() {
    return this._value;
};

/**
 * render the block
 * @private
 */
Blockly.FieldDisplayEmotion.prototype.showEditor_ = function() {
    var thisField = this;
    var callback = function(param) {
        console.log('返回值');
        console.log(param);
        if (thisField.validator_) {
             thisField.validator_(param);
        }
        eventsListener.trigger('canvas changed');
    };
    var block = this.sourceBlock_;
    var arrMultiServoToPopup = block.popupService();
    console.log(arrMultiServoToPopup);
    console.log('传出的值'+block['popupKey']);
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
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
            $("#business_container").empty();
        };
        var LEDComponentFun =function() {
          ReactDOM.render(
            React.createElement(LEDComponent, 
              {
                onRemove: removeComponent,
                popupKey: block['popupKey'],
                arrMultiServoToPopup: arrMultiServoToPopup,
                callback:callback
              }
            ), document.getElementById("business_container")
          );
        };
        
        var popupObj = {
          'emotionDisplay': LEDComponentFun,
          'sceneLightDisplay': LEDComponentFun
        };
        popupObj[block['popupKey']]();
    }
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldDisplayEmotion;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldDisplayEmotion; });
} else {
    this.FieldDisplayEmotion = Blockly.FieldDisplayEmotion;
}
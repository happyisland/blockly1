/**
 * Created by ubt on 2016/9/8.
 */

'use strict';

goog.require('Blockly.FieldSettingLight');
goog.require('Blockly.Field');
var eventsListener = require('../common/events_listener');
var React = require('react');
var ReactDOM =  require('react-dom');
var $ = require('jquery');
var popupShow = require('../common/dialog/popup_show');
var LEDComponent = require('../../engine/test/led_component.jsx');

Blockly.FieldSettingLight = function(value, text, opt_validator) {
    Blockly.FieldSettingLight.superClass_.constructor.call(this, value, opt_validator);
    //var text = MSG['tilt_'+value];
    this.setText(text);
    this.setValue(value);
};
goog.inherits(Blockly.FieldSettingLight, Blockly.Field);

Blockly.FieldSettingLight.prototype.setValue = function(value) {
    this._value = value;
};

Blockly.FieldSettingLight.prototype.getValue = function() {
    return this._value;
};

Blockly.FieldSettingLight.prototype.getText = function() {
    return this.text_;
};

/**
 * render the block
 * @private
 */
Blockly.FieldSettingLight.prototype.showEditor_ = function() {
    var thisField = this;
    var callback = function(index) {
        if (thisField.validator_) {
             thisField.validator_(index);
        }
        eventsListener.trigger('canvas changed');
    };
    var block = this.sourceBlock_;
    var loadData = block.popupService();
    console.log('传递出去的值：'+block['popupKey']);
    console.log(loadData);
    if(!!angular){
        var dom = angular.element($("#bodyContent")).scope();
        dom.popupShow(block['popupKey'],loadData,callback);
    } else {
        /** 
        var blueStatus =  blocklyDatas.getDataByKey('blueState');
        if (!blueStatus || blueStatus =='0') {
            dataService.command('blueConnect'); 
            return;
        }
        */
        if (!popupShow.isShowAlert(block['popupKey'], loadData)) {
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
                onRemove:removeComponent,
                popupKey:block['popupKey'],
                arrMultiServoToPopup:loadData,
                callback:callback
              }
            ), document.getElementById("business_container")
          );
        };
        
        var popupObj = {
          'settingLight': LEDComponentFun
        };
        popupObj[block['popupKey']]();
    }
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldSettingLight;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldSettingLight; });
} else {
    this.FieldSettingLight = Blockly.FieldSettingLight;
}
/**
 * Created by ubt on 2016/9/8.
 */

'use strict';

goog.require('Blockly.FieldInfraredSensor');
goog.require('Blockly.Field');

var $ = require('jquery');
var eventsListener = require('../common/events_listener');
var React = require('react');
var ReactDOM =  require('react-dom');
var popupShow = require('../common/dialog/popup_show');
var BlockInfraredSelect = require('../../engine/test/block_infrared_select.jsx');
Blockly.FieldInfraredSensor = function(value, opt_validator) {
    Blockly.FieldInfraredSensor.superClass_.constructor.call(this, value, opt_validator);
    this.setValue(value);
    this.setText(value);
};
goog.inherits(Blockly.FieldInfraredSensor, Blockly.Field);

/**
 * render the block
 * @private
 */
Blockly.FieldInfraredSensor.prototype.setValue = function(val){
    this._value = val;
}

Blockly.FieldInfraredSensor.prototype.getValue = function(){
    return this._value;
}

Blockly.FieldInfraredSensor.prototype.getText = function(key){
    return this._value;
}

Blockly.FieldInfraredSensor.prototype.showEditor_ = function() {
    var thisField = this;
    var callback = function(param) {
        if (thisField.validator_) {
            thisField.validator_(param);
        }
        eventsListener.trigger('canvas changed');
    };
    var block = this.sourceBlock_;
    var loadInfraredSensor = block.popupService();
    if (!!angular) {
        var dom = angular.element($("#bodyContent")).scope();
        dom.popupShow('infraredSensor',loadInfraredSensor,callback);
    } else {
        /**
        var blueStatus =  blocklyDatas.getDataByKey('blueState');
        if (!blueStatus || blueStatus =='0') {
            dataService.command('blueConnect'); 
            return;
        }
         */
        if (!popupShow.isShowAlert('infraredSensor', loadInfraredSensor)) {
            return;
        }
        var removeInfraredComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
            $("#business_container").empty();
        };
        ReactDOM.render(React.createElement(BlockInfraredSelect, 
            {onSuccess:removeInfraredComponent, infraredData:loadInfraredSensor,callback:callback}),
            document.getElementById("business_container"));
    }
    /**
    var dom = angular.element($("#bodyContent")).scope();
    dom.popupShow("infraredSensor", loadInfraredSensor, callback);
     */
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldInfraredSensor;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldInfraredSensor; });
} else {
    this.FieldInfraredSensor = Blockly.FieldInfraredSensor;
}
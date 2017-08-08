/**
 * Created by ubt on 2016/9/8.
 */

'use strict';

goog.require('Blockly.FieldPlayTune');
goog.require('Blockly.Field');

var React = require('react');
var ReactDOM =  require('react-dom');
var $ = require('jquery');
var eventsListener = require('../common/events_listener');
var PlaySoundComponent = require('../../engine/test/play_sound.jsx');
var PlayToneComponent = require('../../engine/test/play_tone.jsx');
Blockly.FieldPlayTune = function(value, opt_validator) {
    Blockly.FieldPlayTune.superClass_.constructor.call(this, value, opt_validator);
    this.setText(value);
    this.setValue(value);
};
goog.inherits(Blockly.FieldPlayTune, Blockly.Field);

Blockly.FieldPlayTune.prototype.setValue = function(value) {
    this._value = value;
};

Blockly.FieldPlayTune.prototype.getValue = function() {
    return this._value;
};

Blockly.FieldPlayTune.prototype.getText = function() {
    return this._value;
};

/**
 * render the block
 * @private
 */
Blockly.FieldPlayTune.prototype.showEditor_ = function() {
    var thisField = this;
    var callback = function(val) {
        if (thisField.validator_) {
             thisField.validator_(val);
        }
        eventsListener.trigger('canvas changed');
    };
    var block = this.sourceBlock_;
    var loadData = block.popupService();
    console.log("popupData---->");
    console.log(loadData);
    if(!!angular){
        var dom = angular.element($("#bodyContent")).scope();
        dom.popupShow(block['popupKey'],loadData,callback);
    }else {
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("business_container"));
            $("#business_container").empty();
        };
        var playSoundPopfunc =function() {
            ReactDOM.render(
                React.createElement(PlaySoundComponent, 
                    {
                        onRemove:removeComponent,
                        popupData:loadData,
                        callback:callback
                    }
                ), document.getElementById("business_container")
            );
        };
        var playTunePopfunc =function() {
            ReactDOM.render(
                React.createElement(PlayToneComponent, 
                    {
                        onRemove:removeComponent,
                        popupData:loadData,
                        callback:callback
                    }
                ), document.getElementById("business_container")
            );
        };
        var popupObj = {
            'soundEffects': playSoundPopfunc,
            'playTune':playTunePopfunc
        };
        popupObj[block['popupKey']]();
    }
};

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.FieldPlayTune;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.FieldPlayTune; });
} else {
    this.FieldPlayTune = Blockly.FieldPlayTune;
}
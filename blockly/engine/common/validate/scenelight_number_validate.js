/**
 * scenelight_number_validate.js version 1.0
 * 
 * scenelight_number_validate js  表情数字验证
 * scenelight_number_validate
 * 
 * 情景灯数字验证
 * @author hekai
 */
'use strict'
;(function() {
    
    var ScenelightNumberValidate = function() {

    };

    ScenelightNumberValidate.prototype.validate  = function(value) {
        if (isNaN(value)) {
            return 1;
        }
        if (value > 10) {
            return 10;
        } else if (value < 1) {
            return 1;
        } else {
            return value;
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = ScenelightNumberValidate;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return ScenelightNumberValidate });
    } else {
        this.ScenelightNumberValidate = ScenelightNumberValidate;
    }

}).call(this);
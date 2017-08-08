/**
 * led_number_validate.js version 1.0
 * 
 * led_number_validate js  灯光数字验证
 * led_number_validate
 * 
 * 灯光数字验证
 * @author hekai
 */
'use strict'
;(function() {
    
    var LedNumberValidate = function() {

    };

    LedNumberValidate.prototype.validate  = function(value) {
        if (isNaN(value)) {
            return 400;
        }
        if (value > 9999) {
            return 9999;
        } else if (value < 100) {
            return 100;
        } else {
            return value;
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = LedNumberValidate;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return LedNumberValidate });
    } else {
        this.LedNumberValidate = LedNumberValidate;
    }

}).call(this);
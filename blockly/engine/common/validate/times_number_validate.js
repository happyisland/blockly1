/**
 * times_number_validate.js version 1.0
 * 
 * times_number_validate js  循环次数数字验证
 * times_number_validate
 * 
 * 循环次数数字验证
 * @author hekai
 */
'use strict'
;(function() {
    
    var TimesNumberValidate = function() {

    };

    TimesNumberValidate.prototype.validate  = function(value) {
        if (isNaN(value)) {
            return 1;
        }
        if (value > 20) {
            return 20;
        } else if (value < 1) {
            return 1;
        } else {
            return value;
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = TimesNumberValidate;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return TimesNumberValidate });
    } else {
        this.TimesNumberValidate = TimesNumberValidate;
    }

}).call(this);
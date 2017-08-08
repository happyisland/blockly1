/**
 * time_number_validate.js version 1.0
 * 
 * time_number_validate js  时间数字验证
 * time_number_validate
 * 
 * 时间数字验证
 * @author hekai
 */
'use strict'
;(function() {
    
    var TimeNumberValidate = function() {

    };

    TimeNumberValidate.prototype.validate  = function(value) {
        if (isNaN(value)) {
            return 1;
        }
        if (value > 100000) {
            return 100000;
        } else if (value < 500) {
            return 500;
        } else {
            return value;
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = TimeNumberValidate;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return TimeNumberValidate });
    } else {
        this.TimeNumberValidate = TimeNumberValidate;
    }

}).call(this);
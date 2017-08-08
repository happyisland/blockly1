/**
 * default_number_validate.js version 1.0
 * 
 * default_number_validate js  默认数字验证
 * default_number_validate
 * 
 * 默认数字验证
 * @author hekai
 */
'use strict'
;(function() {
    
    var DefaultNumberValidate = function() {

    };

    DefaultNumberValidate.prototype.validate  = function(value) {
        if (isNaN(value)) {
            return 0;
        }
        if (value > 9999) {
            return 9999;
        } else if (value < -9999) {
            return -9999;
        } else {
            return value;
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = DefaultNumberValidate;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return DefaultNumberValidate });
    } else {
        this.DefaultNumberValidate = DefaultNumberValidate;
    }

}).call(this);
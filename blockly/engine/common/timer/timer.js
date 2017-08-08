/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * timer.js version 1.0
 * 
 * 功能 ：记录时间的模块
 * 
 *  记录程序运行时间的模块
 * 
 */
'use strict';
;(function (){
    
    function Timer(params) {
        this.startTime = 0;
    };

    Timer.prototype.time = function () {
        return Date.now();
    };

    Timer.prototype.start = function () {
        this.startTime = this.time();
    };

    Timer.prototype.timeElapsed = function () {
        return this.time() - this.startTime;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = Timer;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return Timer; });
    } else {
        this.Timer = Timer;
    }

}).call(this);
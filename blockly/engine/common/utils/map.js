/* @preserve
 *
 *
 * Copyright (c) 2016 UBT Company
 *
 *
 */

/**
 * utils.js version 1.0
 *
 *  utils feature
 *  工具函数类
 *
 * feature utils feature
 *
 */
'use strict';
;(function() {

    function Map() {
        this.obj = {};
        this.count = 0;
    }

    Map.prototype.put = function (key, value) {
        var oldValue = this.obj[key];
        if (oldValue == undefined) {
            this.count++;
        }
        this.obj[key] = value;
    }
    Map.prototype.get = function (key) {
        return this.obj[key];
    }
    Map.prototype.remove = function (key) {
        var oldValue = this.obj[key];
        if (oldValue != undefined) {
            this.count--;
            delete this.obj[key];
        }
    }
    Map.prototype.size = function () {
        return this.count;
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = Map;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return Map; });
    } else {
        this.map = Map;
    }

}).call(this);
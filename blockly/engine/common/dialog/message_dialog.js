/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * message_dialog.js version 1.0
 * 
 * message_dialog 
 * 
 * feature 显示消息的浮动延迟框
 * 
 */
 
'use strict'
;(function(){

    function MessageDialog () {
        this.delay = 2000;
        this.notyf = new Notyf({delay:this.delay});
    };

    MessageDialog.prototype.successDialog = function(content) {
        this.notyf.confirm(content);
    };

    MessageDialog.prototype.alertDialog = function(content) {
        this.notyf.alert(content);
    };

    MessageDialog.prototype.setDelay = function(delay) {
        this.delay = delay;
        this.notyf = new Notyf({delay:this.delay});
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new MessageDialog;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new MessageDialog; });
    } else {
        this.MessageDialog = new MessageDialog;
    }

}).call(this);
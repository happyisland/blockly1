/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * command_sequence.js version 1.0
 * 
 * command_sequence 
 * 
 * feature 命令顺序执行模块
 * 
 */
 
'use strict'
;(function() {
    var programManager = require('./program_manager');
    var Promise = require("bluebird");
    var eventsListener = require('./../events_listener');
    function CommandSequence() {
        this.fnArray = [];
        this.index = -1;
    }

    CommandSequence.prototype.push = function(fn) {
        this.fnArray.push(fn);
    };

    CommandSequence.prototype.run = function() {
        return new Promise((function(_this) {
            return function(resolve, reject) {
                _this.index++;
                _this.fnArray[_this.index]();
                var handler = function() {
                    eventsListener.off('next_step'+ programManager.getProgramRunnerIndex(), handler);
                    return resolve();
                };
                eventsListener.on('next_step' + programManager.getProgramRunnerIndex(), handler);
                return;
            };
        })(this));
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = CommandSequence;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return CommandSequence; });
    } else {
        this.commandSequence = CommandSequence;
    }


}).call(this);

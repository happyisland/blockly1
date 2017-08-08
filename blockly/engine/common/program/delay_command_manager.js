/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * delay_command_manager.js version 1.0
 * 
 * delay_command_manager 
 * 
 * feature 延迟执行命令管理器的封装
 * 
 */
 
'use strict'
;(function() {
    var Map = require('../utils/map');
    var DealyCommand = require('./delay_command');
    function DelayCommandManager() {
        this.delayCommandMap = new Map();
    }

    /**
     * 获取某个程序的延迟命令，根据当前运行程序的programIndex;
     */
    DelayCommandManager.prototype.getDelayCommandByIndex = function(progranIndex) {
        var delayCommand = this.delayCommandMap.get(progranIndex);
        if (!delayCommand) {
            delayCommand = new DealyCommand(progranIndex);
            this.delayCommandMap.put(progranIndex,delayCommand);
        } 
        return delayCommand;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new DelayCommandManager;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new DelayCommandManager; });
    } else {
        this.delayCommandManager = new DelayCommandManager;
    }
}).call(this);
/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * delay_command.js version 1.0
 * 
 * delay_command 
 * 
 * feature 延迟执行命令的封装
 * 
 */
 
'use strict'
;(function() {

    /**
     * params duration 延迟的数目
     */
    function DelayCommand(programIndex, duration) {
        //延迟命令对应的程序运行器
        this.programIndex = programIndex;
        this.duration = duration;
        this.timerValue = 0;
    }

    /**
     * @params sendCommandFn 发送命令的函数
     * @params programCallback 回调唤醒程序
     * @milis 延迟的毫秒数
     * 
     * 延迟执行函数，用于模拟客户端程序执行的延迟和唤醒
     * 
     */
    DelayCommand.prototype.sendTimeout = function(sendCommandFn, programCallback,milis) {   
        this.duration = milis;
        var programIndex = this.programIndex;   
        var x;
        while (true) {
            x = true;
            this.timerValue = setTimeout((function() {
                programCallback(programIndex);
                //console.log('dealy continue');
                x = false;
            }), this.duration);
            //发送指令
            if (!x) {
                //console.log(x);
                break;
            } else {
                //console.log(x);
            }
            break;
        }
        //发送指令
        sendCommandFn();
        return console.log('sendCommand delay' + this.duration);
    };

    /**
     * 清除掉定时器
     */
    DelayCommand.prototype.clearTimeout = function() {
        console.log('清除掉定时器：'+ this.timerValue);
        clearTimeout(this.timerValue);
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = DelayCommand;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return DelayCommand; });
    } else {
        this.DelayCommand = DelayCommand;
    }

}).call(this);
/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * programState.js version 1.0
 * 
 * monitor the state of program 
 * 
 * feature monitor the state of program
 * 监控程序的运行状态
 * author hk
 * 
 */
'use strict'
;(function() {

    function ProgramState() {
        //初始化的状态
        this.state = ProgramState.STATE.PROGRAM_DEFAULT;
        //记录状态的变化
        this.stateChange = [];
    }

    //0表示默认值 ， 10表示程序开始运行， 20 表示程序向机器人发送命令 ， 30 表示程序被唤醒 ， 40 表示程序停止 ， 50 表示程序出现异常

    ProgramState.STATE = {
        PROGRAM_DEFAULT = 0,
        PROGRAM_START = 10,
        PROGRAM_SENT_ROBOT = 20,
        PROGRAM_AWAKE = 30,
        PROGRAM_STOP = 40,
        PROGRAM_EXCEPTION = 50
    };

    ProgramState.prototype.updateState = function(state) {
        this.state = state;
        //将状态的改变记录下来
        this.stateChange.push(state);
    };


    ProgramState.prototype.getState = function() {
        return this.state;
    };

    ProgramState.prototype.getStateChange = function() {
        return this.stateChange;
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = ProgramState;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return ProgramState });
    } else {
        this.programState = ProgramState;
    }

}).call(this);
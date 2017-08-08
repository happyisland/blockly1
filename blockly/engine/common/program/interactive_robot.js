/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * interactiveRobot.js version 1.0
 * 
 * interactive variable 
 * 
 * feature isSendRobotCommand variable
 * 
 */
'use strict';
;(function() {
    
    function InteractiveRobot() {

    }

    InteractiveRobot.prototype.init = function() {
        window.SENT_ROBOT_COMMAND = false;
    };

    InteractiveRobot.prototype.isSendRobot = function() {
        return window.SENT_ROBOT_COMMAND;
    };

    InteractiveRobot.prototype.setSendRobot = function(sendRobotCommand) {
        window.SENT_ROBOT_COMMAND = sendRobotCommand;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new InteractiveRobot();
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return new InteractiveRobot(); });
    } else {
        this.interactiveRobot = new InteractiveRobot();
    }

}).call(this);
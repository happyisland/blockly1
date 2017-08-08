/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * interactiveMethods.js version 1.0
 * 
 * 功能 ：js与IOS或者android交互的模块(主要用于IOS或者android回调 js)
 * 
 * feature js interact with IOS or Android;
 * 
 */
'use strict';
;(function() {

    var RobatCommand = require('./../../../engine/service/robat_command');
    var eventsListener = require('./../../../engine/common/events_listener');
    var interactiveMethods = require('./interactive_methods');

    function InfraredSensor() {
        this.timerValue = 0;
        this.status = 'stop';
    }

    InfraredSensor.prototype.init = function () {
          eventsListener.on('start_sensor_timer',function() {
              interactiveMethods.startInfaredTimerCallback();
          });
          eventsListener.on('stop_sensor_timer',function() {
              interactiveMethods.stopInfaredTimerCallback();
          });
    }

    InfraredSensor.prototype.startInfraredTimer = function(param) {
        this.status = 'running';
        if (!window.blocklyObj) {
            //客户端启动红外定时器         
            console.log('客户端启动红外定时器');
            eventsListener.trigger('start_sensor_timer');                   
        } else {
            console.log(param);
            (new RobatCommand(param)).send();
        }
        eventsListener.trigger('show_infrared_sensor',{display:'block', showStatus:true});
        console.log('启动红外定时器');
    };

    InfraredSensor.prototype.stopInfraredTimer = function(param) {
        this.status = 'stop';
        if (!window.blocklyObj) {
            //客户端停止红外定时器        
            console.log('客户端停止红外定时器');
            eventsListener.trigger('stop_sensor_timer');             
        } else {
            (new RobatCommand(param)).send();
        }
        eventsListener.trigger('show_infrared_sensor',{display:'none', showStatus:false});     
        console.log('停止红外定时器');
    };

    InfraredSensor.prototype.getStatus = function() {
        return this.status;
    };
    

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new InfraredSensor();
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return new InfraredSensor(); });
    } else {
        this.infraredSensor = new InfraredSensor();
    }
}).call(this);
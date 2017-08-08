/* @preserve
 *
 *
 * Copyright (c) 2016 UBT Company
 *
 *
 */

/**
 * sensor_condition_value.js version 1.0
 *
 *  sensor_condition_value feature
 *  传感器值条件类
 *
 * feature sensor_condition_value feature
 *
 */
'use strict';
(function() {
    function SensorConditionValue() {
        this.data = {};     
    }

    SensorConditionValue.prototype.initAllCondition = function(type) {
        var block = Blockly.Blocks[type];
        if (block.handleAllCondition) {
            this.data[type] = block.handleAllCondition();
        }
        return this.data[type];
    };

    SensorConditionValue.prototype.getAllCondition = function(type) {
        return this.data[type];
    };

    SensorConditionValue.prototype.removeAllCondition = function() {
        this.data = {};  
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new SensorConditionValue;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new SensorConditionValue; });
    } else {
        this.sensorConditionValue = new SensorConditionValue;
    }

}).call(this);
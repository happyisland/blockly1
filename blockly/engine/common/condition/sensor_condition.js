/* @preserve
 *
 *
 * Copyright (c) 2016 UBT Company
 *
 *
 */

/**
 * sensor_condition.js version 1.0
 *
 *  sensor_condition feature
 *  传感器条件类
 *
 * feature sensor_condition feature
 *
 */
'use strict';
;(function() {
    function SensorCondition(sensorType, operator, value, sensorId, branchId) {
        this.sensorType = sensorType;
        this.operator = operator;
        this.value = value;
        this.sensorId = sensorId;
        this.branchId = branchId;
        this.callback = 'sensorCallback';
    }

    SensorCondition.prototype.setSensorType = function(sensorType) {
        this.sensorType = sensorType;
    };

    SensorCondition.prototype.getSensorType = function() {
        return this.sensorType;
    };

    SensorCondition.prototype.setOperator = function(operator) {
        this.operator = operator;
    };

    SensorCondition.prototype.getOperator = function() {
        return this.operator;
    };

    SensorCondition.prototype.setValue = function(value) {
        this.value = value;
    };

    SensorCondition.prototype.getValue = function() {
        return this.value;
    };

    SensorCondition.prototype.setSensorId = function(sensorId) {
        this.sensorId = sensorId;
    };

    SensorCondition.prototype.getSensorId = function() {
        return this.sensorId;
    };

    SensorCondition.prototype.setBranchId = function(branchId) {
        this.branchId = branchId;
    };

    SensorCondition.prototype.getBranchId = function() {
        return this.branchId;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = SensorCondition;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return SensorCondition; });
    } else {
        this.SensorCondition = SensorCondition;
    }

}).call(this);
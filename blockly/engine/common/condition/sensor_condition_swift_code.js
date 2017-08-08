/* @preserve
 *
 *
 * Copyright (c) 2016 UBT Company
 *
 *
 */

/**
 * sensor_condition_swift_code.js version 1.0
 *
 *  sensor_condition_swift_code feature
 *  传感器值条件类
 *
 * feature sensor_condition_swift_code feature
 *
 */
'use strict';
(function() {
    var ubtBlocklyUtils = require('./../../common/utils/blockly_utils');
    var SensorCondition = require('./sensor_condition');
    var codeLanguage = require('./../../common/program/program_init');
    var _ = require('lodash');
    function SensorConditionSwiftCode() {
        this.conditionArray = [];
        this.dataCode = {};
        this.dataCodeArray = [];
    }

    var statusMap = ["release","click", "db_click", "press_hold"];

    SensorConditionSwiftCode.prototype.initConditionAndCode = function(typeArray) {
        this.initMainBranchCode(this.conditionArray, this.dataCode, this.dataCodeArray);
        var length = typeArray.length;
        var resultBlock = [];
        for (var i = 0 ;  i < length ; i++) {
             var conditionSensorBlock = ubtBlocklyUtils.findBlocksByType(typeArray[i]);
             resultBlock = _.union(resultBlock,conditionSensorBlock);
        }
        for (var i = 0 ; i< resultBlock.length; i++) {
            var block = resultBlock[i];
		    if (block.disabled == true) {
			    continue;
		    }
		    var sensor = block.getFieldValue('SENSOR');
            var operator = block.getFieldValue('OP');
            var operatorValue = block.getField('OP').getText();
            var value = block.getFieldValue('VALUE');
            var sensorId = block.getFieldValue('SENSOR_ID');
            var branchId = block.getFieldValue('PROGRAM_BRANCH');
            var sensorCondition = new SensorCondition(sensor, operator , value, sensorId,branchId);
		    this.conditionArray.push(sensorCondition);
            var swiftCode = ubtBlocklyUtils.blockToSwiftCodeInWorkspace(block,codeLanguage.workspace);
            var no_null = swiftCode.replace(/\ /g,"&nbsp;");
            swiftCode = prettyPrintOne(no_null.replace(/\n/g, "<br>"),"js") ;
            this.dataCode[branchId] = swiftCode;
            var tempCodeInfo = {};
            tempCodeInfo.branchId = branchId;
            tempCodeInfo.htmlCode = swiftCode;
            tempCodeInfo.sensor = sensor;
            tempCodeInfo.sensorId = sensorId;
            tempCodeInfo.operator = operator;
            tempCodeInfo.value = value;
            var htmlTitle = '';
            if (sensor == 'phone') {
                htmlTitle +=MSG['phone_pad'];
                htmlTitle +=MSG['tilt_'+value];
            } else if (sensor =='touch') {
                htmlTitle +=MSG['touch_sensor']+' ';
                htmlTitle +='ID-'+sensorId+' ';
                htmlTitle +=MSG['status']+' ';
                htmlTitle +='\''+MSG[statusMap[value]]+'\'';
            } else if (sensor =='infrared') {
                htmlTitle +=MSG['ir_sensor']+' ';
                htmlTitle +=''+sensorId+' ';
                htmlTitle +=MSG['id_sensor_reflectance_between_obstacle']+' ';
                htmlTitle +=operatorValue + value;
            }
            tempCodeInfo.htmlTitle = htmlTitle;
            this.dataCodeArray.push(tempCodeInfo);
        }
    };

    SensorConditionSwiftCode.prototype.initMainBranchCode = function(conditionArray, dataCode, dataCodeArray) {
        var startBlock = ubtBlocklyUtils.findBlocksByType('program_start');
        for (var i = 0 ; i < startBlock.length; i++ ) {
            var block = startBlock[i];
		    if (block.disabled == true) {
			    continue;
		    }

            var sensor = 'main';
            var operator = 'equal';
            var value = '0';
            var sensorId = '0';
            var branchId = 1;
            var sensorCondition = new SensorCondition(sensor, operator , value, sensorId,branchId);
		    conditionArray.push(sensorCondition);
            var swiftCode = ubtBlocklyUtils.blockToSwiftCodeInWorkspace(block,codeLanguage.workspace);
            var no_null = swiftCode.replace(/\ /g,"&nbsp;");
            swiftCode = prettyPrintOne(no_null.replace(/\n/g, "<br>"),"js") ;
            dataCode[branchId] = swiftCode;
            var tempCodeInfo = {};
            tempCodeInfo.branchId = branchId;
            tempCodeInfo.htmlCode = swiftCode;
            tempCodeInfo.sensor = sensor;
            tempCodeInfo.sensorId = sensorId;
            tempCodeInfo.operator = operator;
            tempCodeInfo.value = value;
            tempCodeInfo.htmlTitle = MSG['id_when_start'];
            dataCodeArray.push(tempCodeInfo);
        }
    };

    /**
     * 返回分支对应的代码
     */
    SensorConditionSwiftCode.prototype.getCodeByBranchId = function(branchId) {
        if (this.dataCode[branchId]) {
            return this.dataCode[branchId];
        }
        return '';
    };

    /**
     * 返回分支对应的代码
     */
    SensorConditionSwiftCode.prototype.getDataCodeArray = function() {
        return this.dataCodeArray;
    };

    /**
     * 返回所有的条件数组
     */
    SensorConditionSwiftCode.prototype.getConditionArray = function() {
        return this.conditionArray;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = SensorConditionSwiftCode;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return SensorConditionSwiftCode; });
    } else {
        this.SensorConditionSwiftCode = SensorConditionSwiftCode;
    }

}).call(this);
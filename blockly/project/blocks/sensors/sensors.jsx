/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * movement.jsx version 1.0
 * 
 * block custom define
 * 
 * feature start block, goto start block
 * create by hsp 0906
 */
'use strict';
var colours = require('../../../engine/service/colours');
var FieldDropDownAdapter = require('../../../engine/adapter/field_dropdown_adapter');
var FieldGyroscopeAngleAdapter = require('../../../engine/adapter/field_gyroscope_angle_adapter');
var blocklyDatas = require('../../../engine/service/blockly_datas');
var FieldDefaultIdAdapter = require('../../../engine/adapter/field_default_id_adapter');
module.exports = function(Blocks) {
    /*红外传感器*/
    Blocks['sensor_infrared_sensor_distance'] = {
      init: function() {
        /**
        var infraredId = blocklyDatas.getDataByKey('infraredId');
        var infraredArray = [];
        if (infraredId) {
            var infraredIds = infraredId.split('|');
            var len = infraredIds.length;           
            for (var i = 0 ; i <len; i++ ) {
                var tempObj = [];
                tempObj[0] = infraredIds[i];
                tempObj[1] = infraredIds[i];
                infraredArray.push(tempObj);
            }
        }     
        if (infraredArray.length == 0) {
            infraredArray = [["ID-1", "ID-1"]];
        }
        */
        this.setInputsInline(true);
        var image = new Blockly.FieldImage("./images/toolbar/icon_infrared_sensor.png", 18, 18, "infrared_sensor");
        this.appendDummyInput('images').appendField(image).appendField(MSG['id_sensor_IR_sensor']);
        var infraredArr = blocklyDatas.getInfraredIds();
        var adapter = '';
        if (infraredArr && infraredArr[0] == 'ID') {//未连接红外传感器
            adapter = new FieldDefaultIdAdapter('ID',function() {

            },'infrared');
        } else {
            adapter = new FieldDropDownAdapter(blocklyDatas.getInfraredIdArr());
        }
        this.appendDummyInput('infrared_sensor_input').appendField(adapter, "SENSOR_ID");
        this.appendDummyInput('infrared_sensor_distance').appendField(MSG['id_sensor_reflectance_between_obstacle']);
        this.setOutput(true, "Number");     
        this.setColour(colours.id_sensors.primary);
        this.setTooltip('');
        this.setHelpUrl('');
      } ,
      convertValueToText : function convertValueToText(value, name) {
            if (name == 'SENSOR_ID' ) {
                var infraredArr = blocklyDatas.getInfraredIds();
                if(infraredArr[0] == 'ID' && !isNaN(value)) {//断开连接
                    var input = this.getInput("infrared_sensor_input");
                    input.removeField('SENSOR_ID');
                    var infraredArray = [];
                    var temp= [];
                    temp[0] = 'ID-'+value;
                    temp[1] = value;
                    infraredArray.push(temp);
                    var adapter = new FieldDropDownAdapter(infraredArray);
                    input.appendField(adapter,'SENSOR_ID');
                }
                if (infraredArr[0] == 'ID' && value == 'ID' ) {
                    this.setDisabled(true);
                    //this.addWrongClass(value);
                    return;
                } 
            }        
        }
    };
    /*触碰传感器*/
    Blocks['sensor_touch_sensor_status'] = {
      init: function() {
        /**
        var touchIdStr = blocklyDatas.getDataByKey('touchId');
        var touchIdArray = [];

        if (touchIdStr) {
           var touchIds = touchIdStr.split('|');           
           for (var i = 0; i < touchIds.length; i++) {
             var tempObj = [];
             tempObj[0] = touchIds[i];
             tempObj[1] = touchIds[i];
             touchIdArray.push(tempObj);
           }
        }

        if (0 == touchIdArray.length){
          touchIdArray = [["ID-1", "ID-1"]];
        }
         */
        this.setInputsInline(true);
        var image = new Blockly.FieldImage("./images/toolbar/icon_touch_sensor.png", 18, 18, "touch_sensor");
        this.appendDummyInput('images').appendField(image);
        this.appendDummyInput()
            .appendField(MSG['id_sensor_touch_sensor']);
         var touchArr = blocklyDatas.getTouchIds();
         var adapter = '';
         if (touchArr && touchArr[0] == 'ID') {//未连接红外传感器
             adapter = new FieldDefaultIdAdapter('ID',function() {               
             },'touch');
         } else {
             adapter = new FieldDropDownAdapter(blocklyDatas.getTouchIdArr());
         }
        this.appendDummyInput('touch_sensor_input')
            .appendField(adapter, "SENSOR_ID")
            .appendField(MSG['id_sensor_touch_sensor_status']);
        this.setOutput(true, "Number");
        this.setColour(colours.id_sensors.primary);
        this.setTooltip('');
        this.setHelpUrl('');
      },
      convertValueToText : function convertValueToText(value, name) {
            if (name == 'SENSOR_ID' ) {
                var touchArr = blocklyDatas.getTouchIds();
                if(touchArr[0] == 'ID' && !isNaN(value)) {//断开连接
                    var input = this.getInput("touch_sensor_input");
                    input.removeField('SENSOR_ID');
                    var touchArray = [];
                    var temp= [];
                    temp[0] = 'ID-'+value;
                    temp[1] = value;
                    touchArray.push(temp);
                    var adapter = new FieldDropDownAdapter(touchArray);
                    input.appendField(adapter,'SENSOR_ID');
                }
                if (touchArr[0] == 'ID' && value == 'ID' ) {
                    this.setDisabled(true);
                    //this.addWrongClass(value);
                    return;
                } 
            }        
        }
    };
    /*陀螺仪*/
    Blocks['sensor_gyroscope_sensor_angle'] = {
      init: function init() {
        /**
        var gyroscopeIdStr = blocklyDatas.getDataByKey('gyroscopeId');
        var gyroscopeIdArray = [];

        if (gyroscopeIdStr) {
          var gyroscopeIds = gyroscopeIdStr.split('|');

          for (var i = 0; i < gyroscopeIds.length; i++) {
            var tempObj = [];
            tempObj[0] = gyroscopeIds[i];
            tempObj[1] = gyroscopeIds[i];
            gyroscopeIdArray.push(tempObj);
          }
        }

        if (0 == gyroscopeIdArray.length) {
          gyroscopeIdArray = [["ID-1", "ID-1"]];
        }
         */
        var AXIES = [[MSG['x_axie'], "x"], [MSG['y_axie'], "y"], [MSG['z_axie'], "z"]];
        this.setInputsInline(true);
        var image = new Blockly.FieldImage("./images/toolbar/icon_gyroscope_sensor.png", 18, 18, "gyroscope_sensor");
        this.appendDummyInput('images').appendField(image);
        this.appendDummyInput()
          .appendField(MSG['id_sensor_gyroscope']);
        var gyroscopeArr = blocklyDatas.getGyroscopeIds();
        var adapter = '';
        if (gyroscopeArr && gyroscopeArr[0] == 'ID') {//未连接红外传感器
            adapter = new FieldDefaultIdAdapter('ID',function() {               
            },'gyroscope');
        } else {
            adapter = new FieldDropDownAdapter(blocklyDatas.getGyroscopeIdArr());
        }
        this.appendDummyInput('gyro_sensor_input')
          .appendField(adapter, "SENSOR_ID");
        this.appendDummyInput("empty").appendField(' ');
        this.appendDummyInput() 
          .appendField(new FieldGyroscopeAngleAdapter('x_axie',function(params) {
              this.sourceBlock_.updateShape_(params);
          }), "AXIE")
          .appendField(MSG['id_sensor_angle']);
        this.setOutput(true, "Number");
        this.setColour(colours.id_sensors.primary);
        this.setTooltip('');
        this.setHelpUrl('');
      }, 
      popupKey : 'gyroRotateDirection',
      popupService : function popupService() {
          var direction = this.getFieldValue('AXIE');
          var sensorId = this.getFieldValue('SENSOR_ID');
          var objData = {};
          objData.direction = direction;
          objData.gyroId = sensorId;
          return objData;
      },
      updateShape_ : function updateShape_(param) {
        console.log(param);
          var direction = param.direction;
          this.setFieldValue(direction, 'AXIE');
          var msgKey = direction;
          var msgText = MSG[msgKey];
          this.getField('AXIE').setText(msgText);
      } ,
      convertValueToText : function convertValueToText(value ,name) {
          if (name == 'AXIE') {
               var msgKey = value;
               var msgText = MSG[msgKey];
               this.getField('AXIE').setText(msgText);
               return;
          }
          if (name == 'SENSOR_ID') {
                var gyroscopeArr = blocklyDatas.getGyroscopeIds();
                if(gyroscopeArr[0] == 'ID' && !isNaN(value)) {//断开连接
                    var input = this.getInput("gyro_sensor_input");
                    input.removeField('SENSOR_ID');
                    var gyroscopeArray = [];
                    var temp= [];
                    temp[0] = 'ID-'+value;
                    temp[1] = value;
                    gyroscopeArray.push(temp);
                    var adapter = new FieldDropDownAdapter(gyroscopeArray);
                    input.appendField(adapter,'SENSOR_ID');
                }
                if (gyroscopeArr[0] == 'ID' && value == 'ID' ) {
                    this.setDisabled(true);
                    //this.addWrongClass(value);
                    return;
                }
            } 
      }
    };
     /*舵机*/
    Blocks['sensor_servo_angle'] = {
      init: function() {

        /**
        var servoIdStr = blocklyDatas.getDataByKey('servos');
        var servoIdArray = [];

        if (servoIdStr) {
          var servoIds = servoIdStr.split('|');

          for (var i = 0; i < servoIds.length; i++) {
            var tempObj = [];
            tempObj[0] = servoIds[i];
            tempObj[1] = servoIds[i];
            servoIdArray.push(tempObj);
          }
        }

        if (0 == servoIdArray.length) {
          servoIdArray = [["ID-1", "ID-1"]];
        }
        */
        this.setInputsInline(true);
        var image = new Blockly.FieldImage("./images/toolbar/icon_servo.png", 18, 18, "servo");
        this.appendDummyInput('images').appendField(image);
        var servos = blocklyDatas.getServoIdArr();
        var adapter = '';
        if (servos && servos[0][0] == 'ID') {
            adapter = new FieldDefaultIdAdapter('ID',function() {               
            },'servo');
        } else {
            adapter = new FieldDropDownAdapter(servos);
        }
        this.appendDummyInput('servo_input_value')
            .appendField(MSG['servo'])
            .appendField(adapter, "SENSOR_ID")
            .appendField(MSG['id_sensor_angle']);
        this.setOutput(true, "Number");
        this.setColour(colours.id_sensors.primary);
        this.setTooltip('');
        this.setHelpUrl('');
      },
      convertValueToText : function convertValueToText(value ,name) {
          if (name == 'SENSOR_ID') {
              var servoIds = blocklyDatas.getServoIds();
              if (servoIds[0] == 'ID' && value =='ID') {
                  this.setDisabled(true);
                  return;
              }
          }
      }
    };
    /*设置陀螺仪角度为0*/
    Blocks['sensor_set_gyrocope_to_zero'] = {
      init: function() {

        // 获取陀螺仪ID参数值
        /**
        var gyroscopeIdStr = blocklyDatas.getDataByKey('gyroscopeId');
        var gyroscopeIdArray = [];

        if (gyroscopeIdStr) {
          var gyroscopeIds = gyroscopeIdStr.split('|');

          for (var i = 0; i < gyroscopeIds.length; i++) {
            var tempObj = [];
            tempObj[0] = gyroscopeIds[i];
            tempObj[1] = gyroscopeIds[i];
            gyroscopeIdArray.push(tempObj);
          }
        }

        if (0 == gyroscopeIdArray.length) {
          gyroscopeIdArray = [["ID-1", "ID-1"]];
        }
         */

        // 自定义
        this.setInputsInline(true);
        var image = new Blockly.FieldImage("./images/toolbar/icon_gyroscope_sensor.png", 18, 18, "gyroscope_sensor");
        this.appendDummyInput('images').appendField(image);
        this.appendDummyInput()
            .appendField(MSG['id_sensor_set_gyroscope']);
        var gyroscopeArr = blocklyDatas.getGyroscopeIds();
        var adapter = '';
        if (gyroscopeArr && gyroscopeArr[0] == 'ID') {//未连接红外传感器
            adapter = new FieldDefaultIdAdapter('ID',function() {               
            },'gyroscope');
        } else {
            adapter = new FieldDropDownAdapter(blocklyDatas.getGyroscopeIdArr());
        }
        this.appendDummyInput('gyro_sensor_input')
            .appendField(adapter, "SENSOR_ID");
        this.appendDummyInput()
            .appendField(MSG['id_sensor_angle_to_zero']);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colours.id_sensors.primary);
        this.setTooltip('');
        this.setHelpUrl('');
      } ,
      convertValueToText : function convertValueToText(value ,name){
        if (name == 'SENSOR_ID') {
            var gyroscopeArr = blocklyDatas.getGyroscopeIds();
            if(gyroscopeArr[0] == 'ID' && !isNaN(value)) {//断开连接
                var input = this.getInput("gyro_sensor_input");
                input.removeField('SENSOR_ID');
                var gyroscopeArray = [];
                var temp= [];
                temp[0] = 'ID-'+value;
                temp[1] = value;
                gyroscopeArray.push(temp);
                var adapter = new FieldDropDownAdapter(gyroscopeArray);
                input.appendField(adapter,'SENSOR_ID');
            }
            if (gyroscopeArr[0] == 'ID' && value == 'ID' ) {
                this.setDisabled(true);
                //this.addWrongClass(value);
                return;
            } 
        } 
      }
    };

}
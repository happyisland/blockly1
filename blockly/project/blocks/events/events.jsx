/**
 * Created by ubt on 2016/9/1.
 */

'use strict';
var FieldTouchSensor = require('../../../engine/adapter/field_touch_sensor');
var FieldDeviceTilt = require('../../../engine/adapter/field_device_tilt');
var FieldInfraredSensor  = require('../../../engine/adapter/field_infrared_sensor');
var colours = require('../../../engine/service/colours');
var blocklyDatas = require('../../../engine/service/blockly_datas');
var FieldDropDownAdapter = require('../../../engine/adapter/field_dropdown_adapter');
var FieldNumberAdapter = require('../../../engine/adapter/field_number_adapter');
var FieldGyroscopeAngleAdapter = require('../../../engine/adapter/field_gyroscope_angle_adapter');
var FieldDefaultIdAdapter = require('../../../engine/adapter/field_default_id_adapter');
var Map = require('./../../../engine/common/utils/map');
var _= require('lodash');

module.exports = function(Blocks){
    Blocks['event_mainboard_power'] = {
        init: function init() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("./images/toolbar/icon_power.png", 18, 18, "power"))
                .appendField(MSG['low_power']);
            this.setOutput(true, "Boolean");
            this.setColour(colours.id_events.primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blocks['event_infrared_sensor'] = {
        init: function init() {

            // 获取传感器ID
            /**
            var infraredId = blocklyDatas.getDataByKey('infraredId');
            var infraredArray = [];
            if (infraredId) {
                var infraredIds = infraredId.split('|');
                var len = infraredIds.length;
                for (var i = 0; i < len; i++) {
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

            // 定义块
            var distanceArray = [[MSG['distance_very_near'], "1"], [MSG['distance_near'], "2"], [MSG['distance_middle'], "3"], [MSG['distance_far'], "4"], [MSG['distance_very_far'], "5"]];
            this.appendDummyInput("infrared_sensor_images")
                .appendField(new Blockly.FieldImage("./images/toolbar/icon_infrared_sensor.png", 18, 18, "infrared_sensor"))
                .appendField(MSG['ir_sensor']);
            var infraredArr = blocklyDatas.getInfraredIds();
            var adapter = '';
            if (infraredArr && infraredArr[0] == 'ID') {//未连接红外传感器
                adapter = new FieldDefaultIdAdapter('ID',function() {

                },'infrared');
            } else {
                adapter = new FieldDropDownAdapter(blocklyDatas.getInfraredIdArr());
            }
            this.appendDummyInput("infrared_sensor_input").appendField(adapter, "SENSOR_ID");
            this.appendDummyInput("infrared_sensor_operator").appendField(MSG['id_sensor_reflectance_between_obstacle'])
                .appendField(new FieldDropDownAdapter([[">", "GT"], ["<", "LT"], ["=", "EQ"],["≠", "NEQ"]]), "OP")
                .appendField(" ");
            var FieldInfraredSensor = new Blockly.FieldInfraredSensor("  1  ", function(param) { 
                this.sourceBlock_.updateText(param);
            });
            this.appendDummyInput().appendField(FieldInfraredSensor, 'DISTANCE');
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(colours.id_events.primary);
            this.setTooltip('');
            this.setHelpUrl('');
        },
        popupKey : 'infraredSensor',

        popupService : function popupService() {
            var map = new Map();
            map.put("GT", ">");
            map.put("LT", "<");
            map.put("EQ", "=");
            map.put("NEQ", "≠");
            var curValue = _.trim(this.getFieldValue('DISTANCE'));
            var sensorId = this.getFieldValue('SENSOR_ID');
            var opType = this.getFieldValue('OP');
            var objData = {};
            objData.changeValue = curValue;
            objData.sensorId = sensorId;
            objData.opType = map.get(opType);
            return objData;
        },

        updateText : function updateShape_(param) {
            var changeValue = param.changeValue;
            this.setFieldValue(changeValue+'', 'DISTANCE');
            /**
            var msgKey = 'distance_'+ changeValue;
            var msgText = MSG[msgKey]; 
             */
            this.getField('DISTANCE').setText('  '+changeValue+'  ');
        } ,
        convertValueToText : function convertValueToText(value, name) {
            /**
            var msgKey = 'distance_'+ value;
            var msgText = MSG[msgKey]; 
             */
            if(name == 'DISTANCE') {
                value = _.trim(value);
                this.getField('DISTANCE').setText('  ' + value + '  ');
                return;
            }
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
                    return;
                }
                if (infraredArr[0] == 'ID' && value == 'ID' ) {
                    this.setDisabled(true);
                    //this.addWrongClass(value);
                    return;
                } 
            }        
        }
    };

    Blocks['event_touch_sensor'] = {
        init: function init() {
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

            if (0 == touchIdArray.length) {
                touchIdArray = [["ID-1", "ID-1"]];
            }
             */
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("./images/toolbar/icon_touch_sensor.png", 18, 18, "touch_sensor"))
                .appendField(MSG['touch_sensor']);
            var touchArr = blocklyDatas.getTouchIds();
            var adapter = '';
            if (touchArr && touchArr[0] == 'ID') {//未连接红外传感器
                adapter = new FieldDefaultIdAdapter('ID',function() {               
                },'touch');
            } else {
                adapter = new FieldDropDownAdapter(blocklyDatas.getTouchIdArr());
            }
            this.appendDummyInput('touch_sensor_input')
                .appendField(adapter, "SENSOR_ID");
            this.appendDummyInput()
                .appendField(MSG['status']);
            var touchSensor = new Blockly.FieldTouchSensor("release", "0", function(params) {
                this.sourceBlock_.updateShape_(params);
            });
            this.appendDummyInput()
                .appendField(touchSensor, 'STATUS');
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(colours.id_events.primary);
            this.setTooltip('');
            this.setHelpUrl('');
        }, 
        popupKey : 'touchSensor',
        popupService : function popupService() {
            var status = this.getFieldValue('STATUS');
            var sensorId = this.getFieldValue('SENSOR_ID');
            var objData = {};
            objData.status = status;
            objData.sensorId = sensorId;
            return objData;
        },
        updateShape_ : function updateShape_(param) {
            // 从block 弹出窗口中获得的值为 0, 1, 2, 3, 分别对应 '松开'，'单击', '双击', '长按'
            // 与U3D 返回的值一致
            var status = param.status;
            var msgKey = '';
            // 映射转换，获取多语言显示的key值
            var valMap = ["release", "click", "db_click", "press_hold"];
            for(var idx = 0; idx < valMap.length; idx++){
                if(idx == status){
                    msgKey = valMap[idx];
                }
            }
            this.setFieldValue(status, 'STATUS');
            // 获取多语言显示文本
            var msgText = MSG[msgKey];
            this.getField('STATUS').setText(msgText);
        } ,
        convertValueToText : function convertValueToText(value ,name) {
            if (name == 'STATUS') {
                var msgKey = '';
                // 映射转换，获取多语言显示的key值
                var valMap = ["release", "click", "db_click", "press_hold"];
                for(var idx = 0; idx < valMap.length; idx++){
                    if(idx == value){
                        msgKey = valMap[idx];
                    }
                }
                var msgText = MSG[msgKey];
                this.getField('STATUS').setText(msgText);
                return;
            }

            if (name == 'SENSOR_ID') {
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

    Blocks['event_gyroscope'] = {
        init: function () {
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
              var that = this;
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("./images/toolbar/icon_gyroscope_sensor.png", 18, 18, "gyroscope_sensor"))
                .appendField(MSG['gyroscope']);
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
                .appendField(MSG['id_sensor_angle'])
                .appendField(new FieldDropDownAdapter([[">", "GT"], ["<", "LT"], ["=", "EQ"],["≠", "NEQ"]]), "OP")
                .appendField(new FieldNumberAdapter('  0  ', -118 ,118,
                    1,function(value){
                        value = parseInt(value);
                        var angle = that.getFieldValue('AXIE');
                        if (isNaN(value)) {
                            value = 0;
                        }
                        if (angle == 'x_axie' || angle == 'z_axie') {
                            if (value > 180) {
                                value = 180;
                            } else if (value < -179) {
                                value = -179;
                            } 
                        } else {
                            if (value > 90) {
                                value = 90;
                            } else if (value < -89) {
                                value = -89;
                            } 
                        } 
                        return ('  '+value + '  ');                  
                    }), "ANGLE");
            this.setOutput(true, "Boolean");
            this.setInputsInline(true);
            this.setColour(colours.id_events.primary);
            this.setTooltip('');
            this.setHelpUrl('');
        } , 
      popupKey : 'gyroRotateDirection',
      popupService : function popupService() {
          var direction = _.trim(this.getFieldValue('AXIE'));
          var sensorId = this.getFieldValue('SENSOR_ID');
          var objData = {};
          objData.direction = direction;
          objData.gyroId = sensorId;
          return objData;
      },
      updateShape_ : function updateShape_(param) {
          var direction = param.direction;
          this.setFieldValue(direction, 'AXIE');
          var msgKey = direction;
          var msgText = MSG[msgKey];
          this.getField('AXIE').setText(msgText);
      } ,
      convertValueToText : function convertValueToText(value , name) {
          if ('AXIE' == name) {
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

    Blocks['event_phone_pad_tilt'] = {
        init: function init() {
            var directionArray = [[MSG['tilt_left'], "left"], [MSG['tilt_right'], "right"], [MSG['tilt_up'], "up"], [MSG['tilt_down'], "down"], [MSG['tilt_swing'], "swing"]];
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("./images/toolbar/icon_phone_pad.png", 18, 18, "phone_pad"))
                .appendField(MSG['phone_pad']);
            var deviceTilt = new Blockly.FieldDeviceTilt("left", function(param) {
                this.sourceBlock_.updateShape_(param);
            });
            this.appendDummyInput().appendField(deviceTilt, 'TILT_TYPE'); 
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(colours.id_events.primary);
            this.setTooltip('');
            this.setHelpUrl('');
        },
        popupKey : 'deviceTilt',

        popupService : function popupService() {
            var direction = this.getFieldValue('TILT_TYPE');
            var objData = {};
            objData.direction = direction;
            return objData;
        },

        updateShape_ : function updateShape_(param) {
            var direction = param.direction;
            this.setFieldValue(direction, 'TILT_TYPE');
            var msgKey = 'tilt_'+ direction;
            var msgText = MSG[msgKey];
            this.getField('TILT_TYPE').setText(msgText);
        } ,
        convertValueToText : function convertValueToText(value,name) {
            var msgKey = 'tilt_'+ value;
            var msgText = MSG[msgKey];
            this.getField('TILT_TYPE').setText(msgText);
        }
    };
}

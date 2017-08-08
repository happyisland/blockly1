/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * popup_show.js version 1.0
 * 
 * popup_show 
 * 
 * feature 显示消息的浮动延迟框
 * 
 */
 
'use strict'
;(function(){
    var blocklyDatas = require('../../service/blockly_datas');
    var dataService = require('../../service/data_service');
    var eventsListener = require('../../common/events_listener');
    function PopupShow() {

    }

    PopupShow.prototype.isShowAlert = function(popupType , popupData) {
        var res_temp = true;
        var temp_data  = [];
        var show_str = "";
        if(popupType == "servoAngle" || popupType == "servoStatus"){  //判断模型中是否有普通角度舵机
            temp_data  =  blocklyDatas.getServoIds();
            var currentBlockData = popupData[0];
            if(temp_data[0]=="ID" && currentBlockData && currentBlockData['servoId'] == 'ID'){
                show_str = MSG.speed_only_360_value;
                // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.speed_only_360_value,"btnText":$scope.languageResource.servo_angle_popup_ok});
                res_temp = false;
            }
        }else if(popupType == "rotateServo"){  //判断  模型中没有可以360°旋转的舵机
            temp_data  =  blocklyDatas.getCircleServosIds();
            var currentBlockData = popupData[0];
            if(temp_data[0]=="ID" && currentBlockData && currentBlockData['servoId'] == 'ID'){
                show_str = MSG.speed_no_value;
                // $scope.showAlert({"title":$scope.languageResource.rotate_servo_popup_title,"content":$scope.languageResource.speed_no_value,"btnText":$scope.languageResource.rotate_servo_popup_ok});
                res_temp = false;
            }
        }else if(popupType == "settingLight" || popupType == "emotionDisplay"||popupType == "sceneLightDisplay"){  //判断是否连接灯光
            temp_data =  blocklyDatas.getLightsIds();
            var currentBlockData = popupData.lightArray[0];
            if(temp_data[0]=="ID" && currentBlockData && currentBlockData['id'] == 'ID'){
                show_str = MSG.lights_tips;
                // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.lights_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                res_temp = false;
            }
        }else if(popupType == "infraredSensor"){  //判断是否连接红外传感器
            temp_data =  blocklyDatas.getInfraredIds();
            var currentBlockData = popupData;
            if(temp_data[0]=="ID" && currentBlockData && currentBlockData['sensorId'] == 'ID'){
                show_str = MSG.infrared_tips;
                // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.infrared_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                res_temp = false;
            }
        }else if(popupType == "touchSensor"){  //判断是否连接触碰传感器
            temp_data =  blocklyDatas.getTouchIds();
            var currentBlockData = popupData;
            if(temp_data[0]=="ID" && currentBlockData && currentBlockData['sensorId'] == 'ID'){
                show_str = MSG.touch_tips;
                // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.touch_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                res_temp = false;
            } else if (!isNaN(temp_data[0]) &&　currentBlockData && currentBlockData['sensorId'] == 'ID') {
                show_str = MSG.touch_tips_error;
                res_temp = false;
            }
        }else if(popupType == "gyroRotateDirection"){  //判断是否连接陀螺仪
            temp_data =  blocklyDatas.getGyroscopeIds();
            var currentBlockData = popupData;
            if(temp_data[0]=="ID" && currentBlockData && currentBlockData['gyroId'] == 'ID'){
                show_str = MSG.gyroscope_tips;
                // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.gyroscope_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                res_temp = false;
            }
        }
        if(popupType == "settingLight" || popupType == "emotionDisplay" || popupType == "sceneLightDisplay" ||popupType == "infraredSensor"||popupType == "touchSensor"||popupType == "gyroRotateDirection"){
            var blueStatus =  blocklyDatas.getDataByKey('blueState'); 
            if(!window.blocklyObj){
                blueStatus =1;
            }
            if (!blueStatus || blueStatus =='0') {
                dataService.command('blueConnect');
                return false;
            }
        }
        if(res_temp==false){
            var data= {tipsContent:show_str, tipsType:'error'}
            eventsListener.trigger('systemPrompt',data);
        }
        return res_temp;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new PopupShow;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new PopupShow; });
    } else {
        this.MessageDialog = new PopupShow;
    }
}).call(this);
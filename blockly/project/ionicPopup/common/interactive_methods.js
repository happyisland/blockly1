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
 
    var eventsListener = require('./../../../engine/common/events_listener');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var BlockInfaredSensorShower = require('./block_infared_sensor_shower.jsx');
    var programManager = require('./../../../engine/common/program/program_manager');
    var ubtUtils = require('./../../../engine/common/utils/utils');
    var RobatCommand = require('./../../../engine/service/robat_command');
    var blocklyDatas = require('./../../../engine/service/blockly_datas');
    var api = require('./../../../engine/API');
    var blocklyUtils = require('./../../../engine/common/utils/blockly_utils');
    var _ = require('lodash');
    var isExecute = true;

    /**
     * When running a program, the {ProgramRunner} will wait for this method to be called before executing the next step.
     */
    window.continueSteps = function(branchId){
        console.log('callback branchId:'+branchId);
        var timer = blocklyDatas.getDataByKey('currentTime');
        if (window.blocklyObj && window.blocklyObj.logDebug) {
            window.blocklyObj.logDebug('block finish command, cost time:'+ timer.timeElapsed() +' unit.');
        }
        var programRunnerIndex = '';
        if (branchId &&　!isNaN(branchId)) {
            programRunnerIndex = branchId;
        } else {
            programRunnerIndex = programManager.getProgramRunnerIndex();
        }  
        // var programRunnerIndex = programManager.getProgramRunnerIndex();
        console.log('next_step'+programRunnerIndex);
        eventsListener.trigger('next_step' + programRunnerIndex);
    };

    window.nextFn = function(){    
        eventsListener.trigger('next_function');
    };

    window.showException = function(exception){
        console.log('exception:'+ exception);    
        if (exception) {
            eventsListener.trigger("stop_execution");
            var stopRobatCommand = new RobatCommand('stopRobot');
            stopRobatCommand.send();
            if (exception =='ReceiveMemoryWarning') {
                eventsListener.trigger("infnite_loop_error");
            } 
        }
    };

    //修改轮模式舵机后的回调函数
    window.refreshAllServo = function(param) {
        var allServo = JSON.parse(decodeURI(param));
        var commonServo = allServo['commonServo'];
        var circleServo = allServo['circleServo'];
        blocklyDatas.setKeyData('servos', commonServo);
        blocklyDatas.setKeyData('circleServos', circleServo);
        //初始化普通舵机和轮模式舵机
        blocklyDatas.initServosId();
        blocklyDatas.initCircleServosId();

        //遍历工作空间的块，判断是否属于合法的块
        blocklyUtils.iterateBlocks(function(block){
            if (block.type == 'movement_servo_rotate_circle') {
                //获取轮模式舵机的信息
                var servoGroup = block.getFieldValue('servoGroup');
                if(servoGroup.indexOf('#') > -1 || servoGroup.indexOf('ID') > -1) {
                    return;
                }
                var servoInfoArr  = JSON.parse(servoGroup);
                //程序块中的轮模式舵机
                var circleServoIds = [];
                for (var i = 0; i < servoInfoArr.length; i++) {
                    circleServoIds.push(servoInfoArr[i]['servoId']);
                }
                var currentCircleServoId = blocklyDatas.getCircleServosIds();
                //获取这两个集合的交集，如果交集与当前的的块的值一样，则这个块是可以使用的，否则灰掉这个块
                var unionResultId = _.intersection(circleServoIds, currentCircleServoId);
                if (!_.isEqual(unionResultId, circleServoIds)) {
                    block.setDisabled(true);
                } else {
                    block.setDisabled(false);
                }
            }

            if (block.type == 'movement_servo_change_angle_multi') {
                //获取舵机的信息
                var servoGroup = block.getFieldValue('servoGroup');
                if(servoGroup.indexOf('#') > -1 || servoGroup.indexOf('ID') > -1) {
                    return;
                }
                var servoInfoArr  = servoGroup.split(',');
                //程序块中的舵机
                var servoIds = [];
                for (var i = 0; i < servoInfoArr.length; i++) {
                    servoIds.push(servoInfoArr[i].split(':')[0]);
                }
                var currentServoId = blocklyDatas.getServoIds();
                //获取这两个集合的交集，如果交集与当前的的块的值一样，则这个块是可以使用的，否则灰掉这个块
                var unionResultId = _.intersection(servoIds, currentServoId);
                if (!_.isEqual(unionResultId, servoIds)) {
                    block.setDisabled(true);
                } else {
                    block.setDisabled(false);
                }
            }

            if (block.type == 'sensor_servo_angle') {
                //获取当前块的舵机信息
                var sensorId = block.getFieldValue('SENSOR_ID');  
                var currentServoId = blocklyDatas.getServoIds();
                //获取这两个集合的交集，如果交集与当前的的块的值一样，则这个块是可以使用的，否则灰掉这个块
                var isContain = _.includes(currentServoId, sensorId);
                if (!isContain) {
                    block.setDisabled(true);
                } else {
                    block.setDisabled(false);
                }
            }
        });

    };

    /**
     * @branchId 程序的分支ID， 
     * @jsonParam 传递给小胡的参数
     */
    window.sensorCallback = function(branchId, jsonParam) {
        console.log("--------------------跳转到分支ID："+branchId);
        console.log(jsonParam);
        //一旦接受到跳转到其他分支的命令，则直接停止机器人
        var stopRobatCommand = new RobatCommand('stopRobot');
        stopRobatCommand.send();
        var programStatus = blocklyDatas.getDataByKey('programRunning');
        console.log('程序的运行状态为：' + programStatus);
        if (programStatus) {
            //blocklyDatas.setKeyData('forward_another',true);
            eventsListener.once('forward_another', function() {
                api.wwGotoConditionStart(branchId);
            });
            eventsListener.trigger("stop_execution"); 
        } else if (!programStatus && !blocklyDatas.getDataByKey('programStopManner')) {
            //没有点击停止才启动程序，如果点击了停止，则不能再启动程序
            console.log('停止后再次来了一个分支');
            api.wwGotoConditionStart(branchId);
        }  
    };

    /**
     * 返回blockly的当前版本，此版本记录了有多少个块的信息
     */
    window.getBlocklyVersion = function() {
        return Blockly.Blocks.version;
    };

    /**
     * 获取红外传感器的值
     */
    window.readInfraredCallBack = function (data) {
        eventsListener.trigger('refreshInfrared',data);
    };

    /**
     * 获取陀螺仪传感器的值
     */
    window.readDeviceCallBack = function(data) {
        eventsListener.trigger('refreshGyro',data);
    };
    /**
     * 连接／断开   蓝牙
     */
    window.blueConnectCallBack = function(data) {
        eventsListener.trigger('ConnectBLE',data);
        eventsListener.trigger('DisconnectBLE',data);
    };
    /**
     * 系统提示  data：{ tipsContent:"",   tipsType:""}  tipsContent:提示信息   tipsType：提示类型   error错误类型
     */
    window.systemPrompt = function(data){
        eventsListener.trigger('systemPrompt',data);
    };

    /**
     * 充电保护提示
     * @param msg
     */
    window.chargeProtection = function(data){
        //回掉函数
        var callBack_ = function(){
            var temp_command = new RobatCommand('CloseWindow');
            temp_command.send();
        };
        var alertObj =  {"title":MSG.porject_alert_title,
            "content":data,
            "btnText":MSG.porject_alert_btnText};

        var ChargeProtectedComponent = require('../../../engine/test/chargeProtectedComponent.jsx');
        var $ = require('jquery');
        //弹框提示
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("messagetip_div"));
            $("#messagetip_div").empty();
        };
        ReactDOM.render(
            React.createElement(ChargeProtectedComponent,
                {
                    onRemove: removeComponent,
                    popupObj: alertObj,
                    callBack:callBack_

                }
            ), document.getElementById("messagetip_div")
        );
    };


    //iOS 或者Java调用js显示最新的红外传感器的值
    /**
     * parameters 最新的传感器的值
     */
    window.showInfraredRef = function(ref) {
       var  new_ref = decodeURI(ref);
       //console.log(showObj.isCanShowAll);
       if (showObj.isCanShowAll) {
           ReactDOM.render(React.createElement(BlockInfaredSensorShower,
         {infraredValue: new_ref, showStatus:true}), document.getElementById("infoShower"));
       }
       
       /**
       var resultJson = JSON.parse(new_ref);
       var condition = blocklyDatas.getDataByKey('sensor_condition');
       if (!condition) {
           return;
       }
       var operator = condition['operator'];
       var sensorType = condition['sensorType'];
       var value = condition['value'];
       if (value == 0) {
           return;
       }
       if (operator == 'GT' && resultJson[sensorType]) {
           if (resultJson[sensorType][0]['result'] > value && blocklyDatas.getDataByKey('forward_another') == undefined) {
               
               if (blocklyDatas.getDataByKey('programRunning')) {
                    blocklyDatas.setKeyData('forward_another',true);
                    console.log('绑定大于跳转程序的事件');
                    eventsListener.on('forward_another', function() {
                        api.wwGotoConditionStart();
                    });
                   eventsListener.trigger("stop_execution"); 
               } else {
                   api.wwGotoConditionStart();
               }             
           }
       } else if (operator == 'LT' && resultJson[sensorType]) {
           if (resultJson[sensorType][0]['result'] < value && blocklyDatas.getDataByKey('forward_another') == undefined) {      
               if (blocklyDatas.getDataByKey('programRunning')) {
                    blocklyDatas.setKeyData('forward_another',true);
                    console.log('绑定小于跳转程序的事件');
                    eventsListener.on('forward_another', function() {
                        api.wwGotoConditionStart();
                    });
                   eventsListener.trigger("stop_execution"); 
               } else {
                   api.wwGotoConditionStart();
               }
           }
       } else if (operator == 'EQ' && resultJson[sensorType]) {
           if (resultJson[sensorType][0]['result'] == value && blocklyDatas.getDataByKey('forward_another') == undefined) {
               
               if (blocklyDatas.getDataByKey('programRunning')) {
                   blocklyDatas.setKeyData('forward_another',true);
                    console.log('绑定等于跳转程序的事件');
                    eventsListener.on('forward_another', function() {
                        api.wwGotoConditionStart();
                    });
                   eventsListener.trigger("stop_execution"); 
               } else {
                   api.wwGotoConditionStart();
               }
           }
       } else if (operator == 'NEQ' && resultJson[sensorType]){
           if (resultJson[sensorType][0]['result'] != value && blocklyDatas.getDataByKey('forward_another') == undefined) {
               
               if (blocklyDatas.getDataByKey('programRunning')) {
                   blocklyDatas.setKeyData('forward_another',true);
                   console.log('绑定不等于跳转程序的事件');
                   eventsListener.on('forward_another', function() {
                        api.wwGotoConditionStart();
                   });
                   eventsListener.trigger("stop_execution"); 
               } else {
                   api.wwGotoConditionStart();
               }
           }
       }
        */
        
       
         /**
         if (ref < 2000 && isExecute) {
             console.log(1);
             var stopRobatCommand = new RobatCommand('stopRobot');
             stopRobatCommand.send();
             isExecute = false;
             //window.continueSteps();
         } else if (ref >= 2000 ) {
             console.log(2);
             isExecute = true;
         }
          */
        /**
        var level = covertInfraredValueToLevel(ref);
        if (runningTimeClick) {
            window.showDistance(level,'open');  
        } else {
            window.popupInfraredValue(level);
        }
         */
    };

    /**
    window.refreshAllWorkspace = function(params) {
        if (window.blocklyObj) {
            requestStrParams = window.blocklyObj.getServoID();
            console.log(requestStrParams);
        } else {
            requestStrParams =  window.location.search.substr(1);
            requestStrParams = '&servos=1|2|3|4|5&actions=test,test&isFirst=1';
        }
        console.log('my test for requestStrParams : ' + requestStrParams);
        var arrRequest = requestStrParams.split("&");
        for (var i = 0; i < arrRequest.length; i++) {
            blocklyDatas.datas[arrRequest[i].split("=")[0]] = decodeURI(arrRequest[i].split("=")[1]);
        }
        //初始化将舵机字符串转化为数组
        blocklyDatas.initServosId();
        //初始化LED等为数组
        blocklyDatas.initLightsId();
        //初始化情景灯数组
        blocklyDatas.initsceneLightsId();
        //初始化轮模式舵机ID为数组
        blocklyDatas.initCircleServosId();
        //初始化红外传感器ID为数组
        blocklyDatas.initInfraredId();
        //初始化触碰传感器ID为数组
        blocklyDatas.initTouchId();
        //初始化陀螺仪传感器ID为数组
        blocklyDatas.initGyroScopeId();
        window.initActionBlocks();
    };
    */

    /**
    window.initActionBlocks = function() {
        var actionsStr = blocklyDatas.getDataByKey('actions');
        var init = function() {
            if (!actionsStr) {
                actionsStr = 'statement_action_go_forward,1|statement_action_go_left,2|statement_action_go_right,3';
            }
            var actionsArr = actionsStr.split("|");
            for(var i=0;i<actionsArr.length;i++){
                var action = actionsArr[i].split(",");
                Blocks[action[0]] = {
                    actionName:action[1],
                    actionId:action[0],
                    init: function init() { 
                        this.setPreviousStatement(true);
                        this.setNextStatement(true);
                        this.setColour(colours['id_actions'].primary);                  	  
                        this.appendDummyInput().appendField(this.actionName);
                    }               
                };
            }
        };
        init();
    };
    */

    function InteractiveMethods () {

    };



    InteractiveMethods.timerValue = 0;
    InteractiveMethods.startInfaredTimerCallback = function () {
        var random = ubtUtils.generateRandom(1000,2500);
        window.showInfraredRef(random);
        this.timerValue = setTimeout('InteractiveMethods.startInfaredTimerCallback()',1000);
    };

    InteractiveMethods.stopInfaredTimerCallback = function () {
          console.log('888888888');
          clearTimeout(this.timerValue);
    };

    var ContainGoBack = {
        isContain : false
    };

    InteractiveMethods.setContainGoBack = function(isContain) {
        ContainGoBack.isContain = isContain;
    };

    InteractiveMethods.isContainGoBack = function() {
        return ContainGoBack.isContain;
    };


    //是否应该显示所有传感器的信息
    var showObj = {
        isCanShowAll : false
    }
    InteractiveMethods.setIsCanShowAll = function(isCanShowAll) {
        showObj.isCanShowAll = isCanShowAll;
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = InteractiveMethods;
        window.InteractiveMethods = InteractiveMethods;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return InteractiveMethods; });
    } else {
        this.interactiveMethods = InteractiveMethods;
    }



}).call(this);
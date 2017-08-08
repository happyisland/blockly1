/**
  * API 命令
  */
 
'use strict'
;(function(){
	var RobatCommand = require("./service/robat_command");
    var interactiveRobot = require('./common/program/interactive_robot');
    var FieldColourAdapter  = require('../engine/adapter/field_colour_adapter');
    var Field = require('../core/field');
    var FieldColour = require('../core/field_colour');
    var ubtUtils = require('./common/utils/utils');
    var ubtBlocklyUtils = require('./common/utils/blockly_utils');
    var $ = require('jquery');
    var programInit = require('./common/program/program_init');
    var blocklyDatas = require('./service/blockly_datas');
    var eventsListener = require('./common/events_listener');
    var DelayCommand = require('./common/program/delay_command');
    var delayCommandManager = require('./common/program/delay_command_manager');
    var programManager = require('./common/program/program_manager');
    var Background = require('./index/index_prog_background.jsx');
    var React = require('react');
    var ReactDOM = require('react-dom');

    var programIndex = 0;

    function API() {
      this.reset();
    }
	
	API.prototype.reset = function() {
      this.setSentFirstPoseCommand(false);
      this.eyeRingArray = {};
      return this.eyeRingArray.index = [false, false, false, false, false, false, false, false, false, false, false, false];
    };
	
	API.prototype.setSentFirstPoseCommand = function(value) {
      console.log("setting first pose command to value " + value);
      return this._didSendFirstPoseCommand = value;
    };
	
	API.prototype.resetStack = function() {
      console.log("Resetting stack");
      return this.setSentFirstPoseCommand(false);
    };

    API.prototype.setMultiplePartsSpecificColor = function(colour) {
        //window.SENT_ROBOT_COMMAND = true;
        interactiveRobot.setSendRobot(true);
        if (window.blocklyObj) {
            console.log('change colour：' + colour);
        } else {   
            ubtUtils.sendTimeout(function() {
                console.log('change colour：' + colour);
                },function() {
                 window.continueSteps();
            },3000);    
        }
        
    };

    //var delayCommand = new DelayCommand(0);

    API.prototype.addDelayCommand = function(mills , type) {
        if (type == 1) {
            mills = mills/1000;
        }
        interactiveRobot.setSendRobot(true);       
        /**
        if (programRunner.programRunnerIndex != programIndex ) {
            delayCommand = new DelayCommand(10);
        }
        programIndex = programRunner.programRunnerIndex || 0; 
         */
        var delayCommand = delayCommandManager.getDelayCommandByIndex(programRunner.programRunnerIndex);
        delayCommand.sendTimeout(function() {
        },function(param) {
            //var currentProgramIndex = delayCommand.programIndex;
            console.log('delay ' + param);
            window.continueSteps(param);
        },mills*1000);
        
        /**
        ubtUtils.sendTimeout(function() {
        },function() {
            window.continueSteps();
        }, mills*1000);
         */
    };

    API.prototype.highlightBlock = function(id) {
         codeLanguage.workspace.traceOn(true);
	     codeLanguage.workspace.highlightBlock(id);
    };
	
    /***********************Block块对应API**********************/

    // Actions类
    API.prototype.showTest = function(actionId) {
        interactiveRobot.setSendRobot(true);
        if (window.blocklyObj) {
            var robatCommand = new RobatCommand('action|'+actionId);
            robatCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {
                var robatCommand = new RobatCommand('action|'+actionId);
                robatCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    };

    API.prototype.stopCurrentStep = function() {
        console.log('stop current step');
    };

    // Start类
    API.prototype.wwGotoStart = function() {
        if (!window.blocklyObj) {
            blocklyDatas.setKeyData('blueState',1);
        }
        if (!blocklyDatas.getDataByKey('programRunning') || !blocklyDatas.getDataByKey('blueState')) {
            return;
        } else {
            var startBlock, topBlocks;
            topBlocks = codeLanguage.workspace.getTopBlocks();
            startBlock = null;
            //如果从其他分支，通过go-back跳转到主程序，需要取消当前激活的分支
            if (window.blocklyObj && window.blocklyObj.resignActiveBranch) {
                window.blocklyObj.resignActiveBranch();
            }
            //eventsListener.trigger("add_event_sensor_listener");
            //blocklyDatas.setKeyData('forward_another',undefined);   
            return _.each(topBlocks, function(block) {
                if (block.type === "program_start") {
                    eventsListener.trigger('changeState', true);
                    //ReactDOM.render(<Background  />,document.getElementById('popupWindow'));
                    eventsListener.trigger("start_background");
                    programRunner.programRunnerIndex = 1;
                    programManager.setProgramRunnerIndex(1);
                    var code = ubtBlocklyUtils.blockToCodeInWorkspace(block);
                    if (code.indexOf('wwGotoStart') > -1) {
						blocklyDatas.setKeyData('wwGotoStart',true);
					} else {
						blocklyDatas.setKeyData('wwGotoStart',false);
					}
                    programRunner.startProgram(code);
                }
            });
        }      
    };

    //跳转到条件start块
    API.prototype.wwGotoConditionStart = function (branchId) {
        var startBlock, topBlocks;
        topBlocks = codeLanguage.workspace.getTopBlocks();
        startBlock = null;
        console.log('跳转成功');
        eventsListener.offAll('next_step'+programRunner.programRunnerIndex);
        return _.each(topBlocks, function(block) {
            var everyBranchId = block.getFieldValue('PROGRAM_BRANCH');
            if ((block.type === "program_goto_condition" || block.type === "program_goto_phone_condition"
             || block.type === "program_goto_touch_condition" || block.type === "program_goto_infrared_condition" ) && everyBranchId == branchId ) {
                eventsListener.trigger('changeState', true);
                eventsListener.trigger("start_background");
                //ReactDOM.render(<Background  />,document.getElementById('popupWindow'));
                var code = ubtBlocklyUtils.blockToCodeInWorkspace(block);
                if (code.indexOf('wwGotoStart') > -1) {
                    blocklyDatas.setKeyData('wwGotoStart',true);
                } else {
                    blocklyDatas.setKeyData('wwGotoStart',false);
                }
                programRunner.programRunnerIndex = branchId;
                programManager.setProgramRunnerIndex(branchId);
                programRunner.startProgram(code);
            }
        });     	
        
    };

    // Moves类
    API.prototype.setServoStatus = function(params) {
        /** 
        var fieldColourAdapter = new FieldColourAdapter();
        fieldColourAdapter.setColours("#fff");
        console.log(FieldColourAdapter.prototype);
        console.log(fieldColourAdapter.prototype);
        console.log(fieldColourAdapter.__proto__);
        if (fieldColourAdapter instanceof FieldColour) {
            console.log(true);  
        } else {
            console.log(false);
        }  
        */
        interactiveRobot.setSendRobot(true); 
        ubtUtils.sendTimeout(function() {
            (new RobatCommand(params)).send();
        },function() {
            window.continueSteps();
        },3000);
         
		//window.SENT_ROBOT_COMMAND = true;
	};

    // Sensors类
    API.prototype.queryInfraredDistance = function(sensorID) {
		console.log('查询红外传感器值');
        interactiveRobot.setSendRobot(true);

        if (!sensorID) {
            return false;
        }

        if (window.blocklyObj) {
            var robatCommand = new RobatCommand('queryInfrared|'+sensorID);
            robatCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {
                var robatCommand = new RobatCommand('queryInfrared|'+sensorID);
                robatCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
        return true;
	};


    API.prototype.getInfraredData = function () {
        console.log('读取红外传感器值');

        console.log('getInfraredData');
        var realInfraredValue = 0;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|2400
                    var mesArr = mes.split('|');
                    if (mesArr[0] == 'success') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send();  
                        // 原始值[900,2600],对应厘米[3cm,15cm]
                        var infreredData = JSON.parse(mesArr[1]);
                        realInfraredValue = parseInt(infreredData[0]['result']);
                        console.log('传感器返回真实值：' + realInfraredValue);
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        console.log('IR sensor goes wrong, please check the connection status or try again !');
                    }
                }
            }
        });
        var realLevel = ubtUtils.convertInfraredValueToLevel2(realInfraredValue);
        return realLevel;
    };


    API.prototype.queryTouchStatus = function(sensorID) {
		console.log('查询触摸传感器值');
        interactiveRobot.setSendRobot(true);

        if (!sensorID) {
            return false;
        }

        if (window.blocklyObj) {
            var robatCommand = new RobatCommand('queryTouchStatus|'+sensorID);
            robatCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {
                var robatCommand = new RobatCommand('queryTouchStatus|'+sensorID);
                robatCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 

        return true;
	};

    API.prototype.getTouchData = function () {
        console.log('读取触碰传感器值');
        console.log('getTouchData');
        var realTouchValue = 0;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|0123
                    var mesArr = mes.split('|');
                    if (mesArr[0] == 'success') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        var touchData = JSON.parse(mesArr[1]);
                        realTouchValue = parseInt(touchData[0]['result']);
                       // realTouchValue = parseInt(mesArr[1]);
                        console.log('传感器返回真实值：' + realTouchValue);
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        console.log('Touch sensor goes wrong, please check the connection status or try again !');
                    }

                } else {
                    sleep(500);
                }
            }
        });
        return realTouchValue;
    };


    API.prototype.queryGyroscopeAngle = function(sensorID,axie) {
		console.log('查询陀螺仪传感器值');
        interactiveRobot.setSendRobot(true);

        if (!sensorID) {
            return false;
        }

        if (window.blocklyObj) {
            var robatCommand = new RobatCommand('queryGyroscope|'+ sensorID );
            robatCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {
                var robatCommand = new RobatCommand('queryGyroscope|'+sensorID);
                robatCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 

        return true;
	};

    API.prototype.getGyroscopeData = function(axie) {
        console.log('读取陀螺仪传感器值');
        console.log('getGyroscopeData');
        var realGyroscopeValue = 0;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|90°
                    var mesArr = mes.split('|');
                    if (mesArr[0] == 'success') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        var resultJson = JSON.parse(mesArr[1]);
                        var direction = axie.substring(0,1);
                        var standardGyro = blocklyDatas.getDataByKey('resetGyroscope'+ resultJson[0].id);
                        if (standardGyro) {
                            var paddingValue = standardGyro[0][direction];
                            if (direction == 'x' || direction =='z') {
                                if (paddingValue > 0 &&  (resultJson[0][direction] - paddingValue ) < -180 ) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue + 360;
                                } else if ( paddingValue < 0 &&  (resultJson[0][direction] - paddingValue ) > 180) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue - 360;
                                } else {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue 
                                }
                            }

                            if (direction == 'y') {
                                if (paddingValue > 0 &&  (resultJson[0][direction] - paddingValue ) < -90 ) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue + 180;
                                } else if ( paddingValue < 0 &&  (resultJson[0][direction] - paddingValue ) > 90) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue - 180;
                                } else {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue 
                                }
                            }                                                     
                        } else {
                            realGyroscopeValue = resultJson[0][direction];
                        }              
                        console.log('传感器返回真实值：' + realGyroscopeValue);
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        console.log('Gyroscope sensor goes wrong, please check the connection status or try again !');
                    }

                }
            }
        });
        return realGyroscopeValue;
	};

    API.prototype.queryServoAngle = function(servoId) {
		console.log('查询舵机角度值');
        interactiveRobot.setSendRobot(true);

        if (!servoId) {
            return false;
        }

        if (window.blocklyObj) {
            var readStatusCommand = new RobatCommand('getPosture');
            readStatusCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {
                var readStatusCommand = new RobatCommand('getPosture');
                readStatusCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 

        return true;
	};

    API.prototype.getServoData = function (servoId) {
        console.log('读取舵机角度值');
        console.log('getServoData');
        var realServoValue = 0;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|90°
                    var mesArr = mes.split('|');
                    if (mes!='') {
                        var result = mes.split('|');
                        if (result[0] == 'success') {                           
                            var servoArr = JSON.parse(result[1]);
                            var length = servoArr.length;
                            for (var  i = 0 ; i < length; i++) {
                                if (servoArr[i].servo == servoId) {
                                    realServoValue = servoArr[i].degree;
                                }
                            }                     
                        }
                    } else {                  
                        console.log('Servo goes wrong, please check the connection status or try again !');
                    }
                }
            }
        });
        console.log('返回的舵机的角度值：' + realServoValue);
        return realServoValue;
    };

    API.prototype.setGyroscopeZero = function(sensorID) {
		console.log('查询陀螺仪传感器值');
        interactiveRobot.setSendRobot(true);

        if (!sensorID) {
            return false;
        }

        if (window.blocklyObj) {
            var robatCommand = new RobatCommand('queryGyroscope|'+ sensorID );
            robatCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {
                var robatCommand = new RobatCommand('queryGyroscope|'+sensorID);
                robatCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
        return true;
	};

    API.prototype.saveStandard = function(sensorID) {
        console.log('读取陀螺仪传感器值');
        console.log('getGyroscopeData');
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|90°
                    var mesArr = mes.split('|');
                    if (mesArr[0] == 'success') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        var resultJson = JSON.parse(mesArr[1]);
                        blocklyDatas.setKeyData('resetGyroscope'+sensorID,resultJson);
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        console.log('Gyroscope sensor goes wrong, please check the connection status or try again !');
                    }

                }
            }
        });
    };


    // Events类
    API.prototype.getInfraredDataStatus = function (sensorID, refLevel, op) {
        console.log('读取红外传感器事件状态值');
        console.log('getInfraredDataStatus');
        var realInfraredValue = 0;
        var failedResult = true;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|2400
                    var mesArr = mes.split('|');
                    if (mesArr[0] == 'success') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        // 原始值[900,2600],对应厘米[3cm,15cm]
                        var infreredData = JSON.parse(mesArr[1]);
                        realInfraredValue = parseInt(infreredData[0]['result']);
                        console.log('传感器返回真实值：' + realInfraredValue);
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        failedResult = false;
                        console.log('IR sensor goes wrong, please check the connection status or try again !');
                        failedResult = false;
                    }
                }
            }
        });

        if(failedResult == false){
            return false;
        }
        //var realLevel = ubtUtils.convertInfraredValueToLevel(realInfraredValue);
        // update by new requirement  on 10/19/2016
        var realLevel = ubtUtils.convertInfraredValueToLevel2(realInfraredValue);

        if (op == 'GT') {
            if (realLevel > refLevel) {
                return true;
            }
        }

        if (op == 'EQ') {
            if (realLevel == refLevel) {
                return true;
            }
        }

        if (op == 'LT') {
            if (realLevel < refLevel) {
                return true;
            }
        }
        if (op == 'NEQ') {
            if (realLevel != refLevel) {
                return true;
            }
        }

        return false;
    };

    API.prototype.getTouchDataStatus = function(sensorID, refValue) {
        console.log('读取触碰传感器状态值');
        console.log('getTouchDataStatus');
        var realTouchValue = -1;
      var failedResult = true;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|0123
                    var mesArr = mes.split('|');
                    if (mesArr[0] == 'success') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        var touchData = JSON.parse(mesArr[1]);
                        realTouchValue = parseInt(touchData[0]['result']);
                        //realTouchValue = parseInt(mesArr[1]);
                        console.log('传感器返回真实值：' + realTouchValue);
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        failedResult = false;
                        console.log('Touch sensor goes wrong, please check the connection status or try again !');
                    }
                } 
            }
        });
        if(failedResult == false){
            return false;
        }
        if (realTouchValue == parseInt(refValue)) {
            return true;
        }

        return false;

	};

    API.prototype.getGyroscopeDataStatus = function(sensorID, axie, op, refAngle) {
		console.log('读取陀螺仪传感器事件状态值');
        console.log('getGyroscopeData');
        var realGyroscopeValue = 0;
        var  failedResult =true;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：success|90°
                    var mesArr = mes.split('|');
                    if (mesArr[0] == 'success') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        var resultJson = JSON.parse(mesArr[1]);
                        var direction = axie.substring(0,1);
                        var standardGyro = blocklyDatas.getDataByKey('resetGyroscope'+ resultJson[0].id);
                        if (standardGyro) {
                            var paddingValue = standardGyro[0][direction];
                            if (direction == 'x' || direction =='z') {
                                if (paddingValue > 0 &&  (resultJson[0][direction] - paddingValue ) < -180 ) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue + 360;
                                } else if ( paddingValue < 0 &&  (resultJson[0][direction] - paddingValue ) > 180) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue - 360;
                                } else {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue 
                                }
                            }

                            if (direction == 'y') {
                                if (paddingValue > 0 &&  (resultJson[0][direction] - paddingValue ) < -90 ) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue + 180;
                                } else if ( paddingValue < 0 &&  (resultJson[0][direction] - paddingValue ) > 90) {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue - 180;
                                } else {
                                    realGyroscopeValue = resultJson[0][direction] - paddingValue 
                                }
                            }                                                     
                        } else {
                            realGyroscopeValue = resultJson[0][direction];
                        }  
                        console.log('传感器返回真实值：' + realGyroscopeValue);
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        failedResult = false;
                        console.log('Gyroscope sensor goes wrong, please check the connection status or try again !');
                    }
                } 
            }
        });
        if(failedResult == false){
            return false;
        }
        if (op == 'GT') {
            if (realGyroscopeValue > refAngle) {
                return true;
            }
        }

        if (op == 'EQ') {
            if (realGyroscopeValue == refAngle) {
                return true;
            }
        }

        if (op == 'LT') {
            if (realGyroscopeValue < refAngle) {
                return true;
            }
        }

        if (op == 'NEQ') {
            if (realGyroscopeValue != refAngle) {
                return true;
            }
        }

        return false;
            
	};

    API.prototype.queryPhoneDirection = function(refDirection) {
		console.log('查询手机/平板状态值');
        interactiveRobot.setSendRobot(true);

        if (window.blocklyObj) {
            
            var robatCommand = new RobatCommand('query|'+ '{"direction":"' + refDirection + '"}');
            robatCommand.send();
             
            //RobatCommand.executeByCmd('query|'+ '{"direction":"' + refDirection + '"}');
        } else {
            ubtUtils.sendTimeout(function() {
                var robatCommand = new RobatCommand('query|'+ '{"direction":"' + refDirection + '"}');
                robatCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
        return true;
        
	};

    API.prototype.getPhoneTiltStatus = function (refDirection) {
        console.log('读取手机/平板状态值');
        console.log('getPhoneTiltStatus');
        var realTiltValue = false;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：1|success
                    var mesArr = mes.split('|');
                    if (mesArr[0] == '1') {
                        //RobatCommand.executeByCmd('confirm');
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        
                        realTiltValue = mesArr[1];
                        console.log('手机平板返回真实值：' + realTiltValue);
                        if(realTiltValue == 'success'){
                            realTiltValue =  true;
                        }else{
                            realTiltValue =  false;
                        }
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        console.log('获取手机平板方向失败！');
                    }
                } 
            }
        });
        return realTiltValue;
    };


    API.prototype.queryModelPowerStatus = function(refStatus) {
		console.log('查询模型电量状态值');
        interactiveRobot.setSendRobot(true);

        if (window.blocklyObj) {
            var robatCommand = new RobatCommand('query|'+ '{"model":"' + refStatus + '"}');
            robatCommand.send();

        } else {
            ubtUtils.sendTimeout(function() {
                var robatCommand =  new RobatCommand('query|'+ '{"model":"' + refStatus + '"}');
                robatCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
        return true;
        
	};

    API.prototype.getModelPowerStatus = function() {
        console.log('读取模型电量状态值');
        console.log('getModelPowerStatus');
        var realModelPowerValue = false;
        $.ajax({
            type: "POST",//请求方式
            url: "../status.txt?t=" + Math.random(),//地址，就是action请求路径
            data: "text",//数据类型text xml json  script  jsonp
            async: false,
            error: function (xhr) {  //读取错误
                return null;
            },
            success: function (mes) {
                if (mes != '') {
                    // 数据格式：1|success
                    var mesArr = mes.split('|');
                    if (mesArr[0] == '1') {
                        var robatCommand = new RobatCommand('confirm');
                        robatCommand.send(); 
                        
                        realModelPowerValue = mesArr[1];
                        console.log('模型低电量返回真实值：' + realModelPowerValue);
                        if (realModelPowerValue == 'failure'){
                            realModelPowerValue = false;
                        }else{
                            realModelPowerValue = true;
                        }
                    } else {
                        // 返回红外传感器数据异常,直接返回false
                        console.log('获取模型低电量失败！');
                    }

                } 
            }
        });

        return realModelPowerValue; // true表示低电量,false表示高电量

	};

    /**
     * 改变舵机的角度
     */
    API.prototype.changeServo = function() {
        var servoId = arguments[0].properties.servo;
        var time = arguments[0].properties.time;
        var angle = arguments[1];
        var param = '[{"servo":"'+servoId+'","degree":"'+angle+'", "ms":"'+time+'"}]';
        interactiveRobot.setSendRobot(true);
        var servoChangeCommand = new RobatCommand('servoSet|'+ param); 
        if (window.blocklyObj) {
            servoChangeCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                servoChangeCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    }


    API.prototype.changeServoAngle = function(params) {
        interactiveRobot.setSendRobot(true);
        var servoChangeCommand = new RobatCommand('servoSet|'+ params); 
        if (window.blocklyObj) {
            servoChangeCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                servoChangeCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    }

     /**
     * 改变舵机的角度
     */
    API.prototype.changeServos = function() {
        //获取变量的长度
        var time = arguments[0];
        var variableLen = arguments[1];
        var objParams = arguments[variableLen+2];
        var param = '[';
        var servosStr = '';      
        for (var i = 0 ; i < objParams.length;i++ ) {
            var servoId = objParams.properties[i].properties.servoId.data;
            var angle = objParams.properties[i].properties.angle.data;
            if (angle === "") {
                angle = arguments[i+2];
            }
            if (angle==undefined) {
                angle = 0;
            }
            servosStr +='{"servo":"' + servoId + '","degree":"' + angle + '","ms":"' + time + '"},'
        }
        servosStr = servosStr.substring(0,servosStr.length-1);
        param += servosStr + ']';
        interactiveRobot.setSendRobot(true);
        var servoChangeCommand = new RobatCommand('servoSet|'+ param); 
        if (window.blocklyObj) {
            servoChangeCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                servoChangeCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    };

    /**
     * 执行轮模式
     */
    API.prototype.rotateCircle = function() {
        var length = arguments[0].length;
        var servoStr = '[';
        var tempStr = '';
        for (var i = 0 ; i< length; i++) {
            var objTemp = arguments[0].properties[i];
            var servoId = objTemp.properties.servoId.data;
            var direction = objTemp.properties.direction.data;
            var speed = objTemp.properties.speed.data;
            tempStr += '{"servo":"'+servoId + '","direction":"'+direction + '","speed":"' + speed + '"},';
        }
        tempStr = tempStr.substring(0,tempStr.length-1);
        servoStr +=tempStr;
        servoStr+=']';
        interactiveRobot.setSendRobot(true);
        var rotateCircleCommand = new RobatCommand('servoSetbySpeed|'+ servoStr);
        if (window.blocklyObj) {
            rotateCircleCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                rotateCircleCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    };

    API.prototype.servoPowerOn = function(param) {
        if (!param) {
            return;
        }
        interactiveRobot.setSendRobot(true);
        var servoPowerOnCommand = new RobatCommand('servoPowerOn|'+param);
        if (window.blocklyObj) {
            servoPowerOnCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                servoPowerOnCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    };

    API.prototype.servoPowerOff = function(param) {
        if (!param) {
            return;
        }
        interactiveRobot.setSendRobot(true);      
        var servoPowerOffCommand = new RobatCommand('servoPowerOff|'+param);
        if (window.blocklyObj) {
            servoPowerOffCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                servoPowerOffCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    };

    API.prototype.playTune = function(tune) {
        if (window.blocklyObj) {
            var obj = {};
            obj.type = 'tune';
            obj.key = tune;
            var jsonValue = JSON.stringify(obj);
            window.blocklyObj.playAudio(jsonValue);
        } else {
             var workspace = programInit.workspace;
            ubtUtils.sendTimeout(function() {   
                workspace.playAudio('test'); 
            },function() {
                workspace.pauseAudio('test'); 
            },3000); 
            }
        
    };

    API.prototype.playEffect = function(effect) {
        var jsonEffect = JSON.parse(effect);
        //如果存在播放声音延迟，需要等待声音播放完成后才唤醒下一个程序块的知心
        if (jsonEffect.isDelay) {
            //如果存在分支ID，则需要将这个参数传递给后台
            var branchId = programManager.getProgramRunnerIndex();
            jsonEffect.branchId = branchId;
            interactiveRobot.setSendRobot(true);
        }
        if (window.blocklyObj) {
            window.blocklyObj.playAudio(JSON.stringify(jsonEffect));
        } else {
            var workspace = programInit.workspace;
            ubtUtils.sendTimeout(function() {   
                workspace.playAudio('test'); 
            },function() {
                workspace.pauseAudio('test'); 
            },3000); 
        }
    };

    //设置表情
    API.prototype.setEmoji = function(param1 , param2) {
        var params = param1 +'|' + param2 + '|0';
        interactiveRobot.setSendRobot(true);
        var emotionCommand = new RobatCommand('setEmoji|'+params);
        if (window.blocklyObj) {
            emotionCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                emotionCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    };

    //设置灯光
    API.prototype.setLEDs = function(param1 , param2) {
        console.log(param2);
        var params = param1 +'|' + param2;
        interactiveRobot.setSendRobot(true);
        var emotionCommand = new RobatCommand('setLEDs|'+params);
        if (window.blocklyObj) {
            emotionCommand.send();
        } else {
            ubtUtils.sendTimeout(function() {   
                emotionCommand.send();
            },function() {
                window.continueSteps();
            },3000);
        } 
    };

    /***********************Block块对应API**********************/

    // API导出
    if (typeof module !== 'undefined' && typeof exports === 'object') {
		var api = new API();
        module.exports = api;
		//api.setServoStatus('aaaa');

    } else if (typeof define === 'function' && define.amd) {
        define(function() { return new API(); });
    } else {
        this.api = new API();
    }

}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
});

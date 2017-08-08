'use strict';
var $ = require('jquery');
var blocklyDatas = require('../../../engine/service/blockly_datas');
var eventsListener = require('../../../engine/common/events_listener');
var proRunner = require('../../../engine/common/program/program_runner');
var RobatCommand = require('../../../engine/service/robat_command');
var programManager = require('../../../engine/common/program/program_manager');
var CommandSequence = require('../../../engine/common/program/command_sequence');
var blocklyUtils = require('../../../engine/common/utils/blockly_utils');
var ubtUtils = require('../../../engine/common/utils/utils');
module.exports = function(angular) {
    var codeLanguage = require('../../../engine/common/program/program_init');
    var StorageFactory = require('../../../engine/storage/base_storage');
    var CodeLanguage = require('../../../engine/common/program/program_init');
    var storage = window.localStorage;
    var app = angular.module('myApp', ['ionic','myService']);
    app.controller('actionDetailCtrl',['$scope','$ionicModal','$timeout','$ionicPopup','dataService','$sce' ,function($scope, $ionicModal,$timeout,$ionicPopup,dataService,$sce) {
        $scope.curLanguage = blocklyDatas.datas.languageCode;
        //语言国际化
        $scope.languageResource = "";
        //初始化语言国际化对象
        function msgInit(){
            $scope.languageResource = MSG;
            console.log($scope.languageResource);
        }
        //国际化语言类型
        $scope.languageCode = blocklyDatas.getDataByKey('languageCode');
        //弹出框公共变量  postureNamed--姿势取名
        $scope.popupCommonParam = {"inputContent":"","checkInput":false,"ruleMsg":"","inputValid":true};
        //弹出框对象
        $scope.popupObject = {};
        //弹出框对象
        var servoSpeed = null;
        //swift对象
        $scope.swiftObj = {};
        //控制系统提示雷同U3D  show--是否显示   tips--显示内容
        $scope.systemHint = {show:false,tips:"",sysClass:"systemHintClass_tips"};
        //控制系统提示雷同U3D
        $scope.systemHintShow=function(param,type){
            $timeout(function(){
               $scope.$apply(function(){
                   $scope.systemHint.show = true;
                   $scope.systemHint.tips = param;
                   if(type=="error"){
                       $scope.systemHint.sysClass = "systemHintClass_error";
                   }else{
                       $scope.systemHint.sysClass = "systemHintClass_tips";
                   }
               });
            });
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.systemHint.show = false;
                    $scope.systemHint.tips = "";
                    $scope.systemHint.sysClass = "systemHintClass_tips";
                });
            },100);
        };
       // $scope.systemHintShow("aldkjsl","tips");
        //存储弹出框类型对应的回调函数
        $scope.popupCallback = {};
        /**
         * 实时改变输入弹出框确定按钮样式
         * @param isShow
         */
        $scope.popupBtnShowCtl = function(isShow){
            if(isShow){
                $(".popup-buttons>button")[1].style.color="blue";
           }else{
                $(".popup-buttons>button")[1].style.color="red";
            }
        };
        /* 拼接封装关灯参数 返回参数字符串格式 并发送关灯命令
        */
        $scope.sendCloseLedCommond = function(lightArray){
            if(lightArray.length >0){
                var str_param = '';
                var temp_params = [];
                for(var i = 0;i<lightArray.length;i++){
                    var temp_obj = {};
                    temp_obj.id = lightArray[i].id;
                    var temp_lights = [];
                    for(var j=0;j<lightArray[i].lights.length;j++){
                        temp_lights[j] = '';
                    }
                    temp_obj.lights = temp_lights;
                    temp_params.push(temp_obj);
                }
                if (temp_params != undefined && temp_params != null) {
                    str_param = JSON.stringify(temp_params);
                }

                var pwerOffCommand = new RobatCommand('setLEDs|' + str_param + '|0');
                pwerOffCommand.send();
                
            }
        };

        /**
         * 弹出框
         * @param popupType  弹出框类型
         * @param popupData  弹出框初始化数据
         * @param callBack  回调函数   postureLink
         */
        $scope.popupShow = function(popupType,popupData,callBack){
            if(callBack != undefined){
                $scope.popupCallback[popupType] = callBack;
            }
            //初始化语言国际化对象
            $scope.languageResource == ""?msgInit():$scope.languageResource;
            console.log(callBack);
            //判断模型是否有值  TODO 正式环境打开
            var temp_res = isShowAlert(popupType,popupData);
            if(temp_res==false)  return;
            $scope.popupObject = dataService.getPopupObj(popupType);
            //赋值初始值
            if(popupData!=undefined){
                $scope.popupObject.inData =  angular.copy(popupData);
            }else{
                $scope.popupObject.inData = dataService.popupInitData(popupType);
            }
            if($scope.popupObject){
                
                servoSpeed = $ionicPopup.show({
                    templateUrl:$scope.popupObject.url,
                    title:$scope.popupObject.title,
                    scope: $scope,
                    buttons: [
                        {   text: $scope.popupObject.cancel,
                            type: ' button-clear button-balanced',
                            onTap:function(){
                                servoSpeed.close();
                                //如果是陀螺仪的弹出框，则需要关闭定时器的显示
                                if (popupType == 'gyroRotateDirection' || popupType == 'infraredSensor') {
                                    dataService.command("stop_device",null);
                                }
                                if(popupType == "soundEffects"){
                                    //停止音效播放
                                    if(window.blocklyObj){
                                        window.blocklyObj.stopPlayAudio();
                                    }
                                }
                                //完成录音关闭录音
                                if(popupType == "addRecording" || popupType == "recordingName"){
                                    $scope.closeSoundEffects("canncel");
                                }
                                // 如果是弹出姿势名称的框，则点击取消的时候需要掉电
                                if ('postureNamed' == popupType) {
                                    //舵机全部掉电
                                    var servoArr = blocklyDatas.getServoIds();
                                    var servoStr = servoArr.join(',');
                                    var pwerOnCommand = new RobatCommand('servoPowerOn|'+servoStr);
                                    pwerOnCommand.send();
                                }
                                // 如果是输入框就清空内容
                                if(popupType=="saveXml"||popupType=="postureNamed"||popupType=="setVariable"||popupType=="addRecording"){
                                    $scope.popupCommonParam.inputContent = '';
                                    // $scope.popupCommonParam.inputValid=true;
                                }
                                // 如果是设置灯光 则要发送灭灯命令
                                if(popupType=="settingLight"){
                                    $scope.sendCloseLedCommond($scope.popupObject.outData.lightArray);
                                }
                            }
                        },
                        {
                            text: $scope.popupObject.ok,
                            type: ' button-clear button-balanced',
                            onTap: function(e) { 
                                //如果是陀螺仪的弹出框，则需要关闭定时器的显示
                              if (popupType == 'gyroRotateDirection' || popupType == 'infraredSensor') {
                                    dataService.command("stop_device",null);
                              }
                              setOutValue(popupType,$scope.popupCallback[popupType]);

                              // 如果是设置灯光 则要发送灭灯命令
                                if(popupType=="settingLight"){
                                    $scope.sendCloseLedCommond($scope.popupObject.outData.lightArray);
                                }
                            }
                        }
                    ]
                });

                //根据弹出框类型改变弹出框初始化样式
                dataService.initChangeIonicStyle(popupType);
                servoSpeed.then(function(res) {
                    console.log('Tapped!', res);
               });
            }
        };
         /**
         * 外界赋值
         * @param popupType
         * @param callBack 回调函数
         */
        function setOutValue(popupType,callBack){
            // 断开蓝牙
            if(popupType == "blueConnect"){
               // 断blueCMD
                dataService.command("blueDisconnect");
            }
             //连接蓝牙
             if(popupType == "postureLink"){
                 // 连接蓝牙
                  console.log("断开蓝牙");
                  dataService.command("blueConnect");
             }
            if(popupType == "saveXml"){ //保存项目
                // if(!$scope.popupCommonParam.inputValid){
                //     return;
                // }
                var curSaveXmlName = $scope.languageResource.newProjectName;
                if( $scope.popupCommonParam.inputContent != "" && $scope.popupCommonParam.inputContent!=null && $scope.popupCommonParam.inputContent!=undefined){
                    curSaveXmlName = $scope.popupCommonParam.inputContent ;
                }else{
                    $scope.popupCommonParam.inputContent =  curSaveXmlName;
                }
                var currentXml = blocklyDatas.getDataByKey('currentProgramXml');
                console.log("项目名称"+curSaveXmlName);
                console.log("当前xml内容--新增:"+currentXml);
                var blocklyVersion = window.getBlocklyVersion();
                //增加一个逻辑编程的程序的版本字段
                var ifreamParam = {xmlName:curSaveXmlName,xmlContent:currentXml, blocklyVersion:blocklyVersion};
                if (window.blocklyObj) {
                    dataService.command("add",ifreamParam);
                } else {
                    var xmlId = ubtUtils.genUuid(8,14);
                    ifreamParam.xmlId = xmlId;
                    var ifreamParam = JSON.stringify(ifreamParam);    
                    StorageFactory.createStorage('localStorage').saveProgram(ifreamParam, xmlId);
                }
                
            }
            //为姿势取名
            if(popupType == "postureNamed"){
                //赋值
                 // if(!$scope.popupCommonParam.inputValid){
                 //     e.preventDefault();
                 //     return;
                 // }
                console.log("popupCommonParam.inputContent:::"+$scope.popupCommonParam.postName);
                var postureNamed = {"name":""};
                postureNamed.name = $scope.popupCommonParam.postName;
                $scope.popupObject.outData = postureNamed;
            }

            //为变量取名
            if(popupType == "setVariable"){
                 //赋值
                 // if(!$scope.popupCommonParam.inputValid){
                 //     return;
                 // }
                console.log("popupCommonParam.inputContent:::"+$scope.popupCommonParam.postName);
                var variableNamed = {"name":""};
                var input_name = $scope.popupCommonParam.variableName;
                variableNamed.name = input_name==''?$scope.languageResource.variable_named_popup_placeholder:$scope.popupCommonParam.variableName;
                $scope.popupObject.outData = variableNamed;
            }
            //完成录音关闭录音
            if(popupType == "addRecording"){
                //得到当前时间值
                console.log(document.getElementById('EndTimeMsg'));
                console.log("当前时间值:"+document.getElementById('EndTimeMsg').innerHTML);
                dataService.soundEffectObj.currentTime = document.getElementById('EndTimeMsg').innerHTML;

                $scope.closeSoundEffects("ok");
                //关闭录音弹出框
                $scope.goBack();
                //打开输入录音名称弹出框
                $scope.popupShow("recordingName",$scope.popupObject.outData);
            }
            if(popupType == "soundEffects" || popupType == "playTune"){
                 //停止音效播放
                 if(window.blocklyObj){
                     window.blocklyObj.stopPlayAudio();
                 }
             }
             //确定退出逻辑编程
             if(popupType == "isExit"){
                  dataService.command("closeWindow",null);
             }
            console.log($scope.popupObject.outData);
            if(callBack!=undefined){
                 callBack( angular.copy($scope.popupObject.outData));
                 console.log("callBack popupType:"+popupType);
                 $scope.popupCallback[popupType] = null;
            }
        };
        //项目列表返回按钮，即关闭当前弹出框
        $scope.goBack = function(){
            servoSpeed.close();
        };
        //弹出框调用
        // $scope.popupShow("projectList");
        /************************************统一弹出框  begin******************************************/
        $scope.showAlert = function(alertObj,callBack) {
            var alertPopup = $ionicPopup.alert({
                //title: alertObj.title,
                template: alertObj.content,
                okText: alertObj.btnText, // String (默认: 'OK')。OK按钮的文字。
                okType: 'button-clear button-assertive' // String (默认: 'button-positive')。OK按钮的类型。
            });
            $(".popup").css({"height":"50%","width":"60%"});
            $(".popup-head").css({"display":"none"});
            $(".popup-body").css({"text-align":"center","padding":"10px","height":"86%"});
            $(".popup-body span").css({"display":"block","margin":"auto"});
            $(".popup-body").addClass("msg_span_class");
            alertPopup.then(function(res) {
                console.log(res);
                if(callBack!=undefined){
                    callBack();
                }
            });
        };

        /************************modal弹出层信息  begin************************************************/
        /**
         * index主界面业务操作
         * @param param
         */
        $scope.indexBus = function(param){
            //判断程序是否处于运行状态
            var programRunning = blocklyDatas.getDataByKey("programRunning");
            if(programRunning) return;
            if(param){
                switch (param){
                    case "projectList":{ //项目列表
                        Blockly.DropDownDiv.hide();
                        $scope.popupShow("projectList");
//                        $scope.systemHintShow("error","error");
                        break;
                    }
                    case "isSaveProject":{ //是否保存项目提醒
                        $scope.popupShow("isSaveProject");
                        break;
                    }
                    case "saveXml":{ //保存xml内容
                        Blockly.DropDownDiv.hide();
                        //判断当前是否有拖动程序块
                        var currentSaveXml = blocklyDatas.getDataByKey('currentProgramXml');
                        //判断当前初始化程序未改动
                        if((ubtUtils.xmlComparison(blocklyDatas.getDataByKey('defaultXml'),currentSaveXml))){
                            //初始化语言国际化对象
                            $scope.languageResource == ""?msgInit():$scope.languageResource;
                            $scope.systemHintShow($scope.languageResource.project_has_no_change,"tips");
                            return;
                        }
                        //判断点击当前按钮时，当前xml内容是修改还是编辑
                        if(dataService.curXmlObj.isDefault == 1||dataService.curXmlObj.isDefault==true ||(dataService.curXmlObj.xmlId == "")||(dataService.curXmlObj.xmlId != "" && dataService.curXmlObj.isDefault == true)){ //新增
                            $scope.popupShow("saveXml");
                        }else{//编辑
                            if(currentSaveXml !=undefined && (ubtUtils.xmlComparison(dataService.curXmlObj.xmlContent,currentSaveXml)==false)){
                                console.log("currentProgramXml:"+currentSaveXml);
                                console.log("dataService.curXmlObj.xmlContent:"+dataService.curXmlObj.xmlContent);
                                var blocklyVersion = window.getBlocklyVersion();
                                //增加一个逻辑编程的程序的版本字段
                                var ifreamParam = {xmlId:dataService.curXmlObj.xmlId,xmlName:dataService.curXmlObj.xmlName,xmlContent:currentSaveXml, blocklyVersion:blocklyVersion};
                                console.log("参数："+JSON.stringify(ifreamParam));
                                if (window.blocklyObj) {
                                    dataService.command("edit",ifreamParam);
                                } else {
                                    StorageFactory.createStorage('localStorage').saveProgram(JSON.stringify(ifreamParam), ifreamParam.xmlId);
                                }
                            }

                        }
                        break;
                    }
                    case "showSwift":{ //swift语言
                        console.log("This is swift code！");
                        var code = blocklyUtils.blockToSwiftInWorkspace();
                        console.log(code);
                        var no_null = code.replace(/\ /g,"&nbsp;");
                        $scope.swiftObj.code = prettyPrintOne(no_null.replace(/\n/g, "<br>"),"js") ;
                        $scope.popupShow("showSwift");
                        break;
                    }
                    case "blueConnect":{ //蓝牙连接操作
                        Blockly.DropDownDiv.hide();
                        blueConnect();
                        break;
                    }
                    case "exit":{ //退出逻辑编程
                        //TODO  need to compare xml has been changed or not.
                        Blockly.DropDownDiv.hide();
                        console.log(proRunner.running);
                        if(proRunner.running) return;
                        /**
                         * 1.判断是新增还是编辑
                         * 2.新增 —— 判断当前xml与默认
                         * 3.编辑——判断当前xml与读取xml
                         */
                        //当前xml内容
                        var saveXmlDetailContent = blocklyDatas.getDataByKey('currentProgramXml');
                        if(dataService.curXmlObj.xmlId == ""){//新增
                            //判断当前xml与默认xml对比结果
                            if(saveXmlDetailContent !=undefined &&  ubtUtils.xmlComparison(blocklyDatas.getDataByKey('defaultXml'),saveXmlDetailContent) == false){
                                  //提示是否退出
                                  $scope.popupShow("isExit");
                            }else{
                                 //退出
                                dataService.command("closeWindow",null);
                            }
                        }else{
                           if(saveXmlDetailContent !=undefined && (ubtUtils.xmlComparison(dataService.curXmlObj.xmlContent,saveXmlDetailContent)==false)){
                               //提示是否退出
                               $scope.popupShow("isExit");
                           }else{
                               //退出
                               dataService.command("closeWindow",null);
                           }
                        }
                        break;
                    }
                    case "checkBlueStatus":{
                       var blueStatus =  blocklyDatas.getDataByKey('blueState');
                        if(blueStatus == 0 || blueStatus==false){//未连接
                            $("#blueImg").attr("src","images/index/Noconnection.png");
                        }else{//连接
                            $("#blueImg").attr("src","images/index/bt_langya.png");
                        }
                        break;
                    }
                }
            }

        };

        // 蓝牙按键事件
        function blueConnect(){
            var blueStatus =  blocklyDatas.getDataByKey('blueState');
            if (blueStatus == 1) {  //蓝牙处于连接状态提示是否退出蓝牙
                //弹框
               $scope.popupShow("blueConnect");

            } else {  //蓝牙处于断开状态，直接连接蓝牙
                // 蓝牙连接命令
                dataService.command("blueConnect");
            }
        };
        //saveXml回调函数
        function editXmlCallBack (data){
            if(data){
                var saveXMlRes = JSON.parse(decodeURI(data));
                //系统提示 类似U3D提示
                var tips_temp_obj = "";
                if(saveXMlRes.retCode && saveXMlRes.retCode=="0000"){
                    //编辑成功
                    dataService.curXmlObj.xmlContent = blocklyDatas.getDataByKey('currentProgramXml');
                    //关闭model弹出框
                    tips_temp_obj =dataService.curXmlObj.xmlName+" "+$scope.languageResource.porject_alert_content_06;
                    $scope.systemHintShow(tips_temp_obj,"tips");
                   // $scope.showAlert({"title":$scope.languageResource.porject_alert_tips,"content":dataService.curXmlObj.xmlName+" "+$scope.languageResource.porject_alert_content_06,"btnText":$scope.languageResource.porject_alert_btnText});
                }else{
                    tips_temp_obj = $scope.languageResource.porject_alert_content_02+saveXMlRes.retMsg;
                    $scope.systemHintShow(tips_temp_obj,"error");
                   // $scope.showAlert({"title":$scope.languageResource.porject_alert_title,"content":$scope.languageResource.porject_alert_content_02+saveXMlRes.retMsg,"btnText":$scope.languageResource.porject_alert_btnText});
                }
            }
        };

        //获取xml集合回调函数
        window.editXmlCallBack = editXmlCallBack;


       /**********************覆盖整个界面弹出框  begin*********************************/
           //弹出框model
        $scope.model = null;
        //程序介绍块图片集合
        $scope.helpList = [];
       // $scope.targetUrl = $sce.trustAsResourceUrl("http://localhost:8809/project/index.html");
           //打开model
       $scope.openModal = function(param) {
               Blockly.DropDownDiv.hide();
               //初始化语言国际化对象
               $scope.languageResource == ""?msgInit():$scope.languageResource;
               //弹出框html
               var templateUrl = "";
               if(param){
                   switch(param){
                       case "help":{
                           var languageCode = blocklyDatas.getDataByKey('languageCode');
                           if (languageCode != 'en' && languageCode !='zh-hans' && languageCode != 'zh-hant') {
                               languageCode = 'en';
                           } else if (languageCode == 'zh-hant') {
                               languageCode = 'zh-hans';
                           }
                           $scope.helpList = angular.copy(dataService.helpList(languageCode));
                           templateUrl = "ionicPopup/html/help.html";
                           break;
                       }
                   }
               }
               $ionicModal.fromTemplateUrl(templateUrl, {
                   scope: $scope,
                   animation: 'slide-in-up'
               }).then(function(modal) {
                   $scope.modal = modal;
                   $scope.modal.show();
               });

       };
        /**
         * 关闭弹出框
         */
        $scope.closeModal = function() {
            if($scope.modal){
                $scope.modal.hide();
                $scope.modal.remove();
            }
        };

       /**********************覆盖整个界面弹出框  end*********************************/
        $scope.closeSoundEffects = function(param){
            if(param){
              switch(param){
                  case "canncel":{
                      if(dataService.soundEffectObj.intervalObj != null){
                          window.clearInterval(dataService.soundEffectObj.intervalObj);
                      }
                      //放弃录音
                      if(window.blocklyObj){
                          window.blocklyObj.cancelRecordAudio();
                      }
                      break;
                  }
                  case "ok":{
                      //关闭定时器
                      if(dataService.soundEffectObj.intervalObj != null){
                          window.clearInterval(dataService.soundEffectObj.intervalObj);
                      }
                      //停止录音
                      if(window.blocklyObj != undefined){
                          window.blocklyObj.stopRecordAudio();
                      }
                      break;
                  }
              }
            }
        };
        /**
         * 是否打开弹出框
         * @param popupType
         * @returns {boolean}
         */
        function isShowAlert(popupType, popupData){

            var res_temp = true;
            var temp_data  = [];
            var show_str = "";
            if(popupType == "servoAngle" || popupType == "servoStatus"){  //判断模型中是否有普通角度舵机
                temp_data  =  blocklyDatas.getServoIds();
                var currentBlockData = popupData[0];
                if(temp_data[0]=="ID" && currentBlockData && currentBlockData['servoId'] == 'ID'){
                    show_str = $scope.languageResource.speed_only_360_value;
                   // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.speed_only_360_value,"btnText":$scope.languageResource.servo_angle_popup_ok});
                    res_temp = false;
                }
            }else if(popupType == "rotateServo"){  //判断  模型中没有可以360°旋转的舵机
                temp_data  =  blocklyDatas.getCircleServosIds();
                var currentBlockData = popupData[0];
                if(temp_data[0]=="ID" && currentBlockData && currentBlockData['servoId'] == 'ID'){
                    show_str = $scope.languageResource.speed_no_value;
                   // $scope.showAlert({"title":$scope.languageResource.rotate_servo_popup_title,"content":$scope.languageResource.speed_no_value,"btnText":$scope.languageResource.rotate_servo_popup_ok});
                    res_temp = false;
                }
            }else if(popupType == "settingLight" || popupType == "emotionDisplay"||popupType == "sceneLightDisplay"){  //判断是否连接灯光
                temp_data =  blocklyDatas.getLightsIds();
                var currentBlockData = popupData.lightArray[0];
                if(temp_data[0]=="ID" && currentBlockData && currentBlockData['id'] == 'ID'){
                    show_str = $scope.languageResource.lights_tips;
                   // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.lights_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                    res_temp = false;
                }
            }else if(popupType == "infraredSensor"){  //判断是否连接红外传感器
                temp_data =  blocklyDatas.getInfraredIds();
                var currentBlockData = popupData;
                if(temp_data[0]=="ID" && currentBlockData && currentBlockData['sensorId'] == 'ID'){
                    show_str = $scope.languageResource.infrared_tips;
                   // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.infrared_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                    res_temp = false;
                }
            }else if(popupType == "touchSensor"){  //判断是否连接触碰传感器
                temp_data =  blocklyDatas.getTouchIds();
                var currentBlockData = popupData;
                if(temp_data[0]=="ID" && currentBlockData && currentBlockData['sensorId'] == 'ID'){
                    show_str = $scope.languageResource.touch_tips;
                   // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.touch_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                    res_temp = false;
                } else if (!isNaN(temp_data[0]) &&　currentBlockData && currentBlockData['sensorId'] == 'ID') {
                    show_str = $scope.languageResource.touch_tips_error;
                    res_temp = false;
                }
            }else if(popupType == "gyroRotateDirection"){  //判断是否连接陀螺仪
                temp_data =  blocklyDatas.getGyroscopeIds();
                var currentBlockData = popupData;
                if(temp_data[0]=="ID" && currentBlockData && currentBlockData['gyroId'] == 'ID'){
                    show_str = $scope.languageResource.gyroscope_tips;
                   // $scope.showAlert({"title":$scope.languageResource.servo_angle_popup_title,"content":$scope.languageResource.gyroscope_tips,"btnText":$scope.languageResource.servo_angle_popup_ok});
                    res_temp = false;
                }
            }
            if(res_temp==false){
                if(popupType == "settingLight" || popupType == "emotionDisplay" || popupType == "sceneLightDisplay" ||popupType == "infraredSensor"||popupType == "touchSensor"||popupType == "gyroRotateDirection"){
                    var blueStatus =  blocklyDatas.getDataByKey('blueState');
                   
                    if (!blueStatus || blueStatus =='0') {
                        $scope.indexBus('blueConnect');
                        return false;
                    }
                }
                $scope.systemHintShow(show_str,"error");

            }

            return res_temp;
        }

    }]);
    app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
    return app;
};
/**
 * 蓝牙连接状态更改  ios、android蓝牙连接回调函数
 * *
 * @param param  蓝牙参数  0：蓝牙未连接   1：蓝牙连接
 */
window.blueConnectCallBack = function(data){
    //更新运行按钮的状态
    eventsListener.trigger('changeState', false);
    var param = JSON.parse(decodeURI(data));
    console.log(param);
    //设置蓝牙值
    blocklyDatas.setKeyData('blueState', param.blueState);
    if (param.blueState == 0 || param.blueState == false) {//未连接
        $("#blueImg").attr("src", "images/index/Noconnection.png");
        //蓝牙连接断开的时候关闭程序
        eventsListener.trigger("stop_execution");
    } else {//连接
        $("#blueImg").attr("src", "images/index/bt_langya.png");
        //连接成功后读取舵机的角度
        //readAngle();      
    }
    //设置红外
    blocklyDatas.setKeyData('infraredId', param.infraredId);
    blocklyDatas.setKeyData('touchId', param.touchId);
    blocklyDatas.setKeyData('gyroscopeId', param.gyroscopeId);
    blocklyDatas.setKeyData('lights', param.lights);
    //初始化将舵机字符串转化为数组
    blocklyDatas.initServosId();
    //初始化LED等为数组
    blocklyDatas.initLightsId();
    //初始化轮模式舵机ID为数组
    blocklyDatas.initCircleServosId();
    //初始化红外传感器ID为数组
    blocklyDatas.initInfraredId();
    //初始化触碰传感器ID为数组
    blocklyDatas.initTouchId();
    //初始化陀螺仪传感器ID为数组
    blocklyDatas.initGyroScopeId();
    if (param.blueState == 1) {
        blocklyUtils.iterateBlocks(function (block) {
            blocklyUtils.handleWorkspaceBlock(block);
        });
    }
    blocklyDatas.setKeyData('needRefresh', true);
};



//充电保护提示
window.chargeProtection = function(msg){
    var alertObj =  {"title":MSG.porject_alert_title,
            "content":msg,
            "btnText":MSG.porject_alert_btnText};
    var dom = angular.element($("#bodyContent")).scope();
    dom.showAlert(alertObj, function(){
       var temp_command = new RobatCommand('CloseWindow');
        temp_command.send();
    });
};


/*var default_xml ='<xml><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>';
var cur_xml = blocklyDatas.getDataByKey('currentProgramXml');*/



'use strict';

var jquery = require('jquery');
var ubtUtils = require('../../../engine/common/utils/utils');
var blocklyDatas = require('../../../engine/service/blockly_datas');
var $ = require('jquery');

module.exports = function (app) {
    //设置音效
    app.controller('soundEffectsCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService','$compile',function($scope, $ionicModal,$timeout,$ionicPopup,dataService,$compile) {
        var soundSource = require('../soundEffects/sound');
        //初始化输入框对象
        $scope.popupCommonParam.inputContent="";
        $scope.popupCommonParam.checkInput=false;
        // $scope.input_rule_msg = $scope.languageResource.input_rule_msg.replace('%1', '16').replace('%2', '8');
        $scope.inputOnfocus = false;
        //名称重复提示框
        $scope.recording_name_msg = "";
        $scope.popupCommonParam.ruleMsg = $scope.languageResource.input_rule_msg.replace('%1', '16').replace('%2', '8');
        //对外数据
        $scope.popupObject.outData = {"type":"","key":""};
        //定时器，实时显示录音时间
        //菜单  初始化
        $scope.soundTypes = dataService.popupInitData("soundType");
        //总数据
        //var totalData = angular.copy($scope.popupObject.inData);
        var totalData = angular.copy(soundSource.data());
        //初始化参数
        if($scope.popupObject.inData){
            if($scope.popupObject.inData.type =="" || $scope.popupObject.inData.type==undefined){
                $scope.popupObject.inData.type = $scope.soundTypes[0].key;
            }
            if($scope.popupObject.inData.key == ""|| $scope.popupObject.inData.key==undefined){  //eg:horn god ......
                $scope.popupObject.inData.key = "";
            }

        }
        //列表集合  初始化 type--(eg:animal)方便传值  data--数据列表
        $scope.listData = {"type":$scope.popupObject.inData.type,"data":totalData[$scope.popupObject.inData.type]};
//        $scope.listData = {"type":"recording","data":totalData['recording']};


        //menuIndex--菜单选中下标  currentMenu---当前菜单（eg:animal） currentChoseObj--当前被选中对象  currentBtn--当前点击按钮（新增录音、删除录音）
        $scope.soundEffectObj = {
            "menuIndex":dataService.menuIndex_fn($scope.popupObject.inData.type),
            "currentMenu":$scope.popupObject.inData.type,
            "currentChoseObj":dataService.selSoundObj($scope.popupObject.inData.key,$scope.listData.data),
            "currentBtn":"",
            "deleteOK":"no",
            "isDelay" : ($scope.popupObject.inData.isDelay === undefined ? false:$scope.popupObject.inData.isDelay)
        };

        //html界面转向
        var htmls = {"animal":"ionicPopup/html/soundEffects/animal.html",
                     "machine":"ionicPopup/html/soundEffects/machine.html",
                     "recording":"ionicPopup/html/soundEffects/recording.html"
        };

        //初始化界面
        //$scope.temp_html_url = htmls[$scope.popupObject.inData.type];

        //初始化设置对外数据
        $scope.popupObject.outData.type = $scope.soundEffectObj.currentMenu;
        if($scope.soundEffectObj.currentChoseObj!=null && $scope.soundEffectObj.currentChoseObj!=undefined){
            $scope.popupObject.outData.key = $scope.soundEffectObj.currentChoseObj.key;
            $scope.popupObject.outData.description = $scope.soundEffectObj.currentChoseObj.description==undefined?$scope.soundEffectObj.currentChoseObj.deseription:$scope.soundEffectObj.currentChoseObj.description;
            $scope.popupObject.outData.isDelay = $scope.soundEffectObj.isDelay;
        }else{
            $scope.popupObject.outData.key = "";
            $scope.popupObject.outData.description = "";
            $scope.popupObject.outData.isDelay = false;
        }

        /*   addHtml($scope.soundEffectObj.currentMenu);*/
        /**
         * 业务处理
         * @param busType
         * @param param01
         * @param param02
         */
        $scope.soundBus = function(busType,param01,param02){
              if(busType){
                  switch(busType){
                      case "changeDelay":{
                          $scope.popupObject.outData.isDelay = $scope.soundEffectObj.isDelay;
                          break;
                      }
                      case "menu":{
                          $scope.listData = [];
                          //下标赋值
                          $scope.soundEffectObj.menuIndex = param02;
                          //当前菜单
                          $scope.soundEffectObj.currentMenu = param01.key;
                          //列表集合
                          $scope.listData.data = angular.copy(totalData[param01.key]);
                          $scope.listData.type = param01.key;
                          //界面转向
                         // $scope.temp_html_url = htmls[param01.key];
                          if(param01.key!=="recording"){
                              $scope.temp_html_url = "ionicPopup/html/soundEffects/animal.html";
                          }else{
                              $scope.temp_html_url = "ionicPopup/html/soundEffects/recording.html";
                          }

                          console.log("-----------------"+param01.key);
                          break;
                      }
                      case "chose":{
                          //判断选中对象是否与前选中对象相同
                        if($scope.soundEffectObj.currentChoseObj==null||param01.key !=  $scope.soundEffectObj.currentChoseObj.key){
                            //若不同，则赋值
                            $scope.soundEffectObj.currentChoseObj = param01;
                        }
                          //对外数据
                          $scope.popupObject.outData.type = param02;  //当前菜单类型
                          $scope.popupObject.outData.key =  $scope.soundEffectObj.currentChoseObj.key;
                          $scope.popupObject.outData.description =  $scope.soundEffectObj.currentChoseObj.description==undefined?$scope.soundEffectObj.currentChoseObj.deseription:$scope.soundEffectObj.currentChoseObj.description;
                          $scope.popupObject.outData.isDelay = $scope.soundEffectObj.isDelay;
                          //开启录音
                          if(window.blocklyObj != undefined){
                              window.blocklyObj.playAudio(JSON.stringify($scope.popupObject.outData));
                          }
                        break;
                      }
                      case "recordingBus":{
                          dataService.soundEffectObj.currentType =  $scope.soundEffectObj.currentMenu;
                         // dataService.soundEffectObj.currentType =  $scope.soundEffectObj.currentChoseObj.key;
                          if(param01 == "delete"){  //删除录音
                              $timeout(function(){
                                  $scope.$apply(function(){
                                      if($scope.soundEffectObj.deleteOK == "no"){
                                          $scope.soundEffectObj.deleteOK = "ok";
                                      }else{
                                          $scope.soundEffectObj.deleteOK = "no";
                                      }
                                  });
                              });

                          }else if(param01 == "add"){
                              //新增录音
                             /* 1.先关闭原来弹出框
                              2.打开新增录音弹出框（界面初始化调用录音开始接口）
                              3.录音---点击录音完成
                              4.点击录音完成按钮调用录音结束接口*/
                              /**
                               * fix 声音弹出框会闪烁的问题 
                               * 
                               */
                              var intervalValue = dataService.soundEffectObj.intervalObj;
                              if (intervalValue != null) {
                                  console.log('清楚定时器：'+ intervalValue);
                                  window.clearInterval(intervalValue);
                              }
                              var hasPower = false;
                              //开启录音
                              if(window.blocklyObj != undefined){
                                  try{
                                      hasPower = window.blocklyObj.startRecordAudio();
                                      if(hasPower==true){
                                          //关闭原来弹出框
                                          $scope.goBack();
                                          //打开录音弹出框界面
                                          $scope.popupShow("addRecording",$scope.popupObject.outData);
                                          var startTime = new Date();
                                          //开启界面时间显示定时器
                                          dataService.soundEffectObj.intervalObj = window.setInterval(function(){
                                              showtime(startTime);
                                          },10);

                                      }
                                  }catch(error){
                                      break;
                                  }
                              }else{
                                  //关闭原来弹出框
                                  $scope.goBack();
                                  //打开录音弹出框界面
                                  $scope.popupShow("addRecording",$scope.popupObject.outData);
                                  var startTime = new Date();
                                  //开启界面时间显示定时器
                                  dataService.soundEffectObj.intervalObj = window.setInterval(function(){
                                      showtime(startTime);
                                  },10);
                              }
                          }
                            break;
                      }
                      case "dropRecording":{ //放弃录音
                           //放弃录音  
                          if(window.blocklyObj){
                              window.blocklyObj.cancelRecordAudio();
                          }
                          //关闭当前弹出框
                          $scope.goBack();
                          $scope.popupCommonParam.inputContent = '';
                          // $scope.popupCommonParam.inputValid = true;
                          break;
                      }
                      case "recordingOK":{ //完成录音
                          //输入录音文件名称完毕addCustomSound
                          // if(!$scope.popupCommonParam.inputValid){
                          //      return;
                          // }
                          //新增录音  {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice10","description":"录音10"}
                          //设置默认录音名称值
                          var temp_name = $scope.popupCommonParam.inputContent;
                          if(temp_name=="" || temp_name==null || temp_name==undefined){
                              temp_name = $scope.languageResource.sysVoiceName;
                          }
                          var param = {
                              "icon":"images/popup/emotion/luyin@1x.png",
                               key:"",
                              "description": temp_name,
                              "duration":dataService.soundEffectObj.currentTime
                          };
                          console.log("当前时间******:"+dataService.soundEffectObj.currentTime);
                          var addResult = 1;
                          if(window.blocklyObj != undefined){
                              addResult = window.blocklyObj.addCustomSound(JSON.stringify(param));
                          }
                          //返回值(0:保存失败;1:保存成功;2:音效名已存在;3:录音文件不存在;4:参数错误;)
                          if(addResult==1){
                              //清空值
                              // $scope.popupCommonParam.inputMsg = $scope.languageResource.recording_name_repeat;
                              //给本地录音对象集合新增当前录音存储数据
                              $scope.goBack();
                              $scope.popupShow("soundEffects",{type: dataService.soundEffectObj.currentType,key:dataService.soundEffectObj.currentKey});
                          }else if(addResult == 2){
                              $scope.systemHintShow($scope.languageResource.recording_name_repeat,"error");
                              return;
                            //  $scope.popupCommonParam.inputMsg = $scope.languageResource.recording_name_repeat;
                          }
                          break;
                      }
                      case "deleteRecord":{//删除录音
                        //得到当前所有录音文件
                        $scope.listData.data = angular.copy(totalData[$scope.listData.type]);
                         var param_temp = {key:param01.key};
                         //先删除远程，再删除本地
                          if(window.blocklyObj != undefined){
                              var delOK =  window.blocklyObj.deleteCustomSound(JSON.stringify(param_temp));
                              if(JSON.parse(delOK)==true){
                                  var currentKey = param01.key;
                                  if( $scope.listData.data.length>1){
                                      for(var i=0;i< $scope.listData.data.length;i++){
                                          //当录音文件有切只有一个的情况下需要制空当前选中项，即选中当前唯一录音文件之后，删除，点击确认，界面中显示有误                                   
                                          if(currentKey == $scope.soundEffectObj.currentChoseObj.key){
                                              $("#"+param01.key).remove();
                                              $scope.soundEffectObj.currentChoseObj.key = "";
                                              $scope.popupObject.outData.key = "";
                                              $scope.popupObject.outData.description = "";
                                              $scope.popupObject.outData.isDelay = false;
                                              //删除当前选中项
                                              $scope.popupCallback["soundEffects"]($scope.popupObject.outData);
                                          }
                                          if(currentKey == $scope.listData.data[i].key ){
                                            $scope.listData.data.splice(i, 1);   
                                            totalData[$scope.listData.type].splice(i, 1);
                                            $("#"+param01.key).remove();                                                                                 
                                            break;
                                          }
                                      }
                                  }else if($scope.listData.data.length==1){
                                        $timeout(function(){
                                          $scope.$apply(function(){
                                              $("#"+param01.key).remove();
                                              $scope.soundEffectObj.currentChoseObj.key = "";
                                              $scope.popupObject.outData.key = "";
                                              $scope.popupObject.outData.description = "";
                                              $scope.popupObject.outData.isDelay = false;
                                              //删除当前选中项
                                              $scope.popupCallback["soundEffects"]($scope.popupObject.outData);
                                              totalData[$scope.listData.type]=[]; 
                                              $scope.listData.data=[];
                                          });
                                        });

                                  }
                              }
                          }else{
                              if( $scope.listData.data.length>0){
                                  for(var i=0;i< $scope.listData.data.length;i++){
                                      //当录音文件有切只有一个的情况下需要制空当前选中项，即选中当前唯一录音文件之后，删除，点击确认，界面中显示有误
                                      if(param01.key == $scope.soundEffectObj.currentChoseObj.key){
                                          $scope.soundEffectObj.currentChoseObj.key = "";
                                          $scope.popupObject.outData.key = "";
                                          $scope.popupObject.outData.description = "";
                                          $scope.popupObject.outData.isDelay = false;
                                          //删除当前选中项
                                          $scope.popupCallback["soundEffects"]($scope.popupObject.outData);
                                      }
                                      if(param01.key == $scope.listData.data[i].key ){
                                          $scope.listData.data.splice(i, 1);
                                          totalData[$scope.listData.type].splice(i,1);
                                          break;
                                      }
                                  }
                              }
                          }
                          break;

                      }

                  }

              }
        };
        //初始化调用方法
        $scope.soundBus("menu",$scope.soundTypes[$scope.soundEffectObj.menuIndex],$scope.soundEffectObj.menuIndex);


        //显示时间
        function showtime(startTime){
            var LeaveTime = new Date()- startTime ;
            var LeaveMinutes=Math.floor(LeaveTime/(1000*60)%60);//分
            var LeaveSeconds=Math.floor(LeaveTime/1000%60)+1;//秒
            var c=new Date();
            var q=c.getMilliseconds();
            if(document.getElementById('EndTimeMsg')){
                // document.getElementById('EndTimeMsg').innerHTML =  LeaveMinutes + ":" + LeaveSeconds+":"+q; //显示时间
                document.getElementById('EndTimeMsg').innerHTML =  LeaveSeconds+"\"/60\""; //显示时间
            }
            //限制只能60秒
            if(LeaveSeconds == 60){
                //关闭定时器
                if(dataService.soundEffectObj.intervalObj != null){
                    window.clearInterval(dataService.soundEffectObj.intervalObj);
                }
                //停止录音
                if(window.blocklyObj != undefined){
                    window.blocklyObj.stopRecordAudio();
                }
                //关闭录音弹出框
                $scope.goBack();
                //打开输入录音名称弹出框
                $scope.popupShow("recordingName",$scope.popupObject.outData);
            }


        }
        $scope.changeTipPosition = function (){
            // $scope.popupCommonParam.inputMsg = $scope.languageResource.input_rule_msg.replace('%1', '16').replace('%2', '8');
            // $scope.popupCommonParam.inputValid = true;
            $scope.inputOnfocus = true;
        };
        $scope.clearField = function(){
            var field = document.getElementById('recordingName');
            field.value = '';
            $scope.popupCommonParam.postName = '';
            $scope.popupCommonParam.inputContent = '';
        };
        $scope.addPopupInputCheck = function(type){
            console.log("type"+type);
            if(type=='1'){//change 事件
              $scope.inputOnfocus = true;
              var real_len = dataService.getLength($scope.popupCommonParam.inputContent);
              console.log("real_len"+real_len);
              if(real_len>16){
                  var str = $scope.popupCommonParam.inputContent;
                  $scope.popupCommonParam.inputContent = str.substr(0, 8);
              }
            }else{
              $scope.inputOnfocus = false;
            }
            $scope.popupCommonParam.inputContent = dataService.stripscript($scope.popupCommonParam.inputContent);
        };

    }]);
    
};


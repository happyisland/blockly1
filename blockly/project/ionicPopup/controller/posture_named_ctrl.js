'use strict';
module.exports = function (app) {
    var blocklyDatas = require('../../../engine/service/blockly_datas');
    var CodeLanguage = require('../../../engine/common/program/program_init');
    var utils = require('../../../engine/common/utils/utils');
    //命令
    var RobotCommand = require('../../../engine/service/robat_command');
    //项目管理
    app.controller('postureNamedCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        
        $scope.initData = function (){
            // $scope.popupCommonParam.inputValid = true;
            //allServerIsAdjust==false 表示锁定上电 allServerIsAdjust==trie表示可调节掉电
            $scope.allServerIsAdjust = false;
            $scope.inputOnfocus = false;
            $scope.input_rule_msg = $scope.languageResource.input_rule_msg.replace('%1', '16').replace('%2', '8');
        };

        $scope.addPopupInputCheck = function(type){
            console.log("type"+type);
            if(type=='1'){
                $scope.inputOnfocus = true;
                var real_len = dataService.getLength($scope.popupCommonParam.postName);
                console.log("real_len"+real_len);
                if(real_len>16){
                    var str = $scope.popupCommonParam.postName;
                    $scope.popupCommonParam.postName = str.substr(0, 8);
                }
            }else{
                $scope.inputOnfocus = false;
            }
            $scope.popupCommonParam.postName = dataService.stripscript($scope.popupCommonParam.postName);
        };
        
        $scope.doBus = function(busType,allServerIsAdjust){
            if(busType){
                switch (busType){
                    case "toggleChange":{//开关切换
                        console.log("toggleChange:allServerIsAdjust:false锁定上电 allServerIsAdjust:true可调节掉电"+$scope.allServerIsAdjust);
                        var cmd = "servoPowerOff";
                        if(allServerIsAdjust){
                            cmd = "servoPowerOff";
                        }else{
                            cmd = "servoPowerOn";
                        }
                        var servoArr = blocklyDatas.getServoIds();
                        var servoStr = servoArr.join(',');
                        var pwerCommand = new RobotCommand(cmd+'|'+servoStr);
                        pwerCommand.send();
                        $scope.clearField();
                        break;
                    }
                }
            }
        };

        $scope.changeTipPosition = function (){
            $scope.inputOnfocus = true;
        };
        $scope.clearField = function(){
            var field = document.getElementById('postureName');
            field.value = '';
            $scope.popupCommonParam.postName = '';
            // $scope.popupCommonParam.inputValid = true;
        };

        if($scope.popupObject.inData != null){
            $scope.popupCommonParam.postName = $scope.popupObject.inData.name;
        }else{
            $scope.popupCommonParam.postName = "";
        };

        $scope.initData();
    }]);
};

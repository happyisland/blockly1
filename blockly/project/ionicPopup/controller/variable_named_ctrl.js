'use strict';
module.exports = function (app) {
    var blocklyDatas = require('../../../engine/service/blockly_datas');
    var CodeLanguage = require('../../../engine/common/program/program_init');
    var utils = require('../../../engine/common/utils/utils');
    //命令
    var RobotCommand = require('../../../engine/service/robat_command');
    //项目管理
    app.controller('variableNamedCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        
        // 数据初始化
        $scope.initData = function(){
            $scope.variableSet = {};
            $scope.inputOnfocus = false;
            $scope.directionParam = $scope.popupObject.inData;
            $scope.popupObject.outData = $scope.directionParam;
            $scope.popupCommonParam.ruleMsg = $scope.languageResource.variable_inputrule_msg.replace('%1', '12').replace('%2', '6');
        }
        // 输入字符校验
        $scope.addPopupInputCheck = function(type){
            console.log("type"+type);
            if(type=='1'){//change事件
                $scope.inputOnfocus = true;
                var real_len = dataService.getLength($scope.popupCommonParam.variableName);
                console.log("real_len"+real_len);
                if(real_len>12){
                    var str = $scope.popupCommonParam.variableName;
                    $scope.popupCommonParam.variableName = str.substr(0, 6);
                }
            }else{
                $scope.inputOnfocus = false;
            }
            $scope.popupCommonParam.variableName = dataService.stripscript($scope.popupCommonParam.variableName);
            $scope.popupCommonParam.variableName =  dataService.numberCheck($scope.popupCommonParam.variableName);
        }

        $scope.changeTipPosition = function (){
            $scope.inputOnfocus = true;
        };

        //清空输入域
        $scope.clearField = function(){
            var field = document.getElementById('variableName');
            field.value = '';
            $scope.popupCommonParam.variableName = '';
        }

        if($scope.popupObject.inData != null && $scope.popupObject.inData.length!= 0){
            $scope.popupCommonParam.variableName = $scope.popupObject.inData.name;
        }else{
            $scope.popupCommonParam.variableName = "";
        }
        
        $scope.initData();
        
    }]);
};

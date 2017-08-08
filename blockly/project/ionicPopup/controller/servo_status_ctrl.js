'use strict';
module.exports = function (app) {
    //项目管理
    app.controller('servoStatusCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        //初始化数据
        $scope.servoStatusList = angular.copy($scope.popupObject.inData);

        //初始化设定外部值
        $scope.popupObject.outData = angular.copy($scope.popupObject.inData);

      //  var imgs = {"close":""};

        /**
         * //选中下标索引
         * @type {{servoIndex: string, speedIndex: string}}
         * servoIndex  舵机索引
         * isClose  是否锁定
         * servoId  当前舵机ID
         */
        $scope.selIndexObj = {"servoIndex":0,"power":$scope.servoStatusList[0].power,"servoId":$scope.servoStatusList[0].servoId};
        /**
         * 设置舵机状态业务操作
         * @param busType 操作类型
         * @param param01 参数1
         * @param servoIndex 参数2
         */
        $scope.servoStatusBus = function(busType,param01,servoIndex){
            if(busType){
                switch(busType){
                    case "servoSel":{
                        //选中下标索引
                        $scope.selIndexObj.servoIndex = servoIndex;
                        //赋值当前选中舵机对象
                        $scope.selIndexObj.servoId = param01.servoId;
                        //上电、掉电赋值
                        $scope.selIndexObj.power = param01.power;
                        break;
                    }
                    case "close":{
                        if($scope.selIndexObj.power != param01){
                            $scope.selIndexObj.power = param01;
                        }
                        setServoStatus( $scope.selIndexObj.power);
                        break;
                    }
                }
            }
        };
        /**
         * 设置舵机上电、掉电外部值
         * @param param
         */
        function setServoStatus(param){
            if(param!=undefined && param!=null){
                if($scope.servoStatusList.length>0){
                    for(var i=0;i<$scope.servoStatusList.length;i++){
                        var temp_servo = $scope.servoStatusList[i];
                        if(temp_servo.servoId ==  $scope.selIndexObj.servoId){

                            //改变当前舵机上电、掉电状态
                            $scope.servoStatusList[i].power = param;
                            //外部赋值
                            $scope.popupObject.outData = angular.copy($scope.servoStatusList);
                            break;
                        }
                    }
                }
            }
        }

    }]);
};

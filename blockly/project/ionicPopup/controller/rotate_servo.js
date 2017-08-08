'use strict';
module.exports = function (app) {
    var $ = require('jquery');
    //项目管理
    app.controller('rotateServoCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
       /* //滑动
        $scope.$on("ngRepeatFinished",function(){
            //初始化好友列表垂直滑动
            $timeout(function(){
                var  myScroll = new IScroll('#wrapper', { mouseWheel: true });
            },500);
        });*/
        //定时器
        //舵机信息集合
       $scope.servoSepList = $scope.popupObject.inData.length>=0?$scope.popupObject.inData:dataService.popupInitData("rotateServo");
        //刚开始
        //初始化
       // storage.setItem("servoSpeed",JSON.stringify($scope.servoSepList));
        //赋值当前选中舵机对象 下标
        function speed_Index(param){
            //赋值当前选中舵机对象
            var _n = 0;
            if(param == "VS"){
                _n = 0;
            }else if(param == "S"){
                _n = 1;
            }else if(param == "M"){
                _n = 2;
            }else if(param == "F"){
                _n = 3
            }else if(param == "VF"){
                _n = 4;
            }
            return _n;
        }
        /**
         * 返回速度全称
         * @param sepType
         */
        $scope.speedStr = function(sepType){
            var _b = "middle";
            if(sepType){
                switch(sepType){
                    case "VS":{
                        _b = $scope.languageResource.speed_VS;
                        break;
                    }
                    case "S":{
                        _b = $scope.languageResource.speed_S;
                        break;
                    }
                    case "M":{
                        _b = $scope.languageResource.speed_M;
                        break;
                    }case "F":{
                    _b = $scope.languageResource.speed_V;
                    break;
                }case "VF":{
                    _b = $scope.languageResource.speed_VF;
                    break;
                }
                }
            }
            return _b;
        };

        /**
         * //选中下标索引
         * @type {{servoIndex: string, speedIndex: string}}
         * servoIndex  舵机索引
         * speedIndex  速度索引
         */
        $scope.selIndexObj = {"servoIndex":"","speed":{"index":"","speed":"middle"},"direction":"+"};
        //舵机对象信息
        if($scope.servoSepList.length>0){
            $scope.servoObj = $scope.servoSepList[0];
            $scope.selIndexObj.speed.index = speed_Index($scope.servoObj.speed);
            $scope.selIndexObj.speed.speed = $scope.speedStr($scope.servoObj.speed);
        }else{
            $scope.servoObj = {"servoId":"1","isClose":false,"speed":"VS","direction":"-"};
        }

        //舵机速度对象
        $scope.speedList = ["VS","S","M","F","VF"];


        //初始化赋值
        $scope.popupObject.outData = angular.copy($scope.servoSepList);

        /**
         * 舵机信息控制
         * @param busType 操作类型  servoSel-舵机列表选中  speedSel-速度选中
         * @param param  参数
         * @param servoIndex  选中索引
         */
        $scope.servoSpeedSelBus = function(busType,param,servoIndex){
            if(busType){
                switch (busType){
                    case "servoSel":{  //舵机列表选中 面板赋值选中默认值
                        //选中下标索引
                        $scope.selIndexObj.servoIndex = servoIndex;
                        //赋值当前选中舵机对象
                        $scope.servoObj = param;
                        $scope.selIndexObj.speed.index = speed_Index(param.speed);
                        break;
                    }
                    case "speedSel":{  //舵机速度选中
                        // 当舵机关闭时，无法调整舵机角度
                        if(!$scope.servoObj.isClose){
                            return;
                        }
                        //选中下标索引
                        $scope.selIndexObj.speed.index = servoIndex;
                        //速度全称
                        $scope.selIndexObj.speed.speed = $scope.speedStr(param);
                        //赋值集合中选中对象速度值
                        for(var _i = 0;_i<$scope.servoSepList.length;_i++){
                            var temp_i = $scope.servoSepList[_i];
                            if(temp_i.servoId == $scope.servoObj.servoId){
                                $scope.servoSepList[_i].speed = param;
                                //给外界赋值
                                //servoSpeedList = $scope.servoSepList;
                            //    storage.setItem("servoSpeed",JSON.stringify($scope.servoSepList));//用localStorage保存转化好的的字符串
                                $scope.popupObject.outData = $scope.servoSepList;
                                console.log("内部值:"+$scope.servoSepList);
                                break;
                            }
                        }
                        break;
                    }
                    case "directionSel":{  //方向选择
                        // 当舵机关闭时，无法调整舵机角度
                        if(!$scope.servoObj.isClose){
                            return;
                        }
                        $scope.selIndexObj.direction = param;
                        for(var _j = 0;_j<$scope.servoSepList.length;_j++){
                            var temp_i = $scope.servoSepList[_j];
                            if(temp_i.servoId == $scope.servoObj.servoId){
                                $scope.servoSepList[_j].direction = param;
                                //给外界赋值
                                //servoSpeedList = $scope.servoSepList;
                              //  storage.setItem("servoSpeed",JSON.stringify($scope.servoSepList));//用localStorage保存转化好的的字符串
                                $scope.popupObject.outData = $scope.servoSepList;
                                console.log("内部值:"+$scope.servoSepList);
                                console.log($scope.servoSepList);
                                break;
                            }
                        }
                        break;
                    }
                    case "toggleChange":{
                        console.log("打开true ;关闭falsetoggleChange:"+$scope.servoObj.isClose);
                        for(var _k = 0;_k<$scope.servoSepList.length;_k++){
                            var temp_i = $scope.servoSepList[_k];
                            if(temp_i.servoId == $scope.servoObj.servoId){
                                $scope.servoSepList[_k].isClose = $scope.servoObj.isClose;
                                //给外界赋值
                                //servoSpeedList = $scope.servoSepList;
                              //  storage.setItem("servoSpeed",JSON.stringify($scope.servoSepList));//用localStorage保存转化好的的字符串
                                $scope.popupObject.outData = $scope.servoSepList;
                                console.log("内部值:"+$scope.servoSepList);
                                console.log($scope.servoSepList);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        };


    }]);
};

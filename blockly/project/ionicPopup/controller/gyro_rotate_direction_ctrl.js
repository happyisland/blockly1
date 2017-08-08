'use strict';
var blocklyDatas = require('../../../engine/service/blockly_datas');
module.exports = function (app) {
    //项目管理
    app.controller('gyroRotateDirctionCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        //初始化数据
        $scope.gyroObj = $scope.popupObject.inData;
        //初始化数据
        if($scope.gyroObj.direction==null || $scope.gyroObj.direction==undefined || $scope.gyroObj.direction==""){
            $scope.gyroObj.direction = "x_axie";
        }

        //初始化设定外部对象值
        $scope.popupObject.outData = {"direction":$scope.gyroObj.direction};
         //当前陀螺仪数据信息对象
        $scope.gyroCurObj = {"x_axie":"","y_axie":"","z_axie":""};
        /*var curGyroData = blocklyDatas.getGyroscopeIds();
        $scope.gyroCurObj.hasGyro = curGyroData[0]=="ID"?false:true;*/
        $scope.gyroCurObj.hasGyro = false;
        //得到当前陀螺仪信息（X、Y、Z）
        $scope.getCurrentGyroInfo = function(){
           //读取外设信息
            dataService.command("read_device",null);
            var sensorId = $scope.gyroObj.gyroId;
            var gyroSensorObj = {};
            gyroSensorObj.id = sensorId;
            gyroSensorObj.sensorType = 'Gyro';
            gyroSensorObj.duration = '300';
            gyroSensorObj.times = 4;
            gyroSensorObj.controlType = '02';
            //陀螺仪连接状态才获取实时值
            dataService.command('gyroShow', gyroSensorObj);

         };
        /**
         * 方向选择
         * @param direction
         */
        $scope.gyroRotateDirection = function(direction){
            //判断当前方向与选中方向是否一致，若一致就不需要切换，若不一致则需要切换方向值
            if($scope.gyroObj.direction != direction){
                $scope.gyroObj.direction = direction;
            }
            //外部赋值
            $scope.popupObject.outData = {"direction":$scope.gyroObj.direction};
        };
        /**
         * 读取外设实时数据回调函数
         * @param data 返回数据
         */
        function readDeviceCallBack(data){
            if(data != ""){
                var resultJson = JSON.parse(decodeURI(data));
                var gyroData =  resultJson['Gyro'];
                if(gyroData.length>0){
                    $scope.gyroCurObj.hasGyro = true;
                    var temp_gyro = null;
                    if($scope.gyroObj.gyroId == undefined){
                        temp_gyro = gyroData[0];
                    }else{
                        for(var i=0;i<gyroData.length;i++){
                            var temp_data = gyroData[i];
                            if(temp_data.id == $scope.gyroObj.gyroId){
                                temp_gyro =  gyroData[i];
                                break;
                            }
                        }
                    }
                    $timeout(function(){
                        $scope.$apply(function(){
                            $scope.gyroCurObj.x_axie = temp_gyro.x;
                            $scope.gyroCurObj.y_axie = temp_gyro.y;
                            $scope.gyroCurObj.z_axie = temp_gyro.z;
                        });
                    });
                }
            }

        }
        //读取外设实时数据回调函数
        window.readDeviceCallBack = readDeviceCallBack;


    }]);
};

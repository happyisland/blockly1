'use strict';

var jquery = require('jquery');
var ubtUtils = require('./../../../engine/common/utils/utils');
var blocklyDatas = require('../../../engine/service/blockly_datas');
module.exports = function (app) {
    app.controller('infraredSensorCtrl', ['$scope','$timeout','dataService', function($scope,$timeout,dataService){
        //界面显示文本
        $scope.curVal = MSG["current_value"];
        var cancelValue = 0;
        //红外传感器
        var infraredData =  blocklyDatas.getInfraredIds();
        $scope.initData = function(){
            $scope.infraredParam = $scope.popupObject.inData;
            if($scope.infraredParam.changeValue && $scope.infraredParam.changeValue!=""){
                $scope.infraredParam.changeValue = parseInt($scope.infraredParam.changeValue)>=20?20:parseInt($scope.infraredParam.changeValue);
            }
            $scope.popupObject.outData = $scope.infraredParam;
            //$scope.infraredParam.changeValue = $scope.infraredParam.curValue;
            $scope.infraredParam.opType = $scope.infraredParam.opType;
            $scope.infraredParam.hasInfrared = infraredData[0]=="ID"?false:true;
            var sensorId = $scope.infraredParam.sensorId;
            var infraredSensorObj = {};
            infraredSensorObj.id = sensorId;
            infraredSensorObj.sensorType = 'Infrared';
            infraredSensorObj.duration = '300';
            infraredSensorObj.times = 4;
            infraredSensorObj.controlType = '02';
            dataService.command('InfraredShow', infraredSensorObj);
            //红外传感器连接状态下就读取实时值
            if($scope.infraredParam.hasInfrared){
                dataService.command("read_infrared",null);
            }

        }

        $scope.changeDistance = function(clickType, direction){
            console.log(clickType);
            if(clickType == "release"){
                if(cancelValue != null){
                    clearInterval(cancelValue);
                }
            }else{
                switch(clickType){
                    case 'click'://点击递减
                        $scope.infraredParam.changeValue = parseInt($scope.infraredParam.changeValue);
                        var thatValue = $scope.infraredParam.changeValue;
                        $timeout(function(){
                            $scope.$apply(function(){
                                $scope.infraredParam.changeValue = direction == "plus"
                                    ? $scope.infraredParam.changeValue += 1 : $scope.infraredParam.changeValue -= 1;
                                if($scope.infraredParam.changeValue <0){
                                    $scope.infraredParam.changeValue = 0;
                                }
                                if($scope.infraredParam.changeValue>=20){
                                    $scope.infraredParam.changeValue = 20;
                                }
                            });
                        });
                        break;
                    case 'touch': //长按递增
                        $scope.infraredParam.changeValue = parseInt($scope.infraredParam.changeValue);
                        var thatValue = $scope.infraredParam.changeValue;
                        cancelValue = setInterval(function(){
                            $timeout(function(){
                                $scope.$apply(function(){
                                    $scope.infraredParam.changeValue = direction == "plus"
                                        ? $scope.infraredParam.changeValue += 1 : $scope.infraredParam.changeValue -= 1;
                                    if($scope.infraredParam.changeValue <0){
                                        $scope.infraredParam.changeValue = 0;
                                        clearInterval(cancelValue);
                                    }
                                    if($scope.infraredParam.changeValue>=20){
                                        $scope.infraredParam.changeValue = 20;
                                        clearInterval(cancelValue);
                                    }
                                });
                            });
                        },100);
                        break;
                }
            }
        }

        function readInfraredCallBack(data){
            if(data != ""){
                var resultJson = JSON.parse(decodeURI(data));
                var infraredData =  resultJson['Infrared'];
                if(infraredData.length>0){
                    $scope.infraredParam.hasInfrared = infraredData[0]=="ID"?false:true;
                    var temp_infrared = null;
                    if($scope.infraredParam.sensorId == undefined){
                        temp_infrared = infraredData[0];
                    }else{
                        for(var i=0;i<infraredData.length;i++){
                            var temp_data = infraredData[i];
                            if(temp_data.id == $scope.infraredParam.sensorId){
                                temp_infrared =  infraredData[i];
                                break;
                            }
                        }
                    }
                    $timeout(function(){
                        $scope.$apply(function(){
                            //var infraredValue = ubtUtils.convertInfraredValueToLevel2(temp_infrared.result);
                            $scope.infraredParam.curValue = temp_infrared.result;
                            jquery('#infrared_icon').attr('src', 'images/popup/event/event_infrared_sensor_icon.png');
                        });
                    });
                }
            }
        }
        //读取红外设备实时数据回调函数
        window.readInfraredCallBack = readInfraredCallBack;

        $scope.initData();


    }]);
};

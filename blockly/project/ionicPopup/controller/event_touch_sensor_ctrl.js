'use strict';
var blocklyDatas = require('../../../engine/service/blockly_datas');
var jquery = require('jquery');
module.exports = function (app) {
    app.controller('touchSensorCtrl', ['$scope','dataService', function($scope, dataService){
        $scope.touchLink = {link:true};
        //$scope.touchName = [MSG["click"],MSG["db_click"],MSG["press_hold"]];
        $scope.touchData = [{"id": "release", "name":MSG["release"], "val":'0'}, {"id": "click", "name":MSG["click"], "val":'1'}, {"id":"db_click", "name":MSG["db_click"], "val":'2'}, {"id":"press_hold", "name":MSG["press_hold"], "val":'3'}];
        $scope.touchParam = {};
        $scope.initData = function(){
            $scope.touchParam = $scope.popupObject.inData;
            //获取当前触碰
            var temp_data =  blocklyDatas.getTouchIds();
            if(temp_data[0]=="ID"){
                $scope.touchLink.link = true;
            }else{
                $scope.touchLink.link=false;
            };
            $scope.popupObject.outData = $scope.touchParam;
            if ($scope.touchParam.global =='global') {
                $scope.touchData = [ {"id": "click", "name":MSG["click"], "val":'1'}, 
                  {"id":"db_click", "name":MSG["db_click"], "val":'2'}, 
                  {"id":"press_hold", "name":MSG["press_hold"], "val":'3'}
                ];
            } else {
                $scope.touchData = [{"id": "release", "name":MSG["release"], "val":'0'}, 
                {"id": "click", "name":MSG["click"], "val":'1'},
                 {"id":"db_click", "name":MSG["db_click"], "val":'2'}, 
                 {"id":"press_hold", "name":MSG["press_hold"], "val":'3'}
                ];
            }
            var sensorId = $scope.touchParam.sensorId;
            var touchSensorObj = {};
            touchSensorObj.id = sensorId;
            touchSensorObj.sensorType = 'Touch';
            touchSensorObj.duration = '300';
            touchSensorObj.times = 4;
            touchSensorObj.controlType = '02';
            dataService.command('touchShow', touchSensorObj);
        };

        $scope.changeStatus = function(val){
            /*if($scope.touchParam.status == val){
                $scope.touchParam.status = '0';
            }else{*/
                $scope.touchParam.status = val;
            //}
            console.log($scope.popupObject.outData);
        }
        $scope.initData();

    }]);
};
"use strict";
module.exports = function (app) {
    app.controller('playTuneCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {

        // 定义属性
        $scope.tuneDataList = [ ];

        // 定义方法
        $scope.initTuneDataList = function(){

            var dataList = [
                {"id":"1","tune":"C5","isSelected":"true"},
                {"id":"2","tune":"D5","isSelected":"false"},
                {"id":"3","tune":"E5","isSelected":"false"},
                {"id":"4","tune":"F5","isSelected":"false"},
                {"id":"5","tune":"G5","isSelected":"false"},
                {"id":"6","tune":"A5","isSelected":"false"},
                {"id":"7","tune":"B5","isSelected":"false"},
                {"id":"8","tune":"C6","isSelected":"false"}
            ];

            $scope.tuneDataList = dataList;
            $scope.popupObject.data = $scope.tuneDataList;
        }

        $scope.playTune = function (id) {
            console.log('selected ' + id);
            
            if (window.blocklyObj) {
                blocklyObj.playTune(id);
            } else {
                console.log('Dubug Played Tune!');
            }

            $scope.popupObject.data = getPlayTuneDataById(id);
        }
        


        // 内部方法
        function getPlayTuneDataById(id) {
            
            for(var i = 0; i < $scope.tuneDataList.length; i++){
               if ($scope.tuneDataList[i].id == id+1) {
                   return $scope.tuneDataList[i];
               }
            }
        }

        // 逻辑处理
        $scope.initTuneDataList(); // 初始化数据



    }]);
};
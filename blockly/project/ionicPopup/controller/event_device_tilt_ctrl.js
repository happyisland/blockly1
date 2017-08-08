'use strict';

var jquery = require('jquery');
module.exports = function (app) {
    app.controller('deviceTiltCtrl', ['$scope','dataService', function($scope, dataService){
        $scope.directionName = [MSG["tilt_left"],MSG["tilt_right"],MSG["tilt_swing"],MSG["tilt_up"],MSG["tilt_down"]];
        $scope.directionArray = ["left","right","swing","up","down"];

        $scope.directionParam = {};
        $scope.initData = function(){
            $scope.directionParam = $scope.popupObject.inData;

            $scope.popupObject.outData = $scope.directionParam;
        }

        $scope.changeDirection = function(val){
            $scope.directionParam.direction = val;
            console.log($scope.popupObject.outData);
        }

        $scope.initData();

    }]);
};
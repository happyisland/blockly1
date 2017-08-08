'use strict';

var jquery = require('jquery');
module.exports = function (app) {
    app.controller('displayTuneCtrl', ['$scope','dataService', function($scope, dataService){
        $scope.tuneNames = ['C5','D5','E5','F5','G5','A5','B5','C6'];

        $scope.tuneParam = {};
        $scope.initData = function(){
            $scope.tuneParam = $scope.popupObject.inData;
            $scope.popupObject.outData = $scope.tuneParam;
        }
        $scope.initData();

        $scope.changeTune = function(val){
            $scope.tuneParam.tune = val;
            if(window.blocklyObj){
                var obj = {};
                obj.type = 'tune';
                obj.key = val;
                var jsonValue = JSON.stringify(obj);
                window.blocklyObj.playAudio(jsonValue);
            }
        }
    }]);
};

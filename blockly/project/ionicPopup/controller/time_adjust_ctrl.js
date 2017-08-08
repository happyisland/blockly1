/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * time_adjust_ctrl.js version 1.0
 * 
 * time_adjust_ctrl 
 * 
 * feature 时间选择的弹出框
 * 
 */
 
'use strict';

module.exports = function (app) {
    app.controller('timeAdjustCtrl',['$scope','$timeout','dataService',function name($scope,$timeout, dataService) {
        $scope.servoTime = {};
        $scope.initData = function(){
            $scope.servoTime = $scope.popupObject.inData;
            $scope.popupObject.outData = $scope.servoTime;
        };

        var cancelValue = 0;

        $scope.changeTime = function(clickType,actualTime){
            if(clickType){
                switch(clickType){
                    case 'decrease'://点击递减
                        $scope.servoTime.time = parseInt($scope.servoTime.time);
                        var thatValue = $scope.servoTime.time;
                        $timeout(function(){
                            $scope.$apply(function(){
                                $scope.servoTime.time -= 20;                          
                                if($scope.servoTime.time <=80){
                                    $scope.servoTime.time = 80;
                                }
                            });
                        });
                    break;
                    case 'decrease-touch': //长按递减
                        $scope.servoTime.time = parseInt($scope.servoTime.time);
                        var thatValue = $scope.servoTime.time;
                        cancelValue = setInterval(function(){
                            $timeout(function(){
                                $scope.$apply(function(){
                                     $scope.servoTime.time  -=20;
                                     if($scope.servoTime.time <=80){
                                         $scope.servoTime.time = 80;
                                         clearInterval(cancelValue);
                                     }                                  
                                });
                            });
                        },100);
                    break;
                    case 'increase'://点击递增
                        $scope.servoTime.time = parseInt($scope.servoTime.time);
                        var thatValue = $scope.servoTime.time;
                        $timeout(function(){
                            $scope.$apply(function(){
                                $scope.servoTime.time +=20;
                                
                                if($scope.servoTime.time>=5000){
                                    $scope.servoTime.time = 5000;
                                }
                            });
                        });                  
                    break;
                    case 'increase-touch': //长按递增
                        $scope.servoTime.time = parseInt($scope.servoTime.time);
                        var thatValue = $scope.servoTime.time;
                        cancelValue = setInterval(function(){
                            $timeout(function(){
                                $scope.$apply(function(){
                                     $scope.servoTime.time +=20;
                                     if($scope.servoTime.time>=5000){
                                         $scope.servoTime.time = 5000;
                                         clearInterval(cancelValue);
                                     }                                  
                                });
                            });
                        },100);
                    break;
                    case "release":{
                        if(cancelValue != null){
                            clearInterval(cancelValue);
                        }
                    break;
                   }
                        
                }
            }
            //$scope.servoTime.time  = actualTime;
        };

        $scope.initData(); 
    }]);
};
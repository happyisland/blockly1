'use strict'
module.exports = function (app) {
  // 项目管理
  app.controller('swiftController', ['$scope', '$ionicModal', '$timeout', '$ionicPopup', 'dataService', function ($scope, $ionicModal, $timeout, $ionicPopup, dataService) {
      $scope.description = {content:''};
    //获取项目描述
   $scope.getDescription = function(){
        if(dataService.curXmlObj.isDefault==true || dataService.curXmlObj.isDefault ==1){
            if(dataService.curXmlObj.xmlId!=""){
                var temp_content = JSON.parse(window.blocklyObj.getBlocklyProjectDescription(dataService.curXmlObj.xmlId));
                $scope.description.content = temp_content[$scope.languageCode];
                console.log("*********begin********获取说明*******begin*********");
                console.log($scope.description.content);
                console.log("*********end********获取说明*******end*********");

            }
        }
   }


   

  }])

};

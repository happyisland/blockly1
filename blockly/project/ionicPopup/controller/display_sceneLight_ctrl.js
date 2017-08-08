'use strict';

var jQuery = require('jquery');
var ubtUtils = require('../../../engine/common/utils/utils');
require('../common/jquery-wheelcolorpicker')(jQuery);
var blocklyDatas = require('../../../engine/service/blockly_datas');
module.exports = function (app) {
    //项目管理
    app.controller('sceneLightCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        
        var curLight =  blocklyDatas.getLightsIds();//当前LED灯
        /**
         * 切换 LED 灯动作
         * @param ledObj  当前所选灯的数据
         * @param ledIdx  当前所选灯在数组中的索引值
         */
        $scope.selectLight = function(ledObj, ledIdx){
            // console.log("保存当前curled数据----》");
            // console.log($scope.curSceneLight);
            // 保存当前curled数据
            if($scope.sceneLightData.islightLock){//锁定
                return ;
            }
            $scope.sceneLightData.lightArray[$scope.curSceneLight.curLedIndex].id = $scope.curSceneLight.curLedVal;
            $scope.sceneLightData.lightArray[$scope.curSceneLight.curLedIndex].emotionIndex = $scope.curSceneLight.emotionIndex;
            // console.log("输出的数据----》");
            // console.log($scope.sceneLightData);
            // 切换led更改当前选中的led数据
            $scope.curSceneLight.curLedIndex = ledIdx;
            $scope.curSceneLight.curLedVal = ledObj.id;
            $scope.curSceneLight.emotionIndex = ledObj.emotionIndex;
            //判断当前灯光是否连接
            $scope.ledLight.link = isLink($scope.curSceneLight.curLedVal);
            // console.log("curled obj--->");
            // console.log($scope.curSceneLight);
            $scope.sendCommand();
        };


        /**
         * 切换表情动作
         * @param emtionVal  当前所选表情的值
         * @param emIndex    当前所选表情在数组中的索引
         */
        $scope.selectEmotion = function(emtionVal, emIndex){
            if($scope.sceneLightData.islightLock){//锁定
                var len = $scope.sceneLightData.lightArray.length;
                for(var i = 0;i<len ;i++){
                    $scope.sceneLightData.lightArray[i].emotionIndex = emIndex + 12;
                }
            }else{
                $scope.sceneLightData.lightArray[$scope.curSceneLight.curLedIndex].emotionIndex = emIndex + 12;
                // console.log($scope.sceneLightData);
                // 更新当前led的当前表情索引
                // console.log("curled obj--->");
                // console.log($scope.curSceneLight);
            }
            $scope.curSceneLight.emotionIndex = emIndex + 12;
            $scope.sendCommand();
            console.log( $scope.curSceneLight.emotionIndex);
            console.log("输出数据：");
            console.log($scope.sceneLightData);
        };

        /**
         * 实时显示设置的表情
         * @param color         选择的颜色
         */
        $scope.sendCommand = function(){
            var LEDArray = [];
            if($scope.sceneLightData.islightLock){//锁定
                var len = $scope.sceneLightData.lightArray.length;
                for(var i=0;i<len;i++){
                    $scope.sceneLightData.lightArray[i].emotionIndex = $scope.curSceneLight.emotionIndex;
                }
                LEDArray = $scope.sceneLightData.lightArray;
            }else{//未锁定
                var LEDParam = {};
                LEDParam.id = $scope.curSceneLight.curLedVal;
                LEDParam.emotionIndex = $scope.curSceneLight.emotionIndex;
                LEDArray.push(LEDParam);
            }
            dataService.command('emojiRealTime', LEDArray);
        }

        /**
         * 根据灯光id查询是否连接
         * @param id
         */
        function isLink(id){
            var temp_param = true;
            if(curLight[0]=="ID"){ // 当前模型未连接任何LED
                temp_param = true;
            }else{//查看当前灯光是否连接
                for(var i=0;i<curLight.length;i++){
                    if(curLight[i]==id){
                        temp_param = false;
                        break;
                    }
                }
            }
            return temp_param;
        }
        // 锁定非锁定状态改变
        jQuery('.emotion-win').on('click','.checkbox1',function(){
            jQuery('.checkbox1').removeClass('active');
            jQuery(this).siblings().addClass('active');
            var data = jQuery(this).find(":nth-child(1)").attr("data-val");
            console.log(data);
            $scope.ledsLock = data;
            $timeout(function(){
                if(data =='on'){//锁定
                    jQuery(".emotion-win ul.list li").addClass('emotion-led-box-sel');
                    $scope.sceneLightData.islightLock = true;
                    var len = $scope.sceneLightData.lightArray.length;
                    for(var i=0;i<len;i++){
                        $scope.sceneLightData.lightArray[i].emotionIndex = $scope.curSceneLight.emotionIndex;
                    }
                    console.log($scope.sceneLightData);

                }else if(data =='off'){
                    $scope.sceneLightData.islightLock = false;
                    var initObj = $scope.sceneLightData.lightArray[0];
                    $scope.curSceneLight.curLedIndex = 0;
                    $scope.curSceneLight.curLedVal = initObj.id;
                    $scope.curSceneLight.emotionIndex = initObj.emotionIndex;
                    jQuery(".emotion-win ul.list li").removeClass('emotion-led-box-sel');
                    jQuery(".emotion-win ul.list li:first").addClass('emotion-led-box-sel');
                }
                $scope.sendCommand();
            });
        });
        /*
            初始化数据
        */
        $scope.initData = function(){
            //led是否已连接
            $scope.ledLight = {link:true};
            //当前所选led灯数据
            $scope.curSceneLight = {
                "curLedIndex":"0", 
                "curLedVal":"",
                "emotionIndex":"12"
            };
            //所有LED灯数据
            $scope.sceneLightData = {};
            //表情二维数组，以三个为一行
            $scope.sceneLights = ["deng","disco","sanyuanse","caise"];
            $scope.sceneLightsName = [MSG["id_deng"], MSG["id_disco"], MSG["id_sanyuanse"], MSG["id_caise"]];

            //初始化数据传入
            $scope.sceneLightData =  $scope.popupObject.inData;
            console.log("传入的初始化数据---》");
            console.log($scope.sceneLightData);
            $scope.isshow_select_all = $scope.sceneLightData.lightArray.length > 1? true:false;
            //初始化数据传出
            $scope.popupObject.outData = $scope.sceneLightData;

            // 初始化ID1
            if($scope.sceneLightData.lightArray.length>0){
                //选中初始化
                $scope.curSceneLight.curLedVal = $scope.sceneLightData.lightArray[0].id;
                //初始化ID
                $scope.curSceneLight.emotionIndex = $scope.sceneLightData.lightArray[0].emotionIndex;
                //判断当前灯光是否连接
                $scope.ledLight.link = isLink($scope.curSceneLight.curLedVal);

                //初始化右侧颜色选择器
                $timeout(function(){
                    $scope.$apply(function(){
                        if($scope.sceneLightData.islightLock){//锁定
                            jQuery(".emotion-win ul.list li").addClass('emotion-led-box-sel');
                        }else {//非锁定
                            jQuery(".emotion-win ul.list li:first").addClass('emotion-led-box-sel');
                        }
                    });
                });
            }
            $scope.sendCommand();

        };
        $scope.initData();

    }]);
};

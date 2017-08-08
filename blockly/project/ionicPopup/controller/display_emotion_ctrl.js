'use strict';

var jQuery = require('jquery');
var ubtUtils = require('../../../engine/common/utils/utils');
require('../common/jquery-wheelcolorpicker')(jQuery);
var blocklyDatas = require('../../../engine/service/blockly_datas');
module.exports = function (app) {
    //项目管理
    app.controller('emotionDisCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        //当前LED灯
        var curLight =  blocklyDatas.getLightsIds();

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

        /**
         * 切换 LED 灯动作
         * @param param1  当前所选灯的数据
         * @param ledIdx  当前所选灯在数组中的索引值
         */
        $scope.selectLight = function(param1, ledIdx){
            if($scope.emotionData.islightLock){
                return;
            }
            //保存切换前 led 灯所选的值
            for(var idx = 0; idx < $scope.emotionData.lightArray.length; idx++){
                if(idx == $scope.emotionParam.curLedIndex){
                    $scope.emotionData.lightArray[idx].emotionIndex = $scope.emotionParam.emotionIndex;
                }
            }
            jQuery('.face-box').css('border-color', '#EAEAEA');
            jQuery('.color-box').css('display', 'none');
            jQuery(".colorblock-box>table span").removeClass("active");
            $scope.currentColorBlock = '';
            //加载切换后led灯的数据
            $scope.emotionParam.curLedVal = param1.id;
            $scope.emotionParam.curLedIndex = ledIdx;
            $scope.emotionParam.emotionIndex = param1.emotionIndex;
            $scope.emotionParam.color = param1.color;
            //判断当前灯光是否连接
            $scope.ledLight.link = isLink($scope.emotionParam.curLedVal);
            // 加载表情颜色
            $scope.loadEmotionColor(param1.emotionIndex, param1.color);
            $scope.sendCommand(param1.color);
        };
        /**
         * 切换表情动作
         * @param param1    当前所选表情的数据
         * @param param2    当前所选表情在数组中的索引
         */
        $scope.selectEmotion = function(param1, param2){
            $scope.emotionParam.emotionIndex = param2;
            jQuery('.face-box').css('border-color', '#EAEAEA');
            jQuery('.color-box').css('display', 'none');
            var color = $scope.currentColorBlock;
            color = color == '#' ? $scope.emotionData.lightArray[$scope.emotionParam.curLedIndex].color : color;
            color = (color ==''?'#01ffff':color);
            $scope.updateOutData(color,param2);
            $scope.loadEmotionColor(param2, color);
            $scope.sendCommand(color);
        }

        /**
         * 设置所选表情的颜色
         * @param emotionIndex  选中的表情
         * @param emotionColor  所选的颜色
         */
        $scope.loadEmotionColor = function(emotionIndex, emotionColor){
            var emotionBox = jQuery('.face-box').eq(emotionIndex);
            emotionBox.css('border-color','#2dc6ec');
            emotionBox.next().css('color',"#2dc6ec");
            emotionBox.parent().siblings().find(".face-box").next().css('color',"");
            var colorBox = emotionBox.find('.color-box');
            colorBox.css('background-color', emotionColor);
            colorBox.css('display','block');
            emotionColor = emotionColor.replace('#', '');
        }
        // 点击色块触发
        jQuery('.colorblock-box>table').on('click','span',function(){
            var index= jQuery(this).attr("data-index");
            // console.log($scope.colorBlock[index-1]);
            jQuery(".colorblock-box>table span").each(function(){
                jQuery(this).removeClass("active");
            });
            jQuery(this).addClass("active");
            $scope.currentColorBlock = $scope.colorBlock[index-1];
            $scope.emotionData.lightArray[$scope.emotionParam.curLedIndex].color = $scope.currentColorBlock;
            $scope.loadEmotionColor($scope.emotionParam.emotionIndex, $scope.currentColorBlock);
            $scope.updateOutData($scope.currentColorBlock,$scope.emotionParam.emotionIndex);
            $scope.sendCommand($scope.currentColorBlock);
            // console.log("=-----------》");
            // console.log($scope.emotionData);
        });
        // 全选 锁定非锁定状态改变
        jQuery('.emotion-win').on('click','.checkbox1',function(){
            jQuery('.checkbox1').removeClass('active');
            jQuery(this).siblings().addClass('active');
            var data = jQuery(this).find(":nth-child(1)").attr("data-val");
            console.log("data-->"+data);
            $scope.ledsLock = data;
            $timeout(function(){
               if(data =='on'){
                    jQuery(".emotion-win ul.list li").addClass('emotion-led-box-sel');
                    $scope.emotionData.islightLock = true;
                    var len = $scope.emotionData.lightArray.length;
                    for(var i=0;i<len;i++){
                        $scope.emotionData.lightArray[i].emotionIndex = $scope.emotionParam.emotionIndex;
                        $scope.emotionData.lightArray[i].color = $scope.emotionParam.color ==''?'#01ffff':$scope.emotionParam.color;
                    }
                }else if(data =='off'){
                    $scope.emotionData.islightLock = false;
                    var initObj = $scope.emotionData.lightArray[0];
                    $scope.emotionParam.curLedIndex = 0;
                    $scope.emotionParam.curLedVal = initObj.id;
                    $scope.emotionParam.emotionIndex = initObj.emotionIndex;
                    $scope.emotionParam.color = initObj.color==''?'#01ffff':initObj.color;
                    jQuery(".emotion-win ul.list li").removeClass('emotion-led-box-sel');
                    jQuery(".emotion-win ul.list li:first").addClass('emotion-led-box-sel');
                } 
                // 发送命令
                var _color = '#01ffff';//默认颜色
                if($scope.currentColorBlock === ''){
                    _color = $scope.emotionData.lightArray[0].color;
                }else {
                    _color = $scope.currentColorBlock;
                }
                $scope.sendCommand(_color);
            });
            
        });

        // 更新outdata 数据
        $scope.updateOutData = function(color,emotionIndex){
            if($scope.emotionData.islightLock){//锁定
                var len = $scope.emotionData.lightArray.length;
                for(var i = 0;i<len ;i++){
                    $scope.emotionData.lightArray[i].emotionIndex = emotionIndex;
                    $scope.emotionData.lightArray[i].color = color;
                }
            }else{
                $scope.emotionParam.color = color;
                $scope.emotionData.lightArray[$scope.emotionParam.curLedIndex].color = color;
                $scope.emotionData.lightArray[$scope.emotionParam.curLedIndex].emotionIndex = emotionIndex;
            }
        };

        /**
         * 实时显示设置的表情
         * @param color         选择的颜色
         */
        $scope.sendCommand = function(color){
            var LEDArray = [];
            if($scope.emotionData.islightLock){//锁定
                var len = $scope.emotionData.lightArray.length;
                for(var i=0;i<len;i++){
                    $scope.emotionData.lightArray[i].emotionIndex = $scope.emotionParam.emotionIndex;
                }
                LEDArray = $scope.emotionData.lightArray;
            }else{//未锁定
                var LEDParam = {};
                LEDParam.id = $scope.emotionParam.curLedVal;
                LEDParam.emotionIndex = $scope.emotionParam.emotionIndex;
                LEDParam.color = color;
                LEDArray.push(LEDParam);
            }
            dataService.command('emojiRealTime', LEDArray);
        }
        /*
            初始化函数
        */
        $scope.initData = function(){
            //所有LED灯数据
            $scope.emotionData = {};
            //初始化数据集合
            $scope.emotionData =  $scope.popupObject.inData;
            //初始赋值外界值
            $scope.popupObject.outData = $scope.emotionData;

            $scope.isshow_select_all = $scope.emotionData.lightArray.length > 1? true:false;
            //是否已连接
            $scope.ledLight = {link:true};
            $scope.currentColorBlock='';
            $scope.colorBlock = ['#fe0000','#ff7f00','#fff000','#00ff01','#01ffff','#0000fe','#ff00fe','#50009f','#008040','#404040','#fe80fe','#ffffff'];
            //当前所选 LED 灯数据
            $scope.emotionParam = {"curLedIndex":"0", "curLedVal":"","emotionIndex":"0", "color":"#01ffff"};
            //表情二维数组，以三个为一行
            $scope.emotions = ["zhayan","haixiu","relei","leiguang","cry","yun","happy","jingya","huxi","shanshuo","fengshan","yugua"];
            $scope.emotionsName = [MSG["id_zhayan"],MSG["id_haixiu"],MSG["id_relei"], MSG["id_leiguang"],MSG["id_cry"],MSG["id_yun"],MSG["id_happy"], MSG["id_jingya"],MSG["id_huxi"],MSG["id_shanshuo"],MSG["id_fengshan"],MSG["id_yugua"]];
            
            if($scope.emotionData.lightArray.length>0){
                //选中初始化
                $scope.emotionParam.curLedVal = $scope.emotionData.lightArray[0].id;
                $scope.emotionParam.emotionIndex = $scope.emotionData.lightArray[0].emotionIndex;
                $scope.emotionParam.color = $scope.emotionData.lightArray[0].color;
                //判断当前灯光是否连接
                $scope.ledLight.link = isLink($scope.emotionParam.curLedVal);
                //初始化右侧颜色选择器
                $timeout(function(){
                    $scope.$apply(function(){
                        if($scope.emotionData.islightLock){//锁定
                            // $scope.emotionParam.curLedVal = $scope.emotionData.lightArray[0].id;
                            jQuery(".emotion-win ul.list li").addClass('emotion-led-box-sel');
                        }else {//非锁定
                            jQuery(".emotion-win ul.list li:first").addClass('emotion-led-box-sel');
                        }
                        $scope.loadEmotionColor($scope.emotionParam.emotionIndex, $scope.emotionParam.color);
                    });
                });
            }
            var _color = '#01ffff';//默认颜色
            if($scope.currentColorBlock === ''){
                _color = $scope.emotionData.lightArray[0].color;
            }else {
                _color = $scope.currentColorBlock;
            }
            $scope.sendCommand(_color);
        };
        $scope.initData();
    }]);
};

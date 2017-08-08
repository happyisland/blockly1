'use strict';

var jQuery = require('jquery');
require('../common/doughunt_chart')(jQuery);
require('../common/jquery-wheelcolorpicker')(jQuery);
var blocklyDatas = require('../../../engine/service/blockly_datas');
module.exports = function (app) {
    //setting light controller
    app.controller('lightSettingCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        //当前LED灯
        var curLight =  blocklyDatas.getLightsIds();
        /**
         * draw LED part chart 画色盘
         */
        $scope.loadLedPartChart = function(){
            var data = [];
            for(var idx = 0; idx < $scope.ledPartArray.length; idx++){
                var part = {title:'', value:75, color:$scope.ledPartArray[idx]};
                data.push(part);
            }
            jQuery("#doughnutChart").empty();
            jQuery("#doughnutChart").drawDoughnutChart({percentage:50,displaySummary:false,showTips:false,
                //FIXME 考虑优化掉此处的代码，暂时用textPos这个参数解决Path显示文字的问题
                textPos:[{x:90,y:15},{x:115,y:40},{x:115,y:80},{x:90,y:105},{x:50,y:105},{x:25,y:80},{x:25,y:40},{x:50,y:15}],
                saveData:callback},data);
            /**
             * record the selected part of LED
             * @param e     event
             * @param pos   selected part
             */
            function callback(e, pos){
                var data_index = jQuery(".color_table span.active").attr('data-index');
                var parts = document.getElementsByClassName('dounghunt-unselected');
                var strke_width =  parts[pos].getAttribute('stroke-width');
                if(strke_width == 0.2){
                    parts[pos].setAttribute('stroke-width','2');
                    $scope.curLEDlight.ledPartSelected = pos;
                    if($scope.currentColorBlock){
                        parts[pos].setAttribute('fill',$scope.currentColorBlock);
                    }
                    if(data_index === '12'){
                        parts[pos].setAttribute('fill','#e8e8e8');
                    }
                }
                if(strke_width == 2){
                    parts[pos].setAttribute('stroke-width','0.2');
                    $scope.curLEDlight.ledPartSelected = '';
                }
                for(var idx = 0; idx < parts.length; idx++){
                    if(idx != pos){
                        parts[idx].setAttribute('stroke-width', 0.2);
                    }
                }
                var curindex = $scope.curLEDlight.ledPartSelected;
                if(curindex === ''){
                    return;
                }else{
                    var cur_fill = parts[pos].getAttribute('fill');
                    // 更新色盘 颜色值数组
                    $scope.ledPartArray[pos] = $scope.currentColorBlock==''?cur_fill:$scope.currentColorBlock;
                    if(data_index === '12'){
                        $scope.ledPartArray[pos] = '';
                    }
                    // 填充左边菜单颜色
                    $scope.setLEDmenuColor(pos,'',$scope.ledPartArray);
                    // 更新led输出数据
                    $scope.updateOutputData();
                    // 发送命令
                    $scope.sendCommand($scope.ledPartArray);
                }
            }
        };

        // 更新输出数据
        $scope.updateOutputData = function(){
            console.log("out data ---->");
            console.log($scope.lightData);
            console.log($scope.ledPartArray);
            if($scope.lightData.islightLock){
                for(var i = 0;i<$scope.ledPartArray.length;i++){
                    for(var j=0;j < $scope.lightData.lightArray.length;j++){
                        $scope.lightData.lightArray[j].lights[i] = $scope.ledPartArray[i];
                    }
                }
                console.log("new out data -===================--->");
                console.log($scope.lightData);
            }else{//非锁定状态
                $scope.lightData.lightArray[$scope.curLEDlight.curLedIndex].lights = $scope.ledPartArray;
                console.log("unlock new out data -===================--->");
                console.log($scope.ledPartArray);
                console.log($scope.lightData);
            }
        };

        /**
         * 实时显示设置的灯光
         * @param LEDId         当前选择的LED灯
         * @param color         选择的颜色
         */
        $scope.sendCommand = function(colorArray, isCloseLight){
            var LEDParam = {};
            var lights = ["","","","","","","",""];
            lights = colorArray;
            LEDParam.id = $scope.curLEDlight.curLedVal;
            LEDParam.lights = lights;
            var LEDArray = [];
            LEDArray.push(LEDParam);
            console.log("LEDParam------>");
            if($scope.lightData.islightLock){
                var led = angular.copy(LEDParam);
                if($scope.lightData.lightArray.length>1){
                    for(var i = 1;i<$scope.lightData.lightArray.length;i++){
                        led.id = $scope.lightData.lightArray[i].id;
                        LEDArray.push(led);
                    }
                }
            }
            dataService.command('LEDRealTime', LEDArray, isCloseLight);
        };

        // 设置led menu 菜单颜色
        $scope.setLEDmenuColor = function(pos,isCancel,ledPartArray){
            // console.log(ledPartArray);
            if($scope.islightLock){//锁定
                var colorArray = ledPartArray;
                var LED = jQuery('.led-box');
                for(var i=0;i<colorArray.length;i++){
                    for(var j =0;j<LED.length;j++){
                        jQuery('span',LED[j])[parseInt(i)+1].style.backgroundColor = colorArray[i];
                    }
                }
            }else {//未锁定
                var data_index = jQuery(".color_table span.active").attr('data-index');
                var curindex = $scope.curLEDlight.ledPartSelected;
                if((curindex === '')||($scope.currentColorBlock === ''&& !data_index ==='12')){
                    return;
                }else{
                    var curLedIndex = $scope.curLEDlight.curLedIndex;
                    var LED = jQuery('.led-box')[curLedIndex];
                    jQuery('span',LED)[parseInt(curindex)+1].style.backgroundColor = $scope.currentColorBlock;
                }
            }
        };

        // 锁定非锁定状态改变
        jQuery('.setlights_box').on('click','.checkbox1',function(){
            jQuery('.checkbox1').removeClass('active');
            jQuery(this).siblings().addClass('active');
            // 切换全选 初始化色盘选中
            var parts = document.getElementsByClassName('dounghunt-unselected');
            for(var idx = 0; idx < parts.length; idx++){
                parts[idx].setAttribute('stroke-width', 0.2);
            }
            parts[0].setAttribute('stroke-width', 2);
            var data = jQuery(this).find(":nth-child(1)").attr("data-val");
            console.log(data);
            $scope.ledsLock = data;
            $timeout(function(){
                if(data =='on'){
                    jQuery(".led-box").addClass('led-box-sel');
                    $scope.islightLock = true;
                    $scope.lightData.islightLock = true;
                    console.log($scope.ledPartArray);
                    var colorArray = $scope.ledPartArray;
                    var LED = jQuery('.led-box');
                    for(var i=0;i<colorArray.length;i++){
                        for(var j =0;j<LED.length;j++){
                            jQuery('span',LED[j])[parseInt(i)+1].style.backgroundColor = colorArray[i];
                        }
                    }
                }else if(data =='off'){
                    $scope.islightLock = false;
                    $scope.lightData.islightLock = false;
                    var initObj = $scope.lightData.lightArray[0];
                    $scope.curLEDlight.id = initObj.id;
                    $scope.curLEDlight.lights = initObj.lights;
                    $scope.curLEDlight.curLedVal = initObj.id;
                    $scope.curLEDlight.curLedIndex = 0;
                    $scope.curLEDlight.ledPartSelected = 0;
                    jQuery(".led-box").removeClass('led-box-sel');
                    jQuery(".setting-light-window li:first .led-box").addClass('led-box-sel');
                }
                // 更新led输出数据
                $scope.updateOutputData();
                // 发送命令
                $scope.sendCommand($scope.ledPartArray);
            });
        });

        /*
            色块选中函数
        */
        jQuery('.color_table').on('click','span',function(){
            var index= jQuery(this).attr("data-index");
            var isCloseLight = false;
            console.log($scope.colorBlock[index-1]);
            jQuery(".color_table span").removeClass("active");
            jQuery(this).addClass("active");
            $scope.currentColorBlock = $scope.colorBlock[index-1];
            var curledindex = $scope.curLEDlight.ledPartSelected;
            if(curledindex === ''){
                return ;
            }else{
                var parts = document.getElementsByClassName('dounghunt-unselected');
                // 填充色盘灯管颜色
                parts[curledindex].setAttribute('fill',$scope.currentColorBlock);
                if(index === '12'){//关灯 填充色管颜色灰色
                    parts[curledindex].setAttribute('fill','#e8e8e8');
                }
                // 更新色盘 颜色值数组
                $scope.ledPartArray[curledindex] = $scope.currentColorBlock;
                // 填充左边菜单颜色
                $scope.setLEDmenuColor(curledindex,'',$scope.ledPartArray);
                // 更新led输出数据
                $scope.updateOutputData();
                // 发送命令
                $scope.sendCommand($scope.ledPartArray, isCloseLight);
            }

        });

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
         * switch LEd list 切换led 灯
         * @param led       selected LED data
         * @param index     selected LED index
         */
        $scope.changeLight = function(led, index){
            console.log("切换灯光led"+led + "---"+index);
            jQuery(".colorblock-box>table span").removeClass("active");
            $scope.currentColorBlock = '';
            if($scope.lightData.islightLock){
                return ;
            }else{
                $scope.curLEDlight.id = led.id;
                $scope.curLEDlight.lights = led.lights;
                $scope.curLEDlight.curLedVal = led.id;
                $scope.curLEDlight.curLedIndex = index;
                $scope.curLEDlight.ledPartSelected = 0;
              
                // 根据灯光id查询是否连接
                $scope.ledLight.link = isLink(led.id);
                $scope.ledPartArray = $scope.lightData.lightArray[index].lights;
                $scope.loadLedPartChart();
                $scope.sendCommand($scope.ledPartArray);
                var parts = document.getElementsByClassName('dounghunt-unselected');
                parts[0].setAttribute('stroke-width', 2);
            }
        };

        // 初始化数据
        $scope.initData = function(){
            //灯光数据获得
            $scope.lightData =  $scope.popupObject.inData;
            console.log("初始化数据------》");
            console.log($scope.lightData);
            $scope.isshow_select_all = $scope.lightData.lightArray.length > 1? true:false;
            // 灯光数据输出
            $scope.popupObject.outData = $scope.lightData;
            //是否已连接
            $scope.ledLight = {link:true};
            // 是否全选 true 是，false 不是
            $scope.islightLock = $scope.lightData.islightLock;
            // 当前选中的色块
            $scope.currentColorBlock='';
            // 当前选中的led
            $scope.curLEDlight = {};
            // if($scope.islightLock){//全选锁定
            console.log("当前选中的led快--》");
            console.log($scope.curLEDlight);
            // }else{//非全选非锁定
                if($scope.lightData.lightArray.length>0){
                    var initObj = $scope.lightData.lightArray[0];
                    $scope.curLEDlight.id = initObj.id;
                    $scope.curLEDlight.lights = initObj.lights;
                    $scope.curLEDlight.curLedVal = initObj.id;
                    $scope.curLEDlight.curLedIndex = 0;
                    $scope.curLEDlight.ledPartSelected = 0;
                    // 根据灯光id查询是否连接
                    $scope.ledLight.link = isLink($scope.curLEDlight.id);
                }
            // 色盘块的颜色值数组
            $scope.ledPartArray = angular.copy($scope.curLEDlight.lights);
            // 颜色块定义
            $scope.colorBlock = ['#fe0000','#ff7f00','#fff000','#00ff01','#01ffff','#0000fe','#ff00fe','#50009f','#008040','#404040','#ffffff',''];
            // draw the LED part chart
            $scope.loadLedPartChart();
            var parts = document.getElementsByClassName('dounghunt-unselected');
            parts[0].setAttribute('stroke-width', 2);
            
            $scope.sendCommand($scope.ledPartArray);
            // 初始化menu 色块
            $timeout(function(){
                $scope.$apply(function(){
                    if($scope.lightData.islightLock){//锁定
                        var colorArray = $scope.curLEDlight.lights;
                        var curLedIndex = $scope.curLEDlight.curLedIndex;
                        var LED = jQuery('.led-box');
                        for(var i=0;i<colorArray.length;i++){
                            for(var j =0;j<LED.length;j++){
                                jQuery('span',LED[j])[parseInt(i)+1].style.backgroundColor = colorArray[i];
                            }
                        }
                        jQuery(".menuli .led-box").addClass('led-box-sel');
                    }else{//非锁定
                        var LED = jQuery('.led-box');
                        for(var i=0;i<LED.length;i++){
                            var ledlight = $scope.lightData.lightArray[i];
                            for(var j =0;j<ledlight.lights.length;j++){
                                jQuery('span',LED[i])[parseInt(j)+1].style.backgroundColor = ledlight.lights[j];
                            }
                        }
                    }
                });
            });
            
        };
        $scope.initData();
    }]);
};

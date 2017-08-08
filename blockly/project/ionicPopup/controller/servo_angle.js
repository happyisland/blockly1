'use strict';
module.exports = function (app) {
    var $ = require('jquery');
    var RobotCommand = require('../../../engine/service/robat_command');
    var CodeLanguage = require('../../../engine/common/program/program_init');
    var CommandSequence = require('../../../engine/common/program/command_sequence');
    var programManager = require('../../../engine/common/program/program_manager');
    var ubtUtils = require('../../../engine/common/utils/utils');
    var blocklyDatas = require('../../../engine/service/blockly_datas');
    // var ServoAngleComponent= require('../../../engine/test/set_servo_angle');
    //项目管理
    app.controller('servoAngleCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
        //定时器
        var angle_tempInter_test = null;
        /**
         *
         * @type {{selectAngle: boolean, variableIndex: number, angle: number, servoIndex: number, isClose: boolean, curServoId: string}}
         * selectAngle -- 是否选中的是角度  variableIndex--变量选中下标   angle--度数
         * servoIndex---左边菜单选中下标  isClose--是否关闭  curServoId--当前选中菜单对象ID  showAngle--显示/隐藏左边菜单栏中角度标识  platformType--平台（1：逻辑编程  2：教育   3：课程）
         */
        $scope.servoAngleParam = {"selectAngle":true,"variableIndex":null,"angle":0,"servoIndex":0,"isClose":true,"curServoId":"","showAngle":false,"platformType":(blocklyDatas.getDataByKey("platformType")===undefined?1:blocklyDatas.getDataByKey("platformType"))};
        //初始化获取变量值
        var temp_variable = Blockly.Variables.allVariables(CodeLanguage.workspace);
        //temp_variable = ["X","Y"];
        //变量集合
        $scope.variableList = [];
        //初始化数据集合
        $scope.servoAngleData = [];

        //初始化外部数据赋值
        function init_outData(listData){
            var temp_outData = [];
            if(listData.length>0){
                //设置初始化选项中角度标识是否显示
                $scope.servoAngleParam.showAngle = listData[0].type==0?true:false;
                for(var i=0;i<listData.length;i++){
                    var temp_obj = listData[i];
                    if(temp_obj.type==0){//角度
                        if(temp_obj.angle == ""){
                            temp_obj.angle = 0;
                        }
                        /*//显示左边菜单栏中度数标识
                        $scope.servoAngleParam.showAngle = true;*/
                    }else{
                        if(temp_obj.angle == ""){
                            temp_obj.angle = temp_variable[0];
                        }
                        /*//隐藏左边菜单栏中度数标识
                        $scope.servoAngleParam.showAngle = false;*/
                    }
                    temp_outData[i] = temp_obj;
                }
            }
            return temp_outData;
        }
        /**
         * 初始化数据对象
         */
        $scope.initData = function(){
            //变量
            $scope.variableList = temp_variable;

            //设置默认值
            setDefaultData();
        };
        //设置默认值
        function setDefaultData(){
            /*var temp_data  =  blocklyDatas.getDataByKey('all_servo_angle');
            if(temp_data && temp_data.length>0){
                $scope.servoAngleData = angular.copy(temp_data);
            }else{
                //初始化数据集合
               $scope.servoAngleData = init_outData($scope.popupObject.inData);
            }*/
            //初始化数据集合
            $scope.servoAngleData = init_outData($scope.popupObject.inData);
            console.log("$scope.servoAngleData:");
            console.log( $scope.servoAngleData);
            //初始赋值外界值
            $scope.popupObject.outData =init_outData($scope.popupObject.inData);
            console.log("popupObject.inData-------------");
            console.log($scope.popupObject.inData);
            if($scope.servoAngleData.length>0){
                //选中初始化
                $scope.servoAngleParam.isClose = $scope.servoAngleData[0].isClose;
                //初始化ID
                $scope.servoAngleParam.curServoId = $scope.servoAngleData[0].servoId;
                //设置角度/变量值
                set_variable_angle($scope.servoAngleData[0]);
            }
        };




        /**
         * 业务操作
         * @param busType 业务类型
         * @param param1  参数1
         * @param param2  参数2
         */
        $scope.doBus = function(busType,param1,param2){
            if(busType){
                switch (busType){
                    case "changeView":{  //界面切换
                        changeView(param1);
                        break;
                    }
                    case "variable":{  //变量选中
                        // 当舵机关闭时，无法调整舵机角度
                        if(!$scope.servoAngleParam.isClose){
                            return;
                        }
                        //隐藏左边菜单栏中度数标识
                        $scope.servoAngleParam.showAngle = false;
                        $scope.servoAngleParam.variableIndex = param2;
                        //赋值
                        for(var _i= 0;_i<$scope.servoAngleData.length;_i++){
                            var temp_i = $scope.servoAngleData[_i];
                            if(temp_i.servoId == $scope.servoAngleParam.curServoId){
                                $scope.servoAngleData[_i].angle = param1;
                                $scope.servoAngleData[_i].type = 1;
                                //给外界赋值
                                $scope.popupObject.outData =  $scope.servoAngleData;
                                break;
                            }
                        }
                        break;
                    }
                    case "angle":{  //角度控制
                        //显示左边菜单栏中度数标识
                        $scope.servoAngleParam.showAngle = true;
                        //初始化变量
                        $scope.servoAngleParam.variableIndex = null;
                        setAngle(param1);
                        break;
                    }
                    case "toggleChange":{//开关切换
                        console.log("toggleChange:"+$scope.servoAngleParam.isClose);
                        for(var _k = 0;_k<$scope.servoAngleData.length;_k++){
                            var temp_i = $scope.servoAngleData[_k];
                            if(temp_i.servoId == $scope.servoAngleParam.curServoId){
                                $scope.servoAngleData[_k].isClose = $scope.servoAngleParam.isClose;
                                /*if($scope.servoAngleData[_k].isClose == false){
                                    $scope.servoAngleData[_k].variable = "";
                                    $scope.servoAngleData[_k].angle = "";
                                }*/
                                //给外界赋值
                                $scope.popupObject.outData =  $scope.servoAngleData;
                                break;
                            }
                        }
                        break;
                    }
                    case "servo":{  //舵机选择
                        // console.log();
                        // console.log("servoAngleParam ============");
                        console.log($scope.servoAngleParam);
                        console.log($scope.servoAngleData);
                        //下标赋值
                        $scope.servoAngleParam.servoIndex = param2;
                        //关闭
                        $scope.servoAngleParam.isClose = param1.isClose;
                        //赋值当前选中ID
                        $scope.servoAngleParam.curServoId = param1.servoId;
                        //设置角度/变量值
                        set_variable_angle(param1);
                        break;
                    }
                    case "angleInit" :{
                        //初始化角度旋转值
                        imageAngle($scope.servoAngleParam.angle);
                        break;
                    }
                }
            }
        };
        /**
         * 业务界面切换
         * @param param  界面类型
         */
        function changeView (param,obj){
            $scope.servoAngleParam.selectAngle = true;
            if(param && param!=undefined && param!=null){
                if(param == 1){
                    $scope.servoAngleParam.selectAngle = false;
                }
            }
        };
        /**
         *
         * @param eventType
         */
        function setAngle(eventType){
            // 当舵机关闭时，无法调整舵机角度
            if(!$scope.servoAngleParam.isClose){
                return;
            }
            if(eventType!=undefined && eventType!=null){
                switch(eventType){
                    case "decrease-touch":{ //长按递减
                        $scope.servoAngleParam.angle = parseInt($scope.servoAngleParam.angle);
                        angle_tempInter_test = setInterval(function(){
                            console.log("长按递减  $scope.servoAngleParam.angle--------decrease-touch:"+$scope.servoAngleParam.angle);
                            $scope.servoAngleParam.angle -=5;
                            if($scope.servoAngleParam.angle<= -118){
                                $scope.servoAngleParam.angle = -118;
                                //关闭定时器
                                clearInterval(angle_tempInter_test);
                            }
                            runCommand($scope.servoAngleParam.angle);
                            setValue($scope.servoAngleParam.angle);                          
                        },100);
                        break;
                    }
                    case "decrease":{ //单击递减
                            console.log("单击递减");
                            $scope.servoAngleParam.angle = parseInt($scope.servoAngleParam.angle);
                            $scope.servoAngleParam.angle -=1;
                            if($scope.servoAngleParam.angle <= -118){
                                $scope.servoAngleParam.angle = -118;
                            }
                            runCommand($scope.servoAngleParam.angle);
                           // setImg_angle($scope.servoAngleObj.angle,$scope.servoAngleObj);
                          setValue($scope.servoAngleParam.angle);
                        break;
                    }
                    case "increase-touch":{ //长按递增
                        $scope.servoAngleParam.angle = parseInt($scope.servoAngleParam.angle);
                        angle_tempInter_test = setInterval(function() {
                            console.log("长按递增 $scope.servoAngleParam.angle--------increase-touch:" + $scope.servoAngleParam.angle);
                            $scope.servoAngleParam.angle += 5;
                            if ($scope.servoAngleParam.angle >= 118) {
                                $scope.servoAngleParam.angle = 118;
                                //关闭定时器
                                clearInterval(angle_tempInter_test);
                            }
                            runCommand($scope.servoAngleParam.angle);
                            setValue($scope.servoAngleParam.angle);
                        },100);
                        break;
                    }
                    case "increase":{ //单击递增
                        console.log("单击递增");
                        $scope.servoAngleParam.angle = parseInt($scope.servoAngleParam.angle);
                        $scope.servoAngleParam.angle +=1;
                        if($scope.servoAngleParam.angle >= 118){
                            $scope.servoAngleParam.angle = 118;
                        }
                        runCommand($scope.servoAngleParam.angle);
                        setValue($scope.servoAngleParam.angle);
                        break;
                    }
                    case "release":{ //松开长按
                        console.log("长按松开");
                        console.log(angle_tempInter_test);
                        clearInterval(angle_tempInter_test);
                        if(angle_tempInter_test != null){
                            clearInterval(angle_tempInter_test);
                        }
                        break;
                    }
                }
            }
        };

        //组装发送命令的指令
        function runCommand (angle) {
            var servos = $scope.servoAngleParam.curServoId;
            var objParam = {};
            objParam.servo = servos;
            objParam.degree = angle;
            objParam.ms  = 400;
            var objTemp = [];
            objTemp.push(objParam);
            var strParams = JSON.stringify(objTemp);
            var robotCommand = new RobotCommand('servoSet|'+ strParams);
            robotCommand.send();           
        };
        /**
         * 设置值
         * @param rotate
         */
       function setValue (rotate){
            //设置图片旋转
            imageAngle(rotate);
            //赋值
            for(var _i= 0;_i<$scope.servoAngleData.length;_i++){
                var temp_i = $scope.servoAngleData[_i];
                if(temp_i.servoId == $scope.servoAngleParam.curServoId){
                    $scope.servoAngleData[_i].angle = rotate;
                    $scope.servoAngleData[_i].type = 0;
                    //给外界赋值
                    $scope.popupObject.outData =  $scope.servoAngleData;
                    break;
                }
            }

        };
        /**
         * 设置图片旋转
         * @param rotate
         */
        function imageAngle(rotate){
            var imgObj = document.getElementById("servoAngleImage");
            if(imgObj!=null&&imgObj.style){
                imgObj.style.transform="rotate("+parseInt(rotate)+"deg)";
                imgObj.style.webkitTransform="rotate("+parseInt(rotate)+"deg)";
                imgObj.style.MozTransform="rotate("+parseInt(rotate)+"deg)";
                imgObj.style.msTransform="rotate("+parseInt(rotate)+"deg)";
                imgObj.style.OTransform="rotate("+parseInt(rotate)+"deg)";
            }

        }
        /**
         * 设置角度/变量值
         * @param paramObj  当前对象
         */
        function set_variable_angle(paramObj){
            if(paramObj){
                changeView(paramObj.type,paramObj);
                if(paramObj.type==0){  //角度
                    if(paramObj.angle!="" && paramObj.angle != undefined && paramObj.angle!= null){
                        $scope.servoAngleParam.angle = paramObj.angle;
                    }else{
                        $scope.servoAngleParam.angle = 0;
                    }
                    //初始化变量
                    $scope.servoAngleParam.variableIndex = null;
                    //角度旋转
                    imageAngle(paramObj.angle);
                }else{//变量
                    var variIndex = 0;
                    if($scope.variableList.length>0){
                        for(var i=0;i<$scope.variableList.length;i++){
                            var temp_vari = $scope.variableList[i];
                            if(temp_vari == paramObj.angle){
                                variIndex = i ;
                                break;
                            }
                        }
                    }
                    //初始化变量
                    $scope.servoAngleParam.variableIndex = variIndex;
                }

            }
        };

    }]);
};

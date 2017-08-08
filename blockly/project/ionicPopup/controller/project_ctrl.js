'use strict';
module.exports = function (app) {
    var jQuery = require('jquery');
    var blocklyDatas = require('../../../engine/service/blockly_datas');
    var CodeLanguage = require('../../../engine/common/program/program_init');
    //命令
    var RobotCommand = require('../../../engine/service/robat_command');
    var StorageFactory = require('../../../engine/storage/base_storage');
    var utils = require('../../../engine/common/utils/utils');
    var blocklyUtils = require('../../../engine/common/utils/blockly_utils');
    var sensorConditionValue = require('../../../engine/common/condition/sensor_condition_value');
    //项目管理
    app.controller('projectCtrl', ['$scope','$ionicModal','$timeout','$ionicPopup','dataService',function($scope, $ionicModal,$timeout,$ionicPopup,dataService) {
      
      $scope.initData = function(){
        //初始化dataService中的当前xml对象
        $scope.projectData =[];
        $scope.projectBusObj = {"isDelete":false};
        $scope.inputOnfocus = false;
        $scope.popupCommonParam.ruleMsg = $scope.languageResource.input_rule_msg.replace('%1', '30').replace('%2', '15');
      };
      // 监听projectName输入
    jQuery('#projectName').bind('input propertychange', function() {  
        console.log("....");
        console.log(jQuery('#projectName').val()); 
        $scope.popupCommonParam.inputContent = jQuery('#projectName').val(); 
    });
      /**
     * 项目操作
      * @param busType 操作类型
     * @param paramObj  参数
        @index 项目列表索引
     */
      $scope.projectBus = function(busType,paramObj,index){
        if(busType){
            switch(busType){
                case "init":{ //初始化
                    //初始化获取数据
                    if (window.blocklyObj) {
                        dataService.command("projectList",null);
                    } else {
                        var data = StorageFactory.createStorage('localStorage').getPrograms();
                        console.log(data);
                        window.localXmlList(data);
                      // $scope.projectData = $scope.popupObject.inData;
                    }
                    
                    jQuery("#project_list_class").css({"height":(jQuery(".popup")[0].clientHeight-60)+"px"});
                    break;
                }
                case "addInit":{
                    //初始化dataService中的当前xml对象
                    dataService.initCurXmlObj();
                    //初始化数据对象
                    $scope.popupCommonParam.inputContent="";
                    $scope.popupCommonParam.checkInput=false;
                    // $scope.popupCommonParam.inputMsg="";
                    break;
                }
                case "edit":{ //编辑按钮
                    if($scope.projectBusObj.isDelete){
                        $scope.projectBusObj.isDelete = false;
                    }else{
                        $scope.projectBusObj.isDelete = true;
                    }
                    break;
                }
                case "add":{  //新增
                    //初始化对象值  TODO
                    //初始化dataService中的当前xml对象
                    dataService.initCurXmlObj();
                    //初始化数据对象
                    $scope.popupCommonParam.inputContent="";
                    $scope.popupCommonParam.checkInput=false;
                    // $scope.popupCommonParam.inputMsg="";
                    //关闭弹出框
                    $scope.goBack();
                    //清空工作空间
                    CodeLanguage.loadBlocks(blocklyDatas.getDataByKey('defaultXml'));
                    sensorConditionValue.removeAllCondition();
                    blocklyDatas.setKeyData('program_goto_touch_condition',undefined);
                    blocklyDatas.setKeyData('program_goto_phone_condition',undefined);
                    blocklyDatas.setKeyData('program_goto_infrared_condition',undefined);
                    break;
                }
                case "delete":{ //删除
                    if(paramObj){
                        //赋值当前删除对象ID
                        dataService.curXmlObj.xmlId = paramObj.xmlId;
                        //设置参数
                       var ifreamParam={"xmlId":paramObj.xmlId};
                       if (window.blocklyObj) {
                           dataService.command("delete",ifreamParam);
                       } else {
                           $timeout(function(){
                                $scope.$apply(function(){
                                    var xmlId = paramObj.xmlId;
                                   jQuery(".project_list_class>ul>li[data-index="+xmlId+"]").remove();
                                   window.localdeleteXml(paramObj.xmlId);
                                   var cur_index = $scope.projectData.indexOf(paramObj);
                                   console.log(cur_index);
                                   $scope.projectData.splice(cur_index, 1);
                                });
                            });
                       }
                    }else{
                        $scope.systemHintShow($scope.languageResource.porject_alert_content,"error");
                    }
                    break;
                }
                case "read":{  //读取XMl
                    if(paramObj){//读取
                        //赋值当前删除对象ID
                        dataService.curXmlObj.xmlId = paramObj.xmlId;
                        //赋值当前xml名称
                        dataService.curXmlObj.xmlName = paramObj.xmlName;
                        if(paramObj.isDefault==true ||paramObj.isDefault==1){
                            if(paramObj.xmlNameLang!=undefined){
                                dataService.curXmlObj.xmlName = paramObj.xmlNameLang[$scope.languageCode];
                            }
                        }
                        dataService.curXmlObj.isDefault = paramObj.isDefault;
                        //读取
                        var  ifreamParam={"xmlId":paramObj.xmlId};
                        if (window.blocklyObj) {
                            dataService.command("read",ifreamParam);
                        } else {
                            localReadXml(paramObj.xmlId);
                        }
                        
                    }else{
                        $scope.systemHintShow($scope.languageResource.porject_alert_content,"error");
                    }
                    break;
                }
            }

        }
      };


    $scope.changeTipPosition = function (){
        $scope.inputOnfocus = true;
    };
    $scope.clearField = function(){
        var field = document.getElementById('projectName');
        field.value = '';
        $scope.popupCommonParam.inputContent = '';
    };

    $scope.projectNameCheck = function(){
        $scope.popupCommonParam.inputContent = dataService.stripscript($scope.popupCommonParam.inputContent);
        var real_len = dataService.getLength($scope.popupCommonParam.inputContent);
        console.log("real_len"+real_len);
        if(real_len>30){
            var str = $scope.popupCommonParam.inputContent;
            $scope.popupCommonParam.inputContent = str.substr(0, 15);
        }
    };
    $scope.addPopupInputCheck = function(){
        $scope.inputOnfocus = false;
        $scope.popupCommonParam.inputContent = dataService.stripscript($scope.popupCommonParam.inputContent);
    };
        //saveXml回调函数
        function saveXmlCallBack(data){
            if(data){
                //sensorConditionValue.removeAllCondition();
                //blocklyDatas.setKeyData('program_goto_touch_condition',undefined);
                //blocklyDatas.setKeyData('program_goto_phone_condition',undefined);
                var saveXMlRes = JSON.parse(decodeURI(data));
                if(saveXMlRes.retCode && saveXMlRes.retCode=="0000"){
                    //得到当前保存的项目ID
                    dataService.curXmlObj.xmlId =saveXMlRes.result.xmlId;
                    dataService.curXmlObj.xmlName = $scope.popupCommonParam.inputContent;
                    dataService.curXmlObj.xmlContent = blocklyDatas.getDataByKey('currentProgramXml');
                    $scope.systemHintShow($scope.languageResource.porject_alert_content_06,"tips");
                }else if(saveXMlRes.retCode && saveXMlRes.retCode=="0001"){
                    //关闭model弹出框
                    $scope.goBack();
                    $scope.systemHintShow($scope.languageResource.porject_alert_content_01,"error");
                   /* $scope.popupCommonParam.inputValid = false;
                    $scope.popupCommonParam.inputMsg = $scope.languageResource.porject_alert_content_01;*/
                }else{
                    //关闭model弹出框
                    $scope.goBack();
                    var temp_tips = $scope.languageResource.porject_alert_content_02+saveXMlRes.retMsg;
                    $scope.systemHintShow(temp_tips,"error");
                }
            }
        }
        //定义回调函数
        window.saveXmlCallBack = saveXmlCallBack;
        //在获取项目列表集合之后需要赋值
        function xmlListCallBack(data){
            var iframeCallBackResult = {};
            if(data){
                var res = JSON.parse(decodeURI(data));
                console.log("xmlListCallBack  End---"+res.retCode+"------xmlListCallBack result:"+res.result);
                if(res.retCode){
                    if(res.retCode == "0000"){
                        if(res.result){
                            if(navigator.userAgent.toLowerCase().indexOf("android") > 0){
                                iframeCallBackResult = res.result;
                            }else{
                                iframeCallBackResult = JSON.parse(res.result);
                            }
                            $timeout(function(){
                                $scope.$apply(function(){
                                    $scope.projectData = iframeCallBackResult.xmlList;
                                    var languageCode = blocklyDatas.getDataByKey('languageCode');
                                    for (var i = 0 ; i < $scope.projectData.length; i++) {
                                        var objProjectData = $scope.projectData[i];
                                        if (objProjectData['xmlNameLang'] && !objProjectData['xmlNameLang'][languageCode]) {
                                            objProjectData['xmlNameLang'][languageCode] = objProjectData['xmlNameLang']['en'];
                                        }
                                    }
                                })
                            });
                        }
                    }else{
                        //关闭model弹出框
                        $scope.goBack();
                        var temp_tips = $scope.languageResource.porject_alert_content_02+res.retMsg;
                        $scope.systemHintShow(temp_tips,"error");
                    }
                }else{
                    //关闭model弹出框
                    $scope.goBack();
                    $scope.systemHintShow($scope.languageResource.porject_alert_content_03,"error");
                }

            }
        }
        //获取xml集合回调函数
        window.xmlListCallBack = xmlListCallBack;
        function localXmlList(data) {
            var result = [];
            for(var i = 0 ; i < data.length; i++) {
                var objProgramData = {};
                var xmlObj = JSON.parse(data[i]);
                objProgramData.xmlId = xmlObj.xmlId;
                objProgramData.xmlName = xmlObj.xmlName;
                objProgramData.isDefault = false;
                result.push(objProgramData);
            }
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.projectData = result;
                })
            });
        }
        window.localXmlList = localXmlList;
        /**
         * 删除xml回调
         * @param data  回调函数返回值
         */
        function deleteXmlCallBack(data){
            if(data) {
                var deleteXml_res = JSON.parse(decodeURI(data));
                console.log("End---" + deleteXml_res.retCode + "------result:" + deleteXml_res.result);
                if (deleteXml_res.retCode) {
                    if (deleteXml_res.retCode == "0000") {
                        if($scope.projectData.length>0) {
                            for (var i = 0; i < $scope.projectData.length; i++) {
                                if (dataService.curXmlObj.xmlId == $scope.projectData[i].xmlId) {
                                    $timeout(function () {
                                        $scope.$apply(function () {
                                            //判断当前新增项目是否删除若有删除则更改状态，能重新新增
                                            if (dataService.curXmlObj.xmlId == $scope.projectData[i].xmlId) {
                                                dataService.initCurXmlObj();
                                            }
                                            $scope.projectData.splice(i, 1);
                                        });
                                    });
                                    break;
                                }
                            }
                        }
                    }else{
                        //关闭model弹出框
                        $scope.goBack();
                        var temp_tips = $scope.languageResource.porject_alert_content_02+deleteXml_res.retMsg;
                        $scope.systemHintShow(temp_tips,"error");
                    }
                }else{
                    //关闭model弹出框
                    $scope.goBack();
                    $scope.systemHintShow($scope.languageResource.porject_alert_content_03,"error");
                }
            }
        }
        //删除xml回调
        window.deleteXmlCallBack = deleteXmlCallBack;
        function localdeleteXml(key) {
            var localStore = StorageFactory.createStorage('localStorage');
            localStore.deleteProgram(key);
           // $scope.goBack();
        }
        window.localdeleteXml = localdeleteXml;
        /**
         * 读取xml内容回调
         * @param data 回调函数返回值
         */
        function readXmlCallBack(data){
            
            if(data) {
                sensorConditionValue.removeAllCondition();
                blocklyDatas.setKeyData('program_goto_touch_condition',undefined);
                blocklyDatas.setKeyData('program_goto_phone_condition',undefined);
                blocklyDatas.setKeyData('program_goto_infrared_condition',undefined);
                var readXml_res = JSON.parse(decodeURIComponent(data));
                console.log("End---" + readXml_res.retCode + "------result:" + readXml_res.result);
                if (readXml_res.retCode) {
                    if (readXml_res.retCode == "0000") {
                        if(readXml_res.result){
                            var xml_detail_temp = readXml_res.result;
//                        var xml_detail_temp = JSON.parse(decodeURI(readXml_res.result));
                            var readXml = {"xmlContent":""};
                            if((navigator.userAgent.toLowerCase().indexOf("ios")>0 || navigator.userAgent.toLowerCase().indexOf("iphone")>0) || (navigator.userAgent.toLowerCase().indexOf("ipad")>0)){
                                readXml.xmlContent = JSON.parse(xml_detail_temp).xmlContent;
                            }else if(navigator.userAgent.toLowerCase().indexOf("android") > 0){
                                var temp_xml_obj = dataService.readXmlFromUrl(xml_detail_temp.xmlContent);
                                if(temp_xml_obj != null){
                                    readXml.xmlContent = temp_xml_obj;
                                }else{
                                    //关闭model弹出框
                                    $scope.goBack();
                                    $scope.systemHintShow($scope.languageResource.porject_alert_content_04,"error");
                                }
                                console.log("获取的xml内容为："+readXml.xmlContent);
                            }
                            //检查当前xml文件是否正确
                            var isCorrect = utils.xmlIsCorrect(readXml.xmlContent);
                            if(isCorrect == true){
                                //赋值dataService中当前xml对象
                               dataService.curXmlObj.xmlContent = readXml.xmlContent;
                                //往用localStorage存储对象
                                //设置操作类型
                                $scope.goBack();
                                //赋值
                                //清空工作空间
                               // var temp_xml_rep = readXml.xmlContent.replace(/\#g/,"%23");
                                console.log("获取的xml内容为："+readXml.xmlContent);
                                CodeLanguage.loadBlocks(readXml.xmlContent);
                                //载入程序的时候更新那些有错误的ID                            
                                blocklyUtils.iterateBlocks(function(block) {
                                    blocklyUtils.handleWorkspaceBlock(block); 
                                });
                            }else{
                                //关闭model弹出框
                                $scope.goBack();
                                $scope.systemHintShow($scope.languageResource.porject_alert_content_05,"error");
                            }
                        }else{
                            //关闭model弹出框
                            $scope.goBack();
                            $scope.systemHintShow($scope.languageResource.porject_alert_content_03,"error");
                        }
                    }else{
                        //关闭model弹出框
                        $scope.goBack();
                        $scope.systemHintShow(($scope.languageResource.porject_alert_content_02+readXml_res.retMsg),"error");
                    }
                }else{
                    //关闭model弹出框
                    $scope.goBack();
                    $scope.systemHintShow($scope.languageResource.porject_alert_content_03,"error");
                }
            }
        }
        //读取xml回调
        window.readXmlCallBack = readXmlCallBack;
        function localReadXml(key) {
            sensorConditionValue.removeAllCondition();
            blocklyDatas.setKeyData('program_goto_touch_condition',undefined);
            blocklyDatas.setKeyData('program_goto_phone_condition',undefined);
            blocklyDatas.setKeyData('program_goto_infrared_condition',undefined);
            var localStore = StorageFactory.createStorage('localStorage');
            var xmlValue = localStore.getItemByKey(key);
            var jsonValue = JSON.parse(xmlValue);
            var xmlContent = jsonValue['xmlContent'];
            localStore.loadProgram(key,xmlContent);
            //载入程序的时候更新那些有错误的ID                            
            blocklyUtils.iterateBlocks(function(block) {
                blocklyUtils.handleWorkspaceBlock(block); 
            });
            $scope.goBack();
        }
        window.localReadXml = localReadXml;

        $scope.initData();


        

    }]);
};

/**
 * Created by hsp on 16/9/13.
 */
module.exports = function (angular) {
    var RobatCommand = require('../../../engine/service/robat_command');
    var blocklyDatas = require('../../../engine/service/blockly_datas');
    var $ = require('jquery');
    var app_service = angular.module('myService', ['ionic']);
    app_service.factory("dataService",function() {
        var dataService = {};
        dataService.testParam = "param from dataService";
        dataService.testFn = function () {
            alert("alert from dataService");
        };
        /**
         * 当前xml对象
         * @type {{xmlId: string, xmlName: string, isDefault: boolean, xmlContent: string}}
         * xmlId -xmlID  xmlName -xml名称  isDefault--是否系统默认案例  xmlContent--当前xml内容
         * *
         */
        dataService.curXmlObj = {"xmlId": "", "xmlName": "", "isDefault": false, "xmlContent": ""};
        //设置音效对象，intervalObj--定时器   currentTime--当前录音时间，精确到毫秒  currentType--当前选中菜单    currentKey--当前选中音效
        dataService.soundEffectObj = {intervalObj: null, currentTime: "",currentType:"",currentKey:""};

        /**
         * 初始化当前xml对象
         */
        dataService.initCurXmlObj = function () {
            dataService.curXmlObj.xmlId = "";
            dataService.curXmlObj.xmlName = "";
            dataService.curXmlObj.isDefault = false;
            dataService.curXmlObj.xmlContent = "";
        };

        /**
         * 弹出框对象集合
         * @returns {{type: string, url: string, title: string, cancel: string, ok: string, initData: Object, outData: Object}[]}
         */
        function popupObjList_FN() {
            /* *
             * //弹出框对象
             * @type {{type: string, url: string,title: string, cancel: string, ok: string,initData:object,outData:object}[]}
             * type:弹出框类型
             * url:弹出框路径
             * title:弹出框title
             * cancel:弹出框关闭按钮显示信息
             * ok:弹出框确定按钮显示信息
             * initData:弹出框初始值
             * outData:弹出框设置数据之后对外赋值对象
             * */
            var popupList = [
                {"type": "test", "url": "ionicPopup/html/isCloseBlue.html", "title": "titleTest", "cancel": "cancel", "ok": "ok", "inData": {}, "outData": {}},
                //运动---设置舵机旋转角度
                {"type": "servoAngle", "url": "ionicPopup/html/setServoAngle.html", "title": MSG.servo_angle_popup_title, "cancel": MSG.servo_angle_popup_cancel, "ok": MSG.servo_angle_popup_ok, "inData": [], "outData": []},
                //运动---轮模式
                {"type": "rotateServo", "url": "ionicPopup/html/rotateServo.html", "title": MSG.rotate_servo_popup_title, "cancel": MSG.rotate_servo_popup_cancel, "ok": MSG.rotate_servo_popup_ok, "inData": [], "outData": []},
                //运动---设置舵机状态
                {"type": "servoStatus", "url": "ionicPopup/html/servoStatus.html", "title": MSG.servo_status_popup_title, "cancel": MSG.servo_status_popup_cancel, "ok": MSG.servo_status_popup_ok, "inData": [], "outData": []},
                //运动---姿势取名
                {"type": "postureNamed", "url": "ionicPopup/html/postureNamed.html", "title": MSG.posture_named_popup_title, "cancel": MSG.posture_named_popup_cancel, "ok": MSG.posture_named_popup_ok, "inData": [], "outData": []},
                //运动---模型未连接提示
                {"type": "postureLink", "url": "ionicPopup/html/postureLink.html", "title": MSG.posture_link_popup_title, "cancel": MSG.posture_link_popup_cancel, "ok": MSG.posture_link_popup_ok, "inData": [], "outData": []},
                //陀螺仪--选择陀螺仪旋转方向
                {"type": "gyroRotateDirection", "url": "ionicPopup/html/gyroRotateDirection.html", "title": MSG.gyro_rotate_direction_popup_title, "cancel": MSG.gyro_rotate_direction_popup_cancel, "ok": MSG.gyro_rotate_direction_popup_ok, "inData": {}, "outData": {}},
                //项目---项目列表弹出框
                {"type": "projectList", "url": "ionicPopup/html/projectList.html", "title": MSG.project_list_title, "cancel": MSG.project_pop_cancel_btn, "ok": MSG.project_pop_ok_btn, "inData": [], "outData": []},
                //项目---提示是否保存当前项目弹出框
                {"type": "isSaveProject", "url": "ionicPopup/html/isSaveProject.html", "title": MSG.is_add_project_pop_title, "cancel": MSG.project_pop_cancel_btn, "ok": MSG.project_pop_ok_btn, "inData": [], "outData": []},
                //退出---提示是否退出逻辑编程
                {"type": "isExit", "url": "ionicPopup/html/isExit.html", "title": MSG.exit_popup_title, "cancel": MSG.exit_popup_cancel, "ok": MSG.exit_popup_ok, "inData": [], "outData": []},
                //项目---保存项目输入项目名称弹出框
                {"type": "saveXml", "url": "ionicPopup/html/addProject.html", "title": MSG.add_project_pop_title, "cancel": MSG.project_pop_cancel_btn, "ok": MSG.project_pop_ok_btn, "inData": [], "outData": []},
                //展示---设置音效
                {"type": "soundEffects", "url": "ionicPopup/html/soundEffects.html", "title": MSG.sound_effects_popup_title, "cancel": MSG.sound_effects_popup_cancel, "ok": MSG.sound_effects_popup_ok, "inData": {type: "", key: ""}, "outData": {}},
                //展示---新增录音
                {"type": "addRecording", "url": "ionicPopup/html/soundEffects/addRecording.html", "title": MSG.recording_title, "cancel": MSG.recording_cancel, "ok": MSG.recording_ok, "inData": [], "outData": []},
                //展示---输入录音文件名称
                {"type": "recordingName", "url": "ionicPopup/html/soundEffects/recordingName.html", "title": MSG.recording_popup_title, "cancel": MSG.recording_cancel, "ok": MSG.recording_ok, "inData": [], "outData": []},
                //展示---设置表情
                {"type": "emotionDisplay", "url": "ionicPopup/html/displayEmotion.html", "title": MSG.title_setting_emotion, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": [], "outData": []},
                //展示---设置情景灯
                {"type": "sceneLightDisplay", "url": "ionicPopup/html/display_sceneLight.html", "title": MSG.title_setting_scenelight, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": [], "outData": []},
                //事件---选择手机/平板状态
                {"type": "deviceTilt", "url": "ionicPopup/html/eventDeviceTilt.html", "title": MSG.title_device_tilt, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": {}, "outData": {}},
                //事件---设置触碰传感器
                {"type": "touchSensor", "url": "ionicPopup/html/eventTouchSensor.html", "title": MSG.title_touch_sensor, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": {}, "outData": {}},
                //事件---设置红外传感器
                {"type": "infraredSensor", "url": "ionicPopup/html/eventInfraredSensor.html", "title": MSG.title_infrared_sensor, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": {}, "outData": {}},
                {"type": "blueConnect", "url": "ionicPopup/html/isCloseBlue.html", "title": MSG.title_bluetooth_connect, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": [], "outData": []},
                //展示---设置音调
                {"type": "playTune", "url": "ionicPopup/html/display_play_tune.html", "title": MSG.title_setting_tune, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": {}, "outData": {}},
                //展示---设置灯光
                {"type": "settingLight", "url": "ionicPopup/html/display_setting_light.html", "title": MSG.title_setting_light, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": [], "outData": []},
                //首页---调整时间
                {"type": "timeAdjust", "url": "ionicPopup/html/time_adjust.html", "title": MSG.title_time_adjust, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": [], "outData": []},
                //首页---设置变量
                {"type": "setVariable", "url": "ionicPopup/html/variable_named.html", "title": MSG.title_variable_set, "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": [], "outData": []},
                //首页---显示swift 代码
                {"type": "showSwift", "url": "ionicPopup/html/showSwiftCode.html", "title": "Swift Code", "cancel": MSG.btn_name_cancel, "ok": MSG.btn_name_confirm, "inData": [], "outData": []}

            ];
            return popupList;
        }

        /*  *
         * 将数组变为n维数组
         * @param list  原数组
         * @param n  每个二维数组包含的对象个数
         * @returns {Array}  二维数组
         * */
        dataService.changeList = function (list, n) {
            var returnList = [];
            var tempList = [];
            if (list && list.length > 0) {
                for (var j = 0; j < list.length; j++) {
                    if (j < (n * (returnList.length + 1))) {
                        tempList.push(list[j]);
                    } else if (j == (n * (returnList.length + 1))) {
                        returnList.push(tempList);
                        tempList = [];
                        tempList.push(list[j]);
                    }
                }
            }
            returnList.push(tempList);
            return returnList;
        };

        /* *
         * 返回字符串长度，一个汉字两个字符，英文占据一个字符
         * @param str
         * @returns {number}
         * @constructor
         * */
        dataService.getLength = function (str) {
            ///<summary>获得字符串实际长度，中文2，英文1</summary>
            ///<param name="str">要获得长度的字符串</param>
            var realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
            }
            return realLength;
        };
        //承接弹出框对象集合，只加载一次
        var popupObjectList = [];
        /* *
         * 获取弹出框对象
         * @param type  弹出框类型
         * @returns {*}  弹出框对象
         * */
        dataService.getPopupObj = function (type) {
            if (popupObjectList.length < 1) {
                popupObjectList = popupObjList_FN();
            }
            var popup_temp = null;
            if (type) {
                if (popupObjectList.length > 0) {
                    for (var i = 0; i < popupObjectList.length; i++) {
                        var obj_temp = popupObjectList[i];
                        if (obj_temp.type == type) {
                            popup_temp = obj_temp;
                            break;
                        }
                    }
                }
            }
            return popup_temp;
        };
        /* *
         * 弹出框设置后对外数据
         * @param type
         * */
        dataService.popupValue = function (type) {
            var temp_value = {};
            if (type) {
                switch (type) {
                    case "servoSpeed":
                    {
                        temp_value = {};
                        break;
                    }
                }
            }
            return temp_value;
        };


        /**
         * 获取舵机ID
         * @returns {Array}
         */
        dataService.servoData = function () {
            //获取舵机
            var servos = blocklyDatas.getDataByKey('servos');
            var servosArray = [];
            if (servos) {
                var servoIds = servos.split('|');
                console.log("servoIds");
                console.log(servoIds);
                servosArray.push(servoIds);
            }
            return servosArray;

        };

        /**
         * 项目命令发送
         * @param type 保存类型：新增、编辑
         * @param param  项目保存参数
         */
        dataService.command = function (type, param, closeParams) {
            //命令
            var temp_command = null;
            //发送参数
            var temp_param = null;
            if (param != undefined && param != null) {
                temp_param = JSON.stringify(param);
            }
            if (type) {
                switch (type) {
                    case "add":
                    { //新增项目
                        temp_command = new RobatCommand('SaveXml|' + temp_param + '|saveXmlCallBack');
                        break;
                    }
                    case "edit":
                    { //编辑项目
                        temp_command = new RobatCommand('SaveXml|' + temp_param + '|editXmlCallBack');
                        break;
                    }
                    case "delete":
                    { //删除项目
                        temp_command = new RobatCommand('DeleteXml|' + temp_param + '|deleteXmlCallBack');
                        break;
                    }
                    case "read":
                    { //读取xml
                        temp_command = new RobatCommand('ReadXml|' + temp_param + '|readXmlCallBack');
                        break;
                    }
                    case "read_device":
                    { //读取外设实时值
                        temp_command = new RobatCommand('startInfraredTimer|null|readDeviceCallBack');
                        break;
                    }
                    case "read_infrared":
                    { //读取红外设备实时值
                        temp_command = new RobatCommand('startInfraredTimer|null|readInfraredCallBack');
                        break;
                    }
                    case "stop_device":
                    { //关闭外设实时值
                        temp_command = new RobatCommand('stopInfraredTimer|null|null');
                        break;
                    }
                    case "closeWindow":
                    { //关闭窗口，即退出逻辑编程界面
                        temp_command = new RobatCommand('CloseWindow');
                        break;
                    }
                    case "projectList":
                    {//获取项目列表
                        temp_command = new RobatCommand('XmlList|null|xmlListCallBack');
                        break;
                    }
                    case "blueConnect":
                    {//蓝牙连接
                        temp_command = new RobatCommand('ConnectBLE');
                        break;
                    }
                    case "blueDisconnect":
                    {//蓝牙关闭
                        temp_command = new RobatCommand('DisconnectBLE');
                        break;
                    }
                    case "touchShow":
                    {//触碰传感器的显示
                        temp_command = new RobatCommand('setSensorLED|' + temp_param);
                        break;
                    }
                    case "gyroShow":
                    {//陀螺仪传感器的显示
                        temp_command = new RobatCommand('setSensorLED|' + temp_param);
                        break;
                    }
                    case "InfraredShow":
                    {//红外传感器的显示
                        temp_command = new RobatCommand('setSensorLED|' + temp_param);
                        break;
                    }
                    case "emojiRealTime":
                    {
                        temp_command = new RobatCommand('setEmoji|' + temp_param + '|3|0');
                        break;
                    }
                    case "LEDRealTime":
                    {
                        var lightTime = 255000;
                        if (closeParams) {
                            lightTime = 0;
                        }
                        temp_command = new RobatCommand('setLEDs|' + temp_param + '|'+lightTime);
                        break;
                    }
                }
                temp_command.send();
            }

        };

        /**
         * 根据路径读取xml内容
         * @param xmlFile xml路径
         * @returns {*}
         */
        var loadXML = function (xmlFile) {
            var xmlDoc;
            var xmlhttp = new window.XMLHttpRequest();
            var nowTime = new Date().getTime();//获取当前时间作为随机数
            var url = xmlFile + "?time=" + nowTime;
            xmlhttp.open("GET", url, false);
            xmlhttp.send(null);
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.responseXML != null) {
                    //xmlDoc = xmlhttp.responseXML.documentElement;
                    xmlDoc = xmlhttp.responseText;
                } else {
                    xmlDoc = null;
                }
            }

            return xmlDoc;
        };

        /**
         * // 首先对xml对象进行判断
         * @param xmlFile xml路径
         */
        dataService.readXmlFromUrl = function (xmlFile) {
            var xmlDoc = loadXML(xmlFile);
            return xmlDoc;
        };
        /**
         *弹出框模拟初始值
         * @param popupType
         */
        dataService.popupInitData = function (popupType) {
            var data = null;
            if (popupType != null) {
                switch (popupType) {
                    case "servoAngle":
                    {//设置舵机旋转角度模拟初始值
                        var temp_data = [];
                        for (var i = 0; i < 60; i++) {
                            var servoSpeed = new Object();
                            servoSpeed.servoId = "ID" + i;
                            servoSpeed.isClose = false;
                            servoSpeed.type = 0;
                            servoSpeed.angle = '';
                            temp_data[i] = servoSpeed;
                        }
                        data = temp_data;
                        break;
                    }
                    case "emotionDisplay":
                    {//设置表情LED灯模拟初始值
                        data = [
                            {"id": "ID-1", "emotionIndex": "0", "color": ""},
                            {"id": "ID-2", "emotionIndex": "0", "color": "" },
                            {"id": "ID-3", "emotionIndex": "0", "color": ""}
                        ];
                        break;
                    }
                    case "projectList":
                    {  //项目列表
                        data = [
                            {"xmlId": "ID02", "xmlName": "楼上的肯定是", "isDefault": 1, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID03", "xmlName": "楼上的肯定1是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID04", "xmlName": "楼上的肯定3是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID05", "xmlName": "楼上的肯4定是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID06", "xmlName": "楼上的肯6定是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID07", "xmlName": "楼上的肯7定是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID08", "xmlName": "楼上的肯77定是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID09", "xmlName": "楼上的肯8定是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID19", "xmlName": "楼上的肯8定是", "isDefault": 1, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"},
                            {"xmlId": "ID029", "xmlName": "楼上的肯8定是", "isDefault": 1, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12","xmlNameLang":{"en":"Mebot","zh-hans":"小黄人"}},
                            {"xmlId": "ID020", "xmlName": "楼上的肯定9是", "isDefault": 0, "createDate": "2016-09-23 11:00","updateDate":"2016-12-21 12:12"}
                        ];
                        break;
                    }
                    case "rotateServo":
                    {  //设置舵机旋转方向、旋转速度
                        var servoSpeedList = [];
                        for (var i = 0; i < 20; i++) {
                            var servoSpeed = new Object();
                            servoSpeed.servoId = "ID" + i;
                            servoSpeed.isClose = false;
                            servoSpeed.speed = 'VS';
                            servoSpeed.direction = '-';
                            servoSpeedList[i] = servoSpeed;
                        }
                        data = servoSpeedList;
                        break;
                    }
                    case "servoStatus":
                    {  //设置舵机状态  上电、掉电
                        var servoStatusList = [];
                        for (var i = 0; i < 4; i++) {
                            var servo_temp = new Object();
                            servo_temp.servoId = "ID" + i;
                            servo_temp.power = "on";  //是否上电  on--上电   off--掉电
                            servoStatusList[i] = servo_temp;
                        }
                        data = servoStatusList;
                        break;
                    }
                    case "deviceTilt":
                    {//设置手机 / 平板状态
                        data = {"direction": "3"};
                        break;
                    }
                    case "gyroRotateDirection":
                    {//设置陀螺仪旋转方向
                        data = {"direction": 'x_axie', "sensorId": "1"};
                        break;
                    }
                    case "touchSensor":
                    {//设置 触碰传感器状态
                        data = {"status": "release"};
                        break;
                    }
                    case "infraredSensor":
                    {//设置 红外传感器状态
                        data = {"curValue": "2"};
                        break;
                    }
                    case "playTune":
                    {
                        data = {"tune": "3"};  //播放音调
                        break;
                    }
                    case "timeAdjust":
                    {//设置 时间的默认值
                        data = {"time": 0};
                        break;
                    }
                    case "soundEffects":
                    {//设置音效
                        data = {type: "machine", key: "explosion"};
                        break;
                    }
                    case "soundType":
                    {//设置音效左边菜单
                        data = [
                            {"key": "animal", "val": MSG.animal},
                            {"key": "machine", "val": MSG.machine},
                            {"key": "emotion", "val": MSG.emotion},
                            {"key": "command", "val": MSG.command},
                            {"key": "recording", "val": MSG.recording}
                        ];
                        break;
                    }
                    case "settingLight":
                    {
                        // data = [
                        //     {"id": "ID-01", "lights": ["#36FBC3", "", "", "#DDF10A", "", "", "#F73636", ""]},
                        //     {"id": "ID-02", "lights": ["#2DB1E2", "", "#9061C5", "", "", "", "", "#DDF10A"]}
                        // ];
                        data = [];
                        break;
                    }
                }
            }
            return data;
        };

        //根据类型查找下标值
        dataService.menuIndex_fn=function (key){
            var index = 0;
            var soundTypes = dataService.popupInitData("soundType");
            if (soundTypes.length > 0) {
                if (key != "") {
                    for (var i = 0; i < soundTypes.length; i++) {
                        var temp_type = soundTypes[i];
                        if (temp_type.key == key) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        };
        //根据key值查找当前选中声音对象
        dataService.selSoundObj = function(key,dataList){
            var temp_obj = null;
            if(dataList.length>0){
                if(key!=""){
                    for(var i=0;i<dataList.length;i++){
                        if(key == dataList[i].key){
                            temp_obj = dataList[i];
                            break;
                        }
                    }
                }else{
                    temp_obj = dataList[0];
                }

            }
            return temp_obj;
        };
        /**
         * 根据弹出框类型改变弹出框初始化样式
         * @param popupType
         */
        dataService.initChangeIonicStyle = function(popupType){
            $(".popup").css({"background":"#fff","border-radius":"8px"});
            //界面列表需要隐藏头部和底部
            if(popupType == "projectList"){
                $(".popup-head").css("display","none");
                $(".popup-body").css({"height":+document.body.clientHeight*0.8+"px","background":"#fff","border-radius":"8px"});
                $(".popup-buttons").css("display","none");
            }

            if(popupType == "showSwift"){
                $(".popup-head").css("display","none");
                $(".popup-body").css({"height":+document.body.clientHeight*0.8+"px"});
                $(".popup-buttons").css("display","none");
            }
            //输入录音名称，有存在录音名称同名的情况，所以需要自定义确定，取消按钮
            if(popupType == "recordingName"){
                $(".popup-buttons").css("display","none");
            }
        };
        /**
         * 在头部界面新增 按钮区域
         * @param type
         */
        dataService.changePopupHead = function(type){
            //新增菜单
            if(type == "recording"){
                var imgStr = '<div id="delBtns" style="display:inline-block;float:right;position: absolute;right: 19px;top: 6px;">' +
                    '<img style="margin-right:10px;" src="images/popup/emotion/tianjialuyin@1x.png" onclick="test(\'add\');"/>' +
                    '<img id="deleteImg" src="images/popup/emotion/delete_btn.png" onclick="test(\'delete\');"/>' +
                    '</div>';
                $(".popup-head").append(imgStr);
                $(".popup-head").addClass("popup_head_change");
                $(".popup-title").addClass("popup_title_change");
            }else{
                console.log("在头部界面新增 按钮区域");
                console.log($("#delBtns"));
                if($("#delBtns").length>0){
                    $(".popup-head").removeClass("popup_head_change");
                    $(".popup-title").removeClass("popup_title_change");
                }
            }
        };
        /**
         * 根据语言获取到程序块介绍列表
         * @param languageCode 语言代码
         */
        dataService.helpList = function(languageCode){
            var list = [];
            switch (languageCode){
                case "zh-hans":{
                    list = [
                        "images/help/zh-hans/zh_01.jpg",
                        "images/help/zh-hans/zh_02.jpg",
                        "images/help/zh-hans/zh_03.jpg",
                        "images/help/zh-hans/zh_04.jpg",
                        "images/help/zh-hans/zh_05.jpg",
                        "images/help/zh-hans/zh_06.jpg",
                        "images/help/zh-hans/zh_07.jpg"
                    ];
                    break;
                }
                case "en" :{
                    list = [
                        "images/help/en/en_01.jpg",
                        "images/help/en/en_02.jpg",
                        "images/help/en/en_03.jpg",
                        "images/help/en/en_04.jpg",
                        "images/help/en/en_05.jpg",
                        "images/help/en/en_06.jpg",
                        "images/help/en/en_07.jpg"
                    ];
                    break;
                }
            }
            return list;
        };

        /**
         * 根据输入的内容检查特殊字符和Emoji
         * @param s 输入的字符
         * 功能 禁止输入特殊字符和Emoji
         */
        dataService.stripscript = function(s){
            console.log("str --------> "+s);
            s = s.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\ud83d[\ude80-\udeff]|\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]/g, "");//过滤Emoji
            var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥％……&*（）——+|{}【】‘；：”“'。，、？]") ;// 过滤特殊字符
            var rs = ""; 
            for (var i = 0; i < s.length; i++) { 
                rs = rs+s.substr(i, 1).replace(pattern, '');
            }
            return rs; 
        };
        /**
         * 根据输入的内容检查是否是以数字开头
         * @param s 输入的字符
         * 功能 禁止以数字开头
         */
        dataService.numberCheck = function(s){
            var rs = ""; 
            if(s.length!=0){
                console.log("str --------> "+s+"---" + s.substr(0, 1));
                var firstChar = s.substr(0, 1);
                var pattern = new RegExp("^[0-9]*$") ;// 过滤特殊字符
                if(pattern.test(firstChar)){
                    s = s.substr(0, 1).replace(pattern, '');
                }
                rs =s ;
            }
            return rs;
        };

        return dataService;
        });
};

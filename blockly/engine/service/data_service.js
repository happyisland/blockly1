/**
 * data_service.js version 1.0  zlm
 * 
 *  功能 ：提供数据服务 (区别于原来的data_service 不依赖angular)
 * 
 *  
 * 
 */
'use strict';
;(function (){
    var RobatCommand = require('./robat_command');

    function DataService() {
        this.curXmlObj = {"xmlId": "", "xmlName": "", "isDefault": false, "xmlContent": ""};
    };
    /**
     *   初始化当前xml obj 对象
     *   {{xmlId: string, xmlName: string, isDefault: boolean, xmlContent: string}}
     *   //xmlId -xmlID  xmlName -xml名称  isDefault--是否系统默认案例  xmlContent--当前xml内容
     */
    DataService.prototype.initCurXmlObj = function() {
        this.curXmlObj = {
            "xmlId": "",
            "xmlName": "",
            "isDefault": false,
            "xmlContent": ""
        };
    };
    /**
     *   获取当前编辑xml obj对象
     */    
    DataService.prototype.getCurXmlObj = function() {
        return this.curXmlObj;
    };

    /**
     *   获取发送命令参数
     *   @type  项目保存类型
     *   @param 项目保存参数
     */    
    DataService.prototype.getCommandParam = function(type,param,closeParams) {
        //发送参数
        var temp_param = null;
        if (param != undefined && param != null) {
            temp_param = JSON.stringify(param);
        }
        var lightTime = 255000;
        if (closeParams) {
            lightTime = 0;
        }
        var commandParms = {
            //新增项目
            'add': 'SaveXml|' + temp_param + '|saveXmlCallBack',
            //编辑项目
            'edit': 'SaveXml|' + temp_param + '|editXmlCallBack',
            //删除项目
            'delete': 'DeleteXml|' + temp_param + '|deleteXmlCallBack',
            //读取xml
            'read': 'ReadXml|' + temp_param + '|readXmlCallBack',
            //读取外设实时值
            'read_device': 'startInfraredTimer|null|readDeviceCallBack',
            //读取红外设备实时值
            'read_infrared': 'startInfraredTimer|null|readInfraredCallBack',
            //关闭外设实时值
            'stop_device' : 'stopInfraredTimer|null|null',
            //关闭窗口，即退出逻辑编程界面
            'closeWindow': 'CloseWindow',
            //获取项目列表
            'projectList' : 'XmlList|null|xmlListCallBack',
            //蓝牙连接
            'blueConnect' : 'ConnectBLE',
            //蓝牙关闭
            'blueDisconnect': 'DisconnectBLE',
            //触碰传感器的显示
            'touchShow': 'setSensorLED|' + temp_param,
            //陀螺仪传感器的显示
            'gyroShow': 'setSensorLED|' + temp_param,
            //红外传感器的显示
            'InfraredShow': 'setSensorLED|' + temp_param,
            //表情
            'emojiRealTime': 'setEmoji|' + temp_param + '|3|0',
            // led灯光
            'LEDRealTime': 'setLEDs|' + temp_param + '|'+lightTime,
            // 旋转舵机角度
            'changeServo' : 'servoSet|' + temp_param

        };
        // console.log("data_service ==>"+commandParms[type]);
        return commandParms[type];
    };
    /**
     *  项目命令发送
     *   @type  项目保存类型
     *   @param 项目保存参数
     */    
    DataService.prototype.command = function(type, param,isclose) {
        var temp_command = null;
        var comond_param = this.getCommandParam(type, param,isclose);
        temp_command = new RobatCommand(comond_param);
        temp_command.send();
    };
    var dataService = new DataService();

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = dataService;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return dataService; });
    } else {
        this.dataService = dataService;
    }

}).call(this);
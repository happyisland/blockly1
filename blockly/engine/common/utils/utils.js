/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * utils.js version 1.0
 * 
 *  utils feature
 *  工具函数类
 * 
 * feature utils feature
 * 
 */
'use strict';
;(function() {
    var blocklyDatas = require('./../../service/blockly_datas');
    var $ = require('jquery');
    var _ = require('lodash');

    var Promise = require("bluebird");

    var timerValue = 0;
    
    function UbtUtils() {

    }

    /**
     * @params url 载入脚本的url
     * @params callback 载入脚本的回调函数
     * 
     * 载入脚本的功能
     * 
     * 
     */
    UbtUtils.prototype.loadScript = function (url, callback) {
        var script = document.createElement("script")  
        script.type = "text/javascript";  
        if (script.readyState){  //IE  
            script.onreadystatechange = function(){  
                if (script.readyState == "loaded" || script.readyState == "complete"){  
                    script.onreadystatechange = null;  
                    callback();  
                }  
            };  
        } else {  //Others  
            script.onload = function(){  
                callback();  
            };  
        }  
        script.src = url;  
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    /**
     * 以指定的间隔方式执行函数
     */
    UbtUtils.prototype.batchExecuteInterval = function(bacthFunc) {
        var i = 0;
        var runExecute = function(bacthFunc) {
            var funcData = bacthFunc[i];
            if (!bacthFunc || !funcData) {
                console.log('loop finish');
                return;
            }        
            while(funcData) {
                i++;
                return UbtUtils.sendComand(funcData).then(function(data) {
                    console.log(data);
                    runExecute(bacthFunc);
                });
            }
        };
        runExecute(bacthFunc);
    };

    UbtUtils.sendComand = function(funcData) {
        var execFunc = funcData['fn'];
        var duration = funcData['duration'];
        return new Promise(function(resolve, reject){
            setTimeout(function() {
                execFunc.call(funcData);
                resolve(funcData);
            },duration);
        });
    };



    /**
     * 
     * 返回平台的字符串，android or ios
     * 
     */
    UbtUtils.prototype.getPlatformString = function() {
        if(navigator.userAgent.toLowerCase().indexOf("android") > 0){
            return 'android';
        }else{
            return 'ios';
        }
    };



    /**
     * @params min 区间的最小值
     * @params max 区间的最大值
     * 
     * 生成一段区间的随机函数
     * 
     */
    UbtUtils.prototype.generateRandom = function(min, max) {
        var range = max - min;   
        var rand = Math.random();   
        return (min + Math.round(rand * range));   
    };

    /**
     * @params sendCommandFn 发送命令的函数
     * @params programCallback 回调唤醒程序
     * @milis 延迟的毫秒数
     * 
     * 延迟执行函数，用于模拟客户端程序执行的延迟和唤醒
     * 
     */
    UbtUtils.prototype.sendTimeout = function(sendCommandFn, programCallback,milis) {
        var x;
        while (true) {
            x = true;
            timerValue = setTimeout((function() {
                programCallback();
                console.log('dealy continue');
                //唤醒
                //console.log('programCallback');
                x = false;
            }), milis);
            //发送指令
            if (!x) {
                //console.log(x);
                break;
            } else {
                //console.log(x);
            }
            break;
        }
        //发送指令
        sendCommandFn();
        return console.log('sendCommand delay' + milis);
    };

    /**
     * 清除掉定时器
     */
    UbtUtils.prototype.clearTimeout = function() {
        console.log('清除掉定时器：'+ timerValue);
        clearTimeout(timerValue);
    }

    UbtUtils.prototype.functionString = function(options) {
        var values = {
            functionName: "",
            parameters: []
        };
        _.extend(values, options);

        var returnString = "";
        if (values.functionName) {
            returnString = "" + values.functionName + '(';
            returnString += values.parameters.join(',');
            returnString += ');\n';
        }
        return returnString;
    };

    /**
     * @params len 长度
     * @params radix 基数
     * 
     * 生成随机的uuid
     * 
     */
    UbtUtils.prototype.genUuid = function(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];

        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };

    /**
     * 将 RGB 颜色 转换成 十六进制
     * @param color_value           RGB(x,y,z)
     * @returns {string}            #XXXXXX
     */
    UbtUtils.prototype.rgb2hex = function(color_value){
        if ( ! color_value ) return false;
        var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
            length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
        delete(parts[0]);
        for ( var i = 1; i <= length; i++ ) {
            parts[i] = parseInt( parts[i] ).toString(16);
            if ( parts[i].length == 1 ) parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('').toUpperCase(); // #F7F7F7
    };

        /**
     * @params realValue 红外原始数据
     * 将红外原始数据转化为距离等级
     */
    UbtUtils.prototype.convertInfraredValueToLevel = function (realValue) {
        
        var level = 0;

        if (realValue >= 2200) {
            level = 5;
        } else if (realValue >= 1700) {
            level = 4;
        } else if (realValue >= 1350) {
            level = 3;
        } else if (realValue >= 800) {
            level = 2;
        } else {
            level = 1;
        }      
        return level;

    };

    UbtUtils.prototype.convertInfraredValueToLevel2 = function (realValue) {
        // 方法一
        // if (realValue < 950) {
        //     return 0;
        // } else if (realValue < 2300) {
        //     return parseInt(0.06*realValue - 56.3);
        // } else if (realValue < 2550) {
        //     return parseInt(0.08*realValue - 104.00);
        // } else {
        //     return 100;
        // }

        // 方法2
    //    var level = 0;
    //    if (realValue > 2650){
    //         realValue = 2650;
    //    } else if (realValue < 850) {
    //        realValue = 850;
    //    }

    //    level = parseInt((realValue - 850)/18.0);

    //    return level;  // print 0~100

        // 方法三
        realValue = realValue - 850;
        var level = 0;
        
        if (realValue < 0) {
            level = 0;
        } else if (realValue < 70) {
            level = parseInt((realValue - 15) / 13.5);
        } else if (realValue < 1210) {
            level = parseInt((realValue + 1134)/ 288);
        } else if (realValue < 1565) {
            level = parseInt((realValue + 206)/ 177);
        } else if (realValue < 1821) {
            level = parseInt((realValue - 1033)/ 53.75);
        } else if (realValue < 2200) {
            level = parseInt((realValue - 1462)/ 22.75);
        } else {
            level = 20; // 最大返回20
        }

        if (level > 20) {
            level = 20;
        }
        
        return level;

    };

    /**
     * 比较两个字符串是否相等
     * @param str1          第1个字符串
     * @param str2          第2个字符串
     * @returns {boolean}
     */
    UbtUtils.prototype.xmlComparison = function (str1,str2){
        var temp_str = 'xmlns="http://www.w3.org/1999/xhtml"';
        if(str1.indexOf(temp_str)>0){
            str1 = str1.replace(' xmlns="http:\/\/www.w3.org\/1999\/xhtml"',"");
        }
        if(str2.indexOf(temp_str)>0){
            str2 = str2.replace(' xmlns="http:\/\/www.w3.org\/1999\/xhtml"',"");
        }

        var result = false;
        if(str1 == str2){
            result =  true;
        }
        return result;
    };

    /**
     * 计算字符串中，两个字节的字符个数
     * @param str           待查找的字符串
     * @returns {number}    双字节字符个数
     */
    UbtUtils.prototype.calDoubleCharCount = function (str){
        if(str == ''){
            return 0;
        }

        var count = 0;
        var exp = '[^\x00-\xff]';
        var regex = new RegExp(exp, 'gi');
        var result = str.match(regex);
        console.log(result);
        count = (result == null ? 0 : result.length);

        return count;
    };

    /**
     * 计算字符串的字节数，包含双字节
     * @param str           待计算的字符
     * @returns {number}    字节数
     */
    UbtUtils.prototype.calTextLength = function (str){
        var cnt = this.calDoubleCharCount(str);
        var result = (str.length - cnt)*1 + cnt*2;

        return result;
    };

    /**
     * 判断是否饮食特殊字符
     * @param str           待检查的字符串
     * @returns {boolean}   是否包含特殊字符
     */
    UbtUtils.prototype.charTypeCheck = function(str){
        if(str == '') {
            return true;
        }

        var exp = '^[a-zA-Z0-9\u4e00-\u9fa5_]+$';
        var regex = new RegExp(exp, 'g');
        var result = str.match(regex);
        if(result == null) {
            return false;
        }else{
            return true;
        }
    };

    //判断一个字符串是否是合适的变量
    UbtUtils.prototype.variableCheck = function (str) {
        if (str == '') {
            return false;
        }
        if (!isNaN(str.substring(0,1))) {
            return false;
        }
        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i;
        if (!reg.test(str)) {
            return false;
        }
        return true;
        
    };
    /**
     * xml程序块判断
     * @param xmlText
     * @returns {boolean}
     */
    UbtUtils.prototype.xmlIsCorrect = function (xmlText) {
        console.log(xmlText);
        var dom = Blockly.Xml.textToDom(xmlText);
        var customBlocks = $("block[type^='actions_']", dom);
        var length = customBlocks.length;
        if (length == 0) {
            return true;
        }
        var baseBlocks = {};
        var actionsStr = blocklyDatas.getDataByKey("actions");
        var actionArray = [];
        if(actionsStr!=undefined && actionsStr!=""){
            actionArray = actionsStr.split('|');
        }
        var arrlen = actionArray.length;
        for (var i = 0; i < arrlen; i++) {
            var actionStr = actionArray[i].split(',');
            var action = actionStr[0];
            baseBlocks[action] = actionStr;
        }
        for (var j = 0; j < length; j++) {
            var type = customBlocks.get(j).getAttribute('type');
            if (!baseBlocks[type]) {
                return false;
            }
        }
        return true;
    };

    UbtUtils.prototype.create_interval = function(callBack,time){
        window.intervalObject.intervalSelf = window.setInterval(function(){
            console.log("长按开始---》");
            callBack();
        }, time);
        //累计定时器个数
        window.intervalObject.intervalArray.push(window.intervalObject.intervalSelf);
    };
    UbtUtils.prototype.clear_interval = function(){
        if(window.intervalObject.intervalArray.length>0){
            window.intervalObject.intervalArray.forEach(function(ele) {
                window.clearInterval(ele)
            });
        }
    };


    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new UbtUtils;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new UbtUtils; });
    } else {
        this.ubtUtils = new UbtUtils;
    }

}).call(this);
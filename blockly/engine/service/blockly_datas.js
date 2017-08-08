/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * BlocklyDatas.js version 1.0
 * 
 * blockly data center
 * blockly的数据中心
 * 
 * feature blockly data center
 * 
 */
'use strict'
;(function() {

    function BlocklyDatas() {
        this.datas = {};
        this.init();
    }

    //普通舵机数组
    var arrServos = '';
    //普通舵机下拉数组ID
    var servoIdArray = [];

    //灯光传感器数组
    var arrLights = '';
    //情景灯数组
    var sceneLights = '';
    // 轮模式舵机数组
    var arrCircleServos = '';

    //红外传感器id数组
    var arrInfraredIds = '';
    //红外传感器下拉数组列表
    var infraredIdArray = [];

    //触碰传感器id数组
    var arrTouchIds = '';
    //触碰传感器下拉数组列表
    var touchIdArray = [];

    //陀螺仪传感器id数组
    var gyroscopeIds = '';
    //陀螺仪传感器下拉数组列表
    var gyroscopeIdArray = [];

    BlocklyDatas.DEFAULT_XML = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>';

    /**
     * 初始化参数
     */
    BlocklyDatas.prototype.init = function() {
        this.initDefaultXml();
        var requestStrParams = '';
        //这里直接调用IOS或者Java的方法获取初始化的参数
        if (window.blocklyObj) {
            requestStrParams = window.blocklyObj.getServoID();
            console.log(requestStrParams);
        } else {
            requestStrParams =  window.location.search.substr(1);
            requestStrParams = '&servos=1|2|3|4|5&isFirst=1&actions=test,test';
            // requestStrParams = '&servos=1|2|3|4|5&actions=test,test|actions_636252715835204660,待命|actions_6227af3e-fcc0-4141-87a9-948574190e20,右移&isFirst=1';
            var jsonArr =[
                            {
                                cmd:'actions_636252715835204660',
                                desc:'待命'
                            },
                            {
                                cmd:'actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c',
                                desc:'前进'
                            },
                            {
                                cmd:'actions_8e07f32d-ba72-4e43-a603-710264bc4308',
                                desc:'后退'
                            },
                            {
                                cmd:'actions_9b30bcec-548d-4562-be9c-57676cb36fde',
                                desc:'左移'
                            },
                            {
                                cmd:'actions_6227af3e-fcc0-4141-87a9-948574190e20',
                                desc:'右移'
                            },
                            {
                                cmd:'actions_a182b7de-e32f-4445-8c0f-80b4491082f6',
                                desc:'扭动'
                            }
                        ];
            for(var i =0;i<jsonArr.length;i++){
                var item = jsonArr[i];
                requestStrParams+="|"+item.cmd+","+item.desc;
            }
        }
        if ('' === requestStrParams) {
            return;
        }
        console.log('my test for requestStrParams : ' + requestStrParams);
        var arrRequest = requestStrParams.split("&");
        for (var i = 0; i < arrRequest.length; i++) {
            this.datas[arrRequest[i].split("=")[0]] = decodeURI(arrRequest[i].split("=")[1]);
        }
        if(this.getDataByKey("platformType")==2){ //1--通用版  2--教育版
            var xml =  window.blocklyObj.projectDataFromEdu();
         //   alert(xml);
            if(xml!=undefined && xml!="" && xml!=null){
                this.datas["sysXmlObj"]=JSON.parse(xml);
            }else{
                this.datas["sysXmlObj"]="";
            }
        }
        //初始化将舵机字符串转化为数组
        this.initServosId();
        //初始化LED等为数组
        this.initLightsId();
        //初始化情景灯数组
        this.initsceneLightsId();
        //初始化轮模式舵机ID为数组
        this.initCircleServosId();
        //初始化红外传感器ID为数组
        this.initInfraredId();
        //初始化触碰传感器ID为数组
        this.initTouchId();
        //初始化陀螺仪传感器ID为数组
        this.initGyroScopeId();
    };

    /**
     * 初始化轮模式ID
     */
    BlocklyDatas.prototype.initCircleServosId = function() {
        var circleServos = this.getDataByKey('circleServos');
        if (!circleServos || circleServos =='') {
            arrCircleServos = ['ID'];           
        } else {
            arrCircleServos = circleServos.split('|');
        }
        if (!window.blocklyObj) {
            arrCircleServos = ['1','2','3','4']; 
        }
    };

    /**
     * 初始化默认的程序
     */
    BlocklyDatas.prototype.initDefaultXml = function() {
        this.datas['defaultXml'] = BlocklyDatas.DEFAULT_XML;
    };

    /**
     * 初始化普通的舵机ID
     */
    BlocklyDatas.prototype.initServosId = function() {
        var servos = this.getDataByKey('servos');
        servoIdArray = [];
        if (!servos || servos =='' || servos == null ) {
            arrServos =['ID'];
            servoIdArray = [["ID", "ID"]];
        } else {
            arrServos = servos.split('|');
            for (var i = 0; i < arrServos.length; i++) {
                var tempObj = [];
                tempObj[0] = 'ID-'+arrServos[i];
                tempObj[1] = arrServos[i];
                servoIdArray.push(tempObj);
            }
        }
    };

    /**
     * 初始化红外传感器的ID
     */
    BlocklyDatas.prototype.initInfraredId = function() {
        var infraredId = this.getDataByKey('infraredId');
        infraredIdArray = [];
        if (infraredId) {
            arrInfraredIds = infraredId.split('|');
            var len = arrInfraredIds.length;           
            for (var i = 0 ; i <len; i++ ) {
                var tempObj = [];
                tempObj[0] = 'ID-'+arrInfraredIds[i];
                tempObj[1] = arrInfraredIds[i];
                infraredIdArray.push(tempObj);
            }
        } else {
            if (infraredIdArray.length == 0) {
                arrInfraredIds = ["ID"];
                infraredIdArray = [["ID", "ID"]];

               /* arrInfraredIds = ["1","2"];
                infraredIdArray = [["ID-1", "1"],["ID-2", "2"]];*/
            }
        }         
    };

    /**
     * 初始化触碰传感器的ID
     */
    BlocklyDatas.prototype.initTouchId = function() {
        var touchIdStr = this.getDataByKey('touchId');
        touchIdArray = [];
        if (touchIdStr) {
           arrTouchIds = touchIdStr.split('|');           
           for (var i = 0; i < arrTouchIds.length; i++) {
             var tempObj = [];
             tempObj[0] = 'ID-'+arrTouchIds[i];
             tempObj[1] = arrTouchIds[i];
             touchIdArray.push(tempObj);
           }
        } else {
           if (0 == touchIdArray.length){
               arrTouchIds = ["ID"];
               touchIdArray = [["ID", "ID"]];

               //arrTouchIds = ["1","2"];
               //touchIdArray = [["ID-1", "1"],["ID-2", "2"]];
           }
        }       
    };

    /**
     * 初始化陀螺仪传感器的ID
     */
    BlocklyDatas.prototype.initGyroScopeId = function() {
        var gyroscopeIdStr = this.getDataByKey('gyroscopeId');
        gyroscopeIdArray = [];
        if (gyroscopeIdStr) {
          gyroscopeIds = gyroscopeIdStr.split('|');
          for (var i = 0; i < gyroscopeIds.length; i++) {
            var tempObj = [];
            tempObj[0] = 'ID-'+gyroscopeIds[i];
            tempObj[1] = gyroscopeIds[i];
            gyroscopeIdArray.push(tempObj);
          }
        } else {
            if (0 == gyroscopeIdArray.length) {
                gyroscopeIds =  ["ID"];
                gyroscopeIdArray = [["ID", "ID"]];
                //gyroscopeIds = ["1","2"];
                //gyroscopeIdArray = [["ID-1", "1"],["ID-2", "2"]];
            }
        }

             
    };

    /**
     * 初始化普通的灯光ID
     */
    BlocklyDatas.prototype.initLightsId = function() {
        var lights = this.getDataByKey('lights');
        if (!lights || lights =='') {
            arrLights = ['ID'];
        } else {
            arrLights = lights.split('|');
        }
        if(!window.blocklyObj){
            arrLights = [1,2];
        }      
    };
    /**
     * 初始化情景灯ID
     */
    BlocklyDatas.prototype.initsceneLightsId = function() {
        var scenelights = this.getDataByKey('scenelights');
        if (!scenelights || scenelights =='') {
            sceneLights = ['ID'];
        } else {
            sceneLights = lights.split('|');
        }
        if(!window.blocklyObj){
            sceneLights = [1];
        }      
    };

    /**
     * 根据key获取参数的值
     */
    BlocklyDatas.prototype.getDataByKey = function(key) {
        if (key) {
            return this.datas[key];
        }
        return 'key is invalid';
    };


    /**
     * 设置参数的值
     */
    BlocklyDatas.prototype.setKeyData = function(key, data) {
        if (key) {
            this.datas[key] = data ;
        }
    };

    /**
     * 返回普通舵机的数组
     */
    BlocklyDatas.prototype.getServoIds = function() {
        return arrServos;
    };

    //返回用于下拉列表选择的舵机数组
    BlocklyDatas.prototype.getServoIdArr = function() {
        return servoIdArray;
    };

    //返回LED的数组
    BlocklyDatas.prototype.getLightsIds = function() {
        return arrLights;
    };
    //返回情景灯的数组
    BlocklyDatas.prototype.getsceneLightsIds = function() {
        return sceneLights;
    };

    //返回轮模式舵机ID数组
    BlocklyDatas.prototype.getCircleServosIds = function() {
        return arrCircleServos;
    };

    //返回红外传感器ID的数组
    BlocklyDatas.prototype.getInfraredIds = function() {
        return arrInfraredIds;
    };

    //返回红外传感器ID的下拉数组
    BlocklyDatas.prototype.getInfraredIdArr = function() {
        return infraredIdArray;
    };

    //返回触碰传感器ID的数组
    BlocklyDatas.prototype.getTouchIds = function() {
        return arrTouchIds;
    };

    //返回触碰传感器ID的下拉数组
    BlocklyDatas.prototype.getTouchIdArr = function() {
        return touchIdArray;
    };

    //返回陀螺仪传感器ID的数组
    BlocklyDatas.prototype.getGyroscopeIds = function() {
        return gyroscopeIds;
    };

    //返回陀螺仪传感器ID的下拉数组
    BlocklyDatas.prototype.getGyroscopeIdArr = function() {
        return gyroscopeIdArray;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        var blocklyDatas = new BlocklyDatas;
        module.exports = blocklyDatas;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new BlocklyDatas; });
    } else {
        this.blocklyDatas = new BlocklyDatas;
    }

}).call(this);
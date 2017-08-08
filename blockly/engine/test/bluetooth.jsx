var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var blocklyDatas = require('../service/blockly_datas');
var RobatCommand = require('../service/robat_command');
var BlueDisContentComponent = require('./blueDisContent.jsx');
var eventsListener = require('./../common/events_listener');
var blocklyUtils = require('./../common/utils/blockly_utils');

var Bluetooth = React.createClass({
    getInitialState : function(){
        if(window.blocklyObj == undefined) {
            blocklyDatas.setKeyData('blueState',1);
        }
        //蓝牙链接状态
        var blueContent = blocklyDatas.getDataByKey('blueState');
        console.log("======蓝牙初始化状态：========>"+blueContent+"------->数据类型："+typeof(blueContent));
        if(blueContent===undefined){
            blueContent = 0;
        }else{
            blueContent =  parseInt(blueContent);
        }
        //蓝牙连接图片地址   连接状态
        var tempImgUrl = "images/index/bt_langya.png";
        if(blueContent===0 || blueContent === false){
            //蓝牙连接图片地址   非连接状态
            tempImgUrl = "images/index/Noconnection.png";
        }
        return {
            imgUrl:tempImgUrl,
            blueContentStates:blueContent //蓝牙链接状态
        };
    },
    componentDidMount: function() {
        eventsListener.on('ConnectBLE',this._blueContentCallBack);
        eventsListener.on('DisconnectBLE',this._blueContentCallBack);
    },

    componentWillUnmount: function() {
        eventsListener.off('ConnectBLE');
        eventsListener.off('DisconnectBLE');
    },
    _blueContentCallBack:function(data){
        //更新运行按钮的状态
        eventsListener.trigger('changeState', false);
        var param = JSON.parse(decodeURI(data));
        console.log(param);
        this.setState({blueContentStates:param.blueState});
        //设置蓝牙值
        blocklyDatas.setKeyData('blueState',param.blueState) ;
        var imgUrl = "images/index/bt_langya.png";
        if(param.blueState === 0 || param.blueState === false){//未连接
            imgUrl = "images/index/Noconnection.png";
        }
        if (this.isMounted()) {
            this.setState({imgUrl:imgUrl});
        }
       // if (param.blueState === 1 || param.blueState === true) {
            //设置红外
            blocklyDatas.setKeyData('infraredId',param.infraredId) ;
            blocklyDatas.setKeyData('touchId',param.touchId) ;
            blocklyDatas.setKeyData('gyroscopeId',param.gyroscopeId) ;
            blocklyDatas.setKeyData('lights',param.lights) ;
            //初始化将舵机字符串转化为数组
            blocklyDatas.initServosId();
            //初始化LED等为数组
            blocklyDatas.initLightsId();
            //初始化轮模式舵机ID为数组
            blocklyDatas.initCircleServosId();
            //初始化红外传感器ID为数组
            blocklyDatas.initInfraredId();
            //初始化触碰传感器ID为数组
            blocklyDatas.initTouchId();
            //初始化陀螺仪传感器ID为数组
            blocklyDatas.initGyroScopeId();
            if(param.blueState === 1 || param.blueState === true) { //连接
                blocklyUtils.iterateBlocks(function (block) {
                    blocklyUtils.handleWorkspaceBlock(block);
                });
            }
       // }
        blocklyDatas.setKeyData('needRefresh', true);
    },
    blueContentStatesFun:function(){
        //运行中 按钮不可点击 programRunning
        if(blocklyDatas.getDataByKey("programRunning")) return;
       // window.chargeProtection("sdfsdgfsdgdsfgfdsg");  //充电保护测试
       var callBack_ =this.blueContentFun;
        //蓝牙处于链接状态，弹出提示是否需要关闭蓝牙弹出框
        //蓝牙处于断开状态直接链接蓝牙
        if (this.state.blueContentStates === 1 || this.state.blueContentStates===true) {  //蓝牙处于连接状态提示是否退出蓝牙
            //弹框提示信息
            var removeComponent = function() {
                ReactDOM.unmountComponentAtNode(document.getElementById("messagetip_div"));
                $("#messagetip_div").empty();
            };
            ReactDOM.render(
                React.createElement(BlueDisContentComponent,
                    {
                        onRemove: removeComponent,
                        callBack:callBack_
                    }
                ), document.getElementById("messagetip_div")
            );


        } else {  //蓝牙处于断开状态，直接连接蓝牙
             // 蓝牙连接命令  TODO  更改图片状态
             this.blueContentFun("content");
        }
    },
    blueContentFun:function(param){
        console.log(param);
        var  temp_command = null;
        if(param==="content"){
            //window.blueConnectCallBack({blueState:true});
            //连接蓝牙
           temp_command = new RobatCommand('ConnectBLE');

        }else{
            //window.blueConnectCallBack({blueState:false});
            //断开蓝牙
            temp_command = new RobatCommand('DisconnectBLE');
        }
        temp_command.send();

    },
    render: function(){// // <i className="fa fa-bluetooth-b"></i>
        return  <div className="bluetooth_box flex" onTouchEnd={this.blueContentStatesFun}>
                    <img id="blueImg" src={this.state.imgUrl}/>
                </div>;
    }
});
module.exports = Bluetooth;
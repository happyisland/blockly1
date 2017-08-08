var React = require('react');
var ReactDOM = require('react-dom');
var LEDMenu = require('./led_menu.jsx');
var LEDEmotion = require('./led_emotion.jsx');
var LEDScenelight = require('./led_scenelight.jsx');
var LEDLight = require('./led_light.jsx');
var Immutable = require('immutable');
var $ = require('jquery');
var DataService = require('../service/data_service.js');

var LEDComponent = React.createClass({
    // 用来设置默认属性 不变的
    getDefaultProps: function() {
        return {
            emotions : ["zhayan","haixiu","relei","leiguang","cry","yun","happy","jingya","huxi","shanshuo","fengshan","yugua"],
            scenelights : ["deng","disco","sanyuanse","caise"],
            colorsBlock : ['#fe0000','#ff7f00','#fff000','#00ff01','#01ffff','#0000fe','#ff00fe','#fe80fe','#ffffff'],
            lightscolorsBlock : ['#fe0000','#ff7f00','#fff000','#00ff01','#01ffff','#0000fe','#ff00fe','#ffffff',''],
            popupKeyMap : { "emotionDisplay": MSG.title_setting_emotion,
                            "sceneLightDisplay": MSG.title_setting_scenelight,
                            "settingLight": MSG.title_setting_light
                          },
            default_color:"#01ffff"
         };
    },
    // 用来设置可变属性
    getInitialState: function() {
        var obj = this._initData();
        console.log(this.props.popupKey);
         return {
            popupKey: this.props.popupKey,
            outPutDataArr : this.props.arrMultiServoToPopup,
            islightLock :obj.islightLock,
            curselMenu:obj.curselMenu,
            curSceneLight:obj.emotionIndex,
            curEmotion:obj.emotionIndex,
            curColor:obj.curColor,
            pathColorsArr:obj.lights,
            curSelectPath:0,
            curSelColorIndex:-1,//默认色块无选择-1
            callback:this.props.callback //回调函数
         };
    },
    componentDidMount: function() {
        
    },
    _initData:function(){
        var obj = {};
        obj.emotionIndex = this.props.arrMultiServoToPopup.lightArray[0].emotionIndex;
        obj.curselMenu = 0;
        obj.islightLock = this.props.arrMultiServoToPopup.islightLock;
        obj.curColor = this.props.arrMultiServoToPopup.lightArray[0].color;
        obj.lights = this.props.arrMultiServoToPopup.lightArray[0].lights;
        
        this._sendCommand(this.props.arrMultiServoToPopup.lightArray);
        return obj;
    },
    _closeLedLightCommand:function(){
        if(this.state.popupKey=="settingLight"){
            var dataArr = [];
            var outPutDataArr = this.state.outPutDataArr.lightArray;
            for(var i=0;i<outPutDataArr.length;i++ ){
                var obj = {};
                obj.id = outPutDataArr[i].id;
                obj.lights = [];
                var _lights = outPutDataArr[i].lights;
                for(j=0;j<_lights.length;j++){
                    obj.lights.push("");
                }
                dataArr.push(obj);
            }
            this._sendCommand(dataArr,true);
        }
    },
    _sendCommand:function(param,isclose){
        var command_type = "emojiRealTime";
        if(this.props.popupKey=="settingLight"){
            command_type = "LEDRealTime";
        }
        DataService.command(command_type,param,isclose);
    },
    goCancel:function(e) {
        if(e){
            e.stopPropagation();
        }
        console.log("led component 数据取消保存啦啊啊");
        console.log(this.props.arrMultiServoToPopup);
        this.props.callback(this.props.arrMultiServoToPopup);
        this._closeLedLightCommand();
        return this.props.onRemove();
    },
    goSure:function(e) {
        this.props.callback(this.state.outPutDataArr);
        if(e){
            e.stopPropagation();
        }
        console.log("led component 终于见到最后输出的数据啦");
        console.log(this.state.outPutDataArr);
        this.props.callback(this.state.outPutDataArr);
        this._closeLedLightCommand();
        return this.props.onRemove();
    },
    // 选择的菜单改变
    onSelectMenuChange:function(_index){
        var _emotionIndex = this.state.outPutDataArr.lightArray[_index].emotionIndex;
        var _color = this.state.outPutDataArr.lightArray[_index].color;
        _color = (_color==undefined?this.props.default_color:_color);
        var _pathColorsArr = this.state.outPutDataArr.lightArray[_index].lights;
        this.setState({
            curselMenu:_index,
            curSceneLight:_emotionIndex,
            curEmotion:_emotionIndex,
            curColor:_color,
            pathColorsArr:_pathColorsArr,
            curSelColorIndex:-1//切换menu 要把色块选中取消啊
        },()=>{
            console.log("parent MENU change---------->");
            console.log(this.state.curSelColorIndex);
            console.log(this.state.pathColorsArr);
            if(this.state.popupKey=="settingLight"){
                $(".colorblock_list .color_text").removeClass('active');
                this.refs.onLedMenuChange._fillSelectPath(_pathColorsArr);
            }
            this._refreshParent(this.state.curselMenu);
        });
    },
    // 选择的表情发生变化
    onEmotionChange:function(_emotionIndex){
        this.setState({
            curEmotion:_emotionIndex
        },()=>{
            this._refreshParent(this.state.curselMenu);
        });
    },
    // 选择的色块发生变化
    onColorChange:function(_color,_colorIndex){
        this.setState({
            curColor:_color,
            curSelColorIndex:_colorIndex
        },()=>{
            this._refreshParent(this.state.curselMenu);
        });
    },
    onSelectPathChange:function(_pathIndex) {
        this.setState({
            curSelectPath:_pathIndex
        },()=>{
            console.log("curSelectPath============>"+this.state.curSelectPath);
            this._refreshParent(this.state.curselMenu);
        });  
    },
    // 更新menu 锁定状态
    _updateIslightlock:function(islightLock){
        var _index = this.state.curselMenu;
        var _lights = this.state.outPutDataArr.lightArray[_index].lights;
        this.setState({
            islightLock:islightLock,
            pathColorsArr:_lights
        },()=>{
            console.log(this.state.islightLock);
            this._refreshParent(this.state.curselMenu);
        });
    },
    // 选择的情景灯变化
    onScenelightChange:function(_curSceneLight){
        this.setState({
            curSceneLight:_curSceneLight
        },()=>{
            this._refreshParent(this.state.curselMenu);
        });
    },
    // 更新输出数据
    _refreshParent:function(index){
        var newArray = Immutable.List(this.state.outPutDataArr.lightArray);
        var _newArray = [];
        var lightscolorsBlock = this.props.lightscolorsBlock;
        var len = this.state.outPutDataArr.lightArray.length;
        if(this.state.islightLock){//锁定
            for(var i =0;i<len;i++){
                var item = {};
                if(this.state.popupKey!="settingLight"){
                    item.emotionIndex = this.state.curSceneLight;
                    if(this.state.popupKey=="emotionDisplay"){
                        item.color = this.state.curColor;
                        item.emotionIndex = this.state.curEmotion;
                    }
                }else{
                    var _lights = Immutable.List(this.state.outPutDataArr.lightArray[this.state.curselMenu].lights);
                    if(this.state.curSelColorIndex!=-1&&this.state.curSelectPath!=-1){
                        item.lights = _lights.set(this.state.curSelectPath,lightscolorsBlock[this.state.curSelColorIndex]).toJS();
                    }else {
                        item.lights = _lights.toJS();
                    }
                }
                item.id = this.state.outPutDataArr.lightArray[i].id;
                newArray=newArray.set(i,item);
            }
            var obj =newArray;
        }else{//未锁定
            var _curMenuData = {};
            if(this.state.popupKey!="settingLight"){
                _curMenuData.emotionIndex = this.state.curSceneLight;
                if(this.state.popupKey=="emotionDisplay"){
                    _curMenuData.color = this.state.curColor;
                    _curMenuData.emotionIndex = this.state.curEmotion;
                }
            }else{
                var _lights = Immutable.List(this.state.outPutDataArr.lightArray[index].lights);
                if(this.state.curSelColorIndex!=-1){//色块是选中状态
                    _curMenuData.lights = _lights.set(this.state.curSelectPath,lightscolorsBlock[this.state.curSelColorIndex]).toJS();
                }else {
                    _curMenuData.lights = _lights.toJS();
                }
            }
            _curMenuData.id = this.state.outPutDataArr.lightArray[index].id;
            var obj = newArray.set(index,_curMenuData);
        }
        var _outputdata={};
        _outputdata.lightArray = obj.toJS();
        _outputdata.islightLock = this.state.islightLock;
        this.setState({
            outPutDataArr :_outputdata
        },()=>{
            console.log("refresh");
            console.log(this.state.outPutDataArr);
            if(this.state.islightLock){
                this._sendCommand(this.state.outPutDataArr.lightArray,false);
            }else{
                var cur_lightArrayObj = this.state.outPutDataArr.lightArray[this.state.curselMenu];
                var cur_lightArray =[];
                cur_lightArray.push(cur_lightArrayObj);
                this._sendCommand(cur_lightArray,false);
            }
        });
    },
    // 根据不同的类型来加载不同的popupMenuli
    _renderComponentLiByType:function(that){
        var liArray = [];
        var _menuActive ="";
        var lightArray = this.state.outPutDataArr.lightArray;
        var type = this.state.popupKey;
        var _isLightLock = this.state.islightLock;
        var _curselMenu = this.state.curselMenu;
        var baseIndex =0;
        var menuTextClass = (type=="settingLight"?"ledcolor_spanbox flex":"servoangle_span flex");
        if(type == "emotionDisplay"){
            var messageArr = this.props.emotions;
        }
        if(type == 'sceneLightDisplay'){
            var messageArr = this.props.scenelights;
            baseIndex=12;
        }
        for(var i=0;i<lightArray.length;i++){
            var item=lightArray[i];
            var _index = item.emotionIndex;
            if(type == 'sceneLightDisplay'){
                _index = item.emotionIndex-baseIndex;
            }
            var component = (type=="settingLight"?this._renderColorsBlock(item):MSG['id_'+messageArr[_index]]);
            liArray.push(<li key={type+i} className={"menu_list_li flex "+ (_isLightLock?"active":(i==_curselMenu?"active":""))} 
                            onClick={that._clickSelMenu.bind(null,i)}>
                            <span className="menutext_class flex">ID-{item.id}</span>
                            <div className={menuTextClass}>
                                {component}
                            </div>
                         </li>);
        }
        return liArray;
    },
    // 创建可以选择的
    _renderColorsBlock:function(item){
        var colorsblock = [];
        for(var i =0;i<item.lights.length;i++){
            var _color = item.lights[i];
            colorsblock.push(<span key={i} style={{background:_color}}>
                                <label style={{display:"none"}}>{i}</label>
                             </span>);
        }
        return  colorsblock;      
    },
    // 根据type 来加载不同的(表情，情景灯，灯光)组件
    _componentReturn : function(type) {
        var componentTemp = null;
        if(type == 'emotionDisplay'){//表情
            componentTemp = <LEDEmotion onEmotionChange={this.onEmotionChange} 
                                    onColorChange={this.onColorChange}
                                    emotions={this.props.emotions} 
                                    colorsBlock={this.props.colorsBlock}
                                    curEmotion={this.state.curEmotion}
                                    curColor={this.state.curColor}/>;
        }else if(type == 'sceneLightDisplay'){//情景灯
            componentTemp = <LEDScenelight onScenelightChange={this.onScenelightChange}
                                scenelights={this.props.scenelights} 
                                curSceneLight={this.state.curSceneLight} />;
        }else if(type == 'settingLight'){//灯光
            componentTemp = <LEDLight onColorChange={this.onColorChange}
                                onSelectPathChange={this.onSelectPathChange}
                                colorsBlock={this.props.lightscolorsBlock}
                                pathColorsArr ={this.state.pathColorsArr}
                                curSelectPath={this.state.curSelectPath}
                                curSelColorIndex={this.state.curSelColorIndex}
                                ref="onLedMenuChange" />;
        }
        return componentTemp;
    },
    render: function() {
        var popupTitle = this.props.popupKeyMap[this.state.popupKey];
        var component  = this._componentReturn(this.state.popupKey);
        return  <div className="blockly_background flex">
                    <div className="blockly_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {popupTitle}
                            </div>
                        </div>
                        <div className="blockly_popupbody flex">
                            <LEDMenu  islightLock={this.state.islightLock} 
                                      UpdateislightLock={this._updateIslightlock}
                                      _renderComponentLiByType ={this._renderComponentLiByType}
                                      onSelectMenuChange={this.onSelectMenuChange}/>
                            {component}
                        </div>
                        <div className="blockly_popupfooter flex">
                            <div className="btn_cancel flex" onTouchEnd={this.goCancel}>{MSG.project_pop_cancel_btn}</div> 
                            <div className="btn_ok flex" onTouchEnd={this.goSure}>{MSG.project_pop_ok_btn}</div> 
                        </div>
                    </div>
                </div>;
    }
});
module.exports = LEDComponent;






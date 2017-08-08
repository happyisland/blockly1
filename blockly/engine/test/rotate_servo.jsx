var React = require('react');
var ReactDOM = require('react-dom');
var Menu = require('./popupbody_menu.jsx');
var SwitchComponent = require('./switch.jsx');
var RotateIconComponent = require('./rotate_icon.jsx');
var RotateSpeedComponent = require('./rotate_speed.jsx');
var Immutable = require('immutable');
var $ = require('jquery');

var RotateServoComponent = React.createClass({
    getInitialState: function() {
        var _initData = this._initFirstData();
        return {
            curMenuIndex:_initData.curMenuIndex,//当前菜单索引
            isClose:_initData.isClose,//开关
            direction:_initData.direction,
            speed:_initData.speed,
            outPutDataArr:this.props.arrMultiServoToPopup,
            callback:this.props.callback
        };
    },
    // 弹出框弹出来后数据初始化
    _initFirstData:function(){
        var initData = {};
        var inputData = this.props.arrMultiServoToPopup;
        if(inputData.length>0){
            initData = {
                curMenuIndex:0,
                isClose:inputData[0].isClose,
                direction:inputData[0].direction,
                speed:inputData[0].speed
            };
        }
        return initData;
    },
    // 取消事件
    goCancel:function(e) {
        if(e){
            e.stopPropagation();
        }
        console.log("rotate_servo数据取消保存啦啊啊");
        console.log(this.props.arrMultiServoToPopup);
        this.props.callback(this.props.arrMultiServoToPopup);
        return this.props.onRemove();
    },
    // 确定事件
    goSure:function(e) {
        if(e){
            e.stopPropagation();
        }
        console.log("rotate_servo终于见到最后输出的数据啦");
        console.log(this.state.outPutDataArr);
        this.props.callback(this.state.outPutDataArr);
        return this.props.onRemove();
    },
    // 选择的菜单改变
    onSelectMenuChange:function(_index){
        var _direction = this.state.outPutDataArr[_index].direction;
        var _isClose = this.state.outPutDataArr[_index].isClose;
        var _speed = this.state.outPutDataArr[_index].speed.toUpperCase();
        this.setState({
            curMenuIndex:_index,
            isClose:_isClose,
            direction:_direction,
            speed:_speed
        },()=>{
            console.log(this.state.isClose);
        });
    },
    // 开关变化
    onSwitchchange:function(_isClose){
        console.log("parent onSwitchchange "+_isClose);
        this.setState({
            isClose:_isClose//开关
        },()=>{
           this._refreshParent(this.state.curMenuIndex);
        });
    },
    // 速度变化
    onSpeedChange:function(_speed){
        console.log("parent onSpeedChange "+_speed);
        this.setState({
            speed:_speed.toUpperCase()//开关
        },()=>{
           this._refreshParent(this.state.curMenuIndex);
        });
    },
    // 方向变化
    onDirectionChange:function(_direction){
        console.log("parent onDirectionChange "+_direction);
        this.setState({
            direction:_direction//开关
        },()=>{
           this._refreshParent(this.state.curMenuIndex);
        });
    },
    // 刷新输出数据
    _refreshParent:function(index){
        var newArray = Immutable.List(this.state.outPutDataArr);
        var _curMenuData = {};
        _curMenuData.direction = this.state.direction;
        _curMenuData.isClose = this.state.isClose;//这个地方以前弄反了
        _curMenuData.speed = this.state.speed;
        _curMenuData.servoId = this.state.outPutDataArr[index].servoId;
        var obj = newArray.set(index,_curMenuData);
        this.setState({
            outPutDataArr :obj.toJS()
        },()=>{
            console.log("refresh");
            console.log(this.state.outPutDataArr);
        });
    },
    // 创建menuli元素
    _renderMenuli:function(that){
        var items = this.state.outPutDataArr;
        var newArray = [];
        for(var i=0;i<items.length;i++){
            var item=items[i];
            var _speedMsg = MSG["speed_"+item.speed.toUpperCase()];
            var _stopMsg =MSG.rotate_servo_popup_stop;
            newArray.push(<li key={item.servoId}  className={"menu_list_li flex "+(i==0?"active":"")} 
                                onClick={that._menuItemSelect.bind(that,item)}>
                            <span className="menutext_class flex">
                                <label>{item.servoId}</label></span>
                            <span className="speed_span flex">
                                {item.isClose ? (item.direction=="s"?_stopMsg:_speedMsg) : MSG.servo_angle_popup_close}
                            </span>
                          </li>);
        }
        return newArray;
    },
    // 是否展示速度 组件
    _isShowSpeedComponent:function(){
        var _Component = "";
        if(this.state.direction!="s"){//不是停止 需要展示速度组件
            _Component = <RotateSpeedComponent speed={this.state.speed} 
                                        isClose={this.state.isClose}
                                        onSpeedChange={this.onSpeedChange}/>;
        }
        return _Component;
    },
    render: function(){
        var _Component = this._isShowSpeedComponent();
        return  <div className="blockly_background flex">
                    <div className="blockly_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {MSG.servo_angle_popup_title}
                            </div>
                        </div>
                        <div className="blockly_popupbody flex">
                            <Menu arrMultiServoToPopup={this.state.outPutDataArr} 
                                callbackParent={this.onSelectMenuChange}
                                _renderMenuli={this._renderMenuli}
                                ref="call_menuItemSelect"/>
                            <div className="popupbody_content">
                                <SwitchComponent 
                                    callbackParent={this.onSwitchchange}
                                    isClose={this.state.isClose}
                                    _renderMenuli={this._renderMenuli}/>
                                <div className="content_topbox flex"></div>
                                <div className={"content_mainbox flex "+(this.state.isClose?"":"box_diabled")}>
                                    <RotateIconComponent direction={this.state.direction} isClose={this.state.isClose}
                                        onDirectionChange={this.onDirectionChange}/>
                                    {_Component}
                                </div>
                            </div>
                        </div>
                        <div className="blockly_popupfooter flex">
                            <div className="btn_cancel flex" onTouchEnd={this.goCancel}>{MSG.project_pop_cancel_btn}</div> 
                            <div className="btn_ok flex" onTouchEnd={this.goSure}>{MSG.project_pop_ok_btn}</div> 
                        </div>
                    </div>
                </div>;
    }
});
module.exports = RotateServoComponent;
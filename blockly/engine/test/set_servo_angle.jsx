var React = require('react');
var ReactDOM = require('react-dom');
var Menu = require('./popupbody_menu.jsx');
var SwitchComponent = require('./switch.jsx');
var MenuSelectComponent = require('./angle_variable_select.jsx');
var AngleComponent = require('./set_angle.jsx');
var VariableComponent = require('./set_variable.jsx');
var CodeLanguage = require('../common/program/program_init');
var $ = require('jquery');
var Immutable = require('immutable');

var ServoAngleComponent = React.createClass({
    getInitialState: function() {
        console.log("arrMultiServoToPopup");
        var temp_variable = Blockly.Variables.allVariables(CodeLanguage.workspace);
        console.log(temp_variable);
        console.log(this.props.arrMultiServoToPopup);
        var _initData = this._initFirstData();
        return {
            curMenuIndex:_initData.curMenuIndex,//当前菜单索引
            isClose:_initData.isClose,//开关
            type:_initData.type,//0:角度，1：变量
            angle:_initData.angle,//角度
            variableArr:temp_variable,//变量值数组
            outPutDataArr:this.props.arrMultiServoToPopup,//传入的数组数据
            callback:this.props.callback //回调函数
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
                type:inputData[0].type,
                angle:inputData[0].angle==""?0:inputData[0].angle
            };
        }
        return initData;
    },
    goCancel:function(e) {
        //清除定时器
        if(window.intervalObject.intervalArray.length>0){
            window.intervalObject.intervalArray.forEach(function(ele) {
                window.clearInterval(ele)
            });
        }
        if(e){
            e.stopPropagation();
        }
        console.log("数据取消保存啦啊啊");
        console.log(this.props.arrMultiServoToPopup);
        this.props.callback(this.props.arrMultiServoToPopup);
        return this.props.onRemove();
    },
    goSure:function(e) {
        //清除定时器
        if(window.intervalObject.intervalArray.length>0){
            window.intervalObject.intervalArray.forEach(function(ele) {
                window.clearInterval(ele)
            });
        }
        if(e){
            e.stopPropagation();
        }
        console.log("终于见到最后输出的数据啦");
        console.log(this.state.outPutDataArr);
        this.props.callback(this.state.outPutDataArr);
        return this.props.onRemove();
    },
    // 角度值发生 变化
    onAngleChange:function(_angle){
        this.setState({
            angle:_angle
        },()=>{
           this._refreshParent(this.state.curMenuIndex);
        });
    },
    // 变量值发生变化
    onVariableChange:function(_variableIndex){
        var variableArr = this.state.variableArr;
        this.setState({
            angle:variableArr[_variableIndex]
        },()=>{
           this._refreshParent(this.state.curMenuIndex);
        });
    },
    // 类型改变
    onChildChanged: function (_type) {
        var _angle = this.state.angle;
        if(this.state.variableArr.length>0){
            _angle = (_type ==0?0:this.state.variableArr[0]);
        }else{//无变量
            if(_type==0){
                _angle = (_angle==""?0:_angle);
            }else if(_type==1){
                _angle = "";
            }
        }
        this.setState({
            type:_type,
            angle:_angle
        },()=>{
           this._refreshParent(this.state.curMenuIndex);
        });
    },
    // 开关状态改变
    onSwitchchange:function(_isClose){
        this.setState({
            isClose:_isClose
        },()=>{
           this._refreshParent(this.state.curMenuIndex);
        }); 
    },
    // 选择的菜单改变
    onSelectMenuChange:function(_index){
        var _angle = this.state.outPutDataArr[_index].angle;
        var _isClose = this.state.outPutDataArr[_index].isClose;
        var _type = this.state.outPutDataArr[_index].type;
        this.setState({
            curMenuIndex:_index,
            isClose:_isClose,
            angle:_angle,
            type:_type
        },()=>{
            console.log(this.state.isClose);
        });
    },
    // 刷新输出数据
    _refreshParent :function(index) {
        var newArray = Immutable.List(this.state.outPutDataArr);
        var _curMenuData = {};
        if (this.state.type == 0) {
            _curMenuData.angle = this.state.angle == '' ? '0' : this.state.angle;
        } else {
            _curMenuData.angle = this.state.angle ;
        }
        _curMenuData.isClose = this.state.isClose;//这个地方以前弄反了
        _curMenuData.type = this.state.type;
        _curMenuData.servoId = this.state.outPutDataArr[index].servoId;
        var obj = newArray.set(index,_curMenuData);
        this.setState({
            outPutDataArr :obj.toJS()
        },()=>{
            console.log("refresh");
            console.log(this.state.outPutDataArr);
        });
    },
    // 创建左边菜单menuli
    _renderMenuli:function(that){
        var items = this.state.outPutDataArr;
        var newArray = [];
        for(var i=0;i<items.length;i++){
            var item=items[i];
            newArray.push(<li key={item.servoId}  className={"menu_list_li flex "+(i==0?"active":"")} 
                                onClick={that._menuItemSelect.bind(null,item)}>
                            <span className="menutext_class flex">
                                <label>{item.servoId}</label></span>
                            <span className="servoangle_span flex">
                                {item.isClose ? item.angle + (item.type==0?'°':'') : MSG.servo_angle_popup_close}
                            </span>
                          </li>);
        }
        return newArray;
    },
    // 根据type 显示组件(0:角度，1：变量)
    _showComponentByType:function(){
        var Button = null;
        var servoId = this.props.arrMultiServoToPopup[this.state.curMenuIndex].servoId;
        if (this.state.type== 0) {
            Button = <AngleComponent switchIsClose={this.state.isClose}  servoId={servoId}
                        onAngleChange={this.onAngleChange} angle={this.state.angle}/>;
        } else {
            Button = <VariableComponent switchIsClose={this.state.isClose} 
                        onVariableChange={this.onVariableChange} variable={this.state.variableArr}/>;
        }
        return Button;
    },
    render: function(){
        var Button = this._showComponentByType();
        return  <div className="blockly_background flex">
                    <div className="blockly_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {MSG.servo_angle_popup_title}
                            </div>
                        </div>
                        <div className="blockly_popupbody flex">
                            <Menu arrMultiServoToPopup={this.state.outPutDataArr} 
                                curMenuIndex={this.state.curMenuIndex}
                                callbackParent={this.onSelectMenuChange}
                                _renderMenuli={this._renderMenuli} />
                            <div className="popupbody_content">
                                <SwitchComponent isClose={this.state.isClose}
                                    callbackParent={this.onSwitchchange}/>
                                <div className="content_topbox flex">
                                    <MenuSelectComponent type={this.state.type}
                                        callbackParent={this.onChildChanged}/>
                                </div>
                                <div className={"content_mainbox flex "+ (this.state.isClose?"":"box_diabled")}>
                                    {Button}
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
module.exports = ServoAngleComponent;

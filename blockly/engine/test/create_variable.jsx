var React = require('react');
var ReactDOM = require('react-dom');
var InputComponent = require('./inputComponent.jsx');
var $ = require('jquery');

var CreateVariableComponent = React.createClass({
    getInitialState: function() {
        return {
            callback:this.props.callback
        };
    },
    goCancel:function(e) {
        if(e){
            e.stopPropagation();
        }
        //舵机全部掉电
       /* var servoArr = blocklyDatas.getServoIds();
        var servoStr = servoArr.join(',');
        var pwerOnCommand = new RobatCommand('servoPowerOn|'+servoStr);
        pwerOnCommand.send();*/
        return this.props.onRemove();
    },
    goSure:function(e) {
        var variableContent = this.refs.getInputValue.outPutValue();
        console.log("当前输入值信息:"+variableContent);
        this.state.callback({name:variableContent});
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    render: function(){
        return   <div className="blockly_background flex">
                    <div className="blockly_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {MSG.posture_named_popup_title}
                            </div>
                        </div>
                        <div  className="blockly_popupbody flex">
                            <InputComponent ref="getInputValue" placeholder={MSG.variable_named_popup_placeholder} inputTips={MSG.variable_inputrule_msg.replace('%1', '12').replace('%2', '6')}></InputComponent>;
                        </div>
                        <div className="blockly_popupfooter flex">
                            <div className="btn_cancel flex" onTouchEnd={this.goCancel}>{MSG.project_pop_cancel_btn}</div>
                            <div className="btn_ok flex" onTouchEnd={this.goSure}>{MSG.project_pop_ok_btn}</div>
                        </div>
                    </div>
                </div>;
    }
});
module.exports = CreateVariableComponent;
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var eventsListener = require('./../common/events_listener');

var SystemPromptComponent = React.createClass({
    getInitialState : function(){
        return {
            tipsContent:"",   //提示信息
            tipsType:""   //提示类型  error--错误信息提示   tips--系统信息提示
        };
    },

    _promptObjCallBack:function(data){
        if(data.tipsContent !=="" && data.tipsContent!==undefined){
             var state = {tipsContent:data.tipsContent,tipsType:data.tipsType};
             this.setState(state);
            $(".systemHintClass")[0].style.display = "block";
            //解绑事件
            window.setTimeout(
                function(){
                    eventsListener.off('systemPrompt');
                    $(".systemHintClass")[0].style.display = "none";
                },1500
            );
        }
        console.log(data);
        console.log(data);
        console.log(data);

    },
    componentDidMount: function() {
        eventsListener.on('systemPrompt',this._promptObjCallBack);
    },
    componentWillUnmount: function() {
        eventsListener.off('systemPrompt');
    },
    render: function(){
        var className = "systemHintClass systemHintClass_tips";
        if(this.state.tipsType === "error"){
            className = "systemHintClass systemHintClass_error";
        }
        return   <div className={className}>{this.state.tipsContent}</div>;
    }
});
module.exports = SystemPromptComponent;
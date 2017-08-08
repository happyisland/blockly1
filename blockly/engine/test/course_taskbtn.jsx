var React = require('react');
var ReactDOM = require('react-dom');
var CourseTaskdesc = require('./course_task.jsx');
var blocklyDatas = require('../service/blockly_datas');
var $ = require('jquery');
var CourseDescBtn = React.createClass({
    getInitialState : function(){
        return {
        };
    },
    componentDidMount: function() {
    },
    renderCourseTask:function(){
        //运行中 按钮不可点击
        if(blocklyDatas.getDataByKey("programRunning")) return;
        var removeCourseTaskComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("course_container"));
            $("#course_container").empty();
        };
        ReactDOM.render(
            React.createElement(
                CourseTaskdesc, 
                {
                    onRemove:  removeCourseTaskComponent
                }
            ),document.getElementById("course_container")
        );
        window.setTimeout(function(){
            console.log("CourseDescBtn 帮助按钮，弹出任务框 收起标题框");
            $("#id_cousetask").addClass("active");
            $("#coursetitle_box").addClass("active");
        },80);
    },
    render: function(){
        return  <div className="coursetask_btn flex" onTouchEnd={this.renderCourseTask}>
                    <img src="images/index/buzhou.png"/>
                </div>;
    }
});
module.exports = CourseDescBtn;
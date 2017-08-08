var React = require('react');
var ReactDOM = require('react-dom');
var TopMenuComponent = require('./guide_menu.jsx');
var GuideMsgComponent = require('./guide_msg.jsx');
var GuideRun = require('./guide_run.jsx');
var $ = require('jquery');
var blocklyDatas = require('./../service/blockly_datas');
var CourseTaskdesc = require('./../test/course_task.jsx');
var GuideComponent = React.createClass({
    getInitialState: function() {
        return null;
    },
    goSkip :function(e){
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    goNext : function(){
        var index = parseInt($(".guide_item.active").attr("data-index"));
        console.log("goNext"+index);
        $(".guide_item[data-index="+index+"]").removeClass("active");
        $(".guide_item[data-index="+(index+1)+"]").addClass('active');
        $(".introduce").hide();
        $(".introduce[data-index="+(index+1)+"]").show();
        if(window.angular === undefined){  //课程指引
            if(index>=1){
                $(".guide_item[data-index=0]").addClass('active');
                this.goSkip();
                this.renderCourseTask();
            }
        }else{   //blockly指引
            if(index>3){
                $(".guide_item[data-index=0]").addClass('active');
                this.goSkip();
            }
        }
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
            console.log("CourseDescBtn");
            $("#id_cousetask").toggleClass("active");
            $("#coursetitle_box").addClass("active");
        },80);
    },
    render: function(){
        console.log("guide log");
        if(window.angular === undefined){  //课程指引
            return  <div id="blockly_guidediv" className="blockly_guide"  onTouchEnd={this.goNext}>
                        <TopMenuComponent></TopMenuComponent>
                    </div>;
        }else{   //blockly指引
            return  <div id="blockly_guidediv" className="blockly_guide" onTouchEnd={this.goNext}>
                        <TopMenuComponent></TopMenuComponent>
                        <GuideMsgComponent></GuideMsgComponent>
                        <GuideRun></GuideRun>
                        <div className="ok_btn">
                            <span className="ok_span">OK</span>
                        </div>
                        <div className="skip_help" style={{'display': 'block'}}  onTouchEnd={this.goSkip}>
                            <span className="skip_btn">{MSG.go_skip}</span>
                        </div>
                    </div>;
        }

    }
});
module.exports = GuideComponent;
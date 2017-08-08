var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var CourseData = require('./../service/course_data.js');
var blocklyDatas = require('../service/blockly_datas');
var CourseTitle = React.createClass({
    getInitialState : function(){
        var course_index = CourseData.getCourseIndex();
        var data = CourseData.getCourseDataByIndex(course_index)
        return {
            courseTitle: data.courseTitle,
            videoSrc : data.videoSrc
        };
    },
    componentDidMount: function() {
    },
    _createVideo:function(e){
        //运行中 按钮不可点击
        if(blocklyDatas.getDataByKey("programRunning")) return;
        e.stopPropagation();
        var videoJsOptions = {
            autoplay: false,
            controls: true,
            loop: true,
            preload : 'auto',
            sources: [{
                src: this.state.videoSrc,
                type: 'video/mp4'
            }]
        };
        var BlockVideoPlayer = require('./block_video_player.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("guide_course"));
            $("#guide_course").empty();
        };
        ReactDOM.render(
         React.createElement(
             BlockVideoPlayer, 
             {   
                onRemove:  removeComponent,
                videoJsOptions:videoJsOptions,
                isVideoBtn :true

             }
         ), document.getElementById("guide_course")
        );
    },
    _hideTitle:function(e){
        //运行中 按钮不可点击
        if(blocklyDatas.getDataByKey("programRunning")) return;
        var that = e.currentTarget;
        $(".coursetitle_box").toggleClass("active");
    },
    render: function(){
        return  <div id="coursetitle_box" className="coursetitle_box flex">
                    <span className="title_text">{this.state.courseTitle}</span>
                    <div className="videoicon_box flex" onClick={this._createVideo}>
                        <img src="images\/index\/video.png"/>
                    </div>
                </div>;
    }
});
module.exports = CourseTitle;
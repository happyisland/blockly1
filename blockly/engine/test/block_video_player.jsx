var React = require('react');
var ReactDOM = require('react-dom');
var Promise = require("bluebird");
var videojs  = require('video.js');
var video = require('react-html5video');
var $ = require('jquery');
var utils = require('../common/utils/utils');
var blocklyDatas = require('./../service/blockly_datas');
var CourseTaskdesc = require('./course_task.jsx');
var BlockVideoPlayer = React.createClass({
    getDefaultProps: function() {
    },
    getInitialState: function() {
        console.log("====>"+this.props.isVideoBtn);
        return {
            videoJsOptions : this.props.videoJsOptions,
            isVideoBtn:this.props.isVideoBtn
        };
    },
    componentDidMount : function() {
        $('.rh5v-Fullscreen_button').on('click',function(e) {
            var screenComponent = $('.rh5v-DefaultPlayer_component');
            var screenClassName = screenComponent[0].className;
            if (screenClassName.indexOf('full_screen') > -1) {
                screenComponent[0].className = 'rh5v-DefaultPlayer_component';
            } else {
                screenComponent[0].className = 'rh5v-DefaultPlayer_component full_screen';
            }
        });
        setTimeout(function() {
            $(".video_container>div").css("transform","inherit");
            $(".video_container>div").css("-webkit-transform","inherit");
            $(".video_container>div").css("-moz-transform","inherit");
            $(".video_container>div").css("-o-transform","inherit");
        },10);

    },
    _sendCommand : function(datas) {
        return new Promise(function(resolve, reject){
            setTimeout(function() {
                console.log(8888);
                resolve(datas);
            },2000);
        });
    },
    // destroy player on unmount
    componentWillUnmount : function() {
        console.log('destroy all component');
        if (this.player) {
            this.player.dispose()
        }
    }, 
    _closeVideobox:function(param,e){
        var that = this;
        var platformType = blocklyDatas.getDataByKey("platformType");
        if ('video_container' != e.target.className) {
            return;
        }
        if(e){
            e.stopPropagation();
        }
        $(".video_container>div").css("transform","scale3d(0.02,0.02,0.02)");
        $(".video_container>div").css("-webkit-transform","scale3d(0.02,0.02,0.02)");
        $(".video_container>div").css("-moz-transform","scale3d(0.02,0.02,0.02)");
        $(".video_container>div").css("-o-transform","scale3d(0.02,0.02,0.02)");

        setTimeout(function() {
            that.props.onRemove();
            console.log("isFirst come into =============>"+blocklyDatas.datas.isFirst);
            console.log("blockly platformType ================>"+platformType);
            console.log("--courseId:"+window.courseData.courseId+"--platformType:"+platformType+"--isFirst:"+blocklyDatas.datas.isFirst);
            // 首先是课程 其次是第二课，再次是第一次进入第二课 才会有指引出来
            if(platformType == 3 && window.courseData.courseId==2 && blocklyDatas.datas.isFirst ==1 ){
                if(window.kaiguan){//click 点击一次就失效。。
                    that._rendercourseIndexShow();
                    window.kaiguan = 0;
                }
            }else{
                console.log("-------------->"+param);
                if(that.state.isVideoBtn){
                    return;
                }else{
                    that.renderCourseTask();
                }
            }
        },500);
    },
    _rendercourseIndexShow:function(){
        //指引  begin
        var GuideComponent = require('./../index/index_guide.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("guide_course"));
            $("#guide_course").empty();
        };
        ReactDOM.render(
            React.createElement(
                GuideComponent,
                {   
                    onRemove:  removeComponent
                }
            ), document.getElementById("guide_course")
        );
        //指引  end
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
    canPlay : function(e) {
        console.log(e);
    },
    render : function() {
        var Video =  video.DefaultPlayer;
        this.src = 'http:// 7xl1fl.com5.z0.glb.clouddn.com/jimu/video/170118160330246416.mp4';
        this.src = 'http://10.10.1.14:8081/blocklyvideo/5.mp4';
        var courseData = require('../service/course_data');
        var videoSrc = courseData.getCourseData().videoSrc;
        var languageCode = blocklyDatas.getDataByKey('languageCode');
        var videoBgImg = 'images/video/video_bg_'+languageCode+'.png';
        // var videoVtt = courseData.getCourseData().videoVtt;
        this.src = videoSrc;
        //this.src = 'http://jimu.ubtrobot.com/blocklyvideo/1.mp4'; 
        //字幕 <track label="English" kind="subtitles" srcLang="en" src={videoVtt} default />
        return  <div className="video_container" onClick={this._closeVideobox.bind(this,'000')}>
                    <Video controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                           poster={videoBgImg} ref="video" onCanPlayThrough={this.canPlay} autoPlay>
                        <source src={this.src} type="video/mp4" />
                       
                    </Video>
                </div>;
    }
});

module.exports = BlockVideoPlayer;
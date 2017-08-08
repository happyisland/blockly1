var React = require('react');
var ReactDOM = require('react-dom');

var TopMenuComponent = React.createClass({
    getDefaultProps: function() {
        return {
            index_baseurl: "images/help/introduce/",
            index:  [
                        {id:"id_save",imgicon:"save_img.png",arrorimg:"arror2x.png",imgsrc:"save.png",desctext:""},
                        {id:"id_project",imgicon:"project_img.png",arrorimg:"arror2x.png",imgsrc:"project.png",desctext:""},
                        {id:"id_swift",imgicon:"swift_img.png",arrorimg:"arror2x.png",imgsrc:"swift.png",desctext:""},
                        {id:"id_help",imgicon:"help_img.png",arrorimg:"arror2x.png",imgsrc:"help.png",desctext:""}
                    ],
            course_baseurl: "images/help/course/",
            course: [
                        {id:"id_video",imgicon:"video.png",arrorimg:"arror.png",desctext:MSG.video_desc},
                        {id:"id_help",imgicon:"help.png",arrorimg:"arror.png",desctext:MSG.help_desc}
                    ]
         };
    },
    getInitialState: function() {
        return null;
    },
    componentDidMount: function() {
    },
    _renderGuideIndex:function() {
        var _index =this.props.index;
        var guideArr = [];
        var _len = _index.length;
        for(var i = 0;i<_len;i++){
            var item = _index[i];
            var _arrowrimg = this.props.index_baseurl+item.arrorimg;
            var _imgIcon = this.props.index_baseurl+item.imgicon;
            var _imgsrc = this.props.index_baseurl+item.imgsrc;
            var _class = item.imgsrc.substring(0,item.imgsrc.indexOf("."));
            if(i==3){
                guideArr.push(<div key={"coltxt"+i} className="col"><div></div></div>);
            }
            guideArr.push(<div key={"introduce"+i} className={"guide_item col "+(i==0?"active":"")} id={item.id} data-index={i}>
                                <img src={_imgIcon}/>
                                <div>
                                    <img src={_arrowrimg} className="arror_img"/>
                                    <img src={_imgsrc} className={"introduce_img "+_class+"_img"}/>
                                    <span  className="desc_text">{item.desctext}</span>
                                </div>
                            </div>);
            
        }
        return guideArr;
    },
    _renderCourseGuideIndex:function(){ 
        var _course =this.props.course;
        var guideArr = [];
        var _len = _course.length;
        for(var i = 0;i<_len;i++) {
            var item = _course[i];
             var _arrowrimg = this.props.course_baseurl+item.arrorimg;
            var _imgIcon = this.props.course_baseurl+item.imgicon;
            var _class = item.imgicon.substring(0,item.imgicon.indexOf("."));
            guideArr.push(<div key={"course"+i} className={"guide_item course_zIndex "+(i==0?"active":"")} data-index={i}>
                            <span className={"span_"+_class + (_class=="help"?"":" flex")}><img src={_imgIcon} /></span>
                            <img src={_arrowrimg} className={_class+"arror_img"}/>
                            <span  className={_class+"_desc_text"}>{item.desctext}</span>
                        </div>);
        }
        return guideArr;
    },
    render: function(){
        if(window.angular === undefined){//课程
            var _guideIndex = this._renderCourseGuideIndex();
            return  <div>{_guideIndex}</div>;
                    
        }else {//普通版
            var _guideIndex = this._renderGuideIndex();
            return  <div className="index_top_right_btn">
                        <div className="row flex">
                            {_guideIndex}
                        </div>
                    </div>;
        }
    }
});
module.exports = TopMenuComponent;

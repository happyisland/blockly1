var React = require('react');
var SensorConditionSwiftCode = require('./../common/condition/sensor_condition_swift_code');
var blocklyDatas = require('./../service/blockly_datas');
var $ = require('jquery');
var SliderComponent =  React.createClass({
    getInitialState : function(){
        return {
            current: 2,//当前下标，和left定位有直接关系
            left: 0,
            direction: 0, //-1表示向左滑动，0表示不滑动，1表示向右滑动
            startX: 0,
            endX: 0,
            dataArray:this.props.dataArray//swift code 代码数值
        }
    },
    componentDidMount: function() {
        console.log(this.state.dataArray);
    },
    touchstart:function(e){
        this.setState({
            startX: e.changedTouches[0].pageX
        });
    },
    touchend:function(e){
        var platformType = blocklyDatas.getDataByKey("platformType");
        var dataArray = this.state.dataArray;
        this.setState({
            endX: e.changedTouches[0].pageX
        });
        var endX = e.changedTouches[0].pageX;
        var startX = this.state.startX;
        var current = $(".slide_banner ul li.active").attr("data-index");
        var param = endX-startX ;
        if(Math.abs(param) < 60){//x 移动偏差60以内 
            console.log("no move");
        }else{
            if(endX-startX>60){
                console.log("right");
                current--;
                if(current<0){
                    if(platformType == 3){//是课程的时候禁止循环滑动
                        return ;
                    }else{
                        current =dataArray.length-1;
                    }
                }
            }
            if(endX-startX<-60){
                console.log("left");
                current++;
                if(current>dataArray.length-1){
                    if(platformType == 3){//是课程的时候禁止循环滑动
                        return ;
                    }else{
                        current =0;
                    }
                }
            }
            $(".slide_banner ul li, .slide_bottom ol li").removeClass('active');
            $('.slide_banner ul li[data-index='+ current +'], .slide_bottom ol li[data-index='+ current +']').addClass('active');
        }
    },
    render: function() {
        var liArr = this.props.renderContentLi(this.state.dataArray);
        var olArr = this.props.renderOlIndex(this.state.dataArray);
        var bgImg = this.props.bgImg;
        if(bgImg!=undefined){
            var _style ={
                        background:'url('+bgImg+')  0% 0% / cover no-repeat'
                    };
        }else{
            var _style ={
                        background:'#fff'
                    };
        }
        return <div className="code_content slide_content" style={_style}>
                    <div className="slide_banner " onTouchStart={this.touchstart} onTouchEnd={this.touchend} >
                        <ul className="course_task_page">
                            {liArr}
                        </ul>
                    </div>
                    <div className="slide_bottom">
                        <ol>
                            {olArr} 
                        </ol>
                    </div>
                </div>;
    }
});

module.exports = SliderComponent;
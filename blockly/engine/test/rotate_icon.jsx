var React = require('react');
var ReactDOM = require('react-dom');
var eventsListener = require('../common/events_listener');
var $ = require('jquery');

var RotateIconComponent = React.createClass({
    getInitialState: function() {
        return {
            direction:this.props.direction
        };
    },
    componentDidMount: function() {
    },
    // 改变方向
    changeRotate:function(_direction,e) {
        console.log(_direction);
        if(this.props.isClose ==false) return;
        var that = e.currentTarget;
        $(that).siblings().removeClass('active');
        $(that).addClass('active');
        if(_direction == 's'){//stop
            $("#rotateSpeed_box").hide();
        }else{
            $("#rotateSpeed_box").show();
        }
        this.setState({
            direction:_direction
        });
        this.props.onDirectionChange(_direction);
    },
    render: function(){
        return  <div className="rotateIcon_box">
                    <div className={"rotate flex rotate_left "+(this.props.direction=="+"?"active":"")} onClick={this.changeRotate.bind(this,"+")}>
                        <i className="fa fa-rotate-right"></i>
                        <span className="text_desc">{MSG.rotate_servo_popup_clockwise}</span>
                    </div>
                    <div className={"rotate flex rotate_stop "+(this.props.direction=="s"?"active":"")} onClick={this.changeRotate.bind(this,"s")}>
                        <i className="fa fa-stop"></i>
                        <span className="text_desc">{MSG.rotate_servo_popup_stop}</span>
                    </div>
                    <div className={"rotate flex rotate_right "+(this.props.direction=="-"?"active":"")} onClick={this.changeRotate.bind(this,"-")}>
                        <i className="fa fa-rotate-left"></i>
                        <span className="text_desc">{MSG.rotate_servo_popup_anti_clockwise}</span>
                    </div>
                </div>;
    }
});
module.exports = RotateIconComponent;






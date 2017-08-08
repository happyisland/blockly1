var React = require('react');
var ReactDOM = require('react-dom');
var eventsListener = require('../common/events_listener');
var $ = require('jquery');

var RotateSpeedComponent = React.createClass({
    getDefaultProps: function() {
         return {
            speedList:["vs","s","m","f","vf"]
         };
    },
    getInitialState: function() {
         return {
            speed:this.props.speed,
            isClose:this.props.isClose
         };
    },
    componentDidMount: function() {

    },
    // 速度改变
    changeSpeed:function(_speed,e) {
        _speed = _speed.toLowerCase();
        if(this.props.isClose ==false) return;
        var that = e.currentTarget;
        $(that).siblings().removeClass('active');
        $(that).addClass('active');
        this.setState({
            speed:_speed
        });
        this.props.onSpeedChange(_speed);
    },
    _renderSpeedDiv:function(){
        var items = this.props.speedList;
        var newArray = [];
        for(var i=0;i<items.length;i++){
            var item=items[i];
            var speed = this.props.speed;
            var _isActive = item.toUpperCase() == speed.toUpperCase()?"active":"";
            newArray.push( <div key={i} className={"speed_type flex " +_isActive} onClick={this.changeSpeed.bind(this,item)} >
                                <span>{item}</span>
                            </div>);
        }
        return newArray;
    },
    render: function(){
        var newArray = this._renderSpeedDiv();
        var _speed = "speed_"+this.props.speed.toUpperCase();
        var msg_speed = MSG[_speed];
        return  <div className="rotateSpeed_box flex" id="rotateSpeed_box">
                    <div className="rotateSpeed_menu flex">
                        {newArray}
                    </div>
                    <div className="speed_desc flex">
                        <span>{MSG.speed}:{msg_speed}</span>
                    </div>
                </div>
                ;
    }
});
module.exports = RotateSpeedComponent;






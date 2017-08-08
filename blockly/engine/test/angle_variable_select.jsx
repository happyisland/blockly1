var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var MenuSelectComponent = React.createClass({
    getInitialState: function() {
        return null;
    },
    goAngle:function(e) {
        if(e){
            e.stopPropagation();
        }
        var type = $("#id_angle").attr("data-val");
        $("#id_angle").siblings().removeClass("active");
        $("#id_angle").addClass("active");
        this.props.callbackParent(type);
    },
    goVariable:function(e) {
        if(e){
            e.stopPropagation();
        }
        var type = $("#id_variable").attr("data-val");
        $("#id_variable").siblings().removeClass("active");
        $("#id_variable").addClass("active");
        this.props.callbackParent(type);
    },
    render: function(){
        return  <div className="menu_select flex">
                    <div id="id_angle" className={"menu_angle flex "+(this.props.type==0?"active":"")} data-val="0" onTouchEnd={this.goAngle}>
                        {MSG.servo_angle_popup_angle}
                    </div>
                    <div id="id_variable" className={"menu_variable flex "+(this.props.type==1?"active":"")} data-val="1" onTouchEnd={this.goVariable}>
                        {MSG.servo_angle_popup_variable}
                    </div>
                </div>;
    }
});
module.exports = MenuSelectComponent;
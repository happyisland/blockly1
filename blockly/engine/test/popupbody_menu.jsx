var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var eventsListener = require('../common/events_listener');
var MenuComponent = React.createClass({
    getInitialState: function() {
        console.log("meun菜单");
        console.log(this.props.arrMultiServoToPopup);
        return {
           curMenuIndex :this.props.curMenuIndex          
        };
    },
    componentDidMount: function() {

    },
    _menuItemSelect:function(item,e){
        console.log(item);
        var that = e.currentTarget;
        console.log($(that).index());
        $(that).siblings().removeClass("active");
        $(that).addClass("active");
        this.setState({
            curMenuIndex:$(that).index()
        },()=>{
            this.props.callbackParent($(that).index());
        });
        var isClose = item.isClose;
        eventsListener.trigger('switchChange',isClose);
    },
    
    render: function(){
        var that = this;
        var newArray = this.props._renderMenuli(that);
        return  <div className="popupbody_menu">
                    <ul className="menu_list" id="menu_list">
                        {newArray}
                    </ul>
                </div>;
    }
});
module.exports = MenuComponent;
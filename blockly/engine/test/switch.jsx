var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var eventsListener = require('../common/events_listener');

var SwitchComponent = React.createClass({
    getInitialState: function() {
        return {isClose:this.props.isClose || false};
    },
    switchChange:function(e){
    	e.stopPropagation(); 
        var _isClose = !this.props.isClose;
        this.props.callbackParent(_isClose);
        //this.setState({isClose:_isClose});
        eventsListener.trigger('switchChange',_isClose);
    },

     componentDidMount: function() {
         eventsListener.on('switchChange', this._switchChange);
     },

     componentWillUnmount: function()  {
         eventsListener.off('switchChange');
     },

     _switchChange : function(data) {
         if (this.isMounted()) {
             this.setState({isClose:data});
         }    
     },
    render: function(){
        console.log("switch jsx"+this.props.isClose);
        return  <div className="switch_box flex" onClick={this.switchChange}>
	                <i className={"fa fa-toggle-"+ (this.state.isClose?"on":"off") +" switch_icon"}></i>
	            </div>;
    }
});
module.exports = SwitchComponent;
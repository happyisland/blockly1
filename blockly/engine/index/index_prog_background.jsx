var React = require('react');
var ReactDOM = require('react-dom');
var eventsListener = require('../common/events_listener');

module.exports = React.createClass({
  backgroundTouched: function(e) {
    e.stopPropagation();
    //return this.props.onBackgroundTouched();
	  //这里调用子组件的方法
  },
  
  componentDidMount: function() {
      eventsListener.on('closeBackGround',this.closeBackGround);
  },

  componentWillUnmount: function() {
      eventsListener.off('closeBackGround');     
  },

  closeBackGround :function() {
      ReactDOM.unmountComponentAtNode(document.getElementById("popupWindow"));
  },


  render: function() {
    return React.createElement("div", {
      "id": "BlocklyInputContainer",
      "className": "modalBackground",
      "onTouchEnd": this.backgroundTouched
    });
  }
});
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var eventsListener = require('./../common/events_listener'); 
var TplText = React.createClass({
    getInitialState : function(){
        return {
            btn:this.props.btn,
            replaceBtn : this.props.replaceBtn
        };
    },
    componentDidMount: function() {
    },

    clickBtn :function(e) {
        var btnlist = this.state.btn;
        var newBtnList = '';
        if (btnlist[0] == this.props.btn[0]) {
            newBtnList = this.props.replaceBtn;
        } else {
            newBtnList = this.props.btn;
        }
        eventsListener.trigger('changeImg');
        this.setState({btn:newBtnList});
        return e.stopPropagation();
    },
    _renderbtn:function(){
        var btnlist = this.state.btn;
        var btnArr = [];
        for(var i=0;i<btnlist.length;i++){
            var item = btnlist[i];
            btnArr.push(<div key={i} className="flex tpl_btn" onTouchEnd={this.clickBtn}><span>{item}</span></div>);
        }
        return btnArr;
    },
    render: function(){
        var btnArr = this._renderbtn();
        return  <div className="tpl_btn_box flex">
                   {btnArr}
                </div>;
    }
});
module.exports = TplText;
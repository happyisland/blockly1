var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var TplTitle = React.createClass({
    getInitialState : function(){
        return {
            title:this.props.title
        };
    },
    componentDidMount: function() {

    },
    render: function(){
        return  <div className="flex tpl_title_box">
                    <div className="tpl_title">{this.state.title}</div>
                </div>;
    }
});
module.exports = TplTitle;
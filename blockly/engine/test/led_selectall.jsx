var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var LEDSelectAll = React.createClass({
    getInitialState: function() {
        return {
            islightLock:this.props.islightLock
        };
    },
    componentDidMount: function() {
    },
    changeLock:function(e) {
        var islightLock = this.state.islightLock;
        this.setState({
            islightLock:!islightLock
        },()=>{
            this.props.ChangeSelctAll(this.state.islightLock);
        });
    },
    render: function(){
        var iconClass = this.state.islightLock?"fa fa-check-square":"fa fa-square-o";
        return  <div className="led_activebox flex" onClick={this.changeLock}>
                    <i className={iconClass}></i>
                    <span>{MSG.select_all}</span>
                </div>;
    }
});
module.exports = LEDSelectAll;






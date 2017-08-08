var React = require('react');
var ReactDOM = require('react-dom');
var LEDSelectAll = require('./led_selectall.jsx');
var $ = require('jquery');
var LEDMenu = React.createClass({
    getDefaultProps: function() {
        return {
        };
    },
    getInitialState: function() {
         return {
            islightLock : this.props.islightLock,
            curselMenu: 0
         };
    },
    componentDidMount: function() {
        console.log("ledmenu----------popupData");
        console.log(this.props.popupData);
    },
    _clickSelMenu:function(i,e){
        if(this.state.islightLock) return;
        var that = e.currentTarget;
        this.setState({
            curselMenu : i
        },()=>{
            this.props.onSelectMenuChange(this.state.curselMenu);
        });
    },
    _selctAllstateChange:function(_islightLock){
        this.setState({
            islightLock:_islightLock,
            curselMenu:0
        },()=>{
            this.props.UpdateislightLock(this.state.islightLock);
        });
    },
    render: function(){
        var that = this;
        var newArray = this.props._renderComponentLiByType(that);
        console.log(newArray);
        return  <div className="popupbody_menu">
                    <LEDSelectAll islightLock={this.state.islightLock} 
                       ChangeSelctAll={this._selctAllstateChange}></LEDSelectAll>
                    <ul className="menu_list" id="menu_list">
                       {newArray}
                    </ul>
                </div>;
    }
});
module.exports = LEDMenu;






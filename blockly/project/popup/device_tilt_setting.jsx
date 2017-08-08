var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var DeviceTiltSetting = React.createClass({
    // initialize the sensor list and status list for the component
    getDefaultProps : function () {
        return {
            buttons : [{id:'left',name:MSG["tilt_left"]}, {id:'right',name:MSG["tilt_right"]}, {id:'up',name:MSG["tilt_up"]}, {id:'down',name:MSG["tilt_down"]},{id:'swing',name:MSG["tilt_swing"]}]
        };
    },
    // init the sensor ID and status
    getInitialState : function(){
        return {
            tiltType : this.props.tiltType
        }
    },

    saveDialog : function(){
        var tiltType = this.state.tiltType;
        // call back the function to pass the result to the parent component.
        if (this.props.closeHandler) {
            this.props.closeHandler(tiltType);
        }
        this.closeDialog();
    },

    closeDialog : function(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupWindow"));
    },

    /**
     * change the selected sensor ID
     * @param sID    selected sensor ID
     */
    changeTiltType:function(tiltType){
        this.setState({tiltType : tiltType});
    },

    componentDidMount : function() {
        $("#popupWindow").css({ display:"block",height:"100%", width:"100%", zIndex:10, backgroundColor: '#8A8A8A', opacity:0.9});
    },

    componentWillUnmount : function() {
        $('#popupWindow').empty();
        $("#popupWindow").hide();
    },

    render : function(){
        var _this = this;
        return (<div id="device_tilt" >
            <div id="title">{MSG["title_device_tilt"]}</div>
            <div id="body">
                <div id="right" className="fl">
                    {
                        this.props.buttons.map(function(ele){
                            var isSelected = (ele.name == _this.state.tiltType) ? "icon-selected" : "icon-blank";
                            return <div key={"key-"+ele.id} className="option" onClick={_this.changeTiltType.bind(_this, ele.name)}><span className={isSelected}></span><a className="st-name">{ele.name}</a></div>
                        })
                    }
                </div>
            </div>
            <div id="buttons">
                <div className="btn" onClick={this.closeDialog}>{MSG["btn_name_cancel"]}</div>
                <div className="btn" onClick={this.saveDialog}>{MSG["btn_name_confirm"]}</div>
            </div>
        </div>)
    }
});

module.exports = DeviceTiltSetting;
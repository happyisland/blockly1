var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var TouchSensorSetting = React.createClass({
    // initialize the sensor list and status list for the component
    getDefaultProps : function () {
        return {
            sensorList : [{id:'1',name:'ID-01'}, {id:'2',name:'ID-02'}, {id:'3',name:'ID-03'}, {id:'4',name:'ID-04'}, {id:'5',name:'ID-05'}, {id:'6',name:'ID-06'}],
            buttons : [{id:'clk',name:MSG["click"]}, {id:'dbclk',name:MSG["db_click"]}, {id:'lprs',name:MSG["press_hold"]}]
        };
    },
    // init the sensor ID and status
    getInitialState : function(){
        return {
            sensorID : this.props.sensorID,
            sensorStatus : this.props.sensorStatus
        }
    },

    saveDialog : function(){
        var sid = this.state.sensorID;
        var status = this.state.sensorStatus;
        if(status == "") {
            status = MSG["btn_release"];
        }
        // call back the function to pass the result to the parent component.
        if (this.props.closeHandler) {
            this.props.closeHandler(sid, status);
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
    changeTounchSensor:function(sID){
        this.setState({sensorID : sID});
    },

    /**
     * change the selected sensor status
     * @param type      status type
     */
    changeStatus:function(type){
        if(type == this.state.sensorStatus) {
            type = "";
        }
        this.setState({sensorStatus : type});
    },

    componentDidMount : function() {
        $("#popupWindow").css({ display:"block",height:"100%", width:"100%", zIndex:10, backgroundColor: '#8A8A8A', opacity:0.9});
    },

    componentWillUnmount : function() {
        $('#popupWindow').empty();
        $("#popupWindow").hide();
    },

    /**
     * check the status in list or not
     * @param sta   status
     * @returns {boolean}
     */
    getPressedStatus : function(sta) {
        for(var i = 0; i < this.props.buttons.length; i++ ){
            if(sta == this.props.buttons[i].name){
                return true;
            }
        }
        return false;
    },

    render : function(){
        var _this = this;
        return (<div id="touchSensorDialog" >
            <div id="dHead">{MSG["title_touch_sensor"]}</div>
            <div id="dBody">
                <div id="left" className="fl" ref='list'>
                    {
                        this.props.sensorList.map(function(ele){
                            var isSelected = (ele.name == _this.state.sensorID) ? "selected" : "";
                            var selItem = ele.name;
                            if(ele.name == _this.state.sensorID && _this.getPressedStatus(_this.state.sensorStatus)){
                                selItem = ele.name + ":"+_this.state.sensorStatus;
                            }
                            return <span key={"key-"+ele.id} className={isSelected} onClick={_this.changeTounchSensor.bind(_this, ele.name)}>{selItem}</span>
                        })
                    }
                </div>
                <div id="right" className="fl">
                    {
                        this.props.buttons.map(function(ele){
                            var isSelected = (ele.name == _this.state.sensorStatus) ? "icon-selected" : "icon-blank";
                            return <div key={"key-"+ele.id} className="option" onClick={_this.changeStatus.bind(_this, ele.name)}><span className={isSelected}></span><a className="st-name">{ele.name}</a></div>
                        })
                    }
                </div>
            </div>
            <div id="dFoot">
                <a id="cancel_btn" className="btn" onClick={this.closeDialog}  >{MSG["btn_name_cancel"]}</a>
                <a id="ok_btn" className="btn" style={{}} onClick={this.saveDialog}>{MSG["btn_name_confirm"]}</a>
            </div>
        </div>)
    }
});

module.exports = TouchSensorSetting;
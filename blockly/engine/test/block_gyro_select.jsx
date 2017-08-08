var BlockInputBottom = require('./block_input_bottom.jsx');
var BlockInputTitleBar1 = require('./block_input_titlebar.jsx');
var React = require('react');
var $ = require('jquery');
var BlockContentSelect = require('./block_content_select.jsx');
var eventsListener = require('./../common/events_listener');
var dataService = require('../service/data_service');
var BlockGyroSelect = React.createClass({
    getDefaultProps : function (){
        return {
            gyroStatus : 'x_axis',
            gyro_status:[{'src':'images/popup/gyro/HXJ.png', value:'z_axie', 'text':MSG['z_axie']},
                            {'src':'images/popup/gyro/FYJ.png' , value:'x_axie','text':MSG['x_axie']},
                            {'src':'images/popup/gyro/HGJ.png' , value:'y_axie','text':MSG['y_axie']}
                         ],
            connectStatus : MSG['disconnected'],
            statusImg : 'images/popup/gyro/gyro_lost.png'
        };
    },
    getInitialState: function() {
        this._sendCommand();
        return { 
            status : this.props.gyroData.direction || 'x_axis',
            acturalValue : this.props.connectStatus,
            statusImg : this.props.statusImg
        };
    },
    _sendCommand :function() {
        var sensorId = this.props.gyroData.gyroId;
        var gyroSensorObj = {};
        gyroSensorObj.id = sensorId;
        gyroSensorObj.sensorType = 'Gyro';
        gyroSensorObj.duration = '300';
        gyroSensorObj.times = 4;
        gyroSensorObj.controlType = '02';
        dataService.command('gyroShow', gyroSensorObj);
        if (!this.props.acturalValue) {
            dataService.command("read_device",null);
        }
    },
    _refreshGyro :function (data) {
        if(data != ""){
            var resultJson = JSON.parse(decodeURI(data));
            var gyroData =  resultJson['Gyro'];
            if(gyroData.length>0){
                var temp_gyro = '';
                var objState = {};
                if(this.props.gyroData.gyroId == undefined){
                    temp_gyro = gyroData[0];
                }else{
                    for(var i=0;i<gyroData.length;i++){
                        var temp_data = gyroData[i];
                        if(temp_data.id == this.props.gyroData.gyroId){
                            temp_gyro =  gyroData[i];
                            break;
                        }
                    }
                }
                if (temp_gyro !='') {
                    objState.acturalValue = this._axieValue(temp_gyro);
                    objState.statusImg = 'images/popup/link/tuoluoyi.png';
                    if (this.isMounted()) {
                        this.setState(objState);
                    }         
                }
            }
        }
    },
    componentDidMount: function() {
        eventsListener.on('refreshGyro',this._refreshGyro);        
    },

    componentWillUnmount: function() {
        eventsListener.off('refreshGyro'); 
    },
    onContinue: function() {
        dataService.command("stop_device",null);
        return this.props.onSuccess();
    },
    stopProgation :function(e) {
        return e.stopPropagation();
    },
    selectStatus : function(item ,e) {
        var that = e.currentTarget;
        $(that).siblings().removeClass('active');
        $(that).addClass('active');
        var status= item.value;
        var obj = {status : status};
        this.setState(obj);
    },
    saveGyro :function() {
        var status = this.state.status;
        this.props.callback({direction:status});
        dataService.command("stop_device",null);
    },
    _axieValue:function(temp_gyro){
        if (temp_gyro !='') {
            return <span>
                 {MSG["current_value"]}:<label>{MSG['x_axie']}:{temp_gyro.x}</label><label style={{display:"block",textAlign:"right"}}>{MSG['y_axie']}:{temp_gyro.y}</label><label style={{display:"block",textAlign:"right"}}>{MSG['z_axie']}:{temp_gyro.z}</label>
              </span>
        }else{
            return "";
        }
    },
    render :function() {
        var status = this.props.gyroData.direction;
        var itemClass = 'item3 flex';
        var imgClass = 'picture gyro_pic';
        var textClass = 'text phone_text flex';
        var datas = this.props.gyro_status;
        var acturalValue = this.state.acturalValue;
        var statusImg = this.state.statusImg;
        if (this.state === null) {
            return <div></div>;
        } else {
            return <div className="blockly_background flex" onTouchEnd={this.onContinue} >
                <div className="blockly_popup" onTouchEnd={this.stopProgation} >
                    <BlockInputTitleBar1 showInfo={MSG['gyro_rotate_direction_popup_title']}/>
                    <div className="blockly_popupbody flex">
                        <BlockContentSelect status={status} itemClass={itemClass}
                                    imgClass={imgClass} textClass={textClass} 
                                    selectStatus={this.selectStatus} datas={datas} >
                        </BlockContentSelect>
                        <div className="gyro_status flex">
                            <img src={statusImg}></img>
                            <span>{acturalValue}</span>
                        </div>
                    </div>
                    <BlockInputBottom type="common_button" onBackgroundTouched={this.onContinue} saveTime={this.saveGyro}/>
                </div>
            </div>;
        }
    }
});

module.exports = BlockGyroSelect;
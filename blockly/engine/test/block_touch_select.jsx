var BlockInputBottom = require('./block_input_bottom.jsx');
var BlockInputTitleBar1 = require('./block_input_titlebar.jsx');
var React = require('react');
var $ = require('jquery');
var BlockContentSelect = require('./block_content_select.jsx');
var dataService = require('../service/data_service');
var BlockTouchSelect = React.createClass({

    getDefaultProps : function (){
        return {
            touchStatus : '1',
            touch_status:[{'src':'images/popup/event/event_click.png', value:'1', 'text':MSG['click']},
                            {'src':'images/popup/event/event_db_click.png' , value:'2','text':MSG['db_click']},
                            {'src':'images/popup/event/event_press_hold.png' , value:'3','text':MSG['press_hold']}
                         ]  
        };
    },
    getInitialState: function() {
        //在窗口弹出的时候，发送指定的命令让触碰传感器的灯光亮起来  
        this._sendCommand();
        return { 
            status : this.props.touchStatus || '1'
        };
    },
    componentDidMount: function() {
        var status = this.props.status;
          
    },

    _sendCommand :function() {
        var sensorId = this.props.data.sensorId;
        var touchSensorObj = {};
        touchSensorObj.id = sensorId;
        touchSensorObj.sensorType = 'Touch';
        touchSensorObj.duration = '300';
        touchSensorObj.times = 4;
        touchSensorObj.controlType = '02';
        dataService.command('touchShow', touchSensorObj);
    },

    onContinue: function() {
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
    saveTouch :function() {
        var status = this.state.status;
        this.props.callback({status:status});
    },

    render :function() {
        //var items = this.props.touch_status;
        //var newArray =[];
        //var classNames = 'touch_status_item flex';
        var itemClass = 'item3 flex';
        var status = this.props.status;
        var imgClass = 'picture touch_pic';
        var textClass = 'text phone_text flex';
        var datas = this.props.touch_status;
        /**
        for(var i=0;i<items.length;i++){
            var item=items[i];
            var src = item.src;
            if (item.value == status ) {
                classNames = 'touch_status_item flex active';
            } else {
                classNames = 'touch_status_item flex';
            }
            newArray.push(<div key={i} className={classNames} onClick={this.selectStatus.bind(this,item)}><img className="touch_pic" src={src} ></img><span className="phone_text flex">{item.text}</span></div>);
        }
         */
        if (this.state === null) {
            return <div></div>;
        } else {
            return <div className="blockly_background flex" onTouchEnd={this.onContinue} >
                <div className="blockly_popup" onTouchEnd={this.stopProgation} >
                    <BlockInputTitleBar1 showInfo={MSG['title_touch_sensor']}/>
                    <div className="blockly_popupbody flex">
                        {
                        /**
                        <div className="phone_status_container flex" id="touch_status_container" >
                            {newArray}
                        </div>
                         */
                        }
                        <BlockContentSelect status={status} itemClass={itemClass} 
                                    imgClass={imgClass} textClass={textClass} 
                                    selectStatus={this.selectStatus} datas={datas}>
                                </BlockContentSelect>
                    </div>
                    <BlockInputBottom type="common_button" onBackgroundTouched={this.onContinue} saveTime={this.saveTouch}/>
                </div>
            </div>;
        }
    }
});
module.exports = BlockTouchSelect;

var React = require('react');
var ReactDOM = require('react-dom');
var eventsListener = require('../common/events_listener');

var $ = require('jquery');
var dataService = require('../service/data_service');

var AngleComponent = React.createClass({
    getDefaultProps: function() {
        return {
            eventClick:0,//单击
            longPress:1//长按
        };
    },
    getInitialState: function() {
         return {
            timer:0,
            angle:0
         };
    },
    componentDidMount: function() {
        this._setImgRoate(this.props.angle);//还原旋转角度
    },
    componentWillUnmount: function()  {
        //清空定时器对象
        window.intervalObject.intervalSelf = 0;
        window.intervalObject.intervalArray = [];
    },
    angleAdjust:function(type){
        if(this.props.switchIsClose===false) return;
        console.log("单击---》");
        this._setAngle(type,this.props.eventClick);
    },
    _longPress:function(type){
        this._setAngle(type,0);
        if(this.props.switchIsClose===false) return;
        var that = this;
        window.intervalObject.intervalSelf = window.setInterval(function(){
            console.log("长按开始---》"); 
            that._setAngle(type,that.props.longPress);
        }, 300);
        //累计定时器个数
        window.intervalObject.intervalArray.push(window.intervalObject.intervalSelf);
    },
    _longPressEnd:function(e){
        //清除定时器
        if(window.intervalObject.intervalArray.length>0){
            window.intervalObject.intervalArray.forEach(function(ele) {
                window.clearInterval(ele)
            });
        }
        e.stopPropagation();

    },
    _setAngle:function(type,eventType){
        console.log("-----------事件类型："+eventType+"--------------按钮类型："+type);
        var baseAngle = eventType===0?1:6;
        console.log("---------开关状态------"+this.props.switchIsClose);
        if(this.props.switchIsClose===false){
            if(window.intervalObject.intervalArray.length>0){
                window.intervalObject.intervalArray.forEach(function(ele) {
                    window.clearInterval(ele)
                });
            }
            return ;
        }else{
            console.log("-------------this.props.angle:"+this.props.angle+"-----------类型："+typeof(this.props.angle));
            var angle =  parseInt(this.props.angle===""?"0":this.props.angle);
            console.log("---------before---------------角度："+angle+"-----------类型："+ typeof(this.props.angle));
            if(type=='reduce'){
                angle=angle-baseAngle;
            }
            if(type=='add'){
                angle=angle+baseAngle;
            }
            if($(".reduce_icon")[0] !== undefined){
                $(".reduce_icon")[0].style.color = "#4cd964";
            }
            if($(".add_icon")[0] !== undefined){
                $(".add_icon")[0].style.color = "#4cd964";
            }
            if(angle>=118){
                if($(".add_icon")[0] !== undefined){
                    $(".add_icon")[0].style.color = "#ddd";
                }
                angle = 118;
                //清除定时器
                if(window.intervalObject.intervalArray.length>0){
                    window.intervalObject.intervalArray.forEach(function(ele) {
                        window.clearInterval(ele)
                    });
                }
            }else if(angle<=-118){
                if($(".reduce_icon")[0] !== undefined){
                    $(".reduce_icon")[0].style.color = "#ddd";
                }
                angle = -118;
                //清除定时器
                if(window.intervalObject.intervalArray.length>0){
                    window.intervalObject.intervalArray.forEach(function(ele) {
                        window.clearInterval(ele)
                    });
                }
            }
            console.log("---------end---------------角度："+angle);
            this.setState({
                angle:angle
            },()=>{
                this.props.onAngleChange(this.state.angle);
            });
            this._setImgRoate(angle);

            this._runCommand(angle);
        }
    },
    _setImgRoate:function(rotate){
        if(rotate === ''){
            rotate=0;
        }
        var imgObj = document.getElementById("servoAngleImage");
        if(imgObj!=null&&imgObj.style){
            imgObj.style.transform="rotate("+parseInt(rotate)+"deg)";
            imgObj.style.webkitTransform="rotate("+parseInt(rotate)+"deg)";
            imgObj.style.MozTransform="rotate("+parseInt(rotate)+"deg)";
            imgObj.style.msTransform="rotate("+parseInt(rotate)+"deg)";
            imgObj.style.OTransform="rotate("+parseInt(rotate)+"deg)";
        }
    },

    _runCommand :function (angle) {
        var servos = this.props.servoId;
        var objParam = {};
        objParam.servo = servos;
        objParam.degree = angle;
        objParam.ms  = 400;
        var objTemp = [];
        objTemp.push(objParam);
        var strParams = JSON.stringify(objTemp);
        dataService.command('changeServo',objTemp);          
    },
    render: function(){
        this._setImgRoate(this.props.angle);//还原旋转角度
        return  <div className="angle_val_box flex">
                    <div className="angle_box flex">
                        <div className="adjust_box reduce_box flex" >
                            {/* <img src="images\/index\/close.png"  onTouchStart={this._longPress.bind(this,'reduce')} onTouchEnd={this._longPressEnd}/> */}
                           <i className="fa fa-minus-circle reduce_icon" onTouchStart={this._longPress.bind(this,'reduce')} onTouchEnd={this._longPressEnd}></i>
                        </div>
                        <div className="img_box flex">
                            <img id="servoAngleImage" className="servoAngleImage" src="images/index/Servo.png"/>
                        </div>
                        <div className="adjust_box add_box flex">
                            {/*<img src="images\/index\/close.png"  onTouchStart={this._longPress.bind(this,'add')} onTouchEnd={this._longPressEnd}/>*/}
                            <i className="fa fa-plus-circle add_icon" onTouchStart={this._longPress.bind(this,'add')} onTouchEnd={this._longPressEnd}></i>
                        </div>
                    </div>
                    <div className="value_box flex">
                        <label id="angle_val">{this.props.angle===''?0:this.props.angle}°</label>
                    </div>
                </div>;
    }
});


module.exports = AngleComponent;






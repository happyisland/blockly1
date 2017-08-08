var React = require('react');
var RobatCommand = require('./../service/robat_command');
module.exports = React.createClass({
    backgroundTouched: function(e) {
        e.stopPropagation();
        return this.props.onBackgroundTouched();
    },

    clickOK: function(e) {
        e.stopPropagation();
        this.props.saveTime();
        return this.backgroundTouched(e);
    },

    setServoMode :function(e) {
        var setServoModeCommand = new RobatCommand('setServoMode');
        //调用弹出轮模式和普通舵机的切换页面
        setServoModeCommand.send();
        this.backgroundTouched(e);
    },
    render: function(){
        if (this.props.type == 'swift_button') {
            return  <div className="blockly_popupfooter flex">
                        <div className="btn_block flex" onTouchEnd={this.backgroundTouched}>{MSG['project_pop_ok_btn']}</div>    
                    </div>;
        } else if (this.props.type == 'common_button') {
             return  <div className="blockly_popupfooter flex">
                        <div className="btn_cancel flex" onTouchEnd={this.backgroundTouched}>{MSG['project_pop_cancel_btn']}</div> 
                        <div className="btn_ok flex" onTouchEnd={this.clickOK}>{MSG['project_pop_ok_btn']}</div> 
                    </div>;
        } else {
            return  <div className="blockly_popupfooter flex">
                        <div className="btn_cancel flex" onTouchEnd={this.backgroundTouched}>{MSG['project_pop_cancel_btn']}</div> 
                        <div className="btn_ok flex" onTouchEnd={this.setServoMode}>{MSG['set_servo_mode']}</div> 
                    </div>;
        }
        
    }
});
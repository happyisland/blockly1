var React = require('react');
var ReactDOM = require('react-dom');
var dataService = require('./../service/data_service');
var $ = require('jquery');
var MessageTipComponent = React.createClass({
    getInitialState : function(){
        return {
        };
    },
    goCancel: function(e) {
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    goSure: function(e) {
        dataService.command("closeWindow",null);
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    render: function(){
        return  <div className="blockly_background flex">
                    <div className="blockly_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {MSG.exit_popup_title}
                            </div>
                        </div>
                        <div className="blockly_popupbody flex">
                            {MSG.exit_tips}
                        </div>
                        <div className="blockly_popupfooter flex">
                            <div className="btn_cancel flex" onTouchEnd={this.goCancel}>{MSG.project_pop_cancel_btn}</div> 
                            <div className="btn_ok flex" onTouchEnd={this.goSure}>{MSG.project_pop_ok_btn}</div> 
                        </div>
                    </div>
                </div>;
    }
});
module.exports = MessageTipComponent;
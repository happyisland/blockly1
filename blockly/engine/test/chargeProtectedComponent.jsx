var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ChargeProtectedComponent = React.createClass({
    getInitialState: function() {
        return {

        };
    },
    goCancel:function(e) {
        if(e){
            e.stopPropagation();
        }

        return this.props.onRemove();
    },
    goSure:function(e) {
        this.props.callBack();
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    render: function(){
        return   <div className="blockly_background flex messagetip_container">
            <div className="blockly_popup" style={{width:"50%"}}>
                {/* <div className="blockly_popuphead flex">
                    <div className="model_title">
                        {this.props.popupObj.title}
                    </div>
                </div> */}
                <div  className="blockly_popupbody flex">
                    {this.props.popupObj.content}
                </div>
                <div className="blockly_popupfooter flex">
                    <div className="btn_ok flex" onTouchEnd={this.goSure}>{this.props.popupObj.btnText}</div>
                </div>
            </div>
        </div>;
    }
});
module.exports = ChargeProtectedComponent;
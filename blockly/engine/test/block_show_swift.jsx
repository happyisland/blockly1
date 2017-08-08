var BlockInputContainer, BlockInputContinueButton, BlockShowSwift, BlockInputTitleBar, React;

React = require('react');

BlockInputContinueButton = require('./BlockInputContinueButton.jsx');

BlockInputContainer = require('./BlockInputContainer.jsx');

BlockInputTitleBar = require('./BlockInputTitleBar.jsx');
var blocklyUtils = require('./../common/utils/blockly_utils');
var SliderComponent = require('./slider_component.jsx');
var BlockInputBottom = require('./block_input_bottom.jsx');
var BlockInputTitleBar1 = require('./block_input_titlebar.jsx');
var SensorConditionSwiftCode = require('./../common/condition/sensor_condition_swift_code');
BlockShowSwift = React.createClass({
    getInitialState: function() {
        return {
            codeArray:[]
        };
    },
    componentDidMount: function() {
    },
    _initCodeArray:function(){
        var swiftCode = new SensorConditionSwiftCode();
        swiftCode.initConditionAndCode(['program_goto_phone_condition','program_goto_touch_condition','program_goto_infrared_condition']);
        var _arr = swiftCode.getDataCodeArray();
        this.state = {
            codeArray : _arr
        };
    },
    onContinue: function() {
        return this.props.onSuccess();
    },
    _renderContentLi:function(data){
        var liArr = [];
        for(var i=0;i<data.length;i++){
            var html = data[i].htmlCode;
            var title = data[i].htmlTitle||"branch title_"+i;
            liArr.push(<li key={i} className={i==0?"active":""} data-index={i} >
                            <div className="title_name">{title}</div>
                            <div dangerouslySetInnerHTML={{__html: html}} />
                            <span></span>
                        </li>);
        }
        return liArr;
    },
    _renderOlIndex:function(data){
        var _olArr = [];
        for(var i=0;i<data.length;i++){
            var item = data[i];
            _olArr.push(<li key={i} className={i==0?"active":""} data-index={i}><span></span></li>);
        }
        return _olArr;
    },
    render: function() {
        this._initCodeArray();
        if (this.state === null) {
            return <div></div>;
        } else {
            return  <div className="blockly_background flex common-color">
                        <div className="blockly_popup">
                            <BlockInputTitleBar1 showInfo="swift"></BlockInputTitleBar1>
                            <div className="blockly_popupbody row">
                                <SliderComponent dataArray={this.state.codeArray} 
                                    renderContentLi={this._renderContentLi}
                                    renderOlIndex={this._renderOlIndex}></SliderComponent>                                                          
                            </div>
                            <BlockInputBottom type="swift_button" onBackgroundTouched={this.onContinue}/>
                        </div>
                    </div>;
        }
    }
});

module.exports = BlockShowSwift;


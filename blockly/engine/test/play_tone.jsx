var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var PlayToneComponent = React.createClass({
    getDefaultProps: function() {
        return {
            tones:['C5','D5','E5','F5','G5','A5','B5','C6']
         };
    },
    // 用来设置可变属性
    getInitialState: function() {
         return {
            popupKey: this.props.popupKey,
            popupData : this.props.popupData,
         };
    },
    componentDidMount: function() {
        
    },
    goCancel:function(e) {
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    goSure:function(e) {
        this.props.callback(this.state.popupData);
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    handleToneChange:function(item,e){
        var that = e.currentTarget;
        $(that).addClass('active');
        $(that).siblings().removeClass('active');
        var data = {};
        data.type = 'tune';
        data.key = item;
        this.setState({
            popupData:{'tune':item}
        });
        //播放录音
        if(window.blocklyObj != undefined){
            window.blocklyObj.playAudio(JSON.stringify(data));
        }
    },
    _renderContent : function() {
        var Content = [];
        var items = this.props.tones;
        var curTone = this.props.popupData.tune;
        for(var i=0;i<8;i++){
            var item = items[i];
            var _class = "tone_li flex";
            if(item == curTone){
                _class ="tone_li active flex";
            }
            Content.push(<li key={i} className={_class} onClick={this.handleToneChange.bind(this,item)}>
                            <div className="tone_box flex">
                                <div className="toneimg_box flex">
                                    <img src="images/popup/tune/tune.png"/>
                                </div>
                                <span className="tone_text">{item}</span>
                            </div>
                        </li>);
        }
        return Content;
    },
    render: function() {
        var Content = this._renderContent();
        return  <div className="blockly_background flex">
                    <div className="blockly_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {MSG.title_setting_tune}
                            </div>
                        </div>
                        <div className="blockly_popupbody flex">
                            <ul className="playtone_list_box">
                                {Content}
                            </ul>
                        </div>
                        <div className="blockly_popupfooter flex">
                            <div className="btn_cancel flex" onTouchEnd={this.goCancel}>{MSG.project_pop_cancel_btn}</div> 
                            <div className="btn_ok flex" onTouchEnd={this.goSure}>{MSG.project_pop_ok_btn}</div> 
                        </div>
                    </div>
                </div>;
    }
});
module.exports = PlayToneComponent;






var BlockInputTitleBar1 = require('./block_input_titlebar.jsx');
var BlockInputBottom = require('./block_input_bottom.jsx');
var BlockInputTitleBar1 = require('./block_input_titlebar.jsx');
var React = require('react');
var $ = require('jquery');
var BlockContentSelect = require('./block_content_select.jsx');
var BlockPhoneSelect = React.createClass({
    getDefaultProps : function (){
        return {
            phoneStatus : 'left',
            phone_status:[{'src':'icon_left.png', value:'left', 'text':MSG['tilt_left']},
                            {'src':'icon_right.png' , value:'right','text':MSG['tilt_right']},
                            {'src':'icon_swing.png' , value:'swing','text':MSG['tilt_swing']},
                            {'src':'icon_up.png', value:'up','text':MSG['tilt_up']},
                            {'src':'icon_down.png' , value:'down','text':MSG['tilt_down']}]
        };
    },
    getInitialState: function() {
        return { 
            status : this.props.phoneStatus || 'left',
            phone_status : this.props.phone_status
        };
    },
    componentDidMount: function() {
        var status = this.props.status;
    },
    onContinue: function() {
        return this.props.onSuccess();
    },
    stopProgation :function(e) {
        return e.stopPropagation();
    },
    savePhone :function() {
        var status = this.state.status;
        this.props.callback({direction:status});
    },
    selectStatus : function(item ,e) {
        var that = e.currentTarget;
        $(that).siblings().removeClass('active');
        $(that).addClass('active');
        var status= item.value;
        var obj = {status : status};
        this.setState(obj);
    },
    render :function() {
        var items = this.props.phone_status;
        var newArray =[];
        var itemClass = 'item5 flex';
        var imgClass = 'picture phone_pic';
        var textClass = 'text phone_text flex';
        var status = this.props.status;
        /**
        console.log(status);
        for(var i=0;i<items.length;i++){
            var item=items[i];
            var src = 'images/popup/event/'+item.src;
            if (item.value == status ) {
                classNames = 'phone_status_item flex active';
            } else {
                classNames = 'phone_status_item flex';
            }
            newArray.push(<div key={i} className={classNames} onClick={this.selectStatus.bind(this,item)}><img className="phone_pic" src={src} ></img><span className="phone_text flex">{item.text}</span></div>);
        }
         */
        if (this.state === null) {
            return <div></div>;
        } else {
            return <div className="blockly_background flex" onTouchEnd={this.onContinue} >
                        <div className="blockly_popup" onTouchEnd={this.stopProgation} >
                            <BlockInputTitleBar1 showInfo={MSG['title_device_tilt']}/>
                            <div className="blockly_popupbody flex">
                                {
                                /**
                                <div className="phone_status_container flex" id="phone_status_container" >
                                     {newArray}
                                </div>
                                 */
                                }
                                <BlockContentSelect status={status} itemClass={itemClass} 
                                    imgClass={imgClass} textClass={textClass} 
                                    selectStatus={this.selectStatus}>
                                </BlockContentSelect>
                            </div>
                            <BlockInputBottom type="common_button" onBackgroundTouched={this.onContinue} saveTime={this.savePhone}/>
                        </div>
                    </div>;
        }
    }
});
module.exports = BlockPhoneSelect;
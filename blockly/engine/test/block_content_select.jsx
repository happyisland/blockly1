var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var BlockContentSelect = React.createClass({
    getDefaultProps : function (){
        return {
            datas : [{'src':'images/popup/event/icon_left.png', value:'left', 'text':MSG['tilt_left']},
                            {'src':'images/popup/event/icon_right.png' , value:'right','text':MSG['tilt_right']},
                            {'src':'images/popup/event/icon_swing.png' , value:'swing','text':MSG['tilt_swing']},
                            {'src':'images/popup/event/icon_up.png', value:'up','text':MSG['tilt_up']},
                            {'src':'images/popup/event/icon_down.png' , value:'down','text':MSG['tilt_down']}],
            containerClass : 'common_container flex',
            containerId : 'containerId'
        };
    },
    getInitialState: function() {
        return { 
            datas : this.props.datas
        };
    },
    selectItem :function(item,e) {
        return this.props.selectStatus(item,e);
    },
    render :function() {
        //容器的样式
        var containerClass = this.props.containerClass;
        //容器的ID值
        var containerId = this.props.containerId;
        var datas = this.props.datas;
        //当前选中的项目的状态值
        var status = this.props.status; 
        //每一项目的样式    
        var itemClass = this.props.itemClass;
        //项目下图片的样式
        var imgClass  = this.props.imgClass;
        //项目下文本的样式
        var textClass = this.props.textClass;
        var that = this;
        if (this.state == null) {
            return <div></div>;
        } else {
            return <div className={containerClass} id={containerId} >
                           {                              
                               _.map(datas,function(item, i, obj) { 
                                   var currentItemClass = '';  
                                   if (status == item.value) {
                                       currentItemClass = itemClass+' active';
                                   }  else {
                                       currentItemClass = itemClass;
                                   }                           
                                   return <div key={i} className={currentItemClass} onClick={that.selectItem.bind(that,item)}>
                                              <img className={imgClass} src={item.src} ></img>
                                              <span className={textClass}>{item.text}</span>
                                          </div>;
                               })
                           } 
                    </div>
        }
    }
});
module.exports = BlockContentSelect;
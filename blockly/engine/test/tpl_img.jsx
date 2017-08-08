var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var eventsListener = require('./../common/events_listener'); 
var TplImg = React.createClass({
    getInitialState : function(){
        return {
            img:this.props.img,
            replaceImg : this.props.replaceImg
        };
    },

    _changeImg : function() {
        if (this.state.replaceImg) {
            var newImgState = {
                img : this.state.replaceImg,
                replaceImg : this.state.img
            };
            this.setState(newImgState);
        }
        
    },

    componentDidMount: function() {
        eventsListener.on('changeImg', this._changeImg);
    },

    componentWillUnmount: function() {
        eventsListener.off('changeImg'); 
    },
    _renderImg:function(){
        var imglist = this.state.img;
        var listArr = [];
        if(imglist){
            for(var i=0;i<imglist.length;i++){
                var item = imglist[i];
                console.log(item);
                var typeOf = typeof item;
                if(typeOf == 'string'){
                    listArr.push(<div key={i} className="flex tpl_img">
                                    <img src={item}></img>
                                 </div>);
                }
                if(typeOf=='object'){
                    listArr.push(<div key={i} className="flex tpl_img" style={item.style}>
                                    <img src={item.src}></img>
                                 </div>);
                }
            }
        }
        return listArr;
    },
    render: function(){
        var imglist = this._renderImg();
        return  <div className="flex tpl_img_box">
                    {imglist}
                </div>;
    }
});
module.exports = TplImg;
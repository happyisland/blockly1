var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var LEDEmotion = React.createClass({
    getInitialState: function() {
         return {
            emotions : this.props.emotions,
            colorsBlock : this.props.colorsBlock,
            curEmotion:this.props.curEmotion,
            curColor:this.props.curColor
         };
    },
    componentDidMount: function() {

    },
    // emotins选择发生变化
    handleEmotionselect:function(i,e){
        var that = e.currentTarget;
        $(".emotion_list .emotion_item_box").removeClass('active');
        $(".emotion_item_box",that).addClass('active');
        this.setState({
            curEmotion:i
        },()=>{
            this.props.onEmotionChange(this.state.curEmotion);
        });
    },
    // color change
    handleColorblock:function(_color,e){
        var that = e.currentTarget;
        $(".colorblock_list .color_text").removeClass('active');
        $(".color_text",that).addClass('active');
        this.setState({
            curColor:_color
        },()=>{
            this.props.onColorChange(this.state.curColor);
        });
    },
    _renderEmotionlist:function(){
        var liArray = [];
        var emotions = this.state.emotions;
        for(var i=0;i<emotions.length;i++){
            var src_temp = 'images/popup/emotion/'+emotions[i]+'.png';
            var text_temp = MSG['id_'+emotions[i]];
            liArray.push(<li key={i} className="emotion_list_li flex"  onClick={this.handleEmotionselect.bind(null,i)}>
                            <div className={"emotion_item_box flex "+(this.props.curEmotion==i?"active":"")}>
                                <img className="emotion_img" src={src_temp}/>
                                <span className="emotion_text">{text_temp}</span>
                                <div className="colorShowdiv" style={{background:this.props.curColor}}>
                                    <span></span>
                                </div>
                            </div>
                        </li>);
        }
        return liArray;
    },
    _renderColorBlock:function(){
        var color_block = [];
        var colorsArr = this.props.colorsBlock;
        for(var i=0;i<colorsArr.length;i++){
            var _color = colorsArr[i];
            var _border = (i ==8)?'1px solid rgba(64, 63, 63, 0.54)':'1px solid '+_color;
            color_block.push(<li key={i} className={"colorblock_li flex "+(this.props.curColor==_color?"active":"")} onClick={this.handleColorblock.bind(null,_color)}>
                                <span className="color_text" style={{background:_color,border:_border}}></span>
                            </li>);
        }
        return color_block;
    },
    render: function(){
        var liArray = this._renderEmotionlist();
        var colorBlock = this._renderColorBlock();
        return  <div className="popupbody_content flex">
                    <div className="emotion_box flex">
                        <ul className="emotion_list">
                            {liArray}
                        </ul>
                    </div>
                    <div className="colorblock_box flex">
                        <ul className="colorblock_list">
                            {colorBlock}
                        </ul>
                    </div>
                </div>;
    }
});

module.exports = LEDEmotion;






var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var LEDEmotion = React.createClass({
    getInitialState: function() {
         return {
            scenelights : this.props.scenelights,
            curSceneLight:this.props.curSceneLight
         };
    },
    componentDidMount: function() {

    },
    handleSceneselect:function(i,e){
        var that = e.currentTarget;
        $(".scenelight_box .scene_item_box").removeClass('active');
        $(".scene_item_box",that).addClass('active');
        this.setState({
            curSceneLight:i+12
        },()=>{
            console.log("curSceneLight-->>"+this.state.curSceneLight);
            this.props.onScenelightChange(this.state.curSceneLight);
        });
    },
    _renderScenelightlist:function(){
        var liArray = [];
        var baseIndex = 12;
        var scenelights = this.state.scenelights;
        for(var i=0;i<scenelights.length;i++){
            var src_temp = 'images/popup/emotion/'+scenelights[i]+'.png';
            var text_temp = MSG['id_'+scenelights[i]];
            var scene_index = this.props.curSceneLight-baseIndex;
            liArray.push(<li key={i} className="scenelight_li flex" onClick={this.handleSceneselect.bind(null,i)}>
                            <div className={"scene_item_box flex "+ (scene_index==i?"active":"")}>
                                <img className="scene_img" src={src_temp}/>
                                <span className="scene_text">{text_temp}</span>
                            </div>
                        </li>);
        }
        return liArray;
    },
    render: function(){
        var liarraycomponent = this._renderScenelightlist();
        return  <div className="popupbody_content flex">
                    <ul className="scenelight_box flex">
                        {liarraycomponent}
                    </ul>
                </div>;
    }
});
module.exports = LEDEmotion;






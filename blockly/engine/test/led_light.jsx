var React = require('react');
var ReactDOM = require('react-dom');
var LEDSelectAll = require('./led_selectall.jsx');
var DrawDiskColor = require('./draw_disk.jsx');
var $ = require('jquery');
var LEDMenu = React.createClass({
    getDefaultProps: function() {
        return {
            closeLightFill:"#e8e8e8"
        };
    },
    getInitialState: function() {
        return {
            colorsBlock : this.props.colorsBlock,
            pathColorsArr:this.props.pathColorsArr,
            curSelectPath:this.props.curSelectPath,
            curSelColorIndex: this.props.curSelColorIndex,
        };
    },
    componentDidMount: function() {
        
    },
    // 改变选择的颜色块
    handleColorblock:function(colorIndex,e){
        var that = e.currentTarget;
        $(".colorblock_list .color_text").removeClass('active');
        $(".color_text",that).addClass('active');
        this.setState({
            curSelColorIndex:colorIndex
        },() =>{
            if(this.state.curSelectPath ==-1||this.state.curSelectPath==-1){//未选择色盘或者色块
                return;
            }else{
                this._fillSelectPath();
                this.props.onColorChange(this.state.colorsBlock[colorIndex],this.state.curSelColorIndex);
            }
        });
    },
    //填充色盘的颜色
    _fillSelectPath :function(_pathColorsArr){
        var cur_path = document.getElementById('path'+(this.state.curSelectPath+1));
        var _curSelColorIndex = this.state.curSelColorIndex;
        this.setState({
            curSelColorIndex:_pathColorsArr?-1:_curSelColorIndex,
        },()=>{
            if(this.state.curSelColorIndex==8){//关灯操作
                cur_path.setAttribute('fill', this.props.closeLightFill);
            }else {
                if(this.state.curSelColorIndex!=-1){
                    cur_path.setAttribute('fill', this.props.colorsBlock[this.state.curSelColorIndex]);
                }
            }
        }); 
    },
    // 改变了色盘选择的扇形
    _onSelectPathChange:function(pathIndex){
        this.setState({
            curSelectPath : pathIndex
        },()=>{
            this.props.onSelectPathChange(pathIndex);
            if(this.state.curSelColorIndex ==-1||pathIndex==-1){//未选择色盘或者色块
                return ;
            }else{
                this._fillSelectPath();
            }
        });
    },
    // 创建色块
    _renderColorBlock:function(){
        var color_block = [];
        var colorsArr = this.props.colorsBlock;
        for(var i=0;i<colorsArr.length;i++){
            var _color = colorsArr[i];
            var _border = (i ==8||_color=="#ffffff")?'1px solid rgba(64, 63, 63, 0.54)':'1px solid '+_color;
            if(_color==""){
                color_block.push(<li key={i} className="colorblock_li flex" onClick={this.handleColorblock.bind(null,i)}>
                                    <span className="color_text flex" style={{border:"1px solid rgba(64, 63, 63, 0.54)"}}>
                                        <img src="images/popup/light/close_light.png"/>
                                    </span>
                                </li>);
            }else{
                color_block.push(<li key={i} className="colorblock_li flex" onClick={this.handleColorblock.bind(null,i)}>
                                    <span className="color_text" style={{background:_color,border:_border}}></span>
                                </li>);
            }
        }
        return color_block;
    },
    render: function(){
        var _colorBlock = this._renderColorBlock();
        return  <div className="popupbody_content flex">
                    <div className="scenecolor_box flex">
                        <DrawDiskColor colorsBlock={this.props.colorsBlock}
                            pathColorsArr={this.props.pathColorsArr} 
                            curSelColorIndex={this.state.curSelColorIndex}
                            curSelectPath={this.state.curSelectPath}
                            closeLightFill={this.props.closeLightFill}
                            onSelectPathChange={this._onSelectPathChange}>
                        </DrawDiskColor>
                    </div>
                    <div className="colorblock_box flex">
                        <ul className="colorblock_list">
                            {_colorBlock}
                        </ul>
                    </div>
                </div>;
    }
});
module.exports = LEDMenu;






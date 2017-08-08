var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var DrawDiskColor = React.createClass({
    getDefaultProps: function() {
        return {
            colordisk_height:168
        };
    },
    getInitialState: function() {
        var tmp_obj = this._initCoordinate();
        console.log(tmp_obj);
        return {
            colorsBlock : this.props.colorsBlock,
            curSelColorIndex : this.props.curSelColorIndex,
            curSelectPath : this.props.curSelectPath,
            pathColorsArr:this.props.pathColorsArr,
            svg_width : tmp_obj.svg_width,//画布宽度
            svg_height : tmp_obj.svg_width,//画布高度
            ox:tmp_obj.svg_width/2,
            oy:tmp_obj.svg_width/2,
            ix:tmp_obj.ix,//第一个关键点横坐标集
            iy:tmp_obj.iy,
            jx:tmp_obj.jx,//第二个关键点横坐标集
            jy:tmp_obj.jy
        };
    },
    componentDidMount: function() {
        // 同心小圆
        this._renderColorDisk(this.state.svg_width,this.state.svg_width);
    },
    // 初始化坐标计算
    _initCoordinate:function(){
        var temp_stateobj = {};
        var colordisk_height =this.props.colordisk_height;
        var colordisk_width = colordisk_height;
        var svg_width = colordisk_width;
        var svg_height = svg_width;
        var ax = (svg_width-svg_width/Math.abs(Math.sqrt(2)))/2;
        var ay = ax;
        var bx = (svg_width-svg_width/Math.abs(Math.sqrt(2)*2))/2;
        var by = bx;
        var ix = [0,ax,svg_width/2,(svg_width-ax),svg_width,(svg_width-ax),svg_width/2,ax];
        var iy = [svg_height/2,ay,0,ay,svg_height/2,(svg_height-ay),svg_height,(svg_height-ay)];
        var jx = [svg_width/4,bx,svg_width/2,svg_width-bx,svg_width/4*3,svg_width-bx,svg_width/2,bx];
        var jy = [svg_height/2,by,svg_height/4,by,svg_height/2,(svg_height-by),svg_height/4*3,(svg_height-by)];
        temp_stateobj.svg_width = svg_width;
        temp_stateobj.svg_height = svg_height;
        temp_stateobj.ix = ix;
        temp_stateobj.iy = iy;
        temp_stateobj.jx = jx;
        temp_stateobj.jy = jy;
        return temp_stateobj;
    },
    // 处理扇形点击事件
    _changeColor:function(e){
        var that = e.currentTarget;
        var cur_path = document.getElementById(that.id);
        var index = $(that).index();
        console.log("扇形索引---》"+index);
        var befor_selPathIndex = this.state.curSelectPath;
        if(befor_selPathIndex == index){
            index = -1;//取消色盘选中效果
            this._unselectDo(that,cur_path);
        }else{
            this._selectDo(that,cur_path,befor_selPathIndex);
        }
        this.setState({
            curSelectPath:index
        },()=>{
            this.props.onSelectPathChange(this.state.curSelectPath);
        });
    },
    _selectDo:function(that,cur_path,befor_selPathIndex){
        if(befor_selPathIndex!=-1){
            var pathid = befor_selPathIndex+1;
            var before_path = document.getElementById("path"+pathid);
            before_path.setAttribute('stroke', "#ddd");
            before_path.setAttribute('stroke-width', 1);
            $(that).siblings().removeClass('pahtactive');
        }
        $(that).addClass("pahtactive");
        cur_path.setAttribute('stroke', "#000");
        cur_path.setAttribute('stroke-width', 2);
        var _curColorIndex = this.props.curSelColorIndex;
        var _curColor = (_curColorIndex==-1||_curColorIndex==8)?"":this.props.colorsBlock[_curColorIndex];
        if(_curColor!=""){
            cur_path.setAttribute('fill', _curColor);
        }
    },
    _unselectDo:function(that,cur_path){
        cur_path.setAttribute('stroke', "#ddd");
        cur_path.setAttribute('stroke-width', 1);
        $(that).removeClass("pahtactive");
    },
    // 绘制小圆盘
    _renderColorDisk:function(svg_width,svg_height){
        var path = document.getElementById('circle');
        path.setAttribute('cx', svg_width/2);
        path.setAttribute('cy', svg_height/2);
        path.setAttribute('r', svg_width/4-2);
        path.setAttribute('stroke-width', 3);
        path.setAttribute('stroke', '#ddd');
        path.setAttribute('fill', '#000');
    },
    // 绘制扇形
    _renderSvgPathArr:function(pathColorsArr){
        var PathArr = [];
        for(var i =0;i<8;i++){
            var bigc_r = this.state.svg_width/2;//大圆半径
            var smallc_r = this.state.svg_width/4;//小圆半径
            var tmp_ix = this.state.ix;
            var tmp_iy = this.state.iy;
            var tmp_jx = this.state.jx;
            var tmp_jy = this.state.jy;
            var _M = 'M '+tmp_ix[i]+' '+tmp_iy[i];
            var _A2 = 'A '+smallc_r+' '+smallc_r+' 0 0 0 '+tmp_jx[i]+' '+tmp_jy[i]+'';
            if(i == 7){
                var _A1 = 'A '+bigc_r+' '+bigc_r+' 0 0 1 '+tmp_ix[0]+' '+tmp_iy[0]+'';
                var _L = 'L '+tmp_jx[0]+' '+tmp_jy[0]+'';
            }else{
                var _A1 = 'A '+bigc_r+' '+bigc_r+' 0 0 1 '+tmp_ix[i+1]+' '+tmp_iy[i+1]+'';
                var _L = 'L '+tmp_jx[i+1]+' '+tmp_jy[i+1]+'';
            }
            var _d = _M+' '+_A1+' '+_L+' '+_A2+' '+'Z';
            var _stokecolor = i==0?"#000":"#ddd";
            var _fillcolor = pathColorsArr[i]==""?this.props.closeLightFill:pathColorsArr[i];
            PathArr.push(<path key={i} id={"path"+(i+1)} className={i==0?"pathactive":""} d={_d}
                            fill={_fillcolor} stroke={_stokecolor} strokeWidth={i==0?1.6:1} 
                            onTouchStart={this._changeColor}/>);
        }
        return PathArr;
    },
    render: function(){
        var _pathArr = this._renderSvgPathArr(this.props.pathColorsArr);
        var _height = this.props.colordisk_height;
        return  <div className="colordisk_box flex" id="colordisk_box" style={{height:_height,width:_height}}>
                    <svg version="1.1" xmlns="http://www.w3.org\/2000\/svg">
                        {_pathArr}
                        <circle id="circle" />
                    </svg>
                </div>;
    }
});
module.exports = DrawDiskColor;






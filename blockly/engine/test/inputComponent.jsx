var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var InputComponent = React.createClass({
      getInitialState:function(){
          return {
              postureName:"",
              inputMsgClassName:"input_msg_div",
              inputTipsMsg:this.props.inputTips

          };
      },
    inputFocusBus:function(param){
        if(param == "focus"){
            console.log("获取焦点");
            this.setState({
                inputMsgClassName:"input_msg_div"
            });

        }else{
            console.log("失去焦点");
            this.setState({
                inputMsgClassName:"hidden_clear_btn"
            });
        }
    },
    componentWillMount:function(){
        //清空输入框的值
        this.setState({postureName:""});
    },
    getLength:function (str) {  //检查字符长度
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var j = 0; j < len; j++) {
            charCode = str.charCodeAt(j);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    },
    stripScript :function (s) {  //检查特殊字符
        console.log("str --------> " + s);
        s = s.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\ud83d[\ude80-\udeff]|\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]/g, ""); //过滤Emoji
        var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥％……&*（）——+|{}【】‘；：”“'。，、？]"); // 过滤特殊字符
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    },
    handleChange:function(v){
        var actionName = v;
        //检查字符长度
        var real_len = this.getLength(actionName);
        console.log("输入值："+v+"      real_len"+real_len);
        if(real_len>16){
            actionName = actionName.substr(0,8);
        }
        //检查特殊字符
        actionName = this.stripScript(actionName);
        this.setState({
            postureName:actionName
        });
    },
    clearInputValue:function(e){  //清除输入框内容
            this.setState({
                postureName:""
            });
    },
    outPutValue:function(){
        return this.state.postureName;
    },
    errorMsgShow:function(msg){
       console.log(msg);
       console.log( msg);
       console.log( msg);
        if(msg!==""){
            this.setState({
                inputMsgClassName:"input_msg_div"
            });
            $(".input_msg_div")[0].style.color = "red";
            this.setState({
                inputTipsMsg:msg
            });
        }
    },
    render: function(){
        var clear_btn_className = "";
        if(this.state.postureName.length>0){
            clear_btn_className = "clear_div";
        }else{
            clear_btn_className = "hidden_clear_btn";
        }
        return  <div className="input_out_div">
                    <div className="action_name_div">
                        <input id="postureName" type="text" ref="postureName" value={this.state.postureName} onFocus={(e)=>this.inputFocusBus('focus')} onBlur={(e)=>this.inputFocusBus('blur')} onChange={(e)=>this.handleChange(e.target.value)} placeholder={this.props.placeholder}/>
                        <div className={clear_btn_className} onClick={(e)=>this.clearInputValue(e)}></div>
                    </div>
                    <div className={this.state.inputMsgClassName}>{this.state.inputTipsMsg}</div>
                </div>
    }
});
module.exports = InputComponent;

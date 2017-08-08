var React = require('react');
var ReactDOM = require('react-dom');
var blocklyDatas = require('./../service/blockly_datas');
var dataService = require('./../service/data_service');
var ubtUtils = require('./../common/utils/utils');
var $ = require('jquery');
var ReturnbtnComponent = React.createClass({
    getInitialState : function(){
        return {
        };
    },
    componentDidMount: function() {
        var winHeight = document.body.clientHeight;
        var abs_height = (winHeight - 8)/9;
        $("#prog_return_div, #prog_ctrl_div").css("height",abs_height+"px");
        
    },
    handleReturn:function() {
        //判断平台
        if(window.angular===undefined){ //课程入口
            dataService.command("closeWindow",null);
        }else if(window.angular!==undefined){
            Blockly.DropDownDiv.hide();//去掉数字键盘
            var programRunning = blocklyDatas.getDataByKey("programRunning");
            console.log("renturn--->"+programRunning);

            if(programRunning) return;//判断程序是否处于运行状态 运行中 不做处理

            var current_editobj = blocklyDatas.getDataByKey('currentProgramXml');//当前编辑程序块什生成的 xml内容
            var compare_tempobj = '';//等待被比较的对象
            if(dataService.curXmlObj.xmlId == ""){//默认的只有开始的程序块时
                compare_tempobj = blocklyDatas.getDataByKey('defaultXml');
            }else { //载入的程序块时
                compare_tempobj = dataService.curXmlObj.xmlContent;
            }
            if(current_editobj!=undefined&&current_editobj!=''){
                var compareResult = ubtUtils.xmlComparison(compare_tempobj,current_editobj);
            }
            if(current_editobj !=undefined && compareResult == false){//xml 有变化 弹出提示框
                var MessageTipComponent = require('./message_tip.jsx');
                var removeComponent = function() {
                    ReactDOM.unmountComponentAtNode(document.getElementById("messagetip_div"));
                    $("#messagetip_div").empty();
                };
                ReactDOM.render(
                    React.createElement(
                        MessageTipComponent,{
                            onRemove:  removeComponent
                        }
                    ),document.getElementById("messagetip_div")
                );
            }else {//xml 无变化 退出
                dataService.command("closeWindow",null);
            }
        }
    },
    render: function(){
        return  <div className="returnbtn_box flex" onTouchEnd={this.handleReturn}>
                    <i className="fa fa-angle-left return_icon"></i>
                    <span id="go_back" className="goback_btn">{MSG.index_back}</span>
                </div>;
    }
});
module.exports = ReturnbtnComponent;
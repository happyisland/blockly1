var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var TplSpecialText = React.createClass({
    getInitialState : function(){
        return {
            text:this.props.text
        };
    },
    componentDidMount: function() {

    },
    _renderText:function(){
        var textlist = this.state.text;
        var listArr = [];
        var len = textlist.length;

        for(var i=0;i<textlist.length;i++){
            if(len>2){
                var text_align = "left";
            }
            var item = textlist[i];
            var temp_key = "";
            var temp_value = "";
            for(var p in item){//遍历json对象的每个key/value对,p为key
                temp_key = p;
                temp_value = item[p];
                console.log(p + " " + item[p]);

            }
            listArr.push(<div key={i} className="tpl_text" style={{'textAlign':text_align}}>
                              <span className="specialText_span">{temp_key}</span>&nbsp; : &nbsp;<span>{temp_value}</span>
                         </div>);
        }
        return listArr;
    },
    render: function(){
        var textlist = this._renderText();
        return  <div className="tpl_text_box">
                    {textlist}
                </div>;
    }
});
module.exports = TplSpecialText;
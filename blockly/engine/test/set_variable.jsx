var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var VariableComponent = React.createClass({
    getInitialState: function() {
        return {
            variableArray:this.props.variable,
            curvariableIndex:0
        };
    },
    _variableItemSelect:function(item,e){
        if(this.props.switchIsClose ==false) return;
        var that = e.currentTarget;
        $(that).siblings().removeClass('active');
        $(that).addClass('active');
        this.setState({
            curvariableIndex:$(that).index()
        },()=>{
            this.props.onVariableChange(this.state.curvariableIndex);
        });

    },
    render: function(){
        var items = this.state.variableArray;
        var newArray = [];
        if(items){
            for(var i=0;i<items.length;i++){
                var item=items[i];
                newArray.push(<span className={"variable_item flex "+(i==0?"active":"")} key={"variable"+i} 
                                    onClick={this._variableItemSelect.bind(this,item)}>
                                {item}
                              </span>);
            }
        }
        return  <div className="variable_box">
                    {newArray}
                </div>;
    }
});
module.exports = VariableComponent;
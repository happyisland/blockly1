////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var ReactDOM = require('react-dom');
var TopToolbar = require('./index_top_toolbar.jsx');
var ProgCtrlBtn = require('./index_prog_ctrl_btn.jsx');
var GuideComponent = require('./index_guide.jsx');
var blocklyDatas = require('./../service/blockly_datas');
var $ = require('jquery');

ReactDOM.render(<ProgCtrlBtn imgClass="program-control" isRunning="false" img="images/start.png" />,document.getElementById('prog_ctrl_div'));
$('#go_back').text(MSG['index_back']);

var removeGuideComponent = function() {
	ReactDOM.unmountComponentAtNode(document.getElementById("guide_container"));
    $("#guide_container").empty();
};

var platformType = blocklyDatas.getDataByKey("platformType");
if(blocklyDatas.datas.isFirst ==1 && platformType == 1){
	ReactDOM.render(React.createElement(GuideComponent, {onRemove:  removeGuideComponent }), document.getElementById("guide_container"));
}




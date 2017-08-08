var React = require('react');
var ReactDOM = require('react-dom');
var TopMenuButton = require('./index_top_button.jsx');
var ProjectWindow = require('./popup_window_projects.jsx');
var OpenDialog = require('./popup_dialog.jsx');
var code = require('../common/program/program_init.js');
var $ = require('jquery');

var storage = window.localStorage;

var TopToolbar = React.createClass({
    saveFile : function(){
		    $('#popupWindow').empty();		
		    //ReactDOM.render(React.createElement(OpenDialog, { title: "Add Project", isDisplay:true}), document.getElementById("popupWindow"));	
			var dom = angular.element($("#bodyContent")).scope();	
			dom.saveProgram();				
    },

	blueConnect :function() {
		var dom = angular.element($("#bodyContent")).scope();	
		dom.blueConnect();
	},
    loadProjects : function(){	
		$('#popupWindow').empty();				
		ReactDOM.render(<ProjectWindow />, document.getElementById("popupWindow"));
    },
    removeProject : function(){
		
    },
	closeWindow : function(){		
		//ReactDOM.unmountComponentAtNode(document.getElementById("popupWindow"));
		var dom = angular.element($("#bodyContent")).scope();	
		dom.closeWindow();		
		console.log('close window');
	},
    render() {
        return (<div>   
                <div id="returnBtn" style={{float:"left", "paddingLeft":"10px"}}>
					<TopMenuButton id="returnButton" handleClick={this.closeWindow} img="images/return.png" imgClass="menu_img"/>
				</div>
				<div id="topMenuBtns" style={{float:"right"}}>
					<TopMenuButton id="trashButton" handleClick={this.saveFile} img="images/save.png" imgClass="menu_img"/>
					<TopMenuButton id="linkButton" handleClick={this.loadProjects} img="images/menu.png" imgClass="menu_img"/>
					<TopMenuButton id="runButton" handleClick={this.removeProject} img="images/swift_icon.png" imgClass="menu_img" />
					<TopMenuButton id="workSpace" handleClick={this.blueConnect} img="images/Bluetooth.png" imgClass="menu_img" />
				</div>	
			</div>			
		);
    }
});

module.exports = TopToolbar;
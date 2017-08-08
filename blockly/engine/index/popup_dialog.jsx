var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var code = require('../common/program/program_init.js');
var storage = window.localStorage; 

var PopupDialog = React.createClass({
	getInitialState : function(){
		return {
			title : this.props.title,
			isDisplay : this.props.isDisplay
		}		
	},
	
	saveDialog : function(){				
		var projectName = this.refs.projectName.value;
		if(projectName == '' || projectName == 'undefined'){
			alert('Please enter project name');	
			return;
		}	
		var xml = Blockly.Xml.workspaceToDom(code.workspace);
		var text = Blockly.Xml.domToText(xml);
		storage.setItem(projectName, text); 

        var obj = {};
		obj.servoId = 1;
		obj.direction = 2;
		obj.speed = 'VF';
		var arrServos = [];
		arrServos.push(obj);
		if (this.props.closeHandler) {
			this.props.closeHandler(arrServos);
		}
		ReactDOM.unmountComponentAtNode(document.getElementById("popupWindow"));
		//this.closeDialog();
	},
	
	closeDialog : function(){
		this.setState({isDisplay:false});
		var projectName = this.refs.projectName.value;
		var obj = {};
		obj.servoId = 2;
		obj.angle = 'z';
		obj.type = 1;
		var obj1 = {};
		obj1.servoId = 5;
		obj1.angle = 'x';
		obj1.type = 1;
		var obj2 = {};
		obj2.servoId = 4;
		obj2.angle = 'y';
		obj2.type = 1;
		var obj3 = {};
		obj3.servoId = 3;
		obj3.angle = 'w';
		obj3.type = 1;
		var arrServos = [];
		arrServos.push(obj);
		arrServos.push(obj1);
		arrServos.push(obj2);
		arrServos.push(obj3);
		if (this.props.closeHandler) {
			this.props.closeHandler(arrServos);
		}
		/**
		var dom = angular.element($("#bodyContent")).scope();
		var obj =  {"title":"Tips","content":"考虑是否是敬爱分类的设计费垃圾费拉说减肥的拉萨富家大室","btnText":"OK","protection":"charge"};
		dom.showAlert(obj);
		 */
		//dom.showAlert(obj);			
		ReactDOM.unmountComponentAtNode(document.getElementById("popupWindow"));
	},
	
	componentDidMount : function() {
		$("#popupWindow").css({ display:"block",height:$(document).height(), width:$(document).width(), zIndex:10, backgroundColor: '#ededed', opacity:0.8});
	},
	
	componentWillUnmount : function() {
		$('#popupWindow').empty();		
		$("#popupWindow").hide();
	},	
	
	render : function(){
		var isDis = this.state.isDisplay ? 'block' : 'none';		
		var widthOfWin = $(document).width();
		var heightOfWin = $(document).height();
		var left = ((widthOfWin - 220)/2) < 0 ? 0 : (widthOfWin - 220)/2;
		var top = ((heightOfWin - 110)/2-150) < 0 ? 0 : ((heightOfWin - 110)/2-150);
	
		var style = {
			display:isDis,
			top:top,
			left:left
		}
		
		return (<div id="projectDialog" style={style}>
				<div id="title"><b>{this.state.title}</b></div>
				<div id="content">
					<input type="text" name="projectName" ref="projectName"  />
				</div>
				<div id="buttons">
					<input type="button" value="Save" onClick={this.saveDialog}/>
					<input type="button" value="Close" onClick={this.closeDialog}/>
				</div>
			</div>)		
	}	
});

module.exports = PopupDialog;
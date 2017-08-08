var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ProjectList = require('./index_project_list.jsx');
var code = require('../common/program/program_init.js');
var storage = window.localStorage;

var ProjectsWindow = React.createClass({  

	getInitialState: function() {
	  return {isEditing: false};
	},

	addProject : function(){	
		code.workspace.clear();
		this.returnToMain();
	},
	
	editProject : function(){		
		this.setState({isEditing : !this.state.isEditing});
	},	
	
	returnToMain : function(){
		$("#popupWindow").empty();
		$("#popupWindow").hide();
	},
	
	componentDidMount : function(){
		$("#popupWindow").css({ display:"block",height:$(document).height(), width:$(document).width(), zIndex:20, opacity:1});		
	},
	
    render() {
		var listItems = [];				
		for(var i = 0; i < storage.length; i++){
            var name = storage.key(i);
            listItems.push({ id: i, content: name });
        }						
					
        return (<div>
			<div id="toolbar" style={{height:"45px", width:"100%", "borderBottom":"solid 1px #ddd", "position": "fixed", "_position":"absolute", "top": "0px", "backgroundColor":"#ffffff"}}>
				<div id="left" className="fl"><img src="images/return.png" style={{width:"30px", height:"30px", "marginLeft":"10px", "marginTop":"5px"}} onClick={this.returnToMain}/></div>
				<div id="title" className="" style={{width:"120px", margin:"0px auto", "textAlign": "center", height:"100%", "lineHeight":"45px"}}>Project</div>
				<div id="right" className="fr" style={{"marginTop": "-45px"}}>
					<img src="images/add_project.png" style={{width:"30px", height:"30px", "marginTop":"5px", "marginRight":"5px"}}  onClick={this.addProject}/>
					<img src="images/done.png" style={{width:"30px", height:"30px", "marginTop":"5px", "marginRight":"5px"}}  onClick={this.editProject}/>
				</div>
			</div>	
			<div>				
				<ProjectList
					listItems={listItems}
					heightOfItem={30}
					maxItemsToRender={listItems.length}
					handleClose={this.returnToMain}
					isEditing={this.state.isEditing}
				/>
			</div>
		</div>);
    }
});

module.exports = ProjectsWindow;
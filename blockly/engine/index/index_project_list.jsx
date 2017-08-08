var React = require('react');
var ReactDOM = require('react-dom');
var code = require('../common/program/program_init.js');
var storage = window.localStorage;

var ProjectList = React.createClass({
	  /*propTypes : function() {
		listItems: PropTypes.array.isRequired,
		heightOfItem: PropTypes.number,
		maxItemsToRender: PropTypes.number
	  },*/
	  getDefaultProps : function() {
		return {
		  listItems: [],
		  heightOfItem: 30,
		  maxItemsToRender: 50
		};
	  },
	  getInitialState : function() {
		return {
		  scrollPosition: 0,
		  projectList : this.props.listItems	
		};
	  },
	  updateScrollPosition : function() {		  
		const newScrollPosition = this.refs.list.scrollTop / this.props.heightOfItem;
		const difference = Math.abs(this.state.scrollPosition - newScrollPosition);		
		if (difference >= this.props.maxItemsToRender / 5) {
		  this.setState({ scrollPosition: newScrollPosition});
		}
	  },
	  componentDidMount : function() {
		this.refs.list.addEventListener('scroll', this.updateScrollPosition);
	
	  },
	  componentWillUnmount : function() {
		this.refs.list.removeEventListener('scroll', this.updateScrollPosition);
	  },	
	  chooseProject : function(xmlKey) {			
		  code.workspace.clear();
		  var defaultXml = storage.getItem(xmlKey);
		  var xml = Blockly.Xml.textToDom(defaultXml);
		  Blockly.Xml.domToWorkspace(xml, code.workspace);		
		  this.props.handleClose();	
	  },
	  removeProject : function(obj, xmlKey) {
		  var updItem = [];
	      this.state.projectList.map(function(item){
			  if(item.content !== xmlKey){
				  updItem.push(item);
			  }
		  });
		  storage.removeItem(xmlKey);
		  this.setState({projectList:updItem});
	  },
	  render : function() { 
		var _this = this;
		
		const startPosition =
		  this.state.scrollPosition - this.props.maxItemsToRender > 0
		  ? this.state.scrollPosition - this.props.maxItemsToRender
		  : 0;
		
		const endPosition =
		  this.state.scrollPosition + this.props.maxItemsToRender >= this.state.projectList.length
		  ? this.state.projectList.length
		  : this.state.scrollPosition + this.props.maxItemsToRender;
		
		return (<div className='react-scrollable-list' ref='list'>
		  <div key='list-spacer-top' style={{
			height: startPosition * this.props.heightOfItem
		  }}></div>
		  {this.state.projectList.slice(startPosition, endPosition).map(item => <div
			className='react-scrollable-list-item' key={'list-item-' + item.id}>
				<div style={{float:"left", width: "90%"}} onClick={_this.chooseProject.bind(_this, item.content)}>{item.content}</div>
				{(_this.props.isEditing) ? <div style={{float:"right", marginRight:"5px"}}><image src="aa.png" onClick={_this.removeProject.bind(_this, this, item.content)}/></div> : ''}
			</div>)
		  }
		  <div key='list-spacer-bottom' style={{
			height: this.state.projectList.length * this.props.heightOfItem -
			  endPosition * this.props.heightOfItem
		  }}></div>
		</div>);
	  }
	});
	
module.exports = ProjectList;

var React = require('react');

var TopMenuButton = React.createClass({
    render(){
        return (<div style={{"display":"inline-block", "marginRight":"10px", "marginTop":"10px"}}>
        <img src={this.props.img} onClick={this.props.handleClick} className={this.props.imgClass}/> </div>);
	}
});

module.exports = TopMenuButton;
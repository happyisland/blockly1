var React = require('react');
module.exports = React.createClass({
  backgroundTouched: function(e) {
    e.stopPropagation();
    return this.props.onBackgroundTouched();
  },
  render: function() {
    return <div id="BlocklyInputContainer" 
               className="modalBackground_first" onTouchEnd={this.backgroundTouched}>
           </div>;
  }
});

var React = require('react');

module.exports = React.createClass({

    render: function(){
        
        return <div className="blockly_popuphead flex">
                    <div className="popup-title model_title">
                        {this.props.showInfo}
                    </div>
                </div>;
    }
});
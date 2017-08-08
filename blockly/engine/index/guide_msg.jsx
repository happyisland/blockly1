var React = require('react');
var ReactDOM = require('react-dom');

var GuideMsgComponent = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function(){
        return  <div>
                    <div className="introduce introduce_0" style={{"display": "block"}} data-index="0">
                        {MSG.save_project_msg}
                    </div>
                    <div className="introduce introduce_1" data-index="1">
                        {MSG.projectlist_msg}
                    </div>
                    <div className="introduce introduce_2" data-index="2">
                        {MSG.swift_msg}
                    </div>
                    <div className="introduce introduce_3" data-index="3">
                        {MSG.help_msg}
                    </div>
                    <div className="introduce introduce_4" data-index="4">
                        {MSG.run_msg}
                    </div>
                </div>;
    }
});
module.exports = GuideMsgComponent;

var React = require('react');
var ReactDOM = require('react-dom');

var GuideRunComponent = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function(){
        return  <div className="guide_runbtn flex guide_item" data-index="4">
                    <div className="execute-btn">
                        <i className="icon ion-play"></i>
                        <span>{MSG.id_start_info}</span>
                    </div>
                    <img src="images\/help\/introduce\/down2x.png" className="down_img"/>
                    <img src="images/help/introduce/run.png" className="run_img"/>
                </div>;
    }
});
module.exports = GuideRunComponent;
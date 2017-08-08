var BlockInputContainer, BlockInputContinueButton, BlockInputCount, BlockInputTitleBar, React;

React = require('react');

BlockInputContinueButton = require('./BlockInputContinueButton.jsx');

BlockInputContainer = require('./BlockInputContainer.jsx');

BlockInputTitleBar = require('./BlockInputTitleBar.jsx');

BlockInputCount = React.createClass({
  getInitialState: function() {
    return null;
  },
  componentDidMount: function() {
    if (this.props.block.getField("numLoops") !== null) {
      this.countKey = "numLoops";
    } else {
      this.countKey = "duration";
    }
    this.minCount = 1;//parseInt(this.props.block.getField(this.countKey).getOptions_()[0][1]);
    this.maxCount = 10;//parseInt(this.props.block.getField(this.countKey).getOptions_()[this.props.block.getField(this.countKey).getOptions_().length - 1][1]);
    this.state = {
      updatedValues: {}
    };
    this.state.updatedValues[this.countKey] = this.props.block.getFieldValue(this.countKey);
    return this.setState(this.state);
  },
  onContinue: function() {
    return this.props.onSuccess(this.props.block, this.state.updatedValues);
  },
  _updateCount: function(delta) {
    var potential_value;
    potential_value = parseInt(this.state.updatedValues[this.countKey]) + delta;
    if ((potential_value >= this.minCount) && (potential_value <= this.maxCount)) {
      this.state.updatedValues[this.countKey] = potential_value.toString();
      return this.setState(this.state);
    }
  },
  incrementCount: function(e) {
    return this._updateCount(1);
  },
  decrementCount: function(e) {
    return this._updateCount(-1);
  },
  render: function() {
    if (this.state === null) {
      return React.createElement("div", null);
    } else {
      return React.createElement("div", null, React.createElement(BlockInputContainer, {
        "onBackgroundTouched": this.onContinue
      }), React.createElement("div", {
        "id": "count-container",
        "className": "input-modal yellow",
        "style": {
          height: "90%",
          width: "90%"
        }
      }, React.createElement(BlockInputTitleBar, {
        "block": this.props.block,
        "updatedValues": this.state.updatedValues
      }), React.createElement("div", {
        "className": "input-modal-body"
      }, React.createElement("div", {
        "className": "count-control-frame"
      }, React.createElement("img", {
        "className": "count-number-button",
        "style": {
          "float": "left"
        },
        "onTouchEnd": this.decrementCount,
        "src": "images/react_test/minusButton.png"
      }), React.createElement("img", {
        "className": "count-number-button",
        "style": {
          "float": "right"
        },
        "onTouchEnd": this.incrementCount,
        "src": "images/react_test/plusButton.png"
      }), React.createElement("div", {
        "id": "count-number-counter",
        "className": "count-number-counter"
      }, this.state.updatedValues[this.countKey]))), React.createElement(BlockInputContinueButton, {
        "onContinue": this.onContinue
      })));
    }
  }
});

module.exports = BlockInputCount;
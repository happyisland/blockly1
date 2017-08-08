var React = require('react');
var ReactDOM = require('react-dom');
//var BlockInputColorPicker = require('./block_input_color_picker.jsx');
var BlockInputCount = require('./BlockInputCount.jsx');
var BlockShowSwift = require('./block_show_swift.jsx');
var FieldColour = require('../../core/field_colour');
var FieldColourAdapter = require('../adapter/field_colour_adapter');
var EmotionBlock = require('./emotion_block');
var $ = require('jquery');
module.exports = function (Blocks) {
  Blocks.statement_emotion_rgb_all_color_picker = new EmotionBlock({
    init: function init() {
      this.appendDummyInput().appendField('All Lights');
    },
    onMouseUp: function onMouseUp() {
	  console.log('创建react组件');
      //ReactDOM.render(React.createElement(BlockInputColorPicker, { block: this, onSuccess:  updateFieldValues }), document.getElementById("blueImg"));
			ReactDOM.render(React.createElement(BlockShowSwift, {onSuccess:  updateFieldValues }), document.getElementById("infoShower"));
    }
  });

  var updateFieldValues = function(block, fieldValues) {
		//console.log(block);
		ReactDOM.unmountComponentAtNode(document.getElementById("infoShower"));
	  $('#infoShower').empty();
		/**
	  var didChange = false;
	  if (typeof fieldValues !== 'undefined') {
	    _.forEach(fieldValues, function (value, fieldId) {
	      var existingFieldValue = block.getFieldValue(fieldId);
				if (existingFieldValue ==='') {
					existingFieldValue ='default';
				}
	      if (existingFieldValue && existingFieldValue !== value) {
	        block.setFieldValue(value, fieldId);
	        didChange = true;
	      }
	    });
	    
	    //eventsListener.trigger('close_block_input');
	    if (didChange === true) {
	      //eventsListener.trigger('changed_block_input');
	    }
	  }
		 */
  };

};
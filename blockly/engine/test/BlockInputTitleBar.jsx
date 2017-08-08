var FieldColourAdapter, FieldDropdownAdapter, FieldVariableAdapter, React, _;

React = require('react');

_ = require('lodash');


FieldDropdownAdapter = require('../adapter/field_dropdown_adapter');

FieldColourAdapter = require('../adapter/field_colour_adapter');

FieldVariableAdapter = require('../adapter/field_variable_adapter');

goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldTextInput');

module.exports = React.createClass({

  /**
   * If a parent component defines a getFieldValue function, use that instead.
   * 
   * @param  {FieldDropdown} field 
   * @return {String}
   */
  _getFieldValueDisplayString: function(field) {
    if (this.props.getFieldValue) {
      return this.props.getFieldValue(field);
    } else {
      return this._getDefaultFieldValueDisplayString(field);
    }
  },

  /**
   * Get the field value based on field-value pairs being a tuple.
   * 
   * @param  {FieldDropdown} field 
   * @return {String}
   */
  _getDefaultFieldValueDisplayString: function(field) {
    var fieldOptions, rawDisplayString, updatedValue;
    updatedValue = this.props.updatedValues[field.name];
    rawDisplayString = void 0;
    if (typeof updatedValue === "undefined") {
      rawDisplayString = field.getText();
    } else {
      fieldOptions = _.find(field.getOptions_(), function(option) {
        return option[1] === updatedValue;
      });
      if (fieldOptions) {
        rawDisplayString = fieldOptions[0];
      }
    }
    if (rawDisplayString) {
      return this._prettyPrintFieldValue(rawDisplayString, field.name);
    }
  },
  _prettyPrintFieldValue: function(string, fieldType) {
    if (fieldType === "distance") {
      return string + " cm";
    } else {
      return string;
    }
  },
  _renderInputList: function(inputList) {
    return _(inputList).filter(function(input, index) {
      return (index === 0 && input.fieldRow.length > 0) || input.fieldRow.length > 1 && input.fieldRow[0].getText().length > 0;
    }).map((function(_this) {
      return function(input, i) {
        var textContent = _this._renderFieldRow(input.fieldRow);
        return <h3 name="block-input-label" key={i}>
                    {textContent}
               </h3>;       
      };
    })(this)).value();
  },
  _renderFieldRow: function(fieldRow) {
    return _.map(fieldRow, (function(_this) {
      return function(field, i) {
        if (field instanceof FieldColourAdapter) {
          var backgroundColorValue = _this.props.updatedValues[field.name];
          return <div className="block-input-color" style={{backgroundColor:backgroundColorValue}}
                  key={i}>
                 </div>;
         
        } else if (field instanceof FieldDropdownAdapter || field instanceof FieldVariableAdapter) {
          var objChildren = _this._getFieldValueDisplayString(field);
          return <div className="block-input-value" key={i}>
                     {objChildren}
                 </div>;
        }  else if (field instanceof Blockly.FieldLabel) {
          if (field.name != null) {
            var objChildren = _this._getFieldValueDisplayString(field);
            return <span key={i}>{objChildren}</span>;
          } else {
            var objText = field.getText();
            return <span key={i}>{objText}</span>;
          }
        } else if (field instanceof Blockly.FieldTextInput) {
          var textName = _this.props.updatedValues[field.name];
          return <div className="block-input-value" key={i}>
                     {textName}
                 </div>;
        }
      };
    })(this));
  },
  render: function() {
    var childrenDom = this._renderInputList(this.props.block.inputList);
    return <div id="block-input-title-bar" className="input-modal-title ribbon">
               {childrenDom}
               <img className="ribbon-triangle ribbon-left-triangle" src="images/react_test/ribbonleft.png"></img>
               <img className="ribbon-triangle ribbon-right-triangle" src="images/react_test/ribbonleft.png"></img>
               <div></div>
           </div>;
  }
});
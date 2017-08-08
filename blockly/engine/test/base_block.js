; (function () {
  var $ = require('jquery');
  var _ = require('lodash');
  var React = require('react');
  var eventsListener = require('./../common/events_listener');

  function BaseBlock(arg) {
    console.log(this);
    var init, onMouseUp, updateFieldValueOverride;
    init = arg.init, onMouseUp = arg.onMouseUp, updateFieldValueOverride = arg.updateFieldValueOverride;
    this.initFunc = init;
    this.onMouseUpFunc = onMouseUp;
    this._updateFieldValueOverride = updateFieldValueOverride;
  }

  BaseBlock.prototype.init = function () {
    this.applyMouseUp();
    return this.initFunc && this.initFunc();
  };

  BaseBlock.prototype.updateFieldValue = function (value, name, shouldDeserialize) {
    return typeof this._updateFieldValueOverride === "function" ? this._updateFieldValueOverride(value, name) : void 0;
  };

  BaseBlock.prototype.applyMouseUp = function () {
    var oldOnMouseUp;
    if (typeof this.onMouseUpFunc !== "function") {
      return;
    }
    oldOnMouseUp = this.onMouseUp_;
    return this.onMouseUp_ = (function (_this) {
      return function (event) {
        var Blockly;
        Blockly = require('../../core/blockly');
        if (Blockly.dragMode_ === 1) {
          eventsListener.trigger("open_block_input");
          _this.onMouseUpFunc();
        }
        return oldOnMouseUp.call(_this, event);
      };
    })(this);
  };

  BaseBlock.prototype.unmountReactComponent = function () {
    React.unmountComponentAtNode(document.getElementById("blueImg"));
    $('#infoShower').empty();
    return eventsListener.trigger('close_block_input');
  };

  BaseBlock.prototype.updateFieldValues = function (fieldValues) {
    if (fieldValues == null) {
      fieldValues = [];
    }
    _.forEach(fieldValues, (function (_this) {
      return function (value, fieldId) {
        var existingFieldValue;
        existingFieldValue = _this.getFieldValue(fieldId);
        if (existingFieldValue && existingFieldValue !== value) {
          return _this.setFieldValue(value, fieldId);
        }
      };
    })(this));
    return this.unmountReactComponent();
  };

  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = BaseBlock;
  } else if (typeof define === 'function' && define.amd) {
    define(function () { return BaseBlock; });
  } else {
    this.BaseBlock = BaseBlock;
  }
}).call(this);
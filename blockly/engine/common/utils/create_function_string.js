var _ = require('lodash');

module.exports = function createFunctionString (options) {
  var values = {
    functionName: "",
    parameters: []
  };
  _.extend(values, options);

  var returnString = "";
  if (values.functionName) {
    returnString = "" + values.functionName + '(';
    returnString += values.parameters.join(',');
    returnString += ');\n';
  }
  return returnString;
};
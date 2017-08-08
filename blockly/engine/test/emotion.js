
var createFunctionString = require('./../common/utils/create_function_string');
module.exports = function(JavaScript) {
    JavaScript['statement_emotion_rgb_all_color_picker'] = function(block) {
        var color = '\'' + block.getFieldValue('colour') + '\'';
        var code = createFunctionString({
        functionName: 'setMultiplePartsSpecificColor',
        parameters: [color]
        });
        return code;
    };

};
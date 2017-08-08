/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * sensors.js version 1.0
 * 
 * custom define js generator
 * 
 * feature actions block
 * 
 */
'use strict';
var createFunctionString = require('../../../engine/common/utils/create_function_string');
var ubtUtils = require('../../../engine/common/utils/utils');
var blocklyDatas = require('../../../engine/service/blockly_datas');
module.exports = function(JavaScript) {
    var actionsStr = blocklyDatas.getDataByKey('actions');
    var init = function() {
        if (!actionsStr) {
            actionsStr = 'statement_action_go_forward,1|statement_action_go_left,2|statement_action_go_right,3';
        }
        var actionsArr = actionsStr.split("|");
        for(var i=0;i<actionsArr.length;i++){
            var action = actionsArr[i].split(",");
            JavaScript[action[0]] = function(block) {
                var code = createFunctionString({
                    functionName: 'showTest',
                    parameters: ["'"+block.actionId+"'"]
                });
                return code;
            };
        }
    };
    init();
};
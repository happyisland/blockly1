/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * movement.jsx version 1.0
 * 
 * block custom define
 * 
 * feature start block, goto start block
 * 
 */
'use strict';
var blocklyDatas = require('../../../engine/service/blockly_datas');
var colours = require('../../../engine/service/colours');
module.exports = function(Blocks) {
    var actionsStr = blocklyDatas.getDataByKey('actions');
    var init = function() {
        if (!actionsStr) {
            actionsStr = 'statement_action_go_forward,1|statement_action_go_left,2|statement_action_go_right,3';
        }
        var actionsArr = actionsStr.split("|");
        for(var i=0;i<actionsArr.length;i++){
            var action = actionsArr[i].split(",");
            Blocks[action[0]] = {
                actionName:action[1],
                actionId:action[0],
                init: function init() { 
                    this.setPreviousStatement(true);
                    this.setNextStatement(true);
                    this.setColour(colours['id_actions'].primary);                  	  
                    this.appendDummyInput().appendField(this.actionName);
                }               
            };
        }
    };

    init();

}
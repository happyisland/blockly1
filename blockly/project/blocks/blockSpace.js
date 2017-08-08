/**
 * start.js version 1.0
 *
 * custom define js generator
 *
 * create by hsp 0906
 *自定义块文件引入
 * feature start block, goto start block
 *
 */
require('../../project/blocks/start/start.jsx')(Blockly.Blocks);
require('../../project/blocks/start/start')(Blockly.JavaScript);

require('../../project/blocks/control/control.jsx')(Blockly.Blocks);
require('../../project/blocks/control/control')(Blockly.JavaScript);

require('../../project/blocks/math/math.jsx')(Blockly.Blocks);
require('../../project/blocks/math/math')(Blockly.JavaScript);

require('../../project/blocks/movement/movement.jsx')(Blockly.Blocks);
require('../../project/blocks/movement/movement')(Blockly.JavaScript);

require('../../project/blocks/actions/actions.jsx')(Blockly.Blocks);
require('../../project/blocks/actions/actions')(Blockly.JavaScript);

require('../../project/blocks/sensors/sensors.jsx')(Blockly.Blocks);
require('../../project/blocks/sensors/sensors')(Blockly.JavaScript);

require('../../project/blocks/show/show.jsx')(Blockly.Blocks);
require('../../project/blocks/show/show')(Blockly.JavaScript);

require('../../project/blocks/events/events.jsx')(Blockly.Blocks);
require('../../project/blocks/events/events')(Blockly.JavaScript);

// swift
require('../../project/swift/start')(Blockly.Swift);
require('../../project/swift/control')(Blockly.Swift);
require('../../project/swift/math')(Blockly.Swift);
require('../../project/swift/movement')(Blockly.Swift);
require('../../project/swift/actions')(Blockly.Swift);
require('../../project/swift/sensors')(Blockly.Swift);
require('../../project/swift/events')(Blockly.Swift);
require('../../project/swift/show')(Blockly.Swift);

'use strict';
module.exports = function() {


};
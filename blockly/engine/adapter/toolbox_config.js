/* @preserve
 *
 *
 * Copyright (c) 2016 UBT Company
 *
 *
 */

/**
 * toolbox_config.js version 1.0
 *
 *  toolbox_config feature
 *  菜单配置类
 *
 * feature toolbox_config feature
 *
 */
'use strict'
;(function() {
    var colours = require('./../service/colours');
    var blocklyDatas = require('./../service/blockly_datas');
    function ToolboxConfig() {
        this.toolboxString = '';
        this.init();
    }

    ToolboxConfig.prototype.init = function() {
        this.toolboxString +='<xml id="toolbox" style="display: none">';
        // 开始
        this.toolboxString +='<category id="id_start" name="'+MSG['id_start']+'" colour="'+colours['id_start'].primary+'" default="true">';
        this.toolboxString +='<block type="program_goto_start"></block>';
        this.toolboxString +='<block type="program_goto_phone_condition"></block>';
        this.toolboxString +='<block type="program_goto_touch_condition"></block>';
        this.toolboxString +='<block type="program_goto_infrared_condition"></block>';
        this.toolboxString +='</category>';
        // 动作
        this.toolboxString +='<category id="id_actions" name="'+MSG['id_actions']+'" colour="'+colours['id_actions'].primary+'" >';
        this.toolboxString +='<block type="movement_servo_change_angle_multi"></block>';
        this.toolboxString +='<block type="movement_servo_rotate_circle"></block>';
        this.toolboxString +='<block type="movement_servo_status_read"></block>';
        var actionsStr = blocklyDatas.getDataByKey('actions');
        var actionsArr = actionsStr.split("|");
        for (var i=0;i<actionsArr.length;i++) {
            var action = actionsArr[i].split(",");
            this.toolboxString +='<block type="'+ action[0] +'"></block>';
        }
        this.toolboxString +='</category>';
        // 控制
        this.toolboxString +='<category id="id_control" name="'+MSG['id_control']+'" colour="'+colours['id_control'].primary+'" >';
        this.toolboxString +='<block type="custom_control_if"></block>';
        this.toolboxString +='<block type="custom_control_if_else"></block>';
        this.toolboxString +='<block type="custom_control_while_do"></block>';
        this.toolboxString +='<block type="custom_control_do_while"></block>';
        this.toolboxString +='<block type="custom_control_wait_for"></block>';
        this.toolboxString +='<block type="custom_control_repeat_times">';
        this.toolboxString +='<value name="CUSTOM_CONTROL_REPEAT_TIMES">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field name="NUM">3</field>';
        this.toolboxString +='</shadow>';
        this.toolboxString +='</value>';
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="custom_control_wait_seconds">';
        this.toolboxString +='<value name="CUSTOM_CONTROL_WAIT_SECONDS">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field name="NUM">5000</field>';
        this.toolboxString +='</shadow>';
        this.toolboxString +='</value>';
        this.toolboxString +='</block>';
        this.toolboxString +='</category>';


        // 事件
        this.toolboxString +='<category id="id_events" name="'+MSG['id_events']+'" colour="'+colours['id_events'].primary+'" >';
        this.toolboxString +='<block type="event_mainboard_power"></block>';
        this.toolboxString +='<block type="event_infrared_sensor"></block>';
        this.toolboxString +='<block type="event_gyroscope"></block>';
        this.toolboxString +='<block type="event_phone_pad_tilt"></block>';
        this.toolboxString +='</category>';
        // 展示
        this.toolboxString +='<category id="id_show" name="'+MSG['id_show']+'" colour="'+colours['id_show'].primary+'" >';
        this.toolboxString +='<block type="id_show_play_effects"></block>';
        this.toolboxString +='<block type="id_show_play_tune"></block>';
        this.toolboxString +='<block type="id_show_emoji">';
        this.toolboxString +='<value name="value_input">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">3</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>'; 
        this.toolboxString +='<block type="id_show_scenelight">';
        this.toolboxString +='<value name="value_input">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">3</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="id_show_led">';
        this.toolboxString +='<value name="value_input">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">3000</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>';
        this.toolboxString +='</category>';
        // 感知
        this.toolboxString +='<category id="id_sensors" name="'+MSG['id_sensors']+'" colour="'+colours['id_sensors'].primary+'" >';
        this.toolboxString +='<block type="sensor_infrared_sensor_distance"></block>';
        this.toolboxString +='<block type="sensor_gyroscope_sensor_angle"></block>';
        this.toolboxString +='<block type="sensor_servo_angle"></block>';
        this.toolboxString +='<block type="sensor_set_gyrocope_to_zero"></block>';
        this.toolboxString +='</category>';
        // 数学
        this.toolboxString +='<category id="id_math" name="'+MSG['id_math']+'" colour="'+colours['id_math'].primary+'">';
        this.toolboxString +='<block type="custom_math_num"></block>';
        this.toolboxString +='<block type="custom_math_variables_get"></block>';
        this.toolboxString +='<block type="custom_math_variables_set">';
        this.toolboxString +='<value name="VALUE">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">1</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="custom_math_variable_change">';
        this.toolboxString +='<value name="value_input">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">1</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="custom_math_add_minus">';
        this.toolboxString +='<value name="FIRST_EXPRESSION">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">1</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='<value name="SECOND_EXPRESSION">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">1</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="custom_math_random_int">';
        this.toolboxString +='<value name="FROM">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">1</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='<value name="TO">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">100</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="custom_math_constrain">';
        this.toolboxString +='<value name="VALUE">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">50</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='<value name="LOW">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">1</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='<value name="HIGH">';
        this.toolboxString +='<shadow type="custom_math_num">';
        this.toolboxString +='<field  name="NUM">100</field>';
        this.toolboxString +='</shadow>'; 
        this.toolboxString +='</value>'; 
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="custom_math_logic_compare">';
        this.toolboxString +='</block>';
        this.toolboxString +='<block type="custom_math_logic_and"></block>';
        this.toolboxString +='<block type="custom_math_logic_not"></block>';
        this.toolboxString +='</category>';


        this.toolboxString +='</xml>';
    };

    ToolboxConfig.prototype.getToolboxString = function() {
        return this.toolboxString;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = ToolboxConfig;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return ToolboxConfig; });
    } else {
        this.ToolboxConfig = ToolboxConfig;
    }

}).call(this);
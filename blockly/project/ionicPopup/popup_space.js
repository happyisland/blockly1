/**
 * Created by hsp on 16/9/28.
 */
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
var result = require('./controller/app')(angular);
//项目管理
require('./controller/project_ctrl')(result);
//设置舵机旋转角度
require('./controller/servo_angle')(result);
//设置舵机状态
require('./controller/servo_status_ctrl')(result);
//为姿势取名
require('./controller/posture_named_ctrl')(result);
//设置表情
require('./controller/display_emotion_ctrl')(result);
//设置舵机旋转方向 旋转速度  轮模式
require('./controller/rotate_servo')(result);
//设置陀螺仪旋转方向
require('./controller/gyro_rotate_direction_ctrl')(result);
//设置音效
require('./controller/sound_effects_ctrl')(result);
//设置手机/平析旋转方向
require('./controller/event_device_tilt_ctrl')(result);
//设置触碰传感器
require('./controller/event_touch_sensor_ctrl')(result);
//设置红外传感器
require('./controller/event_infrared_sensor_ctrl')(result);
//设置音调
require('./controller/play_tune_ctrl')(result);
//设置时间
require('./controller/time_adjust_ctrl')(result);
//设置灯光
require('./controller/setting_light_ctrl')(result);
// 
require('./controller/display_sceneLight_ctrl')(result);

require('./controller/swift_code_ctrl')(result);
require('./controller/variable_named_ctrl')(result);

require('./common/data_service')(angular);

//设置音效初始化数据
//require('./soundEffects/sound');

'use strict';
module.exports = function() {


};
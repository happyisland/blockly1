if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 4,
    courseName : '课程4',
    courseTitle: MSG.course4_title,
    backgroundImg:appPath+'/course_4/images/bg.jpg',
    startStory : [
                    [
                        
                        {
                            index:0,
                            type:'img',
                            value:commonPath+'/l_xinbao1.png',
                            directioin:'left',
                            x:0,
                            y:20,
                            hide_ele_index:null
                        },
                        {
                            index:1,
                            type:'text',
                            value: MSG.c4_startstory_1,
                            directioin:'left',
                            x:12,
                            y:25,
                            hide_ele_index:null
                        },
                        {
                            index:2,
                            type:'text',
                            value:MSG.c4_startstory_2,
                            directioin:'left',
                            x:12,
                            y:25,
                            hide_ele_index:1
                        }
                    ]
    ],
    endStory:[
                [
                    {
                        index:0,
                        type:'img',
                        value:commonPath+'/l_xinbao1.png',
                        directioin:'left',
                        x:0,
                        y:50,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value: MSG.c4_endstory_1,
                        directioin:'left',
                        x:12,
                        y:55,
                        hide_ele_index:null
                    }
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.task]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c4_step_page1_1,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                },
                                                {
                                                    desc:MSG.c4_step_page1_2,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {
                                                    desc:MSG.c4_step_page1_3,
                                                    style:{textAlign:'left',margin:'2% 15px',color:'#A1B3B7',fontSize:'0.9em'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c4_step_page2_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c4_step_page2_2,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_4/images/'+curLanguage+'/page2.png',
                                                style:{marginTop: '0px'}
                                            }
                                          ]
                        },
                        {key:'text',value:  [
                                                {desc:MSG.c4_step_page2_3,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c4_step_page2_4,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c4_step_page2_5,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c4_step_page2_6,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}}
                                            ]
                        },
                    ],
                    [
                        {key:'title',value:[MSG.see_example]},
                        {key:'text',value:  [
                                                {desc:MSG.course_tips,style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}}
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:commonPath+'/eye_close.png',
                                                style:{height:'197px'}
                                            }
                                        ], 
                                    replaceValue : [
                                            {
                                                src:appPath+'/course_4/images/'+curLanguage+'/desc1.png',
                                                style:{height:'197px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]
                           
                ],
    videoSrc :appPath+"/course_4/video/course_4.mp4",
    isShowTrash : false,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_phone_condition"></block><block type="program_goto_touch_condition"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea" ><block type="movement_servo_change_angle_multi"></block><block type="movement_servo_rotate_circle"></block><block type="movement_servo_status_read"></block><block type="actions_636252715835204660"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1" ><block type="custom_control_if"></block><block type="custom_control_if_else"></block><block type="custom_control_while_do"></block><block type="custom_control_do_while"></block><block type="custom_control_wait_for"></block><block type="custom_control_repeat_times"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num"><field name="NUM">3</field></shadow></value></block><block type="custom_control_wait_seconds"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num"><field name="NUM">5000</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ><block type="event_mainboard_power"></block><block type="event_infrared_sensor"></block><block type="event_gyroscope"></block><block type="event_phone_pad_tilt"></block></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d" ><block type="id_show_play_effects"></block><block type="id_show_play_tune"></block><block type="id_show_emoji"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_scenelight"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_led"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3000</field></shadow></value></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ><block type="sensor_infrared_sensor_distance"></block><block type="sensor_gyroscope_sensor_angle"></block><block type="sensor_servo_angle"></block><block type="sensor_set_gyrocope_to_zero"></block></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"><block type="custom_math_num"></block><block type="custom_math_variables_get"></block><block type="custom_math_variables_set"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_variable_change"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_add_minus"><value name="FIRST_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="SECOND_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_random_int"><value name="FROM"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="TO"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_constrain"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">50</field></shadow></value><value name="LOW"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_logic_compare"></block><block type="custom_math_logic_and"></block><block type="custom_math_logic_not"></block></category></xml>',//菜单可配置
    toolConfigShow : [0,0,0,0,0,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"><next><block type="actions_636252715835204660" id="h^G[RJ-v1VzU=8qNej0h"><next><block type="movement_servo_change_angle_multi" id="o)(?dw;wKOnadFYF,DT,"><field name="servoGroup">1:-60,2:0,3:0,4:-25</field><field name="TIME">400</field><field name="servo1">-60</field><field name="servo2">0</field><field name="servo3">0</field><field name="servo4">-25</field><next><block type="movement_servo_change_angle_multi" id="fWE330_B*e@]2`zI+lQ~"><field name="servoGroup">1:0,2:-40,3:-40,4:0</field><field name="TIME">400</field><field name="servo1">0</field><field name="servo2">-40</field><field name="servo3">-40</field><field name="servo4">0</field><next><block type="movement_servo_change_angle_multi" id="i=~^eV*/L}9(I^Zz~wE1"><field name="servoGroup">1:25,2:0,3:0,4:60</field><field name="TIME">400</field><field name="servo1">25</field><field name="servo2">0</field><field name="servo3">0</field><field name="servo4">60</field></block></next></block></next></block></next></block></next></block><block type="movement_servo_change_angle_multi" id="`Fh^Y1U*ndl_GWW.Lc}5" x="117" y="223"><field name="servoGroup">#eee</field><field name="TIME">400</field><field name="servo1"></field><field name="servo2"></field><field name="servo3"></field><field name="servo4"></field></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"><next><block type="actions_636252715835204660" id="h^G[RJ-v1VzU=8qNej0h"><next><block type="movement_servo_change_angle_multi" id="o)(?dw;wKOnadFYF,DT,"><field name="servoGroup">1:-60,2:0,3:0,4:-25</field><field name="TIME">400</field><field name="servo1">-60</field><field name="servo2">0</field><field name="servo3">0</field><field name="servo4">-25</field><next><block type="movement_servo_change_angle_multi" id="fWE330_B*e@]2`zI+lQ~"><field name="servoGroup">1:0,2:-40,3:-40,4:0</field><field name="TIME">400</field><field name="servo1">0</field><field name="servo2">-40</field><field name="servo3">-40</field><field name="servo4">0</field><next><block type="movement_servo_change_angle_multi" id="i=~^eV*/L}9(I^Zz~wE1"><field name="servoGroup">1:25,2:0,3:0,4:60</field><field name="TIME">400</field><field name="servo1">25</field><field name="servo2">0</field><field name="servo3">0</field><field name="servo4">60</field><next><block type="movement_servo_change_angle_multi" id="`Fh^Y1U*ndl_GWW.Lc}5"><field name="servoGroup">1:0,2:40,3:40,4:0</field><field name="TIME">400</field><field name="servo1">0</field><field name="servo2">40</field><field name="servo3">40</field><field name="servo4">0</field></block></next></block></next></block></next></block></next></block></next></block></xml>',//xml字符串
};
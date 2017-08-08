if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 2,
    courseName : 'course 2',
    courseTitle: MSG.course2_title,
    backgroundImg:appPath+'/course_2/images/bg.jpg',
    startStory : [
                    [
                        {
                            index:0,
                            type:'img',
                            value:commonPath+'/l_p1.png',
                            directioin:'left',
                            x:0,
                            y:45,
                            hide_ele_index:null
                        },
                        {
                            index:1,
                            type:'text',
                            value: MSG.c2_startstory_1,
                            directioin:'left',
                            x:12,
                            y:55,
                            hide_ele_index:null
                        }
                    ]
    ],
    endStory:[
                [
                    {
                        index:0,
                        type:'img',
                        value:commonPath+'/r_xinbao1.png',
                        directioin:'right',
                        x:0,
                        y:20,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value: MSG.c2_endstory_1,
                        directioin:'right',
                        x:12,
                        y:25,
                        hide_ele_index:null
                    },
                    {
                        index:2,
                        type:'img',
                        value:commonPath+'/l_p1.png',
                        directioin:'left',
                        x:0,
                        y:40,
                        hide_ele_index:null
                    },
                    {
                        index:3,
                        type:'text',
                        value: MSG.c2_endstory_2,
                        directioin:'left',
                        x:12,
                        y:45,
                        hide_ele_index:1
                    }
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.c2_step_page1_1]},
                        {key:'text',value:  [
                                                {desc:MSG.c2_step_page1_2,style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}},
                                                {desc:MSG.c2_step_page1_3,style:{textAlign:'left',margin:'3% 10px'}},
                                                {desc:MSG.c2_step_page1_4,style:{textAlign:'left',margin:'3% 10px'}},
                                                {desc:MSG.c2_step_page1_5,style:{textAlign:'left',margin:'3% 10px'}}
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c2_step_page2_1]},
                        {key:'text',value:  [
                                                {desc:MSG.c2_step_page2_2,style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}}
                                            ]
                        },
                        {key:'img',value:[appPath+'/course_2/images/'+curLanguage+'/step1.gif']}
                    ],
                    [
                        {key:'title',value:[MSG.c2_step_page3_1]},
                        {key:'text',value:  [
                                                {desc:MSG.c2_step_page3_2,style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}}
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_2/images/'+curLanguage+'/step2.gif',
                                                style:{textAlign:'center',margin:'0 10px'}
                                            }
                                          ]
                        },
                    ],
                    [
                        {key:'title',value:[MSG.see_example]},
                        {key:'text',value:  [
                                                {desc: MSG.course_tips ,style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}}
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
                                                src:appPath+'/course_2/images/'+curLanguage+'/step3.png',
                                                style:{height:'197px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]             
    ],
    videoSrc :appPath+"/course_2/video/course_2.mp4",
    videoVtt : appPath+"/course_2/video/course_2.vtt",
    isShowTrash : false,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_phone_condition"></block><block type="program_goto_touch_condition"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea" ><block type="movement_servo_change_angle_multi"></block><block type="movement_servo_rotate_circle"></block><block type="movement_servo_status_read"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1" ><block type="custom_control_if"></block><block type="custom_control_if_else"></block><block type="custom_control_while_do"></block><block type="custom_control_do_while"></block><block type="custom_control_wait_for"></block><block type="custom_control_repeat_times"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num"><field name="NUM">3</field></shadow></value></block><block type="custom_control_wait_seconds"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num"><field name="NUM">5000</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ><block type="event_mainboard_power"></block><block type="event_infrared_sensor"></block><block type="event_gyroscope"></block><block type="event_phone_pad_tilt"></block></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d" ><block type="id_show_play_effects"></block><block type="id_show_play_tune"></block><block type="id_show_emoji"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_scenelight"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_led"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3000</field></shadow></value></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ><block type="sensor_infrared_sensor_distance"></block><block type="sensor_gyroscope_sensor_angle"></block><block type="sensor_servo_angle"></block><block type="sensor_set_gyrocope_to_zero"></block></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"><block type="custom_math_num"></block><block type="custom_math_variables_get"></block><block type="custom_math_variables_set"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_variable_change"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_add_minus"><value name="FIRST_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="SECOND_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_random_int"><value name="FROM"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="TO"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_constrain"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">50</field></shadow></value><value name="LOW"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_logic_compare"></block><block type="custom_math_logic_and"></block><block type="custom_math_logic_not"></block></category></xml>',//菜单可配置
    toolConfigShow : [0,0,0,0,0,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block><block type="id_show_emoji" id="O:}!S(k%1%aEig^,]oCU" x="121" y="98"><field name="Emotion">{"islightLock":true,"lightArray":[{"id":"1","emotionIndex":0,"color":"#01ffff"},{"id":"2","emotionIndex":0,"color":"#01ffff"}]}</field><value name="value_input"><shadow type="custom_math_num" id="E[^lQ2*?dSQUWcQc{jyc"><field name="NUM">3</field></shadow></value></block><block type="id_show_play_effects" id="5t^PQKe8HAF}Wnpi3Qg " x="139" y="188"><field name="Effect">{"type":"emotion", "key":"doubt", "description":"疑问"}</field></block><block type="custom_control_wait_seconds" id="HgnksjEesKRSgB,EGE2Y" x="142" y="259"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="GKwCX.KI-uaK0H_LXJ{("><field name="NUM">5000</field></shadow></value></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="70" y="84"><next><block type="id_show_emoji" id="O:}!S(k%1%aEig^,]oCU"><field name="Emotion">{"lightArray":[{"emotionIndex":0,"color":"#01ffff","id":"1"},{"emotionIndex":0,"color":"#01ffff","id":"2"}],"islightLock":true}</field><value name="value_input"><shadow type="custom_math_num" id="E[^lQ2*?dSQUWcQc{jyc"><field name="NUM">3</field></shadow></value><next><block type="id_show_play_effects" id="5t^PQKe8HAF}Wnpi3Qg "><field name="Effect">{"type":"emotion", "key":"doubt", "description":"疑问"}</field><next><block type="custom_control_wait_seconds" id="HgnksjEesKRSgB,EGE2Y"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="GKwCX.KI-uaK0H_LXJ{("><field name="NUM">5000</field></shadow></value></block></next></block></next></block></next></block></xml>',//xml字符串
};
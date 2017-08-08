if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 10,
    courseName : 'course 10',
    courseTitle: MSG.course10_title,
    backgroundImg:appPath+'/course_10/images/bg.jpg',
    startStory : [
                    [
                        {
                            index:0,
                            type:'img',
                            value:commonPath+'/l_xinbao3.png',
                            directioin:'left',
                            x:0,
                            y:60,
                            hide_ele_index:null
                        },
                        {
                            index:1,
                            type:'text',
                            value:MSG.c10_startstory_1,
                            directioin:'left',
                            x:12,
                            y:65,
                            hide_ele_index:null
                            
                        },
                        {
                            index:2,
                            type:'img',
                            value:commonPath+'/r_lubao1.png',
                            directioin:'right',
                            x:0,
                            y:40,
                            hide_ele_index:null
                        },
                        {
                            index:3,
                            type:'text',
                            value:MSG.c10_startstory_2,
                            directioin:'right',
                            x:12,
                            y:45,
                            hide_ele_index:1
                        },
                        {
                            index:4,
                            type:'text',
                            value:MSG.c10_startstory_3,
                            directioin:'right',
                            x:12,
                            y:45,
                            hide_ele_index:3
                        },
                        {
                            index:5,
                            type:'text',
                            value:MSG.c10_startstory_4,
                            directioin:'left',
                            x:12,
                            y:65,
                            hide_ele_index:1
                        },
                        {
                            index:6,
                            type:'text',
                            value:MSG.c10_startstory_5,
                            directioin:'right',
                            x:12,
                            y:45,
                            hide_ele_index:4
                        }
                    ]
    ],
    endStory:[
                [
                    {
                        index:0,
                        type:'img',
                        value:commonPath+'/r_lubao1.png',
                        directioin:'right',
                        x:0,
                        y:40,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value:MSG.c10_endstory_1,
                        directioin:'right',
                        x:12,
                        y:45,
                        hide_ele_index:null
                    },
                    {
                        index:2,
                        type:'img',
                        value:commonPath+'/l_xinbao1.png',
                        directioin:'left',
                        x:0,
                        y:55,
                        hide_ele_index:null
                    },
                    {
                        index:3,
                        type:'text',
                        value:MSG.c10_endstory_2,
                        directioin:'left',
                        x:12,
                        y:60,
                        hide_ele_index:1
                    }
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.task]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c10_step_page_1,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                },
                                                {
                                                    desc:MSG.c10_step_page_2,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {   desc:MSG.c10_step_page_3,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {
                                                    desc:MSG.c10_step_page_4,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1.5% 20px'}
                                                },
                                                {   desc:MSG.c10_step_page_5,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1.5% 20px'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c10_step_page_6]},
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_10/images/'+curLanguage+'/page1.png',
                                                style:{textAlign:'center',margin:'16%',width:'220px'}
                                            }
                                          ]
                        },
                        {key:'text',value:[MSG.c10_step_page_7]}
                    ],
                    [
                        {key:'title',value:[MSG.step_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c10_step_page_11,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_10/images/'+curLanguage+'/page2.png',
                                                style:{textAlign:'center',margin:'8%',width:'220px'}
                                            }
                                          ]
                        },
                        {key:'text',value:[MSG.c10_step_page_8]}
                        
                    ],
                    [
                        {key:'title',value:[MSG.step_2]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.course_tips_step_9,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_10/images/'+curLanguage+'/page3.png',
                                                style:{textAlign:'center',margin:'16% 18%',width:'200px'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.step_3]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c10_step_page_10,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c10_step_page_12,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_10/images/'+curLanguage+'/page4_1.png',
                                                style:{textAlign:'center',margin:'8%',width:'160px'}
                                            }
                                          ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c10_step_page_13,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_10/images/'+curLanguage+'/page4_2.png',
                                                style:{textAlign:'center',margin:'8%',width:'180px'}
                                            }
                                          ]
                        }
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
                                                src:appPath+'/course_10/images/'+curLanguage+'/desc1.png',
                                                style:{height:'197px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]
                ],
    videoSrc :appPath+"/course_10/video/course_10.mp4",
    isShowTrash : true,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_phone_condition"></block><block type="program_goto_touch_condition"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea"><block type="movement_servo_change_angle_multi"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1"><block type="custom_control_repeat_times"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num"><field name="NUM">3</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ><block type="event_mainboard_power"></block><block type="event_infrared_sensor"></block><block type="event_gyroscope"></block><block type="event_phone_pad_tilt"></block></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d" ><block type="id_show_play_effects"></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ><block type="sensor_infrared_sensor_distance"></block><block type="sensor_gyroscope_sensor_angle"></block><block type="sensor_servo_angle"></block><block type="sensor_set_gyrocope_to_zero"></block></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"><block type="custom_math_num"></block><block type="custom_math_variables_get"></block><block type="custom_math_variables_set"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_variable_change"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_add_minus"><value name="FIRST_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="SECOND_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_random_int"><value name="FROM"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="TO"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_constrain"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">50</field></shadow></value><value name="LOW"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_logic_compare"></block><block type="custom_math_logic_and"></block><block type="custom_math_logic_not"></block></category></xml>',//菜单可配置
    toolConfigShow : [0,1,1,0,1,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="77" y="84"><next><block type="id_show_play_effects" id="zFFb@W0]=9,RdQ}z@M#5"><field name="Effect">{"key":"busy_tone","description":"鸟","type":"machine","isDelay":false}</field><next><block type="custom_control_repeat_times" id=");Rj-DWadJ%!8EakkjM3"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num" id="-x0fN*lTanVH{js~{L{+"><field name="NUM">3</field></shadow></value><statement name="CUSTOM_CONTROL_DO0"><block type="movement_servo_change_angle_multi" id="?Mf3;]nHYkTurSJ=VTh}"><field name="servoGroup">5:40</field><field name="TIME">400</field><field name="servo5">40</field><next><block type="movement_servo_change_angle_multi" id="5*4G:]An#(]JT=!=fiS@"><field name="servoGroup">5:-50</field><field name="TIME">400</field><field name="servo5">-50</field></block></next></block></statement></block></next></block></next></block></xml>',//xml字符串
};
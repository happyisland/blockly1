if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 11,
    courseName : 'course 11',
    courseTitle: MSG.course11_title,
    backgroundImg:appPath+'/course_11/images/bg.jpg',
    startStory : [
                    [
                        {
                            index:0,
                            type:'img',
                            value:commonPath+'/l_xinbao2.png',
                            directioin:'left',
                            x:0,
                            y:60,
                            hide_ele_index:null
                        },
                        {
                            index:1,
                            type:'text',
                            value:MSG.c11_startstory_1,
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
                            y:35,
                            hide_ele_index:null
                        },
                        {
                            index:3,
                            type:'text',
                            value:MSG.c11_startstory_2,
                            directioin:'right',
                            x:12,
                            y:40,
                            hide_ele_index:1
                        },
                        {
                            index:4,
                            type:'text',
                            value:'….',
                            directioin:'right',
                            x:12,
                            y:40,
                            hide_ele_index:3
                        },
                        {
                            index:5,
                            type:'text',
                            value:MSG.c11_startstory_3,
                            directioin:'right',
                            x:12,
                            y:40,
                            hide_ele_index:4
                        },
                        {
                            index:6,
                            type:'text',
                            value:MSG.c11_startstory_4,
                            directioin:'left',
                            x:12,
                            y:65,
                            hide_ele_index:5
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
                        y:30,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value:MSG.c11_endstory_1,
                        directioin:'right',
                        x:12,
                        y:35,
                        hide_ele_index:null
                    },
                    {
                        index:2,
                        type:'text',
                        value:MSG.c11_endstory_2,
                        directioin:'right',
                        x:12,
                        y:35,
                        hide_ele_index:1
                    },
                    {
                        index:3,
                        type:'img',
                        value:commonPath+'/l_xinbao1.png',
                        directioin:'left',
                        x:0,
                        y:60,
                        hide_ele_index:null
                    },
                    {
                        index:4,
                        type:'text',
                        value:MSG.c11_endstory_3,
                        directioin:'left',
                        x:12,
                        y:65,
                        hide_ele_index:2
                    }
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.task]},
                        {key:'text',value:  [
                        						{
                                                    desc:MSG.c11_step_page_a,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                },
                                                {
                                                    desc:MSG.c11_step_page_0,
                                                    style:{textAlign:'left',margin:'1.5% 10px'}
                                                },
                                                {
                                                    desc:MSG.c11_step_page_1,
                                                    style:{textAlign:'left',margin:'1.5% 20px',fontSize:'0.9em',color:'#A1B3B7'}
                                                },
                                                {   desc:MSG.c11_step_page_2,
                                                    style:{textAlign:'left',margin:'1.5% 10px'}
                                                },
                                                {
                                                    desc:MSG.c11_step_page_3,
                                                    style:{textAlign:'left',margin:'1.5% 10px'}
                                                },
                                                {
                                                    desc:MSG.c11_step_page_4,
                                                    style:{textAlign:'left',margin:'1.5% 20px',fontSize:'0.9em',color:'#A1B3B7'}
                                                },
                                                {   desc:MSG.c11_step_page_5,
                                                    style:{textAlign:'left',margin:'1.5% 10px'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c11_step_page_6]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c11_step_page_7,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page1.png',
                                                style:{textAlign:'center',margin:'8%',width:'160px'}
                                            }
                                          ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c11_step_page_8,
                                                    style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}
                                                },
                                                {   desc:MSG.c11_step_page_9,
                                                    style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}
                                                },
                                                {
                                                    desc:MSG.c11_step_page_10,
                                                    style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}
                                                },
                                                {   desc:MSG.c11_step_page_11,
                                                    style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c11_step_page_12]},
                        {key:'text',value:[
                                                {
                                                        desc:MSG.c11_step_page_13,
                                                        style:{textAlign:'left',margin:'2% 10px'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page2_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'160px'}
                                            }
                                          ]
                        },
                        {key:'text',value:[
                                                {
                                                        desc:MSG.c11_step_page_14,
                                                        style:{textAlign:'left',margin:'2% 10px'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page2_2.png',
                                                style:{textAlign:'center',margin:'2%',width:'160px'}
                                            }
                                          ]
                        },
                        {key:'text',value:[
                                                {
                                                        desc:MSG.c11_step_page_15,
                                                        style:{textAlign:'left',margin:'2% 10px'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page2_3.png',
                                                style:{textAlign:'center',margin:'2%',width:'305px'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.step_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c11_step_page_16,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'text',value:[
                                                {
                                                    desc:MSG.c11_step_page_17,
                                                    style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page3_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'190px'}
                                            }
                                          ]
                        },
                        {key:'text',value:[
                                                {
                                                        desc:MSG.c11_step_page_18,
                                                        style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page3_2.png',
                                                style:{textAlign:'center',margin:'1%',width:'300px'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.step_2]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c11_step_page_19,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'text',value:[
                                                {
                                                    desc:MSG.c11_step_page_20,
                                                    style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page4_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'200px'}
                                            }
                                          ]
                        },
                        {key:'text',value:[
                                                {
                                                    desc:MSG.c11_step_page_21,
                                                    style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_11/images/'+curLanguage+'/page3_2.png',
                                                style:{textAlign:'center',margin:'1%',width:'300px'}
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
                                                src:appPath+'/course_11/images/'+curLanguage+'/desc1.png',
                                                style:{height:'197px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]
                ],
    videoSrc :appPath+"/course_11/video/course_11.mp4",
    isShowTrash : true,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_phone_condition"></block><block type="program_goto_touch_condition"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea" ><block type="movement_servo_rotate_circle"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1"><block type="custom_control_wait_seconds"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num"><field name="NUM">5000</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ><block type="event_mainboard_power"></block><block type="event_infrared_sensor"></block><block type="event_gyroscope"></block><block type="event_phone_pad_tilt"></block></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d" ><block type="id_show_play_effects"></block><block type="id_show_play_tune"></block><block type="id_show_emoji"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_scenelight"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_led"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3000</field></shadow></value></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ><block type="sensor_infrared_sensor_distance"></block><block type="sensor_gyroscope_sensor_angle"></block><block type="sensor_servo_angle"></block><block type="sensor_set_gyrocope_to_zero"></block></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"><block type="custom_math_num"></block><block type="custom_math_variables_get"></block><block type="custom_math_variables_set"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_variable_change"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_add_minus"><value name="FIRST_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="SECOND_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_random_int"><value name="FROM"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="TO"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_constrain"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">50</field></shadow></value><value name="LOW"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_logic_compare"></block><block type="custom_math_logic_and"></block><block type="custom_math_logic_not"></block></category></xml>',//菜单可配置
    toolConfigShow : [0,1,1,0,0,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="63" y="42"><next><block type="movement_servo_rotate_circle" id="a)nTfs@gu)-(?.xL{BAD"><field name="servoGroup">[{"servoId":"1","direction":"1","speed":"M"},{"servoId":"2","direction":"2","speed":"M"},{"servoId":"3","direction":"1","speed":"M"},{"servoId":"4","direction":"2","speed":"M"}]</field><next><block type="custom_control_wait_seconds" id="d)#ytXWkJ,FT{xs;KXxk"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="^E=PPwJFdcrSW4lt{4p1"><field name="NUM">2000</field></shadow></value><next><block type="movement_servo_rotate_circle" id="VI}}x*Oau6id7O)j{dc("><field name="servoGroup">[{"servoId":"1","direction":"2","speed":"M"},{"servoId":"2","direction":"1","speed":"M"},{"servoId":"3","direction":"2","speed":"M"},{"servoId":"4","direction":"1","speed":"M"}]</field><next><block type="custom_control_wait_seconds" id="xOs(weSW1A)4*G=LHWMj"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="b~~xLkWE#Y2W_)F:jXTC"><field name="NUM">3000</field></shadow></value></block></next></block></next></block></next></block></next></block></xml>',//xml字符串
};
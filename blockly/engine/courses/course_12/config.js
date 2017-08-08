if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 12,
    courseName : '课程12',
    courseTitle:MSG.course12_title,
    backgroundImg:appPath+'/course_12/images/bg.jpg',
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
                            value:MSG.c12_startstory_1,
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
                            value:MSG.c12_startstory_2,
                            directioin:'right',
                            x:12,
                            y:40,
                            hide_ele_index:1
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
                        y:35,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value:MSG.c12_endstory_1,
                        directioin:'right',
                        x:12,
                        y:40,
                        hide_ele_index:null
                    },
                    {
                        index:2,
                        type:'img',
                        value:commonPath+'/l_xinbao1.png',
                        directioin:'left',
                        x:0,
                        y:60,
                        hide_ele_index:null
                    },
                    {
                        index:3,
                        type:'text',
                        value:MSG.c12_endstory_2,
                        directioin:'left',
                        x:12,
                        y:65,
                        hide_ele_index:1
                    }
                ]
    ],
        allStepPage: [ 
                        [
                            {key:'title',value:[MSG.c12_step_page1_1]},
                            {key:'text',value:  [
                                                    {
                                                        desc:MSG.c12_step_page1_2,
                                                        style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                    },
                                                    {
                                                        desc:MSG.c12_step_page1_3,
                                                        style:{textAlign:'left',margin:'1.5% 10px'}
                                                    },
                                                    {
                                                        desc:MSG.c12_step_page1_4,
                                                        style:{textAlign:'left',margin:'1.5% 20px',fontSize:'0.9em',color:'#A1B3B7'}
                                                    },
                                                    {   desc:MSG.c12_step_page1_5,
                                                        style:{textAlign:'left',margin:'1.5% 10px'}
                                                    },
                                                    {
                                                        desc:MSG.c12_step_page1_6,
                                                        style:{textAlign:'left',margin:'1.5% 10px'}
                                                    },
                                                    {
                                                        desc:MSG.c12_step_page1_7,
                                                        style:{textAlign:'left',margin:'1.5% 20px',fontSize:'0.9em',color:'#A1B3B7'}
                                                    },
                                                    {   desc:MSG.c12_step_page1_8,
                                                        style:{textAlign:'left',margin:'1.5% 10px'}
                                                    },
                                                    {
                                                        desc:MSG.c12_step_page1_9,
                                                        style:{textAlign:'left',margin:'1.5% 10px'}
                                                    },
                                                    {
                                                        desc:MSG.c12_step_page1_10,
                                                        style:{textAlign:'left',margin:'1.5% 20px',fontSize:'0.9em',color:'#A1B3B7'}
                                                    },
                                                    {
                                                        desc:MSG.c12_step_page1_11,
                                                        style:{textAlign:'left',margin:'1.5% 10px'}
                                                    }
                                                ]
                            }
                        ],
                        [
                            {key:'title',value:[MSG.c12_step_page2_1]},
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page2_2,
                                                        style:{textAlign:'left',margin:'2% 10px'}
                                                }
                                                ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page1_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'200px'}
                                            }
                                          ]
                            },
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page2_3,
                                                        style:{textAlign:'left',margin:'2% 10px'}
                                                }
                                            ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page1_2.png',
                                                style:{textAlign:'center',margin:'2%',width:'200px'}
                                            }
                                          ]
                            }
                        ],
                        [
                            {key:'title',value:[MSG.c12_step_page3_1]},
                            {key:'text',value:  [
                                                {
                                                    desc:MSG.c12_step_page3_2,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                            },
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page3_3,
                                                        style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page2_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'200px'}
                                            }
                                          ]
                            },
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page3_4,
                                                        style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page2_2.png',
                                                style:{textAlign:'center',margin:'2%',width:'300px'}
                                            }
                                          ]
                            }
                        ],
                        [
                            {key:'title',value:[MSG.c12_step_page4_1]},
                            {key:'text',value:  [
                                                {
                                                    desc:MSG.c12_step_page4_2,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                            },
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page4_3,
                                                        style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page3_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'200px'}
                                            }
                                          ]
                            },
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page4_4,
                                                        style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page2_2.png',
                                                style:{textAlign:'center',margin:'2%',width:'300px'}
                                            }
                                          ]
                            }
                        ],[
                            {key:'title',value:[MSG.c12_step_page5_1]},
                            {key:'text',value:  [
                                                {
                                                    desc:MSG.c12_step_page5_2,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                            },
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page5_3,
                                                        style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page4_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'200px'}
                                            }
                                          ]
                            },
                            {key:'text',value:[
                                                {
                                                        desc:MSG.c12_step_page5_4,
                                                        style:{textAlign:'left',margin:'2% 10px',color:'#A1B3B7'}
                                                }
                                            ]
                            },
                            {key:'img',value:[
                                            {
                                                src:appPath+'/course_12/images/'+curLanguage+'/page2_2.png',
                                                style:{textAlign:'center',margin:'2%',width:'300px'}
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
                                                    src:appPath+'/course_12/images/'+curLanguage+'/desc1.png',
                                                    style:{height:'197px'}
                                                }
                                        ]
                            },
                            {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                        ]
    ],
    videoSrc :appPath+"/course_12/video/course_12.mp4",
    isShowTrash : true,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_phone_condition"></block><block type="program_goto_touch_condition"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea"><block type="movement_servo_rotate_circle"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1"><block type="custom_control_wait_seconds"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num"><field name="NUM">5000</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ><block type="event_mainboard_power"></block><block type="event_infrared_sensor"></block><block type="event_gyroscope"></block><block type="event_phone_pad_tilt"></block></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d" ><block type="id_show_play_effects"></block><block type="id_show_play_tune"></block><block type="id_show_emoji"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_scenelight"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_led"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3000</field></shadow></value></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ><block type="sensor_infrared_sensor_distance"></block><block type="sensor_gyroscope_sensor_angle"></block><block type="sensor_servo_angle"></block><block type="sensor_set_gyrocope_to_zero"></block></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"><block type="custom_math_num"></block><block type="custom_math_variables_get"></block><block type="custom_math_variables_set"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_variable_change"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_add_minus"><value name="FIRST_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="SECOND_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_random_int"><value name="FROM"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="TO"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_constrain"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">50</field></shadow></value><value name="LOW"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_logic_compare"></block><block type="custom_math_logic_and"></block><block type="custom_math_logic_not"></block></category></xml>',//菜单可配置
    toolConfigShow : [0,1,1,0,0,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"><next><block type="movement_servo_rotate_circle" id="ofX6khbcKK@P^G}aETjx"><field name="servoGroup">[{"servoId":"1","direction":"1","speed":"M"},{"servoId":"2","direction":"2","speed":"M"},{"servoId":"3","direction":"1","speed":"M"},{"servoId":"4","direction":"2","speed":"M"}]</field><next><block type="custom_control_wait_seconds" id="?w1u7En8A=C5P21.bKSc"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="n?@8TLuf_P^{NZ[(c[M5"><field name="NUM">1000</field></shadow></value><next><block type="movement_servo_rotate_circle" id="?eIA`8t%CJX19ArLpi@W"><field name="servoGroup">[{"servoId":"1","direction":"1","speed":"VF"},{"servoId":"2","direction":"2","speed":"VS"},{"servoId":"3","direction":"1","speed":"VF"},{"servoId":"4","direction":"2","speed":"VS"}]</field><next><block type="custom_control_wait_seconds" id="c];gHucG]x2B-iA48=x]"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="j~v5f!L)+VmQ(f,zZg~@"><field name="NUM">3000</field></shadow></value><next><block type="movement_servo_rotate_circle" id="u%?v-U[x!kNqu)16d*6~"><field name="servoGroup">[{"servoId":"1","direction":"1","speed":"VS"},{"servoId":"2","direction":"2","speed":"VF"},{"servoId":"3","direction":"1","speed":"VS"},{"servoId":"4","direction":"2","speed":"VF"}]</field><next><block type="custom_control_wait_seconds" id="dwNk(0KRnntW8}1p-Z.r"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="FeK2Y`)[P290CG?q(3XU"><field name="NUM">3000</field></shadow></value></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',//xml字符串
};
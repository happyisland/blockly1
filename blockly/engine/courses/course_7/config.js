if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 7,
    courseName : '课程7',
    courseTitle:MSG.course7_title,
    backgroundImg:appPath+'/course_7/images/bg.jpg',
    startStory : [
                    [
                        {
                            index:0,
                            type:'img',
                            value:commonPath+'/l_xinbao3.png',
                            directioin:'left',
                            x:0,
                            y:20,
                            hide_ele_index:null
                        },
                        {
                            index:1,
                            type:'text',
                            value:MSG.c7_startstory_1,
                            directioin:'left',
                            x:12,
                            y:25,
                            hide_ele_index:null
                        },
                        {
                            index:2,
                            type:'text',
                            value:MSG.c7_startstory_2,
                            directioin:'left',
                            x:12,
                            y:25,
                            hide_ele_index:1
                        },
                        {
                            index:3,
                            type:'text',
                            value:MSG.c7_startstory_3,
                            directioin:'left',
                            x:12,
                            y:25,
                            hide_ele_index:2
                        },
                        {
                            index:4,
                            type:'text',
                            value:MSG.c7_startstory_4,
                            directioin:'left',
                            x:12,
                            y:25,
                            hide_ele_index:3
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
                        value:MSG.c7_endstory_1,
                        directioin:'left',
                        x:12,
                        y:55,
                        hide_ele_index:null
                    },
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.c7_step_page1_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c7_step_page1_2,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                },
                                                {
                                                    desc:MSG.c7_step_page1_3,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {   desc:MSG.c7_step_page1_4,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {
                                                    desc:MSG.c7_step_page1_5,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1% 20px'}
                                                },
                                                {   desc:MSG.c7_step_page1_6,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1% 20px'}
                                                },
                                                {
                                                    desc:MSG.c7_step_page1_7,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1% 20px'}
                                                },
                                                {
                                                    desc:MSG.c7_step_page1_8,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1% 20px'}
                                                },
                                                {   desc:MSG.c7_step_page1_9,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1% 20px'}
                                                },
                                                {
                                                    desc:MSG.c7_step_page1_10,
                                                    style:{textAlign:'left',margin:'1.5% 10px 1% 20px'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c7_step_page2_1]},
                        {key:'text',value: [
                                                {   desc:MSG.c7_step_page2_2,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_7/images/'+curLanguage+'/page1.png',
                                                style:{textAlign:'center',margin:'2%',width:'270px'}
                                            }]
                        },
                        {key:'text',value:  [
                                                {desc:MSG.c7_step_page2_3,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c7_step_page2_4,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c7_step_page2_5,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c7_step_page2_6,style:{textAlign:'left',margin:'1.5% 20px',color:'#A1B3B7'}}
                                            ]
                        },
                    ],
                    [
                        {key:'title',value:[MSG.c7_step_page3_1]},
                        {key:'text',value: [
                                                {   desc:MSG.c7_step_page3_2,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_7/images/'+curLanguage+'/page2.png',
                                                style:{textAlign:'center',margin:'20%',width:'300px'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c7_step_page4_1]},
                        {key:'text',value: [
                                                {   desc:MSG.c7_step_page4_2,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_7/images/'+curLanguage+'/page3.png',
                                                style:{textAlign:'center',margin:'2%',width:'310px'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c7_step_page5_1]},
                        {key:'text',value: [
                                                {   desc:MSG.c7_step_page5_2,
                                                    style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'text',value: [
                                                {   desc:MSG.c7_step_page5_3,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_7/images/'+curLanguage+'/page4_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'150px'}
                                            }
                                          ]
                        },
                        {key:'text',value: [
                                                {   desc:MSG.c7_step_page5_4,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_7/images/'+curLanguage+'/page4_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'150px'}
                                            }
                                          ]
                        },
                        {key:'text',value: [
                                                {   desc:MSG.c7_step_page5_5,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
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
                                                src:appPath+'/course_7/images/'+curLanguage+'/desc1.png',
                                                style:{height:'217px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]
                ],
    videoSrc :appPath+"/course_7/video/course_7.mp4",
    isShowTrash : true,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_phone_condition"></block><block type="program_goto_touch_condition"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea"><block type="actions_636252715835204660"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1" ><block type="custom_control_repeat_times"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num"><field name="NUM">3</field></shadow></value></block><block type="custom_control_wait_seconds"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num"><field name="NUM">5000</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ><block type="event_mainboard_power"></block><block type="event_infrared_sensor"></block><block type="event_gyroscope"></block><block type="event_phone_pad_tilt"></block></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d"><block type="id_show_led"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3000</field></shadow></value></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ><block type="sensor_infrared_sensor_distance"></block><block type="sensor_gyroscope_sensor_angle"></block><block type="sensor_servo_angle"></block><block type="sensor_set_gyrocope_to_zero"></block></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"><block type="custom_math_num"></block><block type="custom_math_variables_get"></block><block type="custom_math_variables_set"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_variable_change"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_add_minus"><value name="FIRST_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="SECOND_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_random_int"><value name="FROM"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="TO"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_constrain"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">50</field></shadow></value><value name="LOW"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_logic_compare"></block><block type="custom_math_logic_and"></block><block type="custom_math_logic_not"></block></category></xml>',//菜单可配置
    toolConfigShow : [0,1,1,0,1,0,0],//菜单是否锁定 
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="-13" y="43"><next><block type="actions_636252715835204660" id="V%Xb5kjFtijowsoMo!NX"><next><block type="custom_control_repeat_times" id="M}/fkIn,QsK#Sx7@~zrr"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num" id="3UR[Jv90PD1=GO/;^mU0"><field name="NUM">3</field></shadow></value><statement name="CUSTOM_CONTROL_DO0"><block type="id_show_led" id="02kyjdHgk!uM(zpkSCbA"><field name="Light">{"lightArray":[{"lights":["#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00"],"id":"1"},{"lights":["#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00","#ff7f00"],"id":"2"}],"islightLock":true}</field><value name="value_input"><shadow type="custom_math_num" id="24_#l1YI9UPZ?8kO~Jap"><field name="NUM">1000</field></shadow></value><next><block type="custom_control_wait_seconds" id=")zsP9C%#E/!/rl0yBGxA"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id=")DmWjPt;(rFpUuK(R)^#"><field name="NUM">1000</field></shadow></value><next><block type="id_show_led" id=".9^0pfzMU.g]7:u=F=(e"><field name="Light">{"lightArray":[{"lights":["#fe0000","#fe0000","#fe0000","#fe0000","#fe0000","#fe0000","#fe0000","#fe0000"],"id":"1"},{"lights":["#fe0000","#fe0000","#fe0000","#fe0000","#fe0000","#fe0000","#fe0000","#fe0000"],"id":"2"}],"islightLock":true}</field><value name="value_input"><shadow type="custom_math_num" id="(dQO6sl^q2fWpLo@(c10"><field name="NUM">2000</field></shadow></value><next><block type="custom_control_wait_seconds" id="2sauk_`)Vf)mLTuz1u5V"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="lPW+glv^2G#jq5`,oi~!"><field name="NUM">2000</field></shadow></value><next><block type="id_show_led" id="g2uc@t1:1,%K?_vNqb.M"><field name="Light">{"lightArray":[{"lights":["#00ff01","#00ff01","#00ff01","#00ff01","#00ff01","#00ff01","#00ff01","#00ff01"],"id":"1"},{"lights":["#00ff01","#00ff01","#00ff01","#00ff01","#00ff01","#00ff01","#00ff01","#00ff01"],"id":"2"}],"islightLock":true}</field><value name="value_input"><shadow type="custom_math_num" id="_geqZ;kQ-kVQ;uovaY1f"><field name="NUM">1000</field></shadow></value><next><block type="custom_control_wait_seconds" id="L75!!gika_8QVNd,}x)X"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num" id="ia}Rs{8@mtiOS7Jwd(6L"><field name="NUM">1000</field></shadow></value></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></next></block></xml>',//xml字符串
};
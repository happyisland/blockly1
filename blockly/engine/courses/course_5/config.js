if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 5,
    courseName : '课程5',
    courseTitle:MSG.course5_title,
    backgroundImg:appPath+'/course_5/images/bg.jpg',
    startStory : [
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
                            value:MSG.c5_startstory_1,
                            directioin:'left',
                            x:12,
                            y:55,
                            hide_ele_index:null
                        },
                        {
                            index:2,
                            type:'text',
                            value:MSG.c5_startstory_2,
                            directioin:'left',
                            x:12,
                            y:55,
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
                        y:55,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value:MSG.c5_endstory_1,
                        directioin:'left',
                        x:12,
                        y:60,
                        hide_ele_index:null
                    }
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.c5_step_page1_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c5_step_page1_2,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                },
                                                {
                                                    desc:MSG.c5_step_page1_3,
                                                    style:{textAlign:'left',margin:'3% 10px'}
                                                },
                                                {   desc:MSG.c5_step_page1_4,
                                                    style:{textAlign:'left',margin:'3% 10px'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c5_step_page2_1]},
                        {key:'text',value:[MSG.c5_step_page2_2]},
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_5/images/'+curLanguage+'/page1.png',
                                                style:{textAlign:'center',margin:'16% 0 10% 0'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c5_step_page3_1]},
                        {key:'text',value:[MSG.c5_step_page3_2]},
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_5/images/'+curLanguage+'/page2.png',
                                                style:{textAlign:'center',margin:'16% 0 10% 0',width:'240px'}
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
                                                src:appPath+'/course_5/images/'+curLanguage+'/desc1.png',
                                                style:{height:'197px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]
                ],
    videoSrc :appPath+"/course_5/video/course_5.mp4",
    isShowTrash : true,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea" ><block type="actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1" ><block type="custom_control_repeat_times"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num"><field name="NUM">3</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d" ><block type="id_show_play_effects"></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"></category></xml>',//菜单可配置
    toolConfigShow : [0,1,1,0,1,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="55" y="20"><next><block type="id_show_play_effects" id="XoYWs.h4{V)p3m?/A2qu"><field name="Effect">{"key":"cheerful","description":"愉快","type":"emotion","isDelay":false}</field><next><block type="custom_control_repeat_times" id="t+%D~Q3]#ZY6marqvx_4"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num" id="qtZ4D+9-[6Tc+?i6VWIR"><field name="NUM">3</field></shadow></value><statement name="CUSTOM_CONTROL_DO0"><block type="actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c" id="7mE%J.?%~gnRa!tgbpcU"></block></statement></block></next></block></next></block></xml>',//xml字符串
};
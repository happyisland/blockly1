if (window.blocklyObj) {
    var appPath = '../../../courses/AstroBot';
} else {
    var appPath = './../engine/courses';
}
var commonPath = 'images/courses';
var curLanguage = window.LANGUAGE_CODE;
var courseData = {
    courseId : 6,
    courseName : '课程6',
    courseTitle:MSG.course6_title,
    backgroundImg:appPath+'/course_6/images/bg.jpg',
    startStory : [
                    [
                        {
                            index:0,
                            type:'img',
                            value:commonPath+'/l_xinbao3.png',
                            directioin:'left',
                            x:0,
                            y:50,
                            hide_ele_index:null
                        },
                        {
                            index:1,
                            type:'text',
                            value:MSG.c6_startstory_1,
                            directioin:'left',
                            x:12,
                            y:55,
                            hide_ele_index:null
                        },
                        {
                            index:2,
                            type:'text',
                            value:MSG.c6_startstory_2,
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
                        value:commonPath+'/r_xinbao1.png',
                        directioin:'right',
                        x:0,
                        y:25,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value:MSG.c6_endstory_1,
                        directioin:'right',
                        x:12,
                        y:30,
                        hide_ele_index:null
                    }
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.c6_step_page1_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c6_step_page1_2,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                },
                                                {
                                                    desc:MSG.c6_step_page1_3,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {   desc:MSG.c6_step_page1_4,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {
                                                    desc:MSG.c6_step_page1_5,
                                                    style:{textAlign:'left',margin:'6% 10px 2% 10px'}
                                                },
                                                {   desc:MSG.c6_step_page1_6,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {
                                                    desc:MSG.c6_step_page1_7,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {
                                                    desc:MSG.c6_step_page1_8,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {   desc:MSG.c6_step_page1_9,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c6_step_page2_1]},
                        {key:'text',value: [
                                                {   desc:MSG.c6_step_page2_2,
                                                    style:{textAlign:'left',margin:'4% 10px 2%',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_6/images/'+curLanguage+'/page1_1.png',
                                                style:{textAlign:'center',margin:'5% 0'}
                                            }
                                         ]
                        },
                        {key:'text',value: [
                                                {   desc:MSG.c6_step_page2_3,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {   
                                                src:appPath+'/course_6/images/'+curLanguage+'/page1_2.png',
                                                style:{textAlign:'center',margin:'5% 0'}
                                            }
                                        ]
                        },
                        {key:'text',value:  [
                                                {desc:MSG.c6_step_page2_4,style:{textAlign:'left',margin:'2% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c6_step_page2_5,style:{textAlign:'left',margin:'2% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c6_step_page2_6,style:{textAlign:'left',margin:'2% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c6_step_page2_7,style:{textAlign:'left',margin:'2% 20px',color:'#A1B3B7'}}
                                            ]
                        },
                        {key:'text',value: [
                                                {   desc:MSG.c6_step_page2_8,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_6/images/'+curLanguage+'/page1_3.png',
                                                style:{textAlign:'center',margin:'0',width:'350px'}
                                            }
                                        ]
                        },
                        {key:'text',value: [
                                                {   desc:MSG.c6_step_page2_9,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'text',value:  [
                                                {desc:MSG.c6_step_page2_10,style:{textAlign:'left',margin:'2% 20px',color:'#A1B3B7'}},
                                                {desc:MSG.c6_step_page2_11,style:{textAlign:'left',margin:'2% 20px',color:'#A1B3B7'}}
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c6_step_page3_1]},
                        {key:'text',value:[
                                            {
                                                desc: MSG.c6_step_page3_2,
                                                style:{textAlign:'left',margin:'2% 10px',fontSize:'1.1em'}
                                            }
                                          ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_6/images/'+curLanguage+'/page2.png',
                                                style:{textAlign:'center',margin:'2%',width:'300px'}
                                            }
                                        ]
                        },
                        {key:'text',value:  [
                                                {desc:MSG.c6_step_page3_3,style:{textAlign:'left',margin:'1.5% 10px',color:'#A1B3B7'}},
                                                {desc:MSG.c6_step_page3_4,style:{textAlign:'left',margin:'1.5% 10px',color:'#A1B3B7'}},
                                                {desc:MSG.c6_step_page3_5,style:{textAlign:'left',margin:'1.5% 10px',color:'#A1B3B7'}}
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c6_step_page4_1]},
                        {key:'text',value:[
                                            {
                                                desc: MSG.c6_step_page4_2,
                                                style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                            }
                                          ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_6/images/'+curLanguage+'/page3.png',
                                                style:{textAlign:'center',margin:'10%'}
                                            }
                                         ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c6_step_page4_3,
                                                    style:{textAlign:'center',margin:'8% 10px 2%',color:'#A1B3B7'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c6_step_page5_1]},
                        {key:'text',value:[
                                            {
                                                desc: MSG.c6_step_page5_2,
                                                style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                            }
                                          ]
                        },
                        {key:'text',value:[
                                            {
                                                desc: MSG.c6_step_page5_3,
                                                style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                            }
                                          ]
                        },
                        {key:'img',value: [
                                            { 
                                                src:appPath+'/course_6/images/'+curLanguage+'/page4_1.png',
                                                style:{textAlign:'center',margin:'2%',width:'240px'}
                                            }
                                        ]
                        },
                        {key:'text',value:[
                                            {
                                                desc: MSG.c6_step_page5_4,
                                                style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                            }
                                          ]
                        },
                        {key:'img',value:[
                                            {   
                                                src:appPath+'/course_6/images/'+curLanguage+'/page4_2.png',
                                                style:{textAlign:'center',margin:'2%',width:'340px'}
                                            }                     
                                        ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c6_step_page6_1]},
                        {key:'text',value:[
                                            {
                                                desc: MSG.c6_step_page6_2,
                                                style:{textAlign:'center',margin:'2% 10px',fontSize:'1.1em'}
                                            }
                                          ]
                        },
                        {key:'img',value:[
                                            {
                                                src:appPath+'/course_6/images/'+curLanguage+'/page5.png',
                                                style:{textAlign:'center',margin:'15% 10px 5%'}
                                            }
                                         ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c6_step_page6_3,
                                                    style:{textAlign:'center',margin:'25% 10px 2%',color:'#A1B3B7'}
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
                                                src:appPath+'/course_6/images/'+curLanguage+'/desc1.png',
                                                style:{height:'197px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]
                ],
    videoSrc :appPath+"/course_6/video/course_6.mp4",
    isShowTrash : true,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea"><block type="actions_636252715835204660"></block><block type="actions_6227af3e-fcc0-4141-87a9-948574190e20"></block><block type="actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1" ><block type="custom_control_repeat_times"><value name="CUSTOM_CONTROL_REPEAT_TIMES"><shadow type="custom_math_num"><field name="NUM">3</field></shadow></value></block><block type="custom_control_wait_seconds"><value name="CUSTOM_CONTROL_WAIT_SECONDS"><shadow type="custom_math_num"><field name="NUM">5000</field></shadow></value></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674" ></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d" ><block type="id_show_play_effects"></block><block type="id_show_play_tune"></block><block type="id_show_emoji"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_scenelight"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block><block type="id_show_led"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3000</field></shadow></value></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"></category></xml>',//菜单可配置
    toolConfigShow : [1,1,0,0,0,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="36" y="48"></block><block type="program_goto_start" id="B226B[xgE8LXFEmZhZTk" x="57" y="176"></block><block type="program_goto_start" id="CFp{hLTIsMsB?=G5mXF2" x="179" y="312"></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"><next><block type="actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c" id="go8KC)K{!%NWlg;shR4Z"><next><block type="program_goto_start" id="kUb-C@tsW3~/#:PK/;c1"></block></next></block></next></block><block type="program_goto_infrared_condition" id="m%+t%MgpjPg:s6[c5?BX" x="79" y="149"><field name="PROGRAM_BRANCH">60</field><field name="SENSOR">infrared</field><field name="VALUE">10</field><field name="SENSOR_ID">1</field><field name="OP">LTE</field><field name="DISTANCE">10</field><next><block type="actions_636252715835204660" id="[#m*`O,j?+?36@_Kx@Q!"><next><block type="actions_6227af3e-fcc0-4141-87a9-948574190e20" id=".utlYV8[sNCbf[(tvsE,"><next><block type="actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c" id="5qe!xcoT?vnx{klS.4q~"><next><block type="program_goto_start" id="=5ZJi_rGbfPfEuc6!?Fg"></block></next></block></next></block></next></block></next></block></xml>',//xml字符串
};
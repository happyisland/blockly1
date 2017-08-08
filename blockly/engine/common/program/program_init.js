/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * program_init.js version 1.0
 * 
 * code local 
 * 
 * feature language international
 * 
 */
'use strict'
;(function() {

    var blocklyDatas = require('./../../service/blockly_datas');
    var eventsListener = require('./../events_listener');
    var $ = require('jquery');
    var colours = require('./../../service/colours');
    var utils = require('./../../common/utils/utils');
    var ToolConfig = require('./../../adapter/toolbox_config');
    var CodeLanguage  = {};
    var React = require('react');
    var ReactDOM = require('react-dom');
    /**
     * Lookup for names of supported languages.  Keys should be in ISO 639 format.
     */
    CodeLanguage.LANGUAGE_NAME = {
        'ar': 'العربية',
        'be-tarask': 'Taraškievica',
        'br': 'Brezhoneg',
        'ca': 'Català',
        'cs': 'Česky',
        'da': 'Dansk',
        'de': 'Deutsch',
        'el': 'Ελληνικά',
        'en': 'English',
        'es': 'Español',
        'fa': 'فارسی',
        'fr': 'Français',
        'he': 'עברית',
        'hrx': 'Hunsrik',
        'hu': 'Magyar',
        'ia': 'Interlingua',
        'is': 'Íslenska',
        'it': 'Italiano',
        'ja': '日本語',
        'ko': '한국어',
        'mk': 'Македонски',
        'ms': 'Bahasa Melayu',
        'nb': 'Norsk Bokmål',
        'nl': 'Nederlands, Vlaams',
        'oc': 'Lenga d\'òc',
        'pl': 'Polski',
        'pms': 'Piemontèis',
        'pt-br': 'Português Brasileiro',
        'ro': 'Română',
        'ru': 'Русский',
        'sc': 'Sardu',
        'sk': 'Slovenčina',
        'sr': 'Српски',
        'sv': 'Svenska',
        'ta': 'தமிழ்',
        'th': 'ภาษาไทย',
        'tlh': 'tlhIngan Hol',
        'tr': 'Türkçe',
        'uk': 'Українська',
        'vi': 'Tiếng Việt',
        'zh-hans': '简体中文',
        'zh-hant': '正體中文'
    };

    /**
     * List of RTL languages.
     */
    CodeLanguage.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

    /**
     * Extracts a parameter from the URL.
     * If the parameter is absent default_value is returned.
     * @param {string} name The name of the parameter.
     * @param {string} defaultValue Value to return if paramater not found.
     * @return {string} The parameter value or the default value if not found.
     */
    CodeLanguage.getStringParamFromUrl = function(name, defaultValue) {
        var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
        return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
    };

    /**
     * Get the language of this user from the URL.
     * @return {string} User's language.
     */
    CodeLanguage.getLang = function() {
        var lang = CodeLanguage.getStringParamFromUrl('lang', '');
        if (CodeLanguage.LANGUAGE_NAME[lang] === undefined) {
            // Default to English.
            lang = 'en';
        }
        return lang;
    };

    /**
     * Is the current language (Code.LANG) an RTL language?
     * @return {boolean} True if RTL, false if LTR.
     */
    CodeLanguage.isRtl = function() {
        return CodeLanguage.LANGUAGE_RTL.indexOf(CodeLanguage.LANG) != -1;
    };

    /**
     * Load blocks saved on App Engine Storage or in session/local storage.
     * @param {string} defaultXml Text representation of default blocks.
     */
    CodeLanguage.loadBlocks = function(defaultXml) {
        try {
            var loadOnce = window.sessionStorage.loadOnceBlocks;
        } catch(e) {
            // Firefox sometimes throws a SecurityError when accessing sessionStorage.
            // Restarting Firefox fixes this, so it looks like a bug.
            var loadOnce = null;
        }
        if ('BlocklyStorage' in window && window.location.hash.length > 1) {
            // An href with #key trigers an AJAX call to retrieve saved blocks.
            BlocklyStorage.retrieveXml(window.location.hash.substring(1));
        } else if (loadOnce) {
            // Language switching stores the blocks during the reload.
            delete window.sessionStorage.loadOnceBlocks;
            var xml = Blockly.Xml.textToDom(loadOnce);
            Blockly.Xml.domToWorkspace(xml, CodeLanguage.workspace);
        } else if (defaultXml) {
            // Load the editor with default starting blocks.
            CodeLanguage.workspace.clear();
            var xml = Blockly.Xml.textToDom(defaultXml);
            Blockly.Xml.domToWorkspace(xml, CodeLanguage.workspace);
        } else if ('BlocklyStorage' in window) {
            // Restore saved blocks in a separate thread so that subsequent
            // initialization is not affected from a failed load.
            window.setTimeout(BlocklyStorage.restoreBlocks, 0);
        }
    };
// ======================初始化课程开始==================================================================//
    /**
     * 初始化课程
     */
    CodeLanguage.initCourse = function() {
        CodeLanguage.initCourseStory();
        CodeLanguage.initWorkSpace();
        CodeLanguage.dynamicChangeBgImg();
        CodeLanguage.loadProgramBlockByPlatform();
        CodeLanguage.initCourseTitle();
        CodeLanguage.initCourseTaskDescBtn();
        // CodeLanguage.initCourseTaskDesc();
        CodeLanguage.initReturnbtn();
        CodeLanguage.initRunButton();
        CodeLanguage.initBluetooth();
        CodeLanguage.lockAllMenu();
        CodeLanguage.systemPrompt();

    };
    /**
     * 初始化课程 1、故事
     */
    CodeLanguage.initCourseStory = function() {
        var courseData = require('./../../service/course_data');
        var startStory = courseData.getCourseData().startStory;
        var courseId = courseData.getCourseData().courseId;
        var bgImg = courseData.getCourseData().backgroundImg;
        console.log("program_init.js");
        console.log(startStory);
        var CourseStory = require('./../../test/course_story.jsx');
        var removeCourse = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("course_story"));
            $("#course_story").empty();
        };
        ReactDOM.render(
            React.createElement(
                CourseStory, 
                {   
                    onRemove:  removeCourse,
                    courseId: courseId,
                    bgImg:bgImg,
                    story: startStory,
                    type:"startStory"
                }
            ), document.getElementById("course_story")
        );
    };
    /**
     * 初始化课程 2、动态改变课程工作空间背景图片
     */
    CodeLanguage.dynamicChangeBgImg = function(){
        var courseData = require('./../../service/course_data');
        var course_data = courseData.getCourseData();
        $("#content_blocks>svg").css("background","url("+course_data.backgroundImg+") 0% 0% / cover no-repeat");
    };
    /**
     * 初始化课程 3、标题
     */
    CodeLanguage.initCourseTitle = function() {
        var CourseTitle = require('./../../test/course_title.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("course_title"));
            $("#course_title").empty();
        };
        ReactDOM.render(
            React.createElement(
                CourseTitle, 
                {
                    onRemove:  removeComponent
                }
            ),document.getElementById("course_title")
        );
    };
    /**
     * 初始化课程 4、任务按钮
     */
    CodeLanguage.initCourseTaskDescBtn = function() {
        var CourseTaskDescBtn = require('./../../test/course_taskbtn.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("course_taskbtn"));
            $("#course_taskbtn").empty();
        };
        ReactDOM.render(
            React.createElement(
                CourseTaskDescBtn, 
                {
                    onRemove:  removeComponent
                }
            ),document.getElementById("course_taskbtn")
        );
    };
    /**
     * 初始化课程 4、任务描述
     */
    CodeLanguage.initCourseTaskDesc = function() {
        var CourseTaskdesc = require('./../../test/course_task.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("course_container"));
            $("#course_container").empty();
        };
        ReactDOM.render(
            React.createElement(
                CourseTaskdesc, 
                {
                    onRemove:  removeComponent
                }
            ),document.getElementById("course_container")
        );
        window.setTimeout(function(){
            $("#id_cousetask").toggleClass("active");
            $("#coursetitle_box").addClass("active");
        },80);
    };
    /**
     * 初始化课程 5、 返回按钮
     */
    CodeLanguage.initReturnbtn = function() {
        var Returnbtn = require('./../../test/returnbtn_component.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("prog_return_div"));
            $("#prog_return_div").empty();
        };
        ReactDOM.render(
            React.createElement(
                Returnbtn, 
                {
                    onRemove:  removeComponent
                }),document.getElementById("prog_return_div"));
    };
    /**
     * 初始化 5、 运行按钮
     */
    CodeLanguage.initRunButton = function() {
        var ProgCtrlBtn = require('./../../index/index_prog_ctrl_btn.jsx');
        ReactDOM.render(
            <ProgCtrlBtn imgClass="program-control" isRunning="false" img="images/start.png" />,document.getElementById('prog_ctrl_div')
        );
    };
    /**
     * 初始化课程 6、蓝牙
     */
    CodeLanguage.initBluetooth = function() {
        var Bluetooth = require('./../../test/bluetooth.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("course_blueth"));
            $("#course_blueth").empty();
        };
        ReactDOM.render(
            React.createElement(
                Bluetooth, 
                {
                    onRemove:  removeComponent
                }
            ),document.getElementById("course_blueth")
        );
    };
    /**
     * 初始化课程 7、菜单锁
     */
    CodeLanguage.lockAllMenu = function(){
        var MenuLock = require('./../../test/menu_lock.jsx');
        var removeComponent = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("menulock_box"));
            $("#menulock_box").empty();
        };
        ReactDOM.render(
            React.createElement(
                MenuLock,
                {
                    onRemove:  removeComponent
                }
            ),document.getElementById("menulock_box")
        );
    };
    /**
     * 系统信息
     */
    CodeLanguage.systemPrompt = function(){
        var SystemPromptComponent = require('./../../test/systemPromptComponent.jsx');
        var removeCourse = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("system_prompt"));
            $("#system_prompt").empty();
        };
        ReactDOM.render(
            React.createElement(
                SystemPromptComponent,
                {
                    onRemove:  removeCourse
                }
            ), document.getElementById("system_prompt")
        );
    };
// ======================初始化课程结束==================================================================//
    /**
     * 初始化index的时候载入
     */
    CodeLanguage.init = function() {
        CodeLanguage.initActions();
        CodeLanguage.initLanguage();
        CodeLanguage.initWorkSpace();
        CodeLanguage.loadProgramBlockByPlatform();
        CodeLanguage.initSwift();
    };
    /*
     *根据不同平台加载不同程序块
     *获取系统版本  1--通用版  2--教育版
     */
    CodeLanguage.loadProgramBlockByPlatform = function(){
        var platformType = blocklyDatas.getDataByKey("platformType");
        if(platformType == 2){
            var xmlObj = blocklyDatas.getDataByKey("sysXmlObj");
            if(xmlObj!=""){
                console.log(xmlObj.xmlContent);
                var res = utils.xmlIsCorrect(xmlObj.xmlContent);
                if(res){
                    CodeLanguage.loadBlocks(xmlObj.xmlContent);
                }else{
                    //载入默认的程序
                    CodeLanguage.loadBlocks(blocklyDatas.getDataByKey('defaultXml'));
                }
            }else{
                //载入默认的程序
                CodeLanguage.loadBlocks(blocklyDatas.getDataByKey('defaultXml'));
            }
        }else{
            //载入默认的程序
            var courseData = require('../../service/course_data');
            var courseIndex = courseData.getCourseIndex();
            var initProgram = courseData.getCourseData().initProgram;
            if (initProgram && platformType == 3) {
                CodeLanguage.loadBlocks(initProgram);
            } else {
                CodeLanguage.loadBlocks(blocklyDatas.getDataByKey('defaultXml'));
            }
        }
    };
    /**
     * 初始化swifit
     */
    CodeLanguage.initSwift = function() {
        var BlockShowSwift = require('./../../test/block_show_swift.jsx'); 
        var updateFieldValues = function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("infoShower"));
	        $('#infoShower').empty();
        };
        $('#show_swift').on('click' , function name(e) {
            Blockly.DropDownDiv.hide();
            var programRunning = blocklyDatas.getDataByKey("programRunning");
            if(programRunning) return;
            ReactDOM.render(React.createElement(BlockShowSwift, {onSuccess:  updateFieldValues }), document.getElementById("infoShower"));
        });
    };
    /**
     * 初始化action动作
     */
    CodeLanguage.initActions = function() {
        var xmlNode = document.getElementById('toolbox');
        var cateNode = xmlNode.getElementsByTagName('category');
        var oldHtml = cateNode[1].innerHTML;
        var actionsStr = blocklyDatas.getDataByKey('actions');
        if (actionsStr) {
            var blockNode = '';
	        var actionsArr = actionsStr.split("|");
	        for(var i=0;i<actionsArr.length;i++){
		        var action = actionsArr[i].split(",");
		        blockNode += '<block type="'+action[0]+'"></block>';
		    }
	        cateNode[1].innerHTML = oldHtml + blockNode;	
        }  
    };

    //初始化语言 init language
    CodeLanguage.initLanguage = function() {
        var rtl = CodeLanguage.isRtl();
        document.dir = rtl ? 'rtl' : 'ltr';
        document.head.parentElement.setAttribute('lang', CodeLanguage.LANG);
        var categories = ['id_start', 'id_actions','id_control','id_events','id_show','id_sensors','id_math'];
        for (var i = 0, cat; cat = categories[i]; i++) {
            document.getElementById(cat).setAttribute('name', MSG[cat]);
            document.getElementById(cat).setAttribute('colour', colours[cat].primary);
        }
    };
    //初始化工作空间
    CodeLanguage.initWorkSpace = function() {
        var blockScale = 0.9;
        // 如果横屏时，高度大于600就判定设备为平板设备，block块放大到1.5倍
        if (window.screen.availHeight > 600) {
            blockScale = 1.5;
        }
        var rtl = CodeLanguage.isRtl();
        var courseData = require('../../service/course_data');
        var isShowTrash = courseData.getCourseData().isShowTrash;
        if (window.angular) {
            isShowTrash = true;
        }
        var toolbox = document.getElementById('toolbox');
        if (!toolbox) {
            toolbox = courseData.getCourseData().toolConfig;
        }
        if (!toolbox) {
            var toolConfig = new ToolConfig();
            toolbox = toolConfig.getToolboxString();        
        }

        

        CodeLanguage.workspace = Blockly.inject('content_blocks',
            {
            media: '../media/',
            rtl: rtl,
            toolbox: toolbox,
            trashcan : isShowTrash,
            zoom:
                {controls: true,
                    wheel: true,
                    startScale: blockScale, //default 0.9
                    maxScale: 3,
                    minScale: 0.3,               
                    scaleSpeed: 1.2}
            }
        );
        CodeLanguage.initIndexSpace();
        Blockly.svgResize(CodeLanguage.workspace);

        //载入工作空间后绑定一个工作空间改变事件---界面程序块的移动／新增／拖动／移除变动监控
        var workspaceChangeEvent = function (event) {
            if (event.type == Blockly.Events.UI) {
                return;  // Don't mirror UI events.
            }
            eventsListener.trigger("canvas changed");
        };
        CodeLanguage.workspace.addChangeListener(workspaceChangeEvent);
    };

    //初始化设置index界面的样式
    CodeLanguage.initIndexSpace = function(){
        // 获取窗口总高度
        var winHeight = document.body.clientHeight;
        // 设置工作区高度
        $('#content_blocks')[0].style.height = (winHeight-2)+"px";
        document.getElementsByTagName('svg')[0].getBBox().height = (winHeight)+ 'px';
        // 设置左侧工具栏高度(8是8个线条 9 是包括返回和运行以及菜单9个块)
        var abs_height = (winHeight - 8)/9;
        console.log("平均高度---"+abs_height);
        var icons = ['start', 'actions','control','events','show','sensors','math'];
        var blocklyTreeRoot = document.getElementsByClassName("blocklyTreeRoot");
        blocklyTreeRoot[0].style.marginTop = (abs_height-1)+"px" ;
        var objTemp = document.getElementsByClassName("blocklyTreeRow");
        if(objTemp.length>1){
            //由于第一个生成的菜单空间是隐藏区域，所以在总的菜单数量里面需要去掉一个
            for(var i = 1;i<objTemp.length;i++){
                objTemp[i].style.height = abs_height+"px";        
                objTemp[i].style.width = "110px";                
                $(objTemp[i]).addClass('blocklyTreeRow'+i);
                $('span.blocklyTreeIcon',objTemp[i]).addClass('blocklyTreeIcon_'+icons[i-1]);
                $('span.blocklyTreeIcon',objTemp[i]).attr('type',icons[i-1]);
                var color = colours['id_'+icons[i-1]]['primary'];
                $('span.blocklyTreeLabel',objTemp[i]).attr('style','color:'+color);
                objTemp[i].style.lineHeight = abs_height+"px";
            }
        }        
        
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = CodeLanguage;
        window.codeLanguage = CodeLanguage;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return CodeLanguage });
    } else {
        this.CodeLanguage = CodeLanguage;
    }

}).call(this);
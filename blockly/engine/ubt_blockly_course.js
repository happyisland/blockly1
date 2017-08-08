/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * UbtBlocklyCourse.js version 1.0
 * 
 * course main js
 * 
 * feature init document
 * 
 */
'use strict'
;(function(){
    window.angular = undefined;
    //定时器对象  定时器本身--intervalSelf   产生定时器对象个数---intervalArray
    window.intervalObject = {intervalSelf:0,intervalArray:[]};
    window.kaiguan = 1;//控制指引只放一次
    //课程的进程0:还未进入，1：动画播放完毕，2：视频播放完毕，3指引播放完毕，4课程任务描述出来完毕
    window.courseProcess = 0;
    var interactiveRobot = require('./common/program/interactive_robot');
    var blocklyDatas = require('./service/blockly_datas');
    //平台3  -- 课程
    blocklyDatas.setKeyData('platformType',3);
    //初始化运行状态
    blocklyDatas.setKeyData('programRunning',false);
    var ubtUtils = require('./common/utils/utils');
    //初始化系统数据  界面，初始数据，blockly工作空间，block菜单块
    var codeLanguage = require('./common/program/program_init');
    //var BlockTrashcan = require('./adapter/block_trashcan');
    var infraredSensor = require('./../project/ionicPopup/common/infrared_sensor');
    require('./adapter/field_textinput_extension')();
    require('./adapter/xml_extension')(Blockly.Xml);
    require('./../project/swift/swift');
    require('./../project/css/font-awesome.min.css');
    require('./../project/css/common.css');
    require('./../project/css/guide.css');
    require('./../project/css/servo_angle.css');
    require('./../project/css/time.css');
    require('./../project/css/phone.css');
    require('./../project/css/infrared.css');
    require('./../project/css/video-js.min.css');
    require('./../project/css/default-player.css');

    function UbtBlocklyCourse(params) {     
	   Blockly.Blocks.version = '1.0.0.0';
  }
  // 课程初始化
  UbtBlocklyCourse.prototype.init = function() {
      interactiveRobot.init();
      var languageCode = blocklyDatas.getDataByKey('languageCode');
      if (!languageCode || languageCode =='')  {
          languageCode = 'zh-hans';
          blocklyDatas.setKeyData('languageCode',languageCode);
      }
      if(languageCode == "zh-hans" || languageCode == "zh-hant"){
          languageCode = 'zh-hans';
      }

      //languageCode = 'en';
      blocklyDatas.setKeyData('languageCode',languageCode);
      this.loadLanguageResource(languageCode); 
      window.addEventListener('load', codeLanguage.initCourse);

      infraredSensor.init();
  };

  /**
   * 载入国际化资源
   */
  UbtBlocklyCourse.prototype.loadLanguageResource = function(languageCode) {
      ubtUtils.loadScript('../project/msg/'+languageCode+'.js', function () {
          console.log('../project/msg/'+languageCode+'.js');
          ubtUtils.loadScript('../msg/js/'+languageCode+'.js',function() {
              console.log('../msg/js/'+languageCode+'.js');
              var courseId =blocklyDatas.getDataByKey('courseId');
              window.LANGUAGE_CODE = languageCode;
              if (window.blocklyObj) {
                  var courseJsInfo = '../../../courses/AstroBot/course_'+ courseId +'/config.js';
                  ubtUtils.loadScript(courseJsInfo, function() {
                    var courseData = require('./service/course_data');
                    console.log(courseData, '之前的数据');
                    courseData.refreshData(window.courseData);
                    console.log(courseData, '刷新后的数据');
                    //等到载入国际化的语言后，才开始载入自定义的块
                    // 引入自定义block块
                    require('../project/blocks/blockSpace');

                }); 
              } else {
                var courseId = 2;
                var courseJsInfo = '../engine/courses/course_'+ courseId +'/config.js';
                ubtUtils.loadScript(courseJsInfo, function() {
                    var courseData = require('./service/course_data');
                    console.log(courseData, '之前的数据');
                    courseData.refreshData(window.courseData);
                    console.log(courseData, '刷新后的数据');
                    //等到载入国际化的语言后，才开始载入自定义的块
                    // 引入自定义block块
                    require('../project/blocks/blockSpace');
                }); 
              }
              
          });
      });
  };


  var ubtBlocklyCourse = new UbtBlocklyCourse();
  ubtBlocklyCourse.init();
}).call(this);
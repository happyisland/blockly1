/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * UbtBlocklyApp.js version 1.0
 * 
 * app main js
 * 
 * feature init document
 * 
 */
'use strict'

;(function(){
   //弹出框工作空间
  require('../project/ionicPopup/popup_space');

  var baseBlock = require('./test/base_block');
  var interactiveRobot = require('./common/program/interactive_robot');
  require('./storage/base_storage'); 

  require('./test/emotion.jsx')(Blockly.Blocks);
  require('./test/emotion')(Blockly.JavaScript);
  require('./../project/ionicPopup/common/interactive_methods');
  var blocklyDatas = require('./service/blockly_datas');
  var ubtUtils = require('./common/utils/utils');
  var codeLanguage = require('./common/program/program_init');
  var infraredSensor = require('./../project/ionicPopup/common/infrared_sensor');
  require('./adapter/field_textinput_extension')();
  require('./adapter/xml_extension')(Blockly.Xml);
  //var $ = require('jquery');
  require('./../project/swift/swift');

  function UbtBlocklyApp(params) {     
	   Blockly.Blocks.version = '1.0.0.0';
  }

  UbtBlocklyApp.prototype.init = function() {
      interactiveRobot.init();
      var languageCode = blocklyDatas.getDataByKey('languageCode');
      if (!languageCode || languageCode =='')  {
          languageCode = 'zh-hans';
      }
      var platformType = blocklyDatas.getDataByKey("platformType");
      if (platformType == 2){//教育版
        if(languageCode == "zh-hans" || languageCode == "zh-hant"){
            languageCode = 'zh-hans';
        }else{
            languageCode = 'en';
        }
      }   
      blocklyDatas.setKeyData('languageCode',languageCode);
      this.loadLanguageResource(languageCode); 
      window.addEventListener('load', codeLanguage.init);
      infraredSensor.init();
  };

  /**
   * 载入国际化资源
   */
  UbtBlocklyApp.prototype.loadLanguageResource = function(languageCode) {
      ubtUtils.loadScript('../project/msg/'+languageCode+'.js', function () {
          console.log('../project/msg/'+languageCode+'.js');
          ubtUtils.loadScript('../msg/js/'+languageCode+'.js',function() {
              console.log('../msg/js/'+languageCode+'.js');
              //等到载入国际化的语言后，才开始载入自定义的块
              // 引入自定义block块
              require('../project/blocks/blockSpace');
              require('./index/index_react.jsx');
              require('../project/ionicPopup/soundEffects/sound');
          });
      });
  };


  var ubtBlocklyApp = new UbtBlocklyApp();
  ubtBlocklyApp.init();
  
      
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = UbtBlocklyApp;
    
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return UbtBlocklyApp; });
  } else {
    this.UbtBlocklyApp = UbtBlocklyApp;
  }
}).call(this);
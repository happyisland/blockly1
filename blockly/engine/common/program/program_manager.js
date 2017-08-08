/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * programManager.js version 1.0
 * 
 * program manager
 * 
 * feature save and load program;
 * 
 */
'use strict';
; (function () {

    var _ = require("lodash");
    var $ = require('jquery');
    var Promise = require('bluebird');
    var bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };
    var codeLanguage = require('./program_init');

    function ProgramManager() {
        this.saveCurrentProgram = bind(this.saveCurrentProgram, this);
        console.log("Program Manager initialized");
        this._initialized = false;
        this.programRunners = [];
        this.programRunnerIndex = -1;
    }

    ProgramManager.prototype._initialize = function () {
        if (!this._initialized) {

        } else {
            return Promise.resolve(this);
        }

    };

    /**
     * @params programRunner 程序执行器
     * 
     * 将程序运行期放置到程序管理器中
     */
    ProgramManager.prototype.addProgramRunner = function(programRunner) {
        this.programRunners.push(programRunner);
    }

    /**
     * @params programRunner 程序执行器
     * 
     * 将程序运行期放置到程序管理器中
     */
    ProgramManager.prototype.removeAllProgramRunner = function() {
        this.programRunners = [];
    }


    /**
     * @param index 
     * 
     * @设置当前正在运行的程序管理器
     */
    ProgramManager.prototype.setProgramRunnerIndex = function(index) {
        this.programRunnerIndex = index;
    }

    /**
     * @param index 
     * 
     * @设置当前正在运行的程序管理器
     */
    ProgramManager.prototype.getProgramRunnerIndex = function() {
        return this.programRunnerIndex;
    }


    /**
     * param xmlText 
     * 载入blockly程序
     */
    ProgramManager.prototype._loadCanvasFromXML = function (xmlText) {
        var dom, firstTopBlock, topBlocks;
        codeLanguage.workspace.clear();
        dom = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(dom,codeLanguage.workspace);
        topBlocks = codeLanguage.workspace.getTopBlocks();
        if (topBlocks && topBlocks.length > 0) {
            firstTopBlock = topBlocks[0];
            return firstTopBlock.select();
        }
    };

    /**
     * param xmlText
     * 检查 载入的程序是否是正确的程序
     */
    ProgramManager.prototype.isCorrect = function (xmlText) {
	  var dom = Xml.textToDom(xmlText);
	  var customBlocks = $("blocks[type^='actions_']",dom);
	  var length = customBlocks.size();
	  var baseBlocks;
	  for (var i = 0 ; i < length; i++ ) {
		  var type = customBlocks[i].type;
		  if (!baseBlocks[type]) {
			  return false;
		  }
	  }
	  return true;
  };


    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new ProgramManager();
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new ProgramManager();; });
    } else {
        this.programManager = new ProgramManager();
    }

}).call(this);
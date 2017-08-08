/**
 * local_storage.js version 1.0
 * 
 * local_storage js  数据存储本地存储实现类
 * local_storage
 * 
 * 数据存储本地存储实现类
 * @author hekai
 */
'use strict'
;(function() {

    var localStorage = window.localStorage;
    var ubtUtils = require('../common/utils/utils');
    var codeLanguage = require('../common/program/program_init');

    var LocalStorage = function() {

    };

    /**
     * @params programXml 保存程序的xml字符串
     * @params key 保存程序的key值
     * @params 工作空间
     * 
     * 保存程序到本地存储
     */
    LocalStorage.prototype.saveProgram = function(programXml,key,workspace) {
        var uuid = ubtUtils.genUuid(8, 16);
        if (!key) {
            key = uuid;
        }
        if (!workspace) {
            workspace = codeLanguage.workspace;
        }
        if (!programXml) {
            programXml = Blockly.Xml.workspaceToDom(workspace);
        }
        localStorage.setItem(key,programXml);
        return key;
    };

    /**
     * @params key 程序的key值
     * 
     * 删除程序
     * 
     */
    LocalStorage.prototype.deleteProgram = function(key) {
        if (!key) {
            return;
        }
        localStorage.removeItem(key);
    };

    /**
     * 
     * @params programXml 程序的xml字符串
     * @params 程序的key值
     * 
     * 修改程序到本地存储
     * 
     */
    LocalStorage.prototype.modifyProgram = function(programXml,key) {
        if (!programXml) {
            return;
        }
        var oldProgramXml = localStorage.getItem(key);
        localStorage.setItem(key,programXml);
        return oldProgramXml;
    };

    /**
     * @params key 载入程序的key值
     * @params programXml 载入程序的xml
     * 
     * @params workspace 载入的工作空间
     * 
     * 载入程序到工作空间
     * 
     */
    LocalStorage.prototype.loadProgram = function(key, programXml, workspace) {
        var currentProgramXml = localStorage.getItem(key);
        if (programXml) {
            currentProgramXml = programXml;
        }
        if (!currentProgramXml) {
            return;
        }
        if (!workspace) {
            workspace = codeLanguage.workspace;
        }
        workspace.clear();
        var xml = Blockly.Xml.textToDom(currentProgramXml);
        Blockly.Xml.domToWorkspace(xml, workspace);
        return currentProgramXml;
    };

    /**
     * @params key 载入程序的key值
     * 
     * 
     * @params workspace 载入的工作空间
     * 
     * 从本地存储中载入程序
     * 
     */
    LocalStorage.prototype.restoreProgram = function(key, workspace) {
        var currentProgramXml = localStorage.getItem(key);
        if (!currentProgramXml) {
            return;
        }
        if (!workspace) {
            workspace = codeLanguage.workspace;
        }
        workspace.clear();
        var xml = Blockly.Xml.textToDom(currentProgramXml);
        Blockly.Xml.domToWorkspace(xml, workspace);
        return currentProgramXml;
    };

    LocalStorage.prototype.getPrograms = function() {
        var result = [];
        var len = localStorage.length;
        for (var i = 0 ; i < len ; i ++ ) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            result.push(value);
        }
        return result;
    };

    LocalStorage.prototype.getItemByKey = function(key) {
        return localStorage.getItem(key);
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = LocalStorage;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return LocalStorage });
    } else {
        this.LocalStorage = LocalStorage;
    }

}).call(this);
/**
 * file_storage.js version 1.0
 * 
 * file_storage js  数据存储文件存储实现类
 * file_storage
 * 
 * 数据存储文件存储实现类
 * @author hekai
 */
'use strict'
;(function() {

    var FileStorage = function() {

    };

    FileStorage.prototype.saveProgram = function(key, programXml) {

    };

    FileStorage.prototype.deleteProgram = function(key, programXml) {

    };

    FileStorage.prototype.modifyProgram = function(key) {

    };

    FileStorage.prototype.loadProgram = function(key) {

    };

    FileStorage.prototype.restoreProgram = function(key) {

    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = FileStorage;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return FileStorage });
    } else {
        this.fileStorage = FileStorage;
    }

}).call(this);
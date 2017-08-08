/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * base_storage.js version 1.0
 * 
 * base_storage js  数据存储的基类
 * interbase_storage 工具类
 * 
 * 数据存储的基类
 * @author hekai
 */
'use strict'
;(function() {

    var extend = function(subClass, superClass) {
        var F = function(){};
        F.prototype = superClass.prototype;
        subClass.prototype = new F;
        subClass.prototype.constructor = subClass;

        subClass.superclass = superClass.prototype;
        if(superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    };

    var Interface = require('./interface.js');
    var FileStorage = require('./file_storage');
    var LocalStorage = require('./local_storage');
    
    //存储的基类
    var BaseStorage = new Interface('BaseStorage',['saveProgram', 
    'loadProgram','restoreProgram','deleteProgram', 'modifyProgram','getPrograms','getItemByKey']);

    var StorageFactory  = {
        createStorage : function (type) {
            var storage;
            switch (type) {
                case  'localStorage':
                storage = new LocalStorage();
                break;
                default:
                storage = new FileStorage();
            }
            Interface.ensureImplements(storage, BaseStorage);
            return storage;
        }
    };   


    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = StorageFactory;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return StorageFactory });
    } else {
        this.storageFactory = StorageFactory;
    }

}).call(this);
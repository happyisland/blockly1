/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * interface.js version 1.0
 * 
 * interface js  用于判断接口方法是否实现
 * interface 工具类
 * 
 * 用于判断接口方法是否实现
 * @author hekai
 */
'use strict'
;(function() {

    /*
    * @param name String 接口的名字
    * @param methods Array 接口里面定义的方法
    */
    var Interface = function(name, methods){
        //如果购造函数的参数不等于2个，那么抛出异常
        if (arguments.length != 2) {
            throw new Error("Interface constructor called with " + arguments.length +
            "arguments,but expected exactyl 2.")
        }
        this.name = name;
        this.methods = [];
        //方法数组，保证传进来的methods数组中，每一个元素都是字符串类型
        for (var i = 0, len = methods.length; i < len; i++) {
            if (typeof methods[i] !== "string") {
                throw new Error("Interface constructor expects methods names to bo " +
                "passed in asastring.");
            }
            this.methods.push(methods[i]);
        }
    }
    //Static class methods
    Interface.ensureImplements = function(object){
            //如果参数少于2个，抛出异常，object是待判断实现接口的对象
            if (arguments.length < 2) {
                    throw new Error("Function Interface.ensureImplements called with " + arguments.length +
                    "arguments,but expected at least 2.");
            }
            for (var i = 1, len = arguments.length; i < len; i++) {
                    //inter_face为接口，一定要实现Interface类
                    //书中使用interface，因是JavaScript中保留字，所以暂替换为inter_face
                    var inter_face = arguments[i];
                    if (inter_face.constructor !== Interface) {
                            throw new Error("Function Interface.ensureImplementsexpects arguments " +
                            "two and above to be instances of Interface.");
                    }
                    for (var j = 0, methodsLen = inter_face.methods.length; j < methodsLen; j++) {
                            //对象中是否含有接口中定义的方法
                            var method = inter_face.methods[j];
                            if (!object[method] || typeof object[method] !== 'function') {
                                    throw new Error("Function Interface.ensureImplements: object " +
                                    "does not implements the " +
                                    inter_face.name +
                                    "interface.Method " +
                                    method +
                                    "was not found.");
                            }
                    }
            }
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = Interface;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return Interface });
    } else {
        this.Interface = Interface;
    }

}).call(this);
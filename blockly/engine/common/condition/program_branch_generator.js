/* @preserve
 *
 *
 * Copyright (c) 2016 UBT Company
 *
 *
 */

/**
 * program_branch_generator.js version 1.0
 *
 *  program_branch_generator feature
 *  
 * 多分支程序运行分支序数生成类
 *
 * feature program_branch_generator feature
 *
 */
'use strict';
;(function() {

    function ProgramBranchGenarator () {
        this.branch = 0;
    }

    ProgramBranchGenarator.prototype.getBranch = function() {
        return (this.branch+=5);
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new ProgramBranchGenarator;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new ProgramBranchGenarator; });
    } else {
        this.ProgramBranchGenarator = new ProgramBranchGenarator;
    }

}).call(this);
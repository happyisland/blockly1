/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * toolbox_extension.js version 1.0
 * 
 * toolbox_extension
 * 对toolbox的扩展
 * 
 * feature blockly data center
 * 
 */
'use strict'
;(function() {
    var $ = require('jquery');
    var colours = require('../service/colours');
    function ToolboxExtension() {
        this.selected = '';
        this.textSelected = '';
    }

    ToolboxExtension.prototype.nodeClick = function (node) {
        if (this.selected) {
            var lastSelected = $('span.blocklyTreeIcon_'+this.selected+'_selected');
            lastSelected.removeClass('blocklyTreeIcon_'+this.selected +'_selected');
            lastSelected.addClass('blocklyTreeIcon_'+this.selected);
            this.textSelected.attr('style','color:'+ colours['id_'+this.selected]['primary']);
        }
        //获取节点的ID
        if (node) {
            var nodeId = node['actualEventTarget_'].id_;
            var selectDom = document.getElementById(nodeId);
            var dom = $('span.blocklyTreeIcon',selectDom);
            this.textSelected =  $('span.blocklyTreeLabel',selectDom);
            this.textSelected.attr('style','color:#FFF');
            var type = dom.attr('type');
            this.selected = type;
            var className = 'blocklyTreeIcon_'+ type + '_selected';
            dom.addClass(className);
        }
        /*if(node!=null){

            console.log(node.id_.replace(/:/g, ""));
            console.log(Number(node.id_.replace(/:/g, "")));
            var currentIndex = Number(node.id_.replace(/:/g, ""));
            if(currentIndex%2===0){
                console.log("currentIndex:"+currentIndex);
                console.log("currentIndex:"+currentIndex);
                console.log("currentIndex:"+currentIndex);
            }else{

                if (this.selected) {
                    var lastSelected = $('span.blocklyTreeIcon_'+this.selected+'_selected');
                    lastSelected.removeClass('blocklyTreeIcon_'+this.selected +'_selected');
                    lastSelected.addClass('blocklyTreeIcon_'+this.selected);
                    this.textSelected.attr('style','color:'+ colours['id_'+this.selected]['primary']);
                }
                //获取节点的ID
                if (node) {
                    var nodeId = node['actualEventTarget_'].id_;
                    var selectDom = document.getElementById(nodeId);
                    var dom = $('span.blocklyTreeIcon',selectDom);
                    this.textSelected =  $('span.blocklyTreeLabel',selectDom);
                    this.textSelected.attr('style','color:#FFF');
                    var type = dom.attr('type');
                    this.selected = type;
                    var className = 'blocklyTreeIcon_'+ type + '_selected';
                    dom.addClass(className);
                }
            }
        }
*/
        console.log("当前选中节点："+node);
        var courseTitle = $("#coursetitle_box");
        var courseTask = $("#id_cousetask");
        if(courseTitle&&node){
            courseTitle.addClass('active');
            courseTask.removeClass('active');
        }
        if(courseTitle&&node==null){
            courseTitle.removeClass('active');
        }
        console.log(node);
        if(node == undefined){
            courseTask.removeClass('active');
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        var toolboxExtension = new ToolboxExtension;
        module.exports = toolboxExtension;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new ToolboxExtension; });
    } else {
        this.toolboxExtension = new ToolboxExtension;
    }

}).call(this);
/**
 * Description: Multiplied fields in the same block
 * Author: Created by ubt
 * Date: 2016/9/7
 */
'use strict';

goog.require('Blockly.Field');


;(function() {
    var FieldVariableAdapter = require('./field_variable_adapter');
    var toolboxExtension = require('./toolbox_extension');
    var programInit =  require('../common/program/program_init');
    var $ = require('jquery');
    module.exports = function(Block) {
        /**
         * update all fields' value
         * @param fieldValues  array of the values that need to be updated
         */
        Block.prototype.updateFieldValues = function (fieldValues) {
            if (fieldValues == null) {
                fieldValues = [];
            }
            // update all fields in this block
            _.forEach(fieldValues, (function (_this) {
                return function (value, fieldId) {
                    var existingFieldValue;
                    existingFieldValue = _this.getFieldValue(fieldId);
                    if (existingFieldValue && existingFieldValue !== value) {
                        return _this.setFieldValue(value, fieldId);
                    }
                };
            })(this));
        };

        Block.prototype.getVars = function() {
            var vars = [];
            for (var i = 0, input; input = this.inputList[i]; i++) {
                for (var j = 0, field; field = input.fieldRow[j]; j++) {
                if (field instanceof FieldVariableAdapter) {
                    vars.push(field.getValue());
                }
                }
            }
            return vars;
        };

        /**
         * Notification that a variable is renaming.
         * If the name matches one of this block's variables, rename it.
         * @param {string} oldName Previous name of variable.
         * @param {string} newName Renamed variable.
         */
        Block.prototype.renameVar = function(oldName, newName) {
            for (var i = 0, input; input = this.inputList[i]; i++) {
                for (var j = 0, field; field = input.fieldRow[j]; j++) {
                    if (field instanceof Blockly.FieldVariableAdapter &&
                        Blockly.Names.equals(oldName, field.getValue())) {
                        field.setValue(newName);
                    }
                }
            }
        };

        var selected = '';

        /**
         * 重写blockly左边的树的点击事件
         */
        Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function(node) {
            var toolbox = this.toolbox_;
            if (node == this.selectedItem_ || node == toolbox.tree_) {
                return;
            }

            toolboxExtension.nodeClick(node);

            if (toolbox.lastCategory_) {
                toolbox.lastCategory_.getRowElement().style.backgroundColor = '';
            }
            if (node) {
                var hexColour = node.hexColour || '#57e';
                node.getRowElement().style.backgroundColor = hexColour;
                // Add colours to child nodes which may have been collapsed and thus
                // not rendered.
                toolbox.addColour_(node);
            }
            var oldNode = this.getSelectedItem();
            goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this, node);
            if (node && node.blocks && node.blocks.length) {
                toolbox.flyout_.show(node.blocks);
                // Scroll the flyout to the top if the category has changed.
                if (toolbox.lastCategory_ != node) {
                toolbox.flyout_.scrollToStart();
                }
            } else {
                // Hide the flyout.
                toolbox.flyout_.hide();
            }
            if (oldNode != node && oldNode != this) {
                var event = new Blockly.Events.Ui(null, 'category',
                    oldNode && oldNode.getHtml(), node && node.getHtml());
                event.workspaceId = toolbox.workspace_.id;
                Blockly.Events.fire(event);
            }
            if (node) {
                toolbox.lastCategory_ = node;
            }
        };

        Blockly.WorkspaceSvg.prototype.onMouseDown_ = function(e) {
            this.markFocused();
            if (Blockly.isTargetInput_(e)) {
                return;
            }
            Blockly.terminateDrag_();  // In case mouse-up event was lost.
            Blockly.hideChaff();
            Blockly.DropDownDiv.hide();
            toolboxExtension.nodeClick();
            var isTargetWorkspace = e.target && e.target.nodeName &&
                (e.target.nodeName.toLowerCase() == 'svg' ||
                e.target == this.svgBackground_);
            if (isTargetWorkspace && Blockly.selected && !this.options.readOnly) {
                // Clicking on the document clears the selection.
                Blockly.selected.unselect();
            }
            if (Blockly.isRightButton(e)) {
                // Right-click.
                //this.showContextMenu_(e);
            } else if (this.scrollbar) {
                // If the workspace is editable, only allow scrolling when gripping empty
                // space.  Otherwise, allow scrolling when gripping anywhere.
                this.isScrolling = true;
                // Record the current mouse position.
                this.startDragMouseX = e.clientX;
                this.startDragMouseY = e.clientY;
                this.startDragMetrics = this.getMetrics();
                this.startScrollX = this.scrollX;
                this.startScrollY = this.scrollY;

                // If this is a touch event then bind to the mouseup so workspace drag mode
                // is turned off and double move events are not performed on a block.
                // See comment in inject.js Blockly.init_ as to why mouseup events are
                // bound to the document instead of the SVG's surface.
                if ('mouseup' in Blockly.bindEvent_.TOUCH_MAP) {
                Blockly.onTouchUpWrapper_ = Blockly.onTouchUpWrapper_ || [];
                Blockly.onTouchUpWrapper_ = Blockly.onTouchUpWrapper_.concat(
                    Blockly.bindEvent_(document, 'mouseup', null, Blockly.onMouseUp_));
                }
                Blockly.onMouseMoveWrapper_ = Blockly.onMouseMoveWrapper_ || [];
                Blockly.onMouseMoveWrapper_ = Blockly.onMouseMoveWrapper_.concat(
                    Blockly.bindEvent_(document, 'mousemove', null, Blockly.onMouseMove_));
            }
            // This event has been handled.  No need to bubble up to the document.
            e.stopPropagation();
            e.preventDefault();
        };

        Blockly.inject.loadSounds_ = function(pathToMedia, workspace) {
            workspace.loadAudio_(
                [pathToMedia + 'click.mp3',
                pathToMedia + 'click.wav',
                pathToMedia + 'click.ogg'], 'click');
            workspace.loadAudio_(
                [pathToMedia + 'disconnect.wav',
                pathToMedia + 'disconnect.mp3',
                pathToMedia + 'disconnect.ogg'], 'disconnect');
            workspace.loadAudio_(
                [pathToMedia + 'delete.mp3',
                pathToMedia + 'delete.ogg',
                pathToMedia + 'delete.wav'], 'delete');
            /**
            workspace.loadAudio_(
                [pathToMedia + 'test.mp3'],
                 'test');
             */
            

            // Bind temporary hooks that preload the sounds.
            var soundBinds = [];
            var unbindSounds = function() {
                while (soundBinds.length) {
                Blockly.unbindEvent_(soundBinds.pop());
                }
                workspace.preloadAudio_();
            };
            // Android ignores any sound not loaded as a result of a user action.
            soundBinds.push(
                Blockly.bindEvent_(document, 'mousemove', null, unbindSounds));
            soundBinds.push(
                Blockly.bindEvent_(document, 'touchstart', null, unbindSounds));
        };
        
        /**
         * pause an audio file at specified value.  If volume is not specified,
         * use full volume (1).
         * @param {string} name Name of sound.
         * 
         */
        Blockly.WorkspaceSvg.prototype.pauseAudio = function(name) {
            var sound = this.SOUNDS_[name];
            if (sound) {
                var mySound;
                var ie9 = goog.userAgent.DOCUMENT_MODE &&
                        goog.userAgent.DOCUMENT_MODE === 9;
                if (ie9 || goog.userAgent.IPAD || goog.userAgent.ANDROID) {
                // Creating a new audio node causes lag in IE9, Android and iPad. Android
                // and IE9 refetch the file from the server, iPad uses a singleton audio
                // node which must be deleted and recreated for each new audio tag.
                mySound = sound;
                } else {
                mySound = sound.cloneNode();
                }
                mySound.pause();
            } else if (this.options.parentWorkspace) {
                // Maybe a workspace on a lower level knows about this sound.
                this.options.parentWorkspace.pauseAudio(name);
            }
        };


        /**
         * Dispose of this block.
         * @param {boolean} healStack If true, then try to heal any gap by connecting
         *     the next statement with the previous statement.  Otherwise, dispose of
         *     all children of this block.
         * @param {boolean} animate If true, show a disposal animation and sound.
         */
        Blockly.BlockSvg.prototype.dispose = function(healStack, animate) {
            if (this.deleteCallback && animate) {
                this.deleteCallback();
            }      
            Blockly.Tooltip.hide();
            Blockly.Field.startCache();
            // If this block is being dragged, unlink the mouse events.
            if (Blockly.selected == this) {
                this.unselect();
                Blockly.terminateDrag_();
            }
            // If this block has a context menu open, close it.
            if (Blockly.ContextMenu.currentBlock == this) {
                Blockly.ContextMenu.hide();
            }

            if (animate && this.rendered) {
                this.unplug(healStack);
                this.disposeUiEffect();
            }
            // Stop rerendering.
            this.rendered = false;

            Blockly.Events.disable();
            var icons = this.getIcons();
            for (var i = 0; i < icons.length; i++) {
                icons[i].dispose();
            }
            Blockly.Events.enable();
            Blockly.BlockSvg.superClass_.dispose.call(this, healStack);

            goog.dom.removeNode(this.svgGroup_);
            // Sever JavaScript to DOM connections.
            this.svgGroup_ = null;
            this.svgPath_ = null;
            this.svgPathLight_ = null;
            this.svgPathDark_ = null;
            Blockly.Field.stopCache();
        };

        function IsPC() {
            var userAgentInfo = navigator.userAgent;
            if(userAgentInfo.indexOf("Win")>0 ||userAgentInfo.indexOf("Mac")>0){
                return true;
            }else{
                return false;
            }
        }

        /**
         * Is the mouse event over a delete area (toolbox or non-closing flyout)?
         * Opens or closes the trashcan and sets the cursor as a side effect.
         * @param {!Event} e Mouse move event.
         * @return {boolean} True if event is in a delete area.
         */
        Blockly.WorkspaceSvg.prototype.isDeleteArea = function(e) {
            if (!window.angular) {
                var courseData = require('../service/course_data');
                var isPc = IsPC();
                console.log("------isPc----------:"+isPc);
                var isShowTrash = courseData.getCourseData().isShowTrash;
                if(isPc===true){
                    var curseIndex = courseData.getCourseIndex();
                    isShowTrash = courseData.getCourseData().isShowTrash;
                }
                if (isShowTrash) {
                    return this.checkDeleteArea(e);
                }
                return isShowTrash;
            } else {
                return this.checkDeleteArea(e);
            }
        };

        Blockly.WorkspaceSvg.prototype.checkDeleteArea = function(e) {
            var xy = new goog.math.Coordinate(e.clientX, e.clientY);
            if (this.deleteAreaTrash_) {
                if (this.deleteAreaTrash_.contains(xy)) {
                this.trashcan.setOpen_(true);
                Blockly.Css.setCursor(Blockly.Css.Cursor.DELETE);
                return true;
                }
                this.trashcan.setOpen_(false);
            }
            if (this.deleteAreaToolbox_) {
                if (this.deleteAreaToolbox_.contains(xy)) {
                    Blockly.Css.setCursor(Blockly.Css.Cursor.DELETE);
                    return true;
                }
            }
            Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED);
            return false;
        };


        /**
         * 增加block块错误的提示
         */
        Blockly.BlockSvg.prototype.addWrongClass = function(value) {
            /**
            var selectedNode = $(this.svgGroup_).find('> .blocklyEditableText > .blocklyText');
            var length = selectedNode.length;
            for (var i = 0 ; i < length; i++) {
                var text  = selectedNode[i].innerHTML || selectedNode[i].textContent ; //修改iphone5c的bug
                if (text.indexOf(value) > -1) {
                    $(selectedNode[i]).parent().attr('class', 'blocklyEditableText colorRed');
                }
            }
             */
            //$(this.svgGroup_).find('> .blocklyEditableText > .blocklyDropdownText').attr('class','blocklyText blocklyDropdownText colorRed');
        };

        /**
         * 删除block块错误的提示
         */
        Blockly.BlockSvg.prototype.removeWrongClass = function(value) {
            /**
            var selectedNode = $(this.svgGroup_).find('> .blocklyEditableText > .blocklyText');
            var length = selectedNode.length;
            for (var i = 0 ; i < length; i++) {
                var text  = selectedNode[i].innerHTML || selectedNode[i].textContent ;//修改iphone5c的bug
                if (text.indexOf(value) > -1) {
                    $(selectedNode[i]).parent().attr('class', 'blocklyEditableText');
                }
            }
            */
        };

        /**
         * Create the trash can elements.
         * @return {!Element} The trash can's SVG group.
         */
        Blockly.Trashcan.prototype.createDom = function() {
            /* Here's the markup that will be generated:
             <g class="blocklyTrash">
             <clippath id="blocklyTrashBodyClipPath837493">
             <rect width="47" height="45" y="15"></rect>
             </clippath>
             <image width="64" height="92" y="-32" xlink:href="media/sprites.png"
             clip-path="url(#blocklyTrashBodyClipPath837493)"></image>
             <clippath id="blocklyTrashLidClipPath837493">
             <rect width="47" height="15"></rect>
             </clippath>
             <image width="84" height="92" y="-32" xlink:href="media/sprites.png"
             clip-path="url(#blocklyTrashLidClipPath837493)"></image>
             </g>
             */
            this.svgGroup_ = Blockly.createSvgElement('g',
                {'class': 'blocklyTrash'}, null);
            var rnd = String(Math.random()).substring(2);
            var clip = Blockly.createSvgElement('clipPath',
                {'id': 'blocklyTrashBodyClipPath' + rnd},
                this.svgGroup_);
            Blockly.createSvgElement('rect',
                {'width': this.WIDTH_, 'height': this.BODY_HEIGHT_,
                    'y': this.LID_HEIGHT_},
                clip);
            var body = Blockly.createSvgElement('image',
                {'width': Blockly.SPRITE.width, 'x': -this.SPRITE_LEFT_,
                    'height': Blockly.SPRITE.height, 'y': -this.SPRITE_TOP_,
                    'clip-path': 'url(#blocklyTrashBodyClipPath' + rnd + ')'},
                this.svgGroup_);
            if(window.angular!==undefined){
                body.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                    this.workspace_.options.pathToMedia + "sprites_01.png");
            }else{
                body.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                    this.workspace_.options.pathToMedia + Blockly.SPRITE.url);
            }


            var clip = Blockly.createSvgElement('clipPath',
                {'id': 'blocklyTrashLidClipPath' + rnd},
                this.svgGroup_);
            Blockly.createSvgElement('rect',
                {'width': this.WIDTH_, 'height': this.LID_HEIGHT_}, clip);
            this.svgLid_ = Blockly.createSvgElement('image',
                {'width': Blockly.SPRITE.width, 'x': -this.SPRITE_LEFT_,
                    'height': Blockly.SPRITE.height, 'y': -this.SPRITE_TOP_,
                    'clip-path': 'url(#blocklyTrashLidClipPath' + rnd + ')'},
                this.svgGroup_);
            if(window.angular!==undefined){
                this.svgLid_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                    this.workspace_.options.pathToMedia + "sprites_01.png");
            }else{
                this.svgLid_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                    this.workspace_.options.pathToMedia + Blockly.SPRITE.url);
            }


            Blockly.bindEvent_(this.svgGroup_, 'mouseup', this, this.click);
            this.animateLid_();
            return this.svgGroup_;
        };


        
    }
}).call(this);
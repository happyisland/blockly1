/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Object representing a trash can icon.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.BlockTrashcan');

goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.math');
goog.require('goog.math.Rect');
goog.require('Blockly.Trashcan');


// goog.inherits(Blockly.BlockTrashcan, Blockly.Trashcan);

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

    if(window.angular !== undefined){
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
    if(window.angular !== undefined){
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

if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.BlockTrashcan;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.BlockTrashcan; });
} else {
    this.BlockTrashcan = Blockly.BlockTrashcan;
}

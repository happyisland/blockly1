/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Css');



/**
 * List of cursors.
 * @enum {string}
 */
Blockly.Css.Cursor = {
  OPEN: 'handopen',
  CLOSED: 'handclosed',
  DELETE: 'handdelete'
};

/**
 * Current cursor (cached value).
 * @type {string}
 * @private
 */
Blockly.Css.currentCursor_ = '';

/**
 * Large stylesheet added by Blockly.Css.inject.
 * @type {Element}
 * @private
 */
Blockly.Css.styleSheet_ = null;

/**
 * Path to media directory, with any trailing slash removed.
 * @type {string}
 * @private
 */
Blockly.Css.mediaPath_ = '';

/**
 * Inject the CSS into the DOM.  This is preferable over using a regular CSS
 * file since:
 * a) It loads synchronously and doesn't force a redraw later.
 * b) It speeds up loading by not blocking on a separate HTTP transfer.
 * c) The CSS content may be made dynamic depending on init options.
 * @param {boolean} hasCss If false, don't inject CSS
 *     (providing CSS becomes the document's responsibility).
 * @param {string} pathToMedia Path from page to the Blockly media directory.
 */
Blockly.Css.inject = function(hasCss, pathToMedia) {
  // Only inject the CSS once.
  if (Blockly.Css.styleSheet_) {
    return;
  }
  // Placeholder for cursor rule.  Must be first rule (index 0).
  var text = '.blocklyDraggable {}\n';
  if (hasCss) {
    text += Blockly.Css.CONTENT.join('\n');
    if (Blockly.FieldDate) {
      text += Blockly.FieldDate.CSS.join('\n');
    }
  }
  // Strip off any trailing slash (either Unix or Windows).
  Blockly.Css.mediaPath_ = pathToMedia.replace(/[\\\/]$/, '');
  text = text.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
  // Inject CSS tag.
  var cssNode = document.createElement('style');
  document.head.appendChild(cssNode);
  var cssTextNode = document.createTextNode(text);
  cssNode.appendChild(cssTextNode);
  Blockly.Css.styleSheet_ = cssNode.sheet;
  Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN);
};

/**
 * Set the cursor to be displayed when over something draggable.
 * @param {Blockly.Css.Cursor} cursor Enum.
 */
Blockly.Css.setCursor = function(cursor) {
  if (Blockly.Css.currentCursor_ == cursor) {
    return;
  }
  Blockly.Css.currentCursor_ = cursor;
  var url = 'url(' + Blockly.Css.mediaPath_ + '/' + cursor + '.cur), auto';
  // There are potentially hundreds of draggable objects.  Changing their style
  // properties individually is too slow, so change the CSS rule instead.
  var rule = '.blocklyDraggable {\n  cursor: ' + url + ';\n}\n';
  Blockly.Css.styleSheet_.deleteRule(0);
  Blockly.Css.styleSheet_.insertRule(rule, 0);
  // There is probably only one toolbox, so just change its style property.
  var toolboxen = document.getElementsByClassName('blocklyToolboxDiv');
  for (var i = 0, toolbox; toolbox = toolboxen[i]; i++) {
    if (cursor == Blockly.Css.Cursor.DELETE) {
      toolbox.style.cursor = url;
    } else {
      toolbox.style.cursor = '';
    }
  }
  // Set cursor on the whole document, so that rapid movements
  // don't result in cursor changing to an arrow momentarily.
  var html = document.body.parentNode;
  if (cursor == Blockly.Css.Cursor.OPEN) {
    html.style.cursor = '';
  } else {
    html.style.cursor = url;
  }
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Css.CONTENT = [
    'body {',
    'background-color: #F5F5F5;',
    '}',
  '.blocklySvg {',
    'background-color: #F5F5F5;',
    'outline: none;',
    'overflow: hidden;',  /* IE overflows by default. */
  '}',

  '.blocklyWidgetDiv {',
    'display: none;',
    'position: absolute;',
    'z-index: 9;',
  '}',

  '.blocklyTooltipDiv {',
    'background-color: #ffffc7;',
    'border: 1px solid #ddc;',
    'box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);',
    'color: #000;',
    'display: none;',
    'font-family: sans-serif;',
    'font-size: 9pt;',
    'opacity: 0.9;',
    'padding: 2px;',
    'position: absolute;',
    'z-index: 1000;',
  '}',

  '.blocklyResizeSE {',
    'cursor: se-resize;',
    'fill: #aaa;',
  '}',

  '.blocklyResizeSW {',
    'cursor: sw-resize;',
    'fill: #aaa;',
  '}',

  '.blocklyResizeLine {',
    'stroke: #888;',
    'stroke-width: 1;',
  '}',

  '.blocklyHighlightedConnectionPath {',
    'fill: none;',
    'stroke: #fc3;',
    'stroke-width: 4px;',
  '}',

  '.blocklyPathLight {',
    'fill: none;',
    'stroke-linecap: round;',
    'stroke-width: 1;',
  '}',

  '.blocklySelected>.blocklyPath {',
    'stroke: #fc3;',
    'stroke-width: 3px;',
  '}',

  '.blocklySelected>.blocklyPathLight {',
    'display: none;',
  '}',

  '.blocklyDragging>.blocklyPath,',
  '.blocklyDragging>.blocklyPathLight {',
    'fill-opacity: .8;',
    'stroke-opacity: .8;',
  '}',

  '.blocklyDragging>.blocklyPathDark {',
    'display: none;',
  '}',

  '.blocklyDisabled>.blocklyPath {',
    'fill-opacity: .5;',
    'stroke-opacity: .5;',
  '}',

  '.blocklyDisabled>.blocklyPathLight,',
  '.blocklyDisabled>.blocklyPathDark {',
    'display: none;',
  '}',

  '.blocklyText {',
    'cursor: default;',
    'fill: #fff;',
    'font-family: sans-serif;',
    'font-size: 11pt;',
  '}',

  '.blocklyNonEditableText>text {',
    'pointer-events: none;',
  '}',

  '.blocklyNonEditableText>rect,',
  '.blocklyEditableText>rect {',
    'fill: #fff;',
    'fill-opacity: .6;',
  '}',

  '.blocklyNonEditableText>text,',
  '.blocklyEditableText>text {',
    'fill: #000;',
  '}',

  '.blocklyEditableText:hover>rect {',
    'stroke: #fff;',
    'stroke-width: 2;',
  '}',

  '.blocklyBubbleText {',
    'fill: #000;',
  '}',

  /*
    Don't allow users to select text.  It gets annoying when trying to
    drag a block and selected text moves instead.
  */
  '.blocklySvg text {',
    'user-select: none;',
    '-moz-user-select: none;',
    '-webkit-user-select: none;',
    'cursor: inherit;',
    'font-family: "Graviola" ;',
  '}',

  '.blocklyHidden {',
    'display: none;',
  '}',

  '.blocklyFieldDropdown:not(.blocklyHidden) {',
    'display: block;',
  '}',

  '.blocklyIconGroup {',
    'cursor: default;',
  '}',

  '.blocklyIconGroup:not(:hover),',
  '.blocklyIconGroupReadonly {',
    'opacity: .6;',
  '}',

  '.blocklyIconShape {',
    'fill: #00f;',
    'stroke: #fff;',
    'stroke-width: 1px;',
  '}',

  '.blocklyIconSymbol {',
    'fill: #fff;',
  '}',

  '.blocklyMinimalBody {',
    'margin: 0;',
    'padding: 0;',
  '}',

  '.blocklyCommentTextarea {',
    'background-color: #ffc;',
    'border: 0;',
    'margin: 0;',
    'padding: 2px;',
    'resize: none;',
  '}',

  '.blocklyHtmlInput {',
    'border: none;',
    'border-radius: 4px;',
    'font-family: sans-serif;',
    'height: 100%;',
    'margin: 0;',
    'outline: none;',
    'padding: 0 1px;',
    'width: 100%',
  '}',
/*去掉头部条*/
  '.blocklyMainBackground {',
    'stroke-width: 1;',
    'stroke: #c6c6c6;',  /* Equates to #ddd due to border being off-pixel. */
  '}',

  '.blocklyMutatorBackground {',
    'fill: #fff;',
    'stroke: #ddd;',
    'stroke-width: 1;',
  '}',

  '.blocklyFlyoutBackground {',
    'fill: #ddd;',
    'fill-opacity: .8;',
  '}',

  '.blocklyScrollbarBackground {',
    'opacity: 0;',
  '}',

  '.blocklyScrollbarHandle {',
    'fill: #efe9e9;',
  '}',

  '.blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyScrollbarHandle:hover {',
    'fill: #bbb;',
  '}',
    '.blocklyZoom {',
    'display:none;',
    '}',

  '.blocklyZoom>image {',
    'opacity: .4;',
  '}',

  '.blocklyZoom>image:hover {',
    'opacity: .6;',
  '}',

  '.blocklyZoom>image:active {',
    'opacity: .8;',
  '}',

  /* Darken flyout scrollbars due to being on a grey background. */
  /* By contrast, workspace scrollbars are on a white background. */
  '.blocklyFlyout .blocklyScrollbarHandle {',
    'fill: #bbb;',
  '}',

  '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyFlyout .blocklyScrollbarHandle:hover {',
    'fill: #aaa;',
  '}',

  '.blocklyInvalidInput {',
    'background: #faa;',
  '}',

  '.blocklyAngleCircle {',
    'stroke: #444;',
    'stroke-width: 1;',
    'fill: #ddd;',
    'fill-opacity: .8;',
  '}',

  '.blocklyAngleMarks {',
    'stroke: #444;',
    'stroke-width: 1;',
  '}',

  '.blocklyAngleGauge {',
    'fill: #f88;',
    'fill-opacity: .8;',
  '}',

  '.blocklyAngleLine {',
    'stroke: #f00;',
    'stroke-width: 2;',
    'stroke-linecap: round;',
  '}',

  '.blocklyContextMenu {',
    'border-radius: 4px;',
  '}',

  '.blocklyDropdownMenu {',
    'padding: 0 !important;',
  '}',

  /* Override the default Closure URL. */
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
    'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
  '}',

  /* Category tree in Toolbox. */
  '.blocklyToolboxDiv {',
    'background-color: #fff;',
    'overflow-x: visible;',
    'overflow-y: auto;',
    'position: absolute;',
    'border-right: 1px solid #cecbba;',
  '}',

  '.blocklyTreeRoot {',
    // 'padding: 4px 0;',
    // 'margin-top: 40px;',
  '}',

  '.blocklyTreeRoot:focus {',
    'outline: none;',
  '}',

  '.blocklyTreeRow {',
//    'text-align: center;',
    // 'border-top: 1px solid #e2e1da;',
    'height: 22px;',
    'line-height: 22px;',
    /*'margin-bottom: 3px;',*/
    'padding-right: 8px;',
    'white-space: nowrap;',
    'padding-left:8px!important',
  '}',

  '.blocklyHorizontalTree {',
    'float: left;',
    'margin: 1px 5px 8px 0;',
  '}',

  '.blocklyHorizontalTreeRtl {',
    'float: right;',
    'margin: 1px 0 8px 5px;',
  '}',

  '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
    'margin-left: 8px;',
  '}',

  '.blocklyTreeRow:not(.blocklyTreeSelected):hover {',
    'background-color: #e4e4e4;',
  '}',

  '.blocklyTreeSeparator {',
    'border-bottom: solid #e5e5e5 1px;',
    'height: 0;',
    'margin: 5px 0;',
  '}',

  '.blocklyTreeSeparatorHorizontal {',
    'border-right: solid #e5e5e5 1px;',
    'width: 0;',
    'padding: 5px 0;',
    'margin: 0 5px;',
  '}',


  '.blocklyTreeIcon {',
    'background-image: url(<<<PATH>>>/sprites.png);',
    'height: 16px;',
    'vertical-align: middle;',
    'width: 16px;',
  '}',

  '.blocklyTreeIconClosedLtr {',
    'background-position: -32px -1px;',
  '}',

  '.blocklyTreeIconClosedRtl {',
    'background-position: 0px -1px;',
  '}',

  '.blocklyTreeIconOpen {',
    'background-position: -16px -1px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {',
    'background-position: -32px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {',
    'background-position: 0px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconOpen {',
    'background-position: -16px -17px;',
  '}',

  '.blocklyTreeIconNone,',
  '.blocklyTreeSelected>.blocklyTreeIconNone {',
    'background-position: -48px -1px;',
  '}',

  '.blocklyTreeLabel {',
    'cursor: default;',
    'font-family: sans-serif;',
    'font-size: 16px;',
    'padding: 0 3px;',
    'vertical-align: middle;',
    'font-family: "Graviola";',

  '}',

  '.blocklyTreeSelected .blocklyTreeLabel {',
    'color: #fff;',
  '}',

  /* Copied from: goog/css/colorpicker-simplegrid.css */
  /*
   * Copyright 2007 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /* Author: pupius@google.com (Daniel Pupius) */

  /*
    Styles to make the colorpicker look like the old gmail color picker
    NOTE: without CSS scoping this will override styles defined in palette.css
  */
  '.blocklyWidgetDiv .goog-palette {',
    'outline: none;',
    'cursor: default;',
  '}',

  '.blocklyWidgetDiv .goog-palette-table {',
    'border: 1px solid #666;',
    'border-collapse: collapse;',
  '}',

  '.blocklyWidgetDiv .goog-palette-cell {',
    'height: 13px;',
    'width: 15px;',
    'margin: 0;',
    'border: 0;',
    'text-align: center;',
    'vertical-align: middle;',
    'border-right: 1px solid #666;',
    'font-size: 1px;',
  '}',

  '.blocklyWidgetDiv .goog-palette-colorswatch {',
    'position: relative;',
    'height: 13px;',
    'width: 15px;',
    'border: 1px solid #666;',
  '}',

  '.blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {',
    'border: 1px solid #FFF;',
  '}',

  '.blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {',
    'border: 1px solid #000;',
    'color: #fff;',
  '}',

  /* Copied from: goog/css/menu.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menu {',
    'background: #fff;',
    'border-color: #ccc #666 #666 #ccc;',
    'border-style: solid;',
    'border-width: 1px;',
    'cursor: default;',
    'font: normal 13px Arial, sans-serif;',
    'margin: 0;',
    'outline: none;',
    'padding: 4px 0;',
    'position: absolute;',
    'overflow-y: auto;',
    'overflow-x: hidden;',
    'max-height: 100%;',
    'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
  '}',

  /* Copied from: goog/css/menuitem.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuItemRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  /**
   * State: resting.
   *
   * NOTE(mleibman,chrishenry):
   * The RTL support in Closure is provided via two mechanisms -- "rtl" CSS
   * classes and BiDi flipping done by the CSS compiler.  Closure supports RTL
   * with or without the use of the CSS compiler.  In order for them not
   * to conflict with each other, the "rtl" CSS classes need to have the #noflip
   * annotation.  The non-rtl counterparts should ideally have them as well, but,
   * since .goog-menuitem existed without .goog-menuitem-rtl for so long before
   * being added, there is a risk of people having templates where they are not
   * rendering the .goog-menuitem-rtl class when in RTL and instead rely solely
   * on the BiDi flipping by the CSS compiler.  That's why we're not adding the
   * #noflip to .goog-menuitem.
   */
  '.blocklyWidgetDiv .goog-menuitem {',
    'color: #000;',
    'font: normal 16px Arial, sans-serif;',
    'list-style: none;',
    'margin: 0;',
     /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
    'padding: 4px 7em 4px 28px;',
    'white-space: nowrap;',
  '}',

  /* BiDi override for the resting state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {',
     /* Flip left/right padding for BiDi. */
    'padding-left: 7em;',
    'padding-right: 28px;',
  '}',

  /* If a menu doesn't have checkable items or items with icons, remove padding. */
  '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
  '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {',
    'padding-left: 12px;',
  '}',

  /*
   * If a menu doesn't have items with shortcuts, leave just enough room for
   * submenu arrows, if they are rendered.
   */
  '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {',
    'padding-right: 20px;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-content {',
    'color: #000;',
    'font: normal 16px Arial, sans-serif;',
  '}',

  /* State: disabled. */
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,',
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {',
    'color: #ccc !important;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {',
    'opacity: 0.3;',
    '-moz-opacity: 0.3;',
    'filter: alpha(opacity=30);',
  '}',

  /* State: hover. */
  '.blocklyWidgetDiv .goog-menuitem-highlight,',
  '.blocklyWidgetDiv .goog-menuitem-hover {',
    'background-color: #d6e9f8;',
     /* Use an explicit top and bottom border so that the selection is visible',
      * in high contrast mode. */
    'border-color: #d6e9f8;',
    'border-style: dotted;',
    'border-width: 1px 0;',
    'padding-bottom: 3px;',
    'padding-top: 3px;',
  '}',

  /* State: selected/checked. */
  '.blocklyWidgetDiv .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-icon {',
    'background-repeat: no-repeat;',
    'height: 16px;',
    'left: 6px;',
    'position: absolute;',
    'right: auto;',
    'vertical-align: middle;',
    'width: 16px;',
  '}',

  /* BiDi override for the selected/checked state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {',
     /* Flip left/right positioning. */
    'left: auto;',
    'right: 6px;',
  '}',

  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
     /* Client apps may override the URL at which they serve the sprite. */
    'background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;',
  '}',

  /* Keyboard shortcut ("accelerator") style. */
  '.blocklyWidgetDiv .goog-menuitem-accel {',
    'color: #999;',
     /* Keyboard shortcuts are untranslated; always left-to-right. */
     /* #noflip */
    'direction: ltr;',
    'left: auto;',
    'padding: 0 6px;',
    'position: absolute;',
    'right: 0;',
    'text-align: right;',
  '}',

  /* BiDi override for shortcut style. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {',
     /* Flip left/right positioning and text alignment. */
    'left: 0;',
    'right: auto;',
    'text-align: left;',
  '}',

  /* Mnemonic styles. */
  '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint {',
    'text-decoration: underline;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator {',
    'color: #999;',
    'font-size: 12px;',
    'padding-left: 4px;',
  '}',

  /* Copied from: goog/css/menuseparator.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menuseparator {',
    'border-top: 1px solid #ccc;',
    'margin: 4px 0;',
    'padding: 0;',
  '}',


  /**
     *
   */
  ".modalBackground {",
    "  cursor: pointer;",
    "  width: 100%;",
    "  height: 100%;",
    "  background-color: rgba(100, 100, 100, 0.8);",
    "  z-index: 10;",
    "  position: absolute;",
    "  opacity: 1;",
    "  top: 0px;",
    "  left: 0px;",
    "  visibility: visible;",
    "  -webkit-transition: visibility 0s linear 0.3s, opacity 0.3s linear;",
    "  -moz-transition: visibility 0s linear 0.3s, opacity 0.3s linear;",
    "  transition: visibility 0s linear 0.3s, opacity 0.3s linear;",
    "  -webkit-transition-delay: 0s;",
    "  -moz-transition-delay: 0s;",
    "  transition-delay: 0s; }",

    ".input-modal-body {",
    "  display: table-row;",
    "  height: 100%; }",
    "  .input-modal-body .center-align {",
    "    top: 50%;",
    "    left: 50%;",
    "    -webkit-transform: translate(-50%, -50%);",
    "    -moz-transform: translate(-50%, -50%);",
    "    -ms-transform: translate(-50%, -50%);",

    "    -o-transform: translate(-50%, -50%);",
    "    transform: translate(-50%, -50%); }",
    "",

  
    ".input-modal {",
    "  display: table;",
    "  position: absolute;",
    "  margin: 0 auto;",
    "  left: 50%;",
    "  top: 50%;",
    "  z-index: 1000;",
    "  border-radius: 20px;",
    "  -webkit-transform: translate(-50%, -50%);",
    "  -moz-transform: translate(-50%, -50%);",
    "  -ms-transform: translate(-50%, -50%);",
    "  -o-transform: translate(-50%, -50%);",
    "  transform: translate(-50%, -50%); }",
    "  .input-modal::before {",
    "    content: \"\";",
    "    position: absolute;",
    "    height: 100%;",
    "    width: 100%;",
    "    border-radius: 20px;",
    "    z-index: -10; }",
    "  .input-modal.purple .input-modal-title h3 {",
    "    background-color: #922CCE !important; }",
    "  .input-modal.purple::before {",
    "    background-color: #5838AF; }",
    "  .input-modal.green .input-modal-title h3 {",
    "    background-color: #35bc74 !important; }",
    "  .input-modal.green::before {",
    "    background-color: #58d08a; }",
    "  .input-modal.light-green .input-modal-title h3 {",
    "    background-color: #35bc74 !important; }",
    "  .input-modal.light-green::before {",
    "    background-color: #58d08a; }",
    "  .input-modal.yellow .input-modal-title h3 {",
    "    background-color: #edc745 !important; }",
    "  .input-modal.yellow::before {",
    "    background-color: #fdc05d; }",
    "  .input-modal.blue .input-modal-title h3 {",
    "    background-color: #58c2ee !important; }",
    "  .input-modal.blue::before {",
    "    background-color: #b8dfea; }",
    "  .input-modal.orange .input-modal-title h3 {",
    "    background-color: #ff5d28 !important; }",
    "  .input-modal.orange::before {",
    "    background-color: #fd904e; }",
    "  .input-modal.gray .input-modal-title h3 {",
    "    background-color: #BCBAC5 !important; }",
    "  .input-modal.gray::before {",
    "    background-color: #393939; }",
    "  .input-modal.pink .input-modal-title h3 {",
    "    background-color: #F66E7A !important; }",
    "  .input-modal.pink::before {",
    "    background-color: #FF96A9; }",
    "  .input-modal.purple .input-modal-title h3 {",
    "    background-color: #6413A2 !important; }",
    "  .input-modal.purple::before {",
    "    background-color: #902bdd; }",
    "",


    ".outer {",
    "  display: table;",
    "  width: 100%;",
    "  height: 100%; }",
    "",


    ".inner {",
    "  display: table-cell;",
    "  vertical-align: middle; }",
    "",

    ".color-picker-item-wrapper {",
    "  width: 480px;",
    "  margin: 25px auto;",
    "  position: relative;",
    "  border: 1px solid white; }",
    "",

    ".color-picker-item {",
    "  display: inline-block;",
    "  width: 60px;",
    "  padding-top: 60px;",
    "  vertical-align: middle;",
    "  position: relative; }",
    "  .color-picker-item:after {",
    "    content: \"\";",
    "    position: absolute;",
    "    top: 0;",
    "    left: 0;",
    "    right: 0;",
    "    bottom: 0;",
    "    background-color: inherit; }",
    "  .color-picker-item.active::after {",
    "    top: -15px;",
    "    bottom: -15px;",
    "    border: 3px solid white; }",
    "",


    ".block-input-control-next-button {",
    "  height: 120px;",
    "  width: 120px;",
    "  background-repeat: no-repeat;",
    "  background-image: url(./images/react_test/continueButton.png);",
    "  background-size: contain;",
    "  position: absolute;",
    "  bottom: -63px;",
    "  top: auto;",
    "  right: 0;",
    "  left: 0;",
    "  margin: auto;",
    "  cursor: pointer; }",
    "",
    ".block-input-control-next-button:active {",
    "  -webkit-transform: scale(1.05);",
    "  -moz-transform: scale(1.05);",
    "  -ms-transform: scale(1.05);",
    "  -o-transform: scale(1.05);",
    "  transform: scale(1.05); }",
    "",

    "  .input-modal-title .block-input-color {",
    "    display: inline-block;",
    "    margin: 0 0 0 20px;",
    "    padding: 2px 15px;",
    "    border: 3px solid white;",
    "    height: 30px;",
    "    width: 70px;",
    "    vertical-align: middle; }",


    "  .input-modal-title .block-input-value {",
    "    display: inline-block;",
    "    margin: 0 7px;",
    "    padding: 2px 12px;",
    "    background-color: rgba(255, 255, 255, 0.25);",
    "    border-radius: 5px;",
    "    font-weight: bold; }",

    "  .input-modal-title .ribbon-triangle {",
    "    width: 10px;",
    "    background-size: contain;",
    "    background-position: top right;",
    "    background-repeat: no-repeat;",
    "    position: absolute; }",
    "  .input-modal-title .ribbon-left-triangle {",
    "    background-image: url(./images/react_test/ribbonleft.png);",
    "    left: -1px; }",
    "  .input-modal-title .ribbon-right-triangle {",
    "    background-image: url(./images/react_test/ribbonleft.png);",
    "    right: -1px;",
    "    -webkit-transform: rotateZ(270deg);",
    "    -moz-transform: rotateZ(270deg);",
    "    -ms-transform: rotateZ(270deg);",
    "    -o-transform: rotateZ(270deg);",
    "    transform: rotateZ(270deg); }",
    "",

    '.blocklyDropDownDiv {',
    'position: fixed;',
    'left: 0;',
    'top: 0;',
    'z-index: 1000;',
    'display: none;',
    'border: 1px solid;',
    'border-radius: 4px;',
        'box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, .3);',
    'padding: 4px;',
    '-webkit-user-select: none;',
    '}',

    '.blocklyDropDownContent {',
    'max-height: 300px;', // @todo: spec for maximum height.
    'overflow: auto;',
    '}',

    '.blocklyDropDownArrow {',
    'position: absolute;',
    'left: 0;',
    'top: 0;',
    'width: 16px;',
    'height: 16px;',
    'z-index: -1;',
    'background-color: inherit;',
    'border-color: inherit;',
    '}',

    '.blocklyDropDownButton {',
    'display: inline-block;',
    'float: left;',
    'padding: 0;',
    'margin: 4px;',
    'border-radius: 4px;',
    'outline: none;',
    'border: 1px solid;',
    'transition: box-shadow .1s;',
    'cursor: pointer;',
    '}',

    '.blocklyDropDownButtonHover {',
        'box-shadow: 0px 0px 0px 4px rgba(0,0,0,0.1);',
    '}',

    '.blocklyDropDownButton:active {',
        'box-shadow: 0px 0px 0px 6px rgba(0,0,0,0.1);',
    '}',

    '.blocklyDropDownButton > img {',
    'width: 80%;',
    'height: 80%;',
    'margin-top: 5%',
    '}',

    '.blocklyDropDownPlaceholder {',
    'display: inline-block;',
    'float: left;',
    'padding: 0;',
    'margin: 4px;',
    '}',

    '.blocklyDropDownDiv .goog-menu {',
    'cursor: default;',
    'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
    'outline: none;',
    'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
    '}',
    '.blocklyDropDownDiv .goog-menuitem {',
    'color: #fff;',
    'font: normal 16px "Helvetica Neue", Helvetica, sans-serif;',
    'font-weight: bold;',
    'list-style: none;',
    'margin: 0;',
    /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
    'padding: 4px 7em 4px 28px;',
    'white-space: nowrap;',
    '}',
    /* BiDi override for the resting state. */
    /* #noflip */
    '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl, ',
    '.blocklyDropDownDiv .goog-menuitem.goog-menuitem-rtl {',
    /* Flip left/right padding for BiDi. */
    'padding-left: 7em;',
    'padding-right: 28px;',
    '}',

    /* If a menu doesn't have checkable items or items with icons, remove padding. */
    '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
    '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem, ',
    '.blocklyDropDownDiv .goog-menu-nocheckbox .goog-menuitem,',
    '.blocklyDropDownDiv .goog-menu-noicon .goog-menuitem { ',
    'padding-left: 12px;',
    '}',

    /*
     * If a menu doesn't have items with shortcuts, leave just enough room for
     * submenu arrows, if they are rendered.
     */
    '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem, ',
    '.blocklyDropDownDiv .goog-menu-noaccel .goog-menuitem {',
    'padding-right: 20px;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-content ',
    '.blocklyDropDownDiv .goog-menuitem-content {',
    'color: #000;',
    'font: normal 16px "Helvetica Neue", Helvetica, sans-serif;',
    '}',

    /* State: disabled. */
    '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,',
    '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content, ',
    '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-accel,',
    '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-content {',
    'color: #ccc !important;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon, ',
    '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-icon {',
    'opacity: 0.3;',
    '-moz-opacity: 0.3;',
    'filter: alpha(opacity=30);',
    '}',
    '.blocklyDropDownDiv .goog-menuitem-highlight,',
    '.blocklyDropDownDiv .goog-menuitem-hover {',
    'background-color: rgba(0, 0, 0, 0.2);',
    '}',

    /* State: selected/checked. */
    '.blocklyWidgetDiv .goog-menuitem-checkbox,',
    '.blocklyWidgetDiv .goog-menuitem-icon, ',
    '.blocklyDropDownDiv .goog-menuitem-checkbox,',
    '.blocklyDropDownDiv .goog-menuitem-icon {',
    'background-repeat: no-repeat;',
    'height: 16px;',
    'left: 6px;',
    'position: absolute;',
    'right: auto;',
    'vertical-align: middle;',
    'width: 16px;',
    '}',

    /* BiDi override for the selected/checked state. */
    /* #noflip */
    '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
    '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,',
    '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
    '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {',
    /* Flip left/right positioning. */
    'left: auto;',
    'right: 6px;',
    '}',

    '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
    '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,',
    '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,',
    '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {',
    /* Client apps may override the URL at which they serve the sprite. */
    'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
    '-webkit-transform: scale(1.5);',
    '-moz-transform: scale(1.5);',
    'transform: scale(1.5);',
    '}',

    /* Keyboard shortcut ("accelerator") style. */
    '.blocklyWidgetDiv .goog-menuitem-accel, ',
    '.blocklyDropDownDiv .goog-menuitem-accel {',
    'color: #999;',
    /* Keyboard shortcuts are untranslated; always left-to-right. */
    /* #noflip */
    'direction: ltr;',
    'left: auto;',
    'padding: 0 6px;',
    'position: absolute;',
    'right: 0;',
    'text-align: right;',
    '}',

    /* BiDi override for shortcut style. */
    /* #noflip */
    '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel, ',
    '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-accel {',
    /* Flip left/right positioning and text alignment. */
    'left: 0;',
    'right: auto;',
    'text-align: left;',
    '}',

    /* Mnemonic styles. */
    '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint, ',
    '.blocklyDropDownDiv .goog-menuitem-mnemonic-hint {',
    'text-decoration: underline;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator, ',
    '.blocklyDropDownDiv .goog-menuitem-mnemonic-separator {',
    'color: #999;',
    'font-size: 12px;',
    'padding-left: 4px;',
    '}',

    /* Copied from: goog/css/menuseparator.css */
    /*
     * Copyright 2009 The Closure Library Authors. All Rights Reserved.
     *
     * Use of this source code is governed by the Apache License, Version 2.0.
     * See the COPYING file for details.
     */

/**
 * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
 *
 * @author attila@google.com (Attila Bodis)
 */

    '.blocklyWidgetDiv .goog-menuseparator, ',
    '.blocklyDropDownDiv .goog-menuseparator {',
    'border-top: 1px solid #ccc;',
    'margin: 4px 0;',
    'padding: 0;',
    '}',
    '.blocklyNumPadButton {',
    'display: inline-block;',
    'float: left;',
    'padding: 0;',
    'width: 48px;',
    'height: 48px;',
    'margin: 4px;',
    'border-radius: 4px;',
    'background: #547AB2;',
    'color: #FFFFFF;',
    'outline: none;',
    'border: 1px solid #435F91;',
    'cursor: pointer;',
    'font-weight: 600;',
    'font-family: "Helvetica Neue", Helvetica, sans-serif;',
    'font-size: 12pt;',
    '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',

  '.blocklyNumPadButton > img {',
    'margin-top: 10%;',
    'width: 80%;',
    'height: 80%;',
  '}',

  '.blocklyNumPadButton:active {',
    'background: #435F91;',
    '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',
  '.blocklyNumPadButton_phone {',
    'display: inline-block;',
    'float: left;',
    'padding: 0;',
    'width: 28px;',
    'height: 28px;',
    'margin: 4px;',
    'border-radius: 4px;',
    'background: #547AB2;',
    'color: #FFFFFF;',
    'outline: none;',
    'border: 1px solid #435F91;',
    'cursor: pointer;',
    'font-weight: 600;',
    'font-family: "Helvetica Neue", Helvetica, sans-serif;',
    'font-size: 12pt;',
    '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',

  '.blocklyNumPadButton_phone > img {',
    'margin-top: 10%;',
    'width: 80%;',
    'height: 80%;',
  '}',
  '.blocklyNumPadButton_phone:active {',
    'background: #435F91;',
    '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',
  '.arrowTop {',
    'border-top: 1px solid;',
    'border-left: 1px solid;',
    'border-top-left-radius: 4px;',
    'border-color: inherit;',
  '}',

  '.arrowBottom {',
    'border-bottom: 1px solid;',
    'border-right: 1px solid;',
    'border-bottom-right-radius: 4px;',
    'border-color: inherit;',
  '}',

  '.blocklyTreeIcon_start {',
    'background-image: url(../project/images/toolbar/start_1.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_start_selected {',
    'background-image: url(../project/images/toolbar/start_2.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_actions {',
    'background-image: url(../project/images/toolbar/actions_1.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_actions_selected {',
    'background-image: url(../project/images/toolbar/actions_2.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_show {',
    'background-image: url(../project/images/toolbar/show_1.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_show_selected {',
    'background-image: url(../project/images/toolbar/show_2.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_sensors {',
    'background-image: url(../project/images/toolbar/sensor_1.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_sensors_selected {',
    'background-image: url(../project/images/toolbar/sensor_2.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_events {',
    'background-image: url(../project/images/toolbar/event_1.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_events_selected {',
    'background-image: url(../project/images/toolbar/event_2.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_math {',
    'background-image: url(../project/images/toolbar/math_1.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_math_selected {',
    'background-image: url(../project/images/toolbar/math_2.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_control {',
    'background-image: url(../project/images/toolbar/control_1.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIcon_control_selected {',
    'background-image: url(../project/images/toolbar/control_2.png);',
    'background-size: contain;',
    'background-position: center;',
    'background-repeat: no-repeat;',
    'height: 32px;',
    'vertical-align: middle;',
    'width: 32px;',
  '}',

  '.blocklyTreeIconNone,',
  '.blocklyTreeSelected>.blocklyTreeIconNone {',
    'background-position: center;',
  '}',
  
  ".modalBackground {",
  "  cursor: pointer;",
  "  width: 110px;",
  "  height: 100%;",
  "  background-color: rgba(100, 100, 100, 0.8);",
  "  z-index: 10;",
  "  position: absolute;",
  "  opacity: 1;",
  "  top: 0px;",
  "  left: 0px;",
  "  visibility: visible;",
  "  -webkit-transition: visibility 0s linear 0.3s, opacity 0.3s linear;",
  "  -moz-transition: visibility 0s linear 0.3s, opacity 0.3s linear;",
  "  transition: visibility 0s linear 0.3s, opacity 0.3s linear;",
  "  -webkit-transition-delay: 0s;",
  "  -moz-transition-delay: 0s;",
  "  transition-delay: 0s; }",
  "  .modalBackground.retracted {",
  "    opacity: 0;",
  "    visibility: hidden; }",
  "",

  ''
];

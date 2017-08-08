/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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

'use strict';

goog.provide('Blockly.Colours');

Blockly.Colours = {
  // SVG colours: these must be specificed in #RRGGBB style
  // To add an opacity, this must be specified as a separate property (for SVG fill-opacity)
  "id_start": {
    "primary": "#0ae8c0",
    "secondary": "#4280D7",
    "tertiary": "#3373CC"
  },
  "id_actions": {
    "primary": "#2dc1ea",
    "secondary": "#855CD6",
    "tertiary": "#774DCB"
  },
  "id_sounds": {
    "primary": "#5fd9fe",
    "secondary": "#C94FC9",
    "tertiary": "#BD42BD"
  },
  "id_moves": {
    "primary": "#5fd9fe",
    "secondary": "#EC9C13",
    "tertiary": "#CF8B17"
  },
  "id_sensors": {
    "primary": "#ffca05",
    "secondary": "#E6AC00",
    "tertiary": "#CC9900"
  },
  "id_events": {
    "primary": "#fda674",
    "secondary": "#47A8D1",
    "tertiary": "#2E8EB8"
  },
  "id_math": {
    "primary": "#809395",
    "secondary": "#0DA57A",
    "tertiary": "#0B8E69"
  },
  "id_control": {
    "primary": "#7d94e1",
    "secondary": "#46B946",
    "tertiary": "#389438"
  },

  "id_show": {
    "primary": "#51da6d",
    "secondary": "#46B946",
    "tertiary": "#389438"
  },


  // CSS colours: support RGBA
  "fieldShadow": "rgba(0,0,0,0.1)",
  "dropDownShadow": "rgba(0, 0, 0, .3)",
  "numPadBorder": "#435F91",
  "numPadBackground": "#547AB2",
  "numPadActiveBackground": "#435F91",
  "numPadText": "#FFFFFF",
  "valueReportBackground": "#FFFFFF",
  "valueReportBorder": "#AAAAAA"

};
if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Blockly.Colours;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return Blockly.Colours; });
} else {
    this.Colours = Blockly.Colours;
}

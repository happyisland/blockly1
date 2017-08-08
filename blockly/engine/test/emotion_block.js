; (function () {


    var BaseBlock, EmotionBlock,
        extend = function (child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },

    hasProp = {}.hasOwnProperty;
    BaseBlock = require('./base_block');
    EmotionBlock = (function (superClass) {
        extend(EmotionBlock, superClass);

        function EmotionBlock() {
            return EmotionBlock.__super__.constructor.apply(this, arguments);
        }

        EmotionBlock.prototype.init = function () {
            //this.setHexColour("#412FA0");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            return EmotionBlock.__super__.init.apply(this, arguments);
        };

        return EmotionBlock;

    })(BaseBlock);


    // 提供混合接口
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = EmotionBlock;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return EmotionBlock; });
    } else {
        this.EmotionBlock = EmotionBlock;
    }

}).call(this);
/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name View
     * @constructor
     * @description
     */

    function View() {
        View.apply(this, arguments);
    }

    View.prototype = Object.create(View.prototype);
    View.prototype.constructor = View;

    View.DEFAULT_OPTIONS = {
    };

    View.prototype.extend = function () {
        var args = Array.prototype.slice.call(arguments);
        
        for (var i = 0; i < args.length; i++) {
            var source = args[i];
            for (var prop in source) {
                this[prop] = source[prop];
            }
        }
    }

    module.exports = View;
});

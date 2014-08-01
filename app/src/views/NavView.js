/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');

    /*
     * @name FlowMenuNavView
     * @constructor
     * @description
     */

    function FlowMenuNavView() {
        View.apply(this, arguments);

        // var backgroundModifier = new StateModifier({
        //   size: [100, undefined]
        // });
        //
        // this.scaleModifier = new StateModifier();
        //
        // this.scaleModifier.setTransform(Transform.translate(-100, 0, 0));
        //
        // this.scaleModifier.setTransform(Transform.translate(0, 0, 0), {
        //     duration: 1000,
        //     curve: Easing.bounce
        // });
        //
        // var nav = this.add(this.scaleModifier).add(backgroundModifier);

        this.add(new Surface({
          content: 'Test',
          properties: {
            // backgroundColor: 'red'
            // backgroundColor: '#eee'
          }
        }));
    }

    FlowMenuNavView.prototype = Object.create(View.prototype);
    FlowMenuNavView.prototype.constructor = FlowMenuNavView;

    FlowMenuNavView.DEFAULT_OPTIONS = {
    };

    module.exports = FlowMenuNavView;
});

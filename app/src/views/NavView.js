/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var SequentialLayout = require('famous/views/SequentialLayout');

    /*
     * @name FlowMenuNavView
     * @constructor
     * @description
     */

    function FlowMenuNavView() {
        View.apply(this, arguments);

        this._focused = true;

        this.stateModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0]
        });

        this.sequentialLayout = new SequentialLayout();

        this.nav = this.add(this.stateModifier).add(this.sequentialLayout);

        this.sequentialLayout.sequenceFrom([new Surface({
            size: [30, 30],
            classes: ['ion-arrow-left-a', 'icon'],
            properties: {
                zIndex: -10,
                fontSize: '30px',
                // marign: '5px',
                textShadow: '-2px 2px 0px rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.9)'
            }
        })]);
    }

    FlowMenuNavView.prototype = Object.create(View.prototype);
    FlowMenuNavView.prototype.constructor = FlowMenuNavView;

    FlowMenuNavView.DEFAULT_OPTIONS = {
    };

    module.exports = FlowMenuNavView;
});

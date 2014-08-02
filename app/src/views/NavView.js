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
     * @name NavView
     * @constructor
     * @description
     */

    function NavView() {
        View.apply(this, arguments);

        this._focused = false;

        this.stateModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            opacity: 0
        });

        this.stateModifier.setTransform(Transform.translate(-75, 0, 0));

        this.sequentialLayout = new SequentialLayout();

        this.nav = this.add(this.stateModifier).add(this.sequentialLayout);

        this.sequentialLayout.sequenceFrom(this.options.iconSurfaces);

        this.on('toggle', function() {
            if (!this._focused) {
                this.stateModifier.setTransform(Transform.translate(0, 0, 0), {
                    duration: 100,
                    curve: Easing.outExp
                });
                this.stateModifier.setOpacity(1, {
                    duration: 100,
                    curve: Easing.outExp
                });

            } else {
                this.stateModifier.setTransform(Transform.translate(-75, 0, 0), {
                    duration: 100,
                    curve: Easing.outExp
                });
                this.stateModifier.setOpacity(0, {
                    duration: 100,
                    curve: Easing.outExp
                });

            }

            this._focused = !this._focused;
        }.bind(this));
    }

    NavView.prototype = Object.create(View.prototype);
    NavView.prototype.constructor = NavView;

    NavView.DEFAULT_OPTIONS = {
        iconSurfaces: [new Surface({
            size: [75, 75],
            classes: ['ion-key', 'icon'],
            properties: {
                zIndex: -10,
                textAlign: 'center',
                fontSize: '30px',
                textShadow: '-2px 2px 0px rgba(255, 255, 255, 0.1)',
                lineHeight: '75px',
                color: 'rgba(255, 255, 255, 0.9)'
            }
        }), new Surface({
            size: [75, 75],
            classes: ['ion-log-out', 'icon'],
            properties: {
                zIndex: -10,
                textAlign: 'center',
                fontSize: '30px',
                lineHeight: '75px',
                textShadow: '-2px 2px 0px rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.9)'
            }
        }), new Surface({
            size: [75, 75],
            classes: ['ion-settings', 'icon'],
            properties: {
                zIndex: -10,
                textAlign: 'center',
                fontSize: '30px',
                textShadow: '-2px 2px 0px rgba(255, 255, 255, 0.1)',
                lineHeight: '75px',
                color: 'rgba(255, 255, 255, 0.9)'
            }
        })]
    };

    module.exports = NavView;
});

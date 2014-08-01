/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');

    /*
     * @name ToggleButtonView.js
     * @constructor
     * @description
     */

    function ToggleButtonView() {
        View.apply(this, arguments);

        this._focused = true;

        var plusStyles = {
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '-2px 2px 0px 0px rgba(0, 0, 0, 0.1)'
        };

        this.verticalBarSurface = new Surface({
            size: [30, 7],
            properties: plusStyles
        });

        this.horizontalBarSurface = new Surface({
            size: [7, 30],
            properties: plusStyles
        });

        this.verticalBarSurface.on('click', function() {
            this._eventOutput.emit('toggle');
        }.bind(this));


        this.horizontalBarSurface.on('click', function() {
            this._eventOutput.emit('toggle');
        }.bind(this));


        this.on('toggle', function() {
            this.verticalBarModifier.setTransform(Transform.scale(0.5, 1, 1), {
                curve: Easing.inQuin,
                duration: 100
            });
            this.verticalBarModifier.setTransform(Transform.scale(1, 1, 1), {
                curve: Easing.outQuin,
                duration: 100
            });
            this.horizontalBarModifier.setTransform(Transform.scale(1, 0.5, 1), {
                curve: Easing.inQuin,
                duration: 100
            });
            this.horizontalBarModifier.setTransform(Transform.scale(1, 1, 1), {
                curve: Easing.outQuin,
                duration: 100
            });
            this.centerModifier.setTransform(Transform.rotateZ(this._focused ? Math.PI/4 : 0), {
                curve: Easing.outElastic,
                duration: 300
            })
            console.log('Toggle button!');
            this._focused = !this._focused;
        });

        this.centerModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        this.verticalBarModifier = new StateModifier({});
        this.horizontalBarModifier = new StateModifier({});

        this.plusIcon = this.add(this.centerModifier);
        this.plusIcon.add(this.verticalBarModifier).add(this.verticalBarSurface);
        this.plusIcon.add(this.horizontalBarModifier).add(this.horizontalBarSurface);
    }

    ToggleButtonView.prototype = Object.create(View.prototype);
    ToggleButtonView.prototype.constructor = ToggleButtonView;

    ToggleButtonView.DEFAULT_OPTIONS = {
    };

    module.exports = ToggleButtonView;
});

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

        this.verticalBarSurface = new Surface({
            size: [30, 5],
            properties: {
                background: '#eee'
            }
        });

        this.horizontalBarSurface = new Surface({
            size: [5, 30],
            properties: {
                background: '#eee'
            }
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
                duration: 300
            });
            this.verticalBarModifier.setTransform(Transform.scale(1, 1, 1), {
                curve: Easing.outQuin,
                duration: 300
            });
            this.horizontalBarModifier.setTransform(Transform.scale(1, 0.5, 1), {
                curve: Easing.inQuin,
                duration: 300
            });
            this.horizontalBarModifier.setTransform(Transform.scale(1, 1, 1), {
                curve: Easing.outQuin,
                duration: 300
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

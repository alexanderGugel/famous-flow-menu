/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');

    /*
     * @name ToggleButtonView
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

        var verticalBarSize = [30, 7];

        this.verticalBarSurface = new Surface({
            size: verticalBarSize,
            properties: plusStyles
        });

        this.horizontalBarSurface = new Surface({
            size: verticalBarSize.reverse(),
            properties: plusStyles
        });

        this.verticalBarSurface.pipe(this._eventInput);
        this.horizontalBarSurface.pipe(this._eventInput);

        this._eventInput.on('click', function() {
            this._eventOutput.emit('toggleRequested');
        }.bind(this));

        this.on('toggle', function() {
            var showTransition = {
                curve: Easing.outQuin,
                duration: 100
            };
            var hideTransition = {
                curve: Easing.inQuin,
                duration: 100
            };
            this.verticalBarModifier.setTransform(Transform.scale(0.4, 1, 1), hideTransition);
            this.verticalBarModifier.setTransform(Transform.scale(1, 1, 1), showTransition);
            this.horizontalBarModifier.setTransform(Transform.scale(1, 0.4, 1), hideTransition);
            this.horizontalBarModifier.setTransform(Transform.scale(1, 1, 1), showTransition);
            this.centerModifier.setTransform(Transform.rotateZ(this._focused ? Math.PI/4 : 0), {
                curve: Easing.outElastic,
                duration: 300
            });
            this._focused = !this._focused;
        });

        this.centerModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        this.verticalBarModifier = new StateModifier();
        this.horizontalBarModifier = new StateModifier();

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

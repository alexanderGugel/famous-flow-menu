/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Scrollview = require('famous/views/Scrollview');

    /*
     * @name FlowMenuContentView
     * @constructor
     * @description
     */

    function FlowMenuContentView() {
        View.apply(this, arguments);


        var scrollview = new Scrollview({
            // paginated: true
        });
        var surfaces = [];

        scrollview.sequenceFrom(surfaces);

        for (var i = 0, temp; i < 5000; i++) {
            temp = new Surface({
                //  content: "Surface: " + (i + 1),
                 size: [undefined, 20],
                 properties: {
                     backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
                     lineHeight: "200px",
                     textAlign: "center",
                     zIndex: 9000
                 }
            });

            temp.pipe(scrollview);
            surfaces.push(temp);
        }

        this._focused = true;

        this.content = scrollview;

        // this.content = scrollview;

        this.stateModifier = new StateModifier({
            origin: [1, 0],
            align: [0, 0]
        });

        this.add(this.stateModifier).add(this.content);
    }

    FlowMenuContentView.prototype = Object.create(View.prototype);
    FlowMenuContentView.prototype.constructor = FlowMenuContentView;

    FlowMenuContentView.DEFAULT_OPTIONS = {
        difference: 75
    };

    FlowMenuContentView.prototype.toggle = function() {
        var diff = this.options.difference;
        var curve = Easing.outElastic;

        if (!this._focused) {
            curve = Easing.outQuint;
            diff = 0;
        }

        this.stateModifier.setTransform(Transform.translate(diff, -diff, 0), {
            curve: curve,
            duration: 300
        });

        this._focused = !this._focused;
    };

    module.exports = FlowMenuContentView;
});

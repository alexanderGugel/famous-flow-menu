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
        this._focused = true;

        this.content = this.options.content;
        this.content.pipe(this);

        this._eventInput.on('click', function() {
            // if (!this._focused) {
            //     this.toggle();
            // }
        }.bind(this));

        this.stateModifier = new StateModifier();
        this.add(this.stateModifier).add(this.content);
    }

    FlowMenuContentView.prototype = Object.create(View.prototype);
    FlowMenuContentView.prototype.constructor = FlowMenuContentView;

    FlowMenuContentView.DEFAULT_OPTIONS = {
        difference: 75,
        content: (function () {
            var scrollview = new Scrollview();
            var surfaces = [];

            scrollview.sequenceFrom(surfaces);

            for (var i = 0, temp; i < 40; i++) {
                temp = new Surface({
                    content: 'This is surface #' + i,
                    size: [undefined, 100],
                    properties: {
                        backgroundColor: 'hsl(' + (i*5) + ', 100%, 50%)',
                        lineHeight: '100px',
                        textAlign: 'center',
                        fontFamily: 'Arial',
                        color: '#fff',
                        zIndex: 1000
                    }
                });

                temp.pipe(scrollview);
                surfaces.push(temp);
            }

            scrollview._eventInput.pipe(scrollview._eventOutput);

            return scrollview;
        })()
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

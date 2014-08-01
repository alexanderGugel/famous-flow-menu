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

        this._focused = true;

        this.stateModifier = new StateModifier({
        });

        this.nav = this.add(this.stateModifier);

        this.nav.add(new Surface({
          content: 'Test',
          properties: {
              zIndex: -10
          }
        }));
    }

    FlowMenuNavView.prototype = Object.create(View.prototype);
    FlowMenuNavView.prototype.constructor = FlowMenuNavView;

    FlowMenuNavView.DEFAULT_OPTIONS = {
    };

    module.exports = FlowMenuNavView;
});

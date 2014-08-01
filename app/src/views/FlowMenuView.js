/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var NavView = require('views/NavView');
    var ContentView = require('views/ContentView');
    var ToggleButtonView = require('views/ToggleButtonView');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');


    /*
     * @name FlowMenuView
     * @constructor
     * @description
     */

    function FlowMenuView() {
        View.apply(this, arguments);

        this.navView = new NavView();
        this.contentView = new ContentView();
        this.toggleButtonView = new ToggleButtonView();

        this.toggleButtonView.on('toggle', function () {
            this.contentView.toggle();
        }.bind(this));

        var background = new Surface({
            properties: {
                background: '#222',
                zIndex: -1
            }
        });

        this.add(background);
        this.add(new StateModifier({
            align: [0, 0],
            origin: [0, 0],
            size: [75, undefined]
        })).add(this.navView);
        this.add(new StateModifier({
            origin: [1, 0],
            align: [0, 0]
        })).add(this.contentView);
        this.add(new StateModifier({
            align: [0, 1],
            origin: [0, 1],
            size: [75, 75]
        })).add(this.toggleButtonView);
    }

    FlowMenuView.prototype = Object.create(View.prototype);
    FlowMenuView.prototype.constructor = FlowMenuView;

    FlowMenuView.DEFAULT_OPTIONS = {
    };

    module.exports = FlowMenuView;
});

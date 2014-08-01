/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var FlowMenuView = require('views/FlowMenuView');

    // create the main context
    var mainContext = Engine.createContext();

    var flowMenuView = new FlowMenuView();

    mainContext.add(flowMenuView);
});

define(function(require) {
    'use strict';
    var settings = {
        pushState: window.history && window.history.pushState
    };

    return function() {
        return settings;
    };
});
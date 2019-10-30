
(function() {
    var result = {};

    result.load = function() {
    };

    result.rerender = function(query) {
        return "";
    };

    result.rendered = function(query, container) {
    };

    applications("view", function() {
        return result;
    });

})();
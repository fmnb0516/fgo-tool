

var Utils = (function() {
    Handlebars.registerHelper('include', function (id, data) {
        const tpl = Handlebars.compile($("#"+id).html());
        return new Handlebars.SafeString(tpl(data));
    });

    var exports = {};

    exports.parseQuery = function(query) { 
    };


    return exports;
})();
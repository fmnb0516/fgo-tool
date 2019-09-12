

var Utils = (function() {
    var constData = fgoConstData();

    Handlebars.registerHelper('include', function (id, data) {
        const tpl = Handlebars.compile($("#"+id).html());
        return new Handlebars.SafeString(tpl(data));
    });

    Handlebars.registerHelper('selected', function (v1, v2) {
        return v1 === v2 ? "selected" : "";
    });

    Handlebars.registerHelper('fgo-buf-type-option', function (v1) {
        var html = constData.effects.map(function(t) {
            var selected = t === v1 ? "selected" : "";
            return "<option "+selected+" value=\""+t+"\">" + t + "</option>";
        });

        return new Handlebars.SafeString(html);
    });

    var exports = {};

    exports.parseQuery = function(query) { 
    };


    return exports;
})();
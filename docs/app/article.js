(function() {
    var result = {};

    result.load = function() {
        result.template = Handlebars.compile($("#template-article-page").html());
    };

    result.rerender = function(query) {
        return result.template({});
    };

    result.rendered = function() {
    };

    applications("article", function() {
        return result;
    });

})();
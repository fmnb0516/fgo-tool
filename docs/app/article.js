(function() {
    var result = {};

    result.load = function() {
        result.template = Handlebars.compile($("#template-article-page").html());
    };

    result.rerender = function(query) {
        var data = ARTICLE_ENTRIES;
        return result.template(data);
    };

    result.rendered = function() {
    };

    applications("article", function() {
        return result;
    });

})();
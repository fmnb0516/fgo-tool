
(function() {

    function getData() {
        var data = fgo.data();
        data.sort(function (d1, d2) {
            var c1 = parseInt(d1.servant.no) - parseInt(d2.servant.no);
            var c2 = parseInt(d1.servant.rare) - parseInt(d2.servant.rare);
            if (c1 !== 0) {
                return c1;
            }
            if (c2 !== 0) {
                return c2;
            }
            return d1.servant.name > d2.servant.name ? 1 : -1;
        });
        return data;
    };

    var result = {};

    result.load = function() {
        $(document).on("submit", "div[page='list'] #filter-form", function() {
            location.hash = "list$" + $("div[page='list'] #filter-input").val().trim();
            return false;
        });

        Handlebars.registerHelper('servantClass', function (id) {
            return fgo.classToLabel(id);
        });

        result.template = Handlebars.compile($("#template-list-page").html());
    };

    result.rerender = function(query) {
        var collection = getData().filter(function (d) {
            return query === "" || d.servant.name.indexOf(query) !== -1;
        });

        return result.template ({
            query : query,
            collection : collection
        });
    };

    result.rendered = function() {
    };

    applications("list", function() {
        return result;
    });

})();
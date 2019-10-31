(function() {
    var result = {};

    function createNavigation(len, query, page) {
        var data = [];

        for(var i=0; i<len; i++) {
            data.push({
                label : (i+1) + "",
                link : "#article$" + i +","+ query,
                active : i === page ? "active" : ""
            });
        }

        return data;
    };

    result.load = function() {
        result.template = Handlebars.compile($("#template-articleview-page").html());
    };

    result.rerender = function(query) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: query,
                type: 'GET',
                data: {}
            }).done(function(data) {
                resolve(result.template({}));
            }).fail(function(data) {
                resolve("");
            });
        });
    };

    result.rendered = function() {
    };

    applications("articleview", function() {
        return result;
    });

})();
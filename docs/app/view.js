
(function() {
    var result = {};

    function getServantData(no) {
        var data = fgo.data().find(function (d) {
            return d.servant.no === no;
        });
        return data ? data : null;
    };

    var constData = fgo.constData();

    result.load = function() {
        

        result.template = Handlebars.compile($("#template-view-page").html());

        Handlebars.registerHelper('json', function (d) {
            return JSON.stringify(d, null , "    ");
        });
    };

    result.rerender = function(query) {
        var no = query.split("-")[0];
        var data = getServantData(no);

        result.currentData = data;
        return result.template(data);
    };

    result.rendered = function(query, container) {
    };

    applications("view", function() {
        return result;
    });

})();
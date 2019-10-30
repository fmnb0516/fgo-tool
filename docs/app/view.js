
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

        Handlebars.registerHelper('fgo-buf-type-option', function (v1) {
            var html = constData.effects.map(function (t) {
              var selected = t === v1 ? "selected" : "";
              return "<option " + selected + " value=\"" + t + "\">" + t + "</option>";
            });
            return new Handlebars.SafeString(html);
        });
    };

    result.rerender = function(query) {
        var no = query.split("-")[0];
        var data = getServantData(no);

        result.currentData = data;
        return result.template({
            data : data,
            constData: constData,
        });
    };

    result.rendered = function(query, container) {
    };

    applications("view", function() {
        return result;
    });

})();
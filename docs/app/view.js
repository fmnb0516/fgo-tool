
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

        var cmap = {a : "Arts", b : "Buster", q: "Quick"};
        var tmap = {all : "全体宝具", single : "単体宝具", support: "補助宝具"};

        Handlebars.registerHelper('cardLabel', function (c) {
            return cmap[c];
        });

        Handlebars.registerHelper('hogutype', function (t) {
            return tmap[t];
        });

        $(document).on("click", "div[page='view'] .view-toggle-btn", function() {
            var targetid = $(this).attr("data-target");
            var target = $(targetid);

            if (target.is(':visible')) {
                target.hide();
            } else {
                target.show();
            }
        });

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
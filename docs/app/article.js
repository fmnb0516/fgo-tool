(function() {
    var result = {};

    function parseQuery(query) {
        const data = {
            page : 0,
            query: ""
        };

        const idx = query.indexOf(",");
        if(idx !== -1) {
            data.page = parseInt(query.substring(0, idx));
            data.query = query.substring(idx+1);
        }

        return data;
    };

    function splitAry(ary, size) {
        var len = ary.length, 
        newArr = [];

        for(var i = 0; i < Math.ceil(len / size); i++) {
            var arrEl = [];
            for(var j = 0; j < size; j++) {
                var p = ary.shift();
                if(!p) {
                    break;
                }
                arrEl.push(p);
            }
            newArr.push(arrEl);
        }
        return newArr
    };

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
        result.template = Handlebars.compile($("#template-article-page").html());

        $(document).on("submit", "div[page='article'] form", function() {
            var query = $("div[page='article'] form input").val();
            location.hash="article$0,"+query;
            return false;
        });

        Handlebars.registerHelper('to_tag', function (data) {
            var html = data.split(",").map(function(d) {
                return "<span class=\"badge badge-primary\" style=\"cursor: pointer\">" + d + "</span>";
            });
            return new Handlebars.SafeString(html.join("\r\n"));
        });
    };

    result.rerender = function(query) {
        var entries = JSON.parse(JSON.stringify(ARTICLE_ENTRIES));

        var params = parseQuery(query);

        var data = splitAry(entries.filter(function(e) {
            var check1 = params.query === "" || e.metadata.title.indexOf(params.query) !== -1;
            var check2 = params.query === "" || e.metadata.teaser.indexOf(params.query) !== -1;
            return check1 || check2;
        }), 20);

        var navi = createNavigation(data.length, params.query, params.page);

        return result.template({
            entries : data[params.page],
            query: params.query,
            page : params.page,
            navi : navi
        });
    };

    result.rendered = function() {
    };

    applications("article", function() {
        return result;
    });

})();
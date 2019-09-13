
$(function() {

    (function() {
        function match(data, f) {
            if(f.length === 0) {
                return data;
            }
            return data.filter(function(d) {
                for (var i = 0; i < f.length; i++) {
                    if(f[i](d) === true) {
                        return true;
                    }
                }
                return false;
            });
        };

        var filterFunction = {
            saber : function(d) { return d.servant.clazz === "saber"},
            archer : function(d) { return d.servant.clazz === "archer"},
            luncer : function(d) { return d.servant.clazz === "luncer"},
            caster : function(d) { return d.servant.clazz === "caster"},
            rider : function(d) { return d.servant.clazz === "rider"},
            asasin : function(d) { return d.servant.clazz === "asasin"},
            barserker : function(d) { return d.servant.clazz === "barserker"},
            avenger : function(d) { return d.servant.clazz === "avenger"},
            alterego : function(d) { return d.servant.clazz === "alterego"},
            monncanser : function(d) { return d.servant.clazz === "monncanser"},
            foreigner : function(d) { return d.servant.clazz === "foreigner"},
            hoguall : function(d) { return d.hogu.type === "all"},
            hogusingle : function(d) { return d.hogu.type === "single"},
            hogusupport : function(d) { return d.hogu.type === "support"},
            hoguarts : function(d) { return d.hogu.card === "a"},
            hoguquick : function(d) { return d.hogu.card === "q"},
            hogubuster : function(d) { return d.hogu.card === "b"},
        };

        $(document).on("click", ".filter-badge", function() {
            var selector = $(this);
    
            if(selector.hasClass("badge-secondary")) {
                selector.removeClass("badge-secondary").addClass("badge-dark");
            } else {
                selector.removeClass("badge-dark").addClass("badge-secondary");
            }
    
            var filters1 = [];
            $("#class-filter-container .filter-badge.badge-dark").each(function() {
                filters1.push(filterFunction[$(this).attr("data-val")]);
            });

            var filters2 = [];
            $("#type-filter-container .filter-badge.badge-dark").each(function() {
                filters2.push(filterFunction[$(this).attr("data-val")]);
            });

            var filters3 = [];
            $("#card-filter-container .filter-badge.badge-dark").each(function() {
                filters3.push(filterFunction[$(this).attr("data-val")]);
            });

            var data = filters1.length === 0 && filters2.length === 0 && filters3.length === 0 ? [] 
                : match(match(match(fgo.data(), filters1), filters2), filters3);

            var html = "";
            for(var i=0; i<data.length; i++) {
                var d = data[i];
                var label = "★"+ (d.servant.rare) + " " + "(" + (fgo.classToLabel(d.servant.clazz)) + ")" + " " + (d.servant.name); 
                html += "<button data-index=\""+i+"\" style=\"margin:5px;\" type=\"button\" class=\"servant-btn btn btn-info btn-sm\">"+ label + "</button>";
            }

            $("#filter-result").html(html);
        });
    })();

    (function() {
        var hoguTypes = {all : "全体", single:"単体", support:"補助"};
        var hoguCards = {a : "Arts", q: "Quck", b : "Buster"};

        $(document).on("click", ".servant-btn", function() {
            var index = parseInt($(this).attr("data-index"));
            var data = fgo.data()[index];
    
            $("#attacker-name").val(data.servant.name);
    
            var levels = "";
            for (var i = 0; i < data.status.length; i++) {
                var status = data.status[i];
                var selected = i === 0 ? "selected" : "";
                levels += "<option "+selected+" value=\""+ (status.atk) +"\">"+ (status.level) +"</option>";
            }
            $("#attacker-level").html(levels);
            $("#attacker-atk").val(data.status[0].atk);
            $("#hogu-type").val(hoguTypes[data.hogu.type]);
            $("#hogu-card").val(hoguCards[data.hogu.card]);
        });
    
        $(document).on("change", "#attacker-level", function() {
            $("#attacker-atk").val($(this).val());
        });

    })();
    
    
});
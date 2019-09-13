
$(function() {

    (function() {
        var data = fgo.data()
        var html = "<option selected value=\"\">無し</option>";

        for(var i=0; i<data.length; i++) {
            var d = data[i];
            var selected = i === 0 ? "selected" : "";
            var label = "★"+ (d.servant.rare) + " " + "(" + (fgo.classToLabel(d.servant.clazz)) + ")" + " " + (d.servant.name); 
            html += "<option value=\""+ (d.servant.no) +"\">"+ label +"</option>";
        }
        $(".supporter-select").html(html);

        

        $(document).on("change", ".supporter-select", function() {
            var index = $(this).val();
            var id = $(this).attr("id").substring(0, 2);
            if(index === "") {
                $("#"+ id + "-skill1-name").text("スキル1");
                $("#"+ id + "-skill2-name").text("スキル2");
                $("#"+ id + "-skill3-name").text("スキル3");
            } else {
                var data = fgo.data().find(function(d) { return d.servant.no === index});
                $("#"+ id + "-skill1-name").text(data.skill1.name);
                $("#"+ id + "-skill2-name").text(data.skill2.name);
                $("#"+ id + "-skill3-name").text(data.skill3.name);
            }
        });
    })();

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
                html += "<button data-index=\""+(d.servant.no)+"\" style=\"margin:5px;\" type=\"button\" class=\"servant-btn btn btn-info btn-sm\">"+ label + "</button>";
            }

            $("#filter-result").html(html);
        });
    })();

    (function() {
        var hoguTypes = {all : "全体", single:"単体", support:"補助"};
        var hoguCards = {a : "Arts", q: "Quck", b : "Buster"};

        $(document).on("click", ".servant-btn", function() {
            var index = $(this).attr("data-index");
            var data = fgo.data().find(function(d) { return d.servant.no === index});

            $("#attacker-name").val(data.servant.name).attr("data-index", index);
    
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
            $("#hogu-hit").val(data.hogu.hit);
            $("#hogu-na").val(data.hidden.na);

            $("#skill1-name").text(data.skill1.name);
            $("#skill2-name").text(data.skill2.name);
            $("#skill3-name").text(data.skill3.name);
        });
    
        $(document).on("change", "#attacker-level", function() {
            $("#attacker-atk").val($(this).val());
        });

    })();
    
    (function() {

        $(document).on("click", "#calc-btn", function() {
            var index = $("#attacker-name").attr("data-index");
            var data = fgo.data().find(function(d) { return d.servant.no === index});

            var context = {};

            context.atk = parseInt($("#attacker-atk").val()) + parseInt($("#fokun-atk").val()) + parseInt($("#reisou-atk").val());
            context.buf = {
                atk : parseFloat($("#hosei-atk").val()),
                card: parseFloat($("#hosei-card").val()),
                hogu: parseFloat($("#hosei-hogu").val()),
                tokkou: parseFloat($("#hosei-tokkou").val()),
                damage: parseFloat($("#hosei-damage").val()),
                np : parseFloat($("#hosei-np").val())
            };

            var hoguLv = parseInt($("#hogu-level").val());
            var hoguOc = parseInt($("#hogu-oc").val());
            var hoguMag = 0;
            data.hogu.effect.filter(function(e) {
                return e.type === "攻撃";
            }).forEach(function(e) {
                if(e.lvoc === "lv") {
                    hoguMag += parseFloat(e["v"+hoguLv]);
                } else if(e.lvoc === "oc") {
                    hoguMag += parseFloat(e["v"+hoguOc]);
                }
            });
            context.hoguMag = hoguMag;

            context.enemyNpHosei = parseFloat($("#result-class-select").val());
            context.classHosei = fgo.getClassHosei(data.servant.clazz);
            context.classCompatibility = parseFloat($("#result-compatibility").val());
            context.hoguTokkou = 0;
            context.overkill = parseInt($("#result-okhit").val());
            context.useTokkou = $("#result-tokkou").prop("checked");
        });

    })();
});
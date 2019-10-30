(function () {
    function reisouHelpHtml(level, data) {
        var result = [];
        var atkVal = data.atk;
        var hoguVal =data.hogu;
        var aVal = data.a;
        var bVal = data.b;
        var qVal = data.q;

        if (atkVal !== "") {
            var ary = atkVal.split(",");
            result.push("攻アップ:" + art[level-1]);
        }
        if (hoguVal !== "") {
            var ary = hoguVal.split(",");
            result.push("宝具アップ:" + art[level-1]);
        }
        if (aVal !== "") {
            var ary = aVal.split(",");
            result.push("Aアップ:" + ary[level-1]);
        }
        if (bVal !== "") {
            var ary = bVal.split(",");
            result.push("Bアップ:" + ary[level-1]);
        }
        if (qVal !== "") {
            var ary = qVal.split(",");
            result.push("Qアップ:" + ary[level-1]);
        }
        return result;
    };

    function reisouBuf(card, lv, reisou, buf) {
        var atkVal = reisou.atk;
        var hoguVal = reisou.hogu;
        var cardVal = reisou[card];

        if (atkVal !== "") {
            buf.atkbuf += parseInt(atkVal.split(",")[lv - 1]);
        }
        if (hoguVal !== "") {
            buf.hogubuf += parseInt(hoguVal.split(",")[lv - 1]);
        }
        if (cardVal !== "") {
            buf.cardbuf += parseInt(cardVal.split(",")[lv - 1]);
        }
    };

    function supportSkillBuff(servantData, lv, effect, buf) {
        var metaData = fgo.getEffectMeta(effect.type);

        metaData.apply({
            card: servantData.hogu.card,
            "mode": "support",
            "type": "skill",
            "target": effect.target,
            "beforeafter": "before"
        }, parseFloat(effect[lv]), servantData, buf);
    };

    function classSkillBuff(servantData, effect, buf) {
        var metaData = fgo.getEffectMeta(effect.type);

        metaData.apply({
            card: servantData.hogu.card,
            "mode": "own",
            "type": "classskil",
            "target": "self",
            "beforeafter": "before"
        }, parseFloat(effect.magnification), servantData, buf);
    };

    function orgSkillBuff(servantData, lv, effect, buf) {
        var metaData = fgo.getEffectMeta(effect.type);

        metaData.apply({
            card: servantData.hogu.card,
            "mode": "own",
            "type": "skill",
            "target": effect.target,
            "beforeafter": "before"
        }, parseFloat(effect["v" + lv]), servantData, buf);
    };

    function orgHoguBuff(servantData, lv, oc, effect, buf) {
        var metaData = fgo.getEffectMeta(effect.type);
        var lvoc = effect.lvoc === "lv" ? "v" + lv : "v" + oc;

        metaData.apply({
            card: servantData.hogu.card,
            "mode": "own",
            "type": "hogu",
            "target": effect.target,
            "beforeafter": effect.beforeafter
        }, parseFloat(effect[lvoc]), servantData, buf);
    };

    function getDamageLabel(type, tenchizin) {
        var map = {
            "ten": {
                "有利": "地",
                "等倍": "天・星・獣",
                "不利": "人"
            },
            "chi": {
                "有利": "人",
                "等倍": "地・星・獣",
                "不利": "天"
            },
            "hito": {
                "有利": "天",
                "等倍": "人・星・獣",
                "不利": "地"
            },
            "hoshi": {
                "有利": "獣",
                "等倍": "天・地・人・星",
                "不利": "なし"
            },
            "juu": {
                "有利": "星",
                "等倍": "天・地・人・獣",
                "不利": "なし"
            },
        };

        return map[tenchizin][type];
    };

    function getHoguMag(effect, hlv, hoc) {
        var mag = 0;

        for (var i = 0; i < effect.length; i++) {
            var e = effect[i];

            if (e.type !== "攻撃" && e.type !== "威力アップ") {
                continue;
            }
            mag += parseInt(e["v" + (e.lvoc === "lv" ? hlv : hoc)]);
        }
        return mag;
    };

    function getServantNo(val) {
        return val.substring(0, val.indexOf("-"));
    };

    function servantLabel(d) {
        return d.servant.no + "-星" + d.servant.rare + "-" + fgo.classToLabel(d.servant.clazz) + "-" + d.servant.name;
    };

    function getServantData(no) {
        var data = fgo.data().find(function (d) {
            return d.servant.no === no;
        });
        return data ? data : null;
    };

    var calcNp = (function () {
        function bufTo(v) {
            return v === 0 ? v : v / 100;
        };

        return function (card, na, hoguHit, overkill, hosei, buf) {
            var val = fgo.calcNp(na, card, bufTo(buf.cardbuf), bufTo(buf.npbuf), hoguHit, overkill, hosei);
            return Math.round(val * 10) / 10;
        };
    })();

    var calcDamage = (function () {
        function bufTo(v) {
            return v === 0 ? v : v / 100;
        };

        return function (card, atk, clazz, classCompatibility, attrCompatibility, buf, useTokkou) {
            var cardMag = fgo.getCardMag(card);
            var classHosei = fgo.getClassHosei(clazz);

            var val = fgo.calcDamage(atk, bufTo(buf.hogumag), cardMag, bufTo(buf.cardbuf), classHosei,
                classCompatibility, attrCompatibility, bufTo(buf.atkbuf), useTokkou ? bufTo(buf.tokkoubuf) : 0, 0, bufTo(buf.hogubuf), bufTo(buf.tokkou), buf.damage);
            return Math.round(val);
        };
    })();

    function parseQuery(str) {
        var data = {};
        var entries = str.split("&");

        for (var i = 0; i < entries.length; i++) {
            var pair = entries[i];
            var idx = pair.indexOf("=");

            if (idx !== -1) {
                data[pair.substring(0, idx)] = pair.substring(idx + 1);
            }
        }
        return data;
    };

    function notnull(v, def) {
        return v === undefined || v === null || v === "" ? def : v;
    };

    function supportvalue(v, support, def) {
        for (var i = 0; i < support.length; i++) {
            if (support[i] === v) {
                return v;
            }
        }
        return def;
    };

    var idgen = (function () {
        var counter = 1;
        return function () {
            return "idx-" + (counter++) + "-dom";
        };
    })();

    function setHash(data) {
        var a = [];
        a.push(data.target.no);
        a.push(data.target.skill1);
        a.push(data.target.skill2);
        a.push(data.target.skill3);
        a.push(data.target.tokkou);
        a.push(data.target.compatibility);
        a.push(data.target.hlv);
        a.push(data.target.hoc);
        a.push(data.target.lv);
        a.push(data.target.fou);

        var r = [];
        r.push(data.reisou.id)
        r.push(data.reisou.lv);

        var e = [];
        e.push(data.custom.addatk);
        e.push(data.custom.npbuf);
        e.push(data.custom.npget);
        e.push(data.custom.atkbuf);
        e.push(data.custom.cardbuf);
        e.push(data.custom.hogubuf);

        var s = [];
        data.suppurts.forEach(function (support) {
            var v = [];
            v.push(support.no);
            v.push(support.skill1);
            v.push(support.skill2);
            v.push(support.skill3);
            v.push(support.skill4);
            s.push(v.join(","));
        });
        location.hash = "calc$a=" + a.join(",") + "&s=" + s.join(":") + "&r=" + r.join(",") + "&e=" + e.join(",");
    };

    function getHash(hash) {
        var data = {
            target: {
                no: "",
                skill1: "",
                skill2: "",
                skill3: "",
                tokkou: "n",
                compatibility: "1.0",
                hlv: 1,
                hoc: 1,
                lv: "",
                fou: 1000,
                atk: ""
            },
            suppurts: [],
            reisou: {
                id: 0,
                lv: 1
            },
            custom: {
                addatk: 0,
                npbuf: 0,
                npget: 0,
                atkbuf: 0,
                cardbuf: 0,
                hogubuf: 0
            }
        };
        if (hash === "") {
            return data;
        }
        var entries = parseQuery(hash);

        if (entries["a"] !== undefined && entries["a"] !== null && entries["a"] !== "") {
            var values = entries["a"].split(",");
            var servantData = getServantData(notnull(values[0], ""));

            if (servantData !== null) {
                var levels = servantData.status.map(function (s) {
                    return s.level;
                });

                data.target.no = notnull(values[0], "");
                data.target.skill1 = supportvalue(values[1], ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "");
                data.target.skill2 = supportvalue(values[2], ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "");
                data.target.skill3 = supportvalue(values[3], ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "");
                data.target.tokkou = supportvalue(values[4], ["y", "n"], "n");
                data.target.compatibility = supportvalue(values[5], ["1.0", "1.5", "2.0", "0.5"], fgo.getCompatibility(1, servantData.servant.clazz));
                data.target.hlv = supportvalue(values[6], ["1", "2", "3", "4", "5"], servantData.servant.rare >= 4 ? "1" : "5");
                data.target.hoc = supportvalue(values[7], ["1", "2", "3", "4", "5"], "1");
                data.target.lv = supportvalue(values[8], levels, levels[0]);
                data.target.fou = isNaN(parseInt(values[9])) ? 1000 : parseInt(values[9]);

                data.target.atk = servantData.status.find(function (s) {
                    return s.level === data.target.lv;
                }).atk;
            }
        }

        if (entries["s"] !== undefined && entries["s"] !== null && entries["s"] !== "") {
            var supports = entries["s"].split(":");
            for (var i = 0; i < supports.length; i++) {
                var values = supports[i].split(",");

                var servantData = getServantData(notnull(values[0], ""));
                if (servantData === null) {
                    continue;
                }

                data.suppurts.push({
                    no: notnull(values[0], ""),
                    id: idgen(),
                    skill1: supportvalue(values[1], ["", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"], ""),
                    skill2: supportvalue(values[2], ["", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"], ""),
                    skill3: supportvalue(values[3], ["", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"], "")
                });
            }
        }

        if (entries["r"] !== undefined && entries["r"] !== null && entries["r"] !== "") {
            var values = entries["r"].split(",");
            data.reisou.id = parseInt(supportvalue(values[0], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "0"));
            data.reisou.lv = parseInt(supportvalue(values[1], ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "1"));
        }

        if (entries["e"] !== undefined && entries["e"] !== null && entries["e"] !== "") {
            var values = entries["e"].split(",");

            data.custom.addatk = isNaN(parseInt(values[0])) ? 0 : parseFloat(values[0]);
            data.custom.npbuf = isNaN(parseInt(values[1])) ? 0 : parseFloat(values[1]);
            data.custom.npget = isNaN(parseInt(values[2])) ? 0 : parseFloat(values[2]);
            data.custom.atkbuf = isNaN(parseInt(values[3])) ? 0 : parseFloat(values[3]);
            data.custom.cardbuf = isNaN(parseInt(values[4])) ? 0 : parseFloat(values[4]);
            data.custom.hogubuf = isNaN(parseInt(values[5])) ? 0 : parseFloat(values[5]);
        }

        return data;
    };

    function rerender(data) {
        var context = {};
        context.ext = {};
        var servantData = getServantData(data.target.no);

        var status = servantData !== null ? servantData.status : [];
        status.forEach(function(s) {
            s.selected = data.target.lv === s.level ? "selected" : "";
        });
        context.status = status;
        context.data = data;

        context.servantinput = servantData !== null ? servantLabel(servantData) : "";

        context.skillLabel = {
            s1 : servantData != null ? servantData.skill1.name : "",
            s2 : servantData != null ? servantData.skill2.name : "",
            s3 : servantData != null ? servantData.skill3.name : ""
        };

        context.hidden = {
            na : servantData != null ? servantData.hidden.na : "",
            hit: servantData != null ? servantData.hogu.hit : "",
            card: servantData != null ? servantData.hogu.card : "",
            hogu: servantData != null ? servantData.hogu.type : "",
            tenchizin : servantData != null ? servantData.servant.tenchizin : ""
        };

        var atackerbuf = { hogumag: 0, npbuf: 0, cardbuf: 0, npget: 0, atkbuf: 0, hogubuf: 0, tokkoubuf: 0, tokkou: 100, damage: 0 };

        var classskill = servantData != null ? servantData.classskill : [];
        classskill.forEach(function (s) {
            s.effect.forEach(function (e) {
                classSkillBuff(servantData, e, atackerbuf);
            });
        });

        if (data.target.skill1 !== "" && servantData != null) {
            servantData.skill1.effects.forEach(function (e) {
                orgSkillBuff(servantData, data.target.skill1, e, atackerbuf);
            });
        }
        if (data.target.skill2 !== "" && servantData != null) {
            servantData.skill2.effects.forEach(function (e) {
                orgSkillBuff(servantData, data.target.skill2, e, atackerbuf);
            });
        }

        if (data.target.skill3 !== "" && servantData != null) {
            servantData.skill3.effects.forEach(function (e) {
                orgSkillBuff(servantData, data.target.skill3, e, atackerbuf);
            });
        }

        if (servantData !== null) {
            servantData.hogu.effect.forEach(function (e) {
                orgHoguBuff(servantData, data.target.hlv, data.target.hoc, e, atackerbuf);
            });
        }

        var useTokkou = data.target.tokkou === "y";

        context.atackerbuf = atackerbuf;
        context.ext.margehogubuf =atackerbuf.hogubuf + (useTokkou ? atackerbuf.tokkoubuf : 0);

        context.reisou = [
            {label:"マスター礼装無し", atk:"", a:"", b:"", q:"", hogu:"", value:"0"},
            {label:"魔術礼装・カルデア", atk:"30,32,34,36,38,40,42,44,46,50", a:"", b:"", q:"", hogu:"", value:"1"},
            {label: "カルデア戦闘服", atk:"20,21,22,23,24,25,26,27,28,30", a:"", b:"", q:"", hogu:"", value:"2"},
            {label: "アニバーサリー・ブロンド(単体B)", atk:"", a:"", b:"40,42,44,46,48,50,52,54,56,60", q:"", hogu:"", value:"3"},
            {label: "ロイヤルブランド(単体Q)", atk:"", a:"", b:"", q:"30,32,34,36,38,40,42,44,46,50", hogu:"", value:"4"},
            {label: "ブリリアントサマー(全体Q)", atk:"", a:"", b:"", q:"20,21,22,23,24,25,26,27,28,30", hogu:"", value:"5"},
            {label: "月の海の記憶(単体A)", atk:"", a:"30,32,34,36,38,40,42,44,46,50", b:"", q:"", hogu:"", value:"6"},
            {label: "月の裏側の記憶(全体A)", atk:"", a:"20,21,22,23,24,25,26,27,28,30", b:"", q:"", hogu:"", value:"7"},
            {label: "2004年の断片(単体宝具)", atk:"", a:"", b:"", q:"", hogu:"30,32,34,36,38,40,42,44,46,50", value:"8"},
            {label: "極地用カルデア制服(単体ATK+宝具威力)", atk:"20,22,24,26,28,30,32,34,36,40", a:"", b:"", q:"", hogu:"10,11,12,13,14,15,16,17,18,20", value:"9"},
            {label: "トロピカルサマー(単体A+宝具威力)", atk:"", a:"20,21,22,23,24,25,26,27,28,30", b:"", q:"", hogu:"10,11,12,13,14,15,16,17,18,20", value:"10"},
            {label: "晴れの新年(全体宝具威力)", atk:"", a:"", b:"", q:"", hogu:"25,26,27,28,29,30,31,32,33,35", value:"11"}
        ];

        for(var i=0; i<context.reisou.length; i++) {
            var r = context.reisou[i];
            r.check = parseInt(r.value) === data.reisou.id ? "selected" : "";
        }

        var selectReisou = context.reisou.find(function(r) {
            return parseInt(r.value) === data.reisou.id;
        });

        context.reisouBufTag = reisouHelpHtml(data.reisou.lv, selectReisou); 

        for (var i = 0; i < data.suppurts.length; i++) {
            var support = data.suppurts[i];
            var supportServantData = getServantData(support.no);

            /*
            $("#support-box").append($("<span>").attr("class", "badge badge-dark")
                .attr("style", "cursor: pointer;padding: 10px;margin: 3px;")
                .attr("id", support.id)
                .attr("data-no", support.no)
                .attr("skill1", support.skill1)
                .attr("skill2", support.skill2)
                .attr("skill3", support.skill3)
                .text(servantLabel(supportServantData)));
            */

            if (support.skill1 !== "") {
                supportServantData.skill1.effects.forEach(function (e) {
                    supportSkillBuff(servantData, support.skill1, e, atackerbuf);
                });
            }
            if (support.skill2 !== "") {
                supportServantData.skill2.effects.forEach(function (e) {
                    supportSkillBuff(servantData, support.skill2, e, atackerbuf);
                });
            }
            if (support.skill3 !== "") {
                supportServantData.skill3.effects.forEach(function (e) {
                    supportSkillBuff(servantData, support.skill3, e, atackerbuf);
                });
            }
        }

        atackerbuf.cardbuf += data.custom.cardbuf;
        atackerbuf.npbuf += data.custom.npbuf;
        atackerbuf.npget += data.custom.npget;
        atackerbuf.atkbuf += data.custom.atkbuf;
        atackerbuf.hogubuf += data.custom.hogubuf;

        if (servantData !== null) {
            reisouBuf(servantData.hogu.card, data.reisou.lv, selectReisou, atackerbuf);
        }

        var cardHosei = servantData !== null ? fgo.getCardNp(servantData.hogu.card) : 0;
        var hoguHit = servantData !== null ? servantData.hogu.hit : 0;
        var na = servantData !== null ? servantData.hidden.na : 0;

        var lastAtk = data.target.atk + data.target.fou + data.custom.addatk;
        var classDmgHosei = servantData !== null ? fgo.getClassHosei(servantData.servant.clazz) : 0;
        var cardMag = servantData !== null ? fgo.getCardMag(servantData.hogu.card) : 0;

        var calcNpResult = [];
        for (var i = 0; i < hoguHit; i++) {
            var d1 = calcNp(cardHosei, na, hoguHit, i + 1, 1.0, atackerbuf);
            var d2 = calcNp(cardHosei, na, hoguHit, i + 1, 1.2, atackerbuf);
            var d3 = calcNp(cardHosei, na, hoguHit, i + 1, 1.1, atackerbuf);
            var d4 = calcNp(cardHosei, na, hoguHit, i + 1, 0.9, atackerbuf);
            var d5 = calcNp(cardHosei, na, hoguHit, i + 1, 0.8, atackerbuf);
            calcNpResult.push({
                label: "OverKill " + (i + 1),
                d1: d1 + atackerbuf.npget,
                d2: d2 + atackerbuf.npget,
                d3: d3 + atackerbuf.npget,
                d4: d4 + atackerbuf.npget,
                d5: d5 + atackerbuf.npget,
                a1: Math.round(((d1 * 3) + atackerbuf.npget) * 10) / 10,
                a2: Math.round(((d2 * 3) + atackerbuf.npget) * 10) / 10,
                a3: Math.round(((d3 * 3) + atackerbuf.npget) * 10) / 10,
                a4: Math.round(((d4 * 3) + atackerbuf.npget) * 10) / 10,
                a5: Math.round(((d5 * 3) + atackerbuf.npget) * 10) / 10
            });
        }

        var calcDamageResult = [];
        if (servantData !== null) {
            var damage1 = calcDamage(servantData.hogu.card, lastAtk, servantData.servant.clazz, parseFloat(data.target.compatibility), 1.1, atackerbuf, useTokkou);
            var damage2 = calcDamage(servantData.hogu.card, lastAtk, servantData.servant.clazz, parseFloat(data.target.compatibility), 1.0, atackerbuf, useTokkou);
            var damage3 = calcDamage(servantData.hogu.card, lastAtk, servantData.servant.clazz, parseFloat(data.target.compatibility), 0.9, atackerbuf, useTokkou);

            calcDamageResult.push({
                label: getDamageLabel("有利", servantData.servant.tenchizin),
                d1: Math.round(damage1 * 1.1),
                d2: Math.round(damage1 * 1.0),
                d3: Math.round(damage1 * 0.9)
            });
            calcDamageResult.push({
                label: getDamageLabel("等倍", servantData.servant.tenchizin),
                d1: Math.round(damage2 * 1.1),
                d2: Math.round(damage2 * 1.0),
                d3: Math.round(damage2 * 0.9)
            });
            calcDamageResult.push({
                label: getDamageLabel("不利", servantData.servant.tenchizin),
                d1: Math.round(damage3 * 1.1),
                d2: Math.round(damage3 * 1.0),
                d3: Math.round(damage3 * 0.9)
            });
        }

        context.npResult = calcNpResult;
        context.damageResult = calcDamageResult;

        var cumulative = [];

        if (servantData !== null) {
            cumulative.push("基礎倍率:0.23");
            cumulative.push("宝具倍率:" + atackerbuf.hogumag);
            cumulative.push("カードNP補正:" + cardHosei);
            cumulative.push("カードダメージ補正:" + cardMag);
            cumulative.push("カード補正:" + atackerbuf.cardbuf);
            cumulative.push("攻防力補正:" + atackerbuf.atkbuf);
            cumulative.push("宝具威力補正:" + (atackerbuf.hogubuf + (useTokkou ? atackerbuf.tokkoubuf : 0)));
            cumulative.push("NP獲得量補正:" + atackerbuf.npbuf);
            cumulative.push("ターン後NP獲得:" + atackerbuf.npget);
            cumulative.push("宝具LV:" + data.target.hlv);
            cumulative.push("宝具OC:" + data.target.hoc);
        }

        context.cumulative = cumulative;

        return result.template(context);
    };

    var result = {};

    result.load = function () {
        result.template = Handlebars.compile($("#template-calc-page").html());

         /* その他イベント start */
         (function () {
            Handlebars.registerHelper('selected', function (v1, v2) {
                return v1 === v2 ? "selected" : "";
            });

            $(document).on("click", ".toggle-btn", function () {
                var targetId = $(this).attr("data-target");
                var target = $(targetId);
                if (target.is(':visible')) {
                    target.hide();
                } else {
                    target.show();
                }
            });

            $(document).on("click", "div[page='calc'] #clearnBtn", function () {
                location.hash = "calc";
            });
        })();
        /* その他イベント end */

        /* アタッカー部分のイベント start */
        (function () {
            $(document).on("change", "div[page='calc'] #level-input", function () {
                var currentData = result.currentData;

                var selected = $("#level-input option:selected");
                var lv = selected.val("");
                var atk = parseInt(selected.attr("atk"));

                currentData.target.lv = lv;
                currentData.target.atk = atk;
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #for-atk-input", function () {
                var val = parseInt($(this).val());
                var currentData = result.currentData;
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #hogu-lv-input", function () {
                var currentData = result.currentData;
                currentData.target.hlv = $(this).val();
                setHash(initialData);
            });

            $(document).on("change", "div[page='calc'] #hogu-oc-input", function () {
                var currentData = result.currentData;
                currentData.target.hoc = $(this).val();
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #target-skill1-lv-input", function () {
                var currentData = result.currentData;
                currentData.target.skill1 = $(this).val();
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #target-skill2-lv-input", function () {
                var currentData = result.currentData;
                currentData.target.skill2 = $(this).val();
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #target-skill3-lv-input", function () {
                var currentData = result.currentData;
                currentData.target.skill3 = $(this).val();
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #tokkou-enable-input", function () {
                var currentData = result.currentData;
                currentData.target.tokkou = $(this).val();
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #target-compatibility-input", function () {
                var currentData = result.currentData;
                currentData.target.compatibility = $(this).val();
                setHash(currentData);
            });

        })();
        /* アタッカー部分のイベント end */

        /* 礼装、その他バフ部分のイベント start */
        (function () {

            $(document).on("change", "div[page='calc'] #target-reisou-level", function () {
                var currentData = result.currentData;
                currentData.reisou.lv = parseInt($(this).val());
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #target-reisou-input", function () {
                var currentData = result.currentData;
                currentData.reisou.id = $(this).val();
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #other-atk-input", function () {
                var currentData = result.currentData;
                currentData.custom.addatk = parseInt($(this).val());
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #other-np-buf-input", function () {
                var currentData = result.currentData;
                currentData.custom.npbuf = parseFloat($(this).val());
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #other-np-get-input", function () {
                var currentData = result.currentData;
                currentData.custom.npget = parseFloat($(this).val());
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #other-atk-buf-input", function () {
                var currentData = result.currentData;
                currentData.custom.atkbuf = parseFloat($(this).val());
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #other-card-buf-input", function () {
                var currentData = result.currentData;
                currentData.custom.cardbuf = parseFloat($(this).val());
                setHash(currentData);
            });

            $(document).on("change", "div[page='calc'] #other-hogu-buf-input", function () {
                var currentData = result.currentData;
                currentData.custom.hogubuf = parseFloat($(this).val());
                setHash(currentData);
            });
        })();
        /* 礼装、その他バフ部分のイベント end */

    };

    result.rerender = function (query) {
        var currentData = getHash(query);
        result.currentData = currentData;
        return rerender(currentData);
    };

    result.rendered = function(query, container) {
        var currentData = result.currentData;
        var servantAutoCompleteData = fgo.data().map(function (d) {
            return servantLabel(d);
        });

        $("div[page='calc'] #target-servant-input").autocomplete({
            source: servantAutoCompleteData,
            select: function (e, d) {
                var no = getServantNo(d.item.value);
                var servantData = getServantData(no);

                var status = servantData.status[0];

                currentData.target.no = no;
                currentData.target.skill1 = "10";
                currentData.target.skill2 = "10";
                currentData.target.skill3 = "10";
                currentData.target.tokkou = "n";
                currentData.target.compatibility = fgo.getCompatibility(1, servantData.servant.clazz);
                currentData.target.hlv = servantData.servant.rare >= 4 ? "1" : "5";
                currentData.target.hoc = "1";
                currentData.target.lv = status.level;
                currentData.target.fou = 1000;
                currentData.target.atk = status.atk;

                setHash(currentData);
            }
        });

        $("div[page='calc'] #support-servant-input").autocomplete({
            source: servantAutoCompleteData,
            select: function (e, d) {
                var no = getServantNo(d.item.value);

                currentData.suppurts.push({
                    no: no,
                    id: idgen(),
                    skill1: "v10",
                    skill2: "v10",
                    skill3: "v10"
                });
                setHash(currentData);
            }
        });

    };

    applications("calc", function () {
        return result;
    });
})();
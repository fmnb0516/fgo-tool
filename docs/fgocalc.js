
(function (exports) {

    function min(v1, v2) {
        return v1 > v2 ? v2 : v1;
    }

    var data = (function () {
        var holder = null;
        return function () {
            if (arguments.length === 0) {
                return JSON.parse(JSON.stringify(holder));
            } else if (arguments.length === 1) {
                holder = JSON.parse(JSON.stringify(arguments[0]));
            }
        };
    })();

    var calcNp = function (nprate, cardHosei, cardBuf, npBuf, hit, okhit, enemyHosei) {
        var np1 = nprate * cardHosei * (1 + cardBuf) * (1 + npBuf) * enemyHosei * (hit - okhit) * 1;
        var np2 = nprate * cardHosei * (1 + cardBuf) * (1 + npBuf) * enemyHosei * okhit * 1.5;
        return np1 + np2;
    };

    var calcDamage = function (atk, hoguMagnification, card, cardBuf, classCorrection, classCompatibility, attrCompatibility, atkBuf, tokkouBuf, tokubouBuf, hoguBuf, tokkou, damageBuf) {
        var hosei = 0.23;

        return (atk * hoguMagnification * hosei * (card * min(5, 1 + cardBuf))
            * classCorrection * classCompatibility * attrCompatibility * (1 + atkBuf)
            * (1 + min(5, tokkouBuf) + (5, tokubouBuf) + min(5, hoguBuf))
            * tokkou) + min(1000, damageBuf);
    };

    var getClassHosei = function (clazz) {
        if (clazz === "saber") {
            return 1.0;
        } else if (clazz === "archer") {
            return 0.95;
        } else if (clazz === "luncer") {
            return 1.05;
        } else if (clazz === "caster") {
            return 0.9;
        } else if (clazz === "rider") {
            return 1.0;
        } else if (clazz === "asasin") {
            return 0.9;
        } else if (clazz === "barserker") {
            return 1.1;
        } else if (clazz === "ruler") {
            return 1.1;
        } else if (clazz === "avenger") {
            return 1.1;
        } else if (clazz === "alterego") {
            return 1.0;
        } else if (clazz === "monncanser") {
            return 1.0;
        } else if (clazz === "foreigner") {
            return 1.0;
        } else {
            return 1.0;
        }
    };

    var getCardMag = function (card) {
        if (card === "a") {
            return 1.0;
        } else if (card === "q") {
            return 0.8;
        } else if (card === "b") {
            return 1.5;
        }
    };

    var getCardNp = function (card) {
        if (card === "a") {
            return 3;
        } else if (card === "q") {
            return 1;
        } else if (card === "b") {
            return 0;
        }
    };

    var classLableFrom = function(label) {
        if(label === "セイバー") {
            return "saber";
        }
    };

    var tenchizinLabelFrom = function(label) {
        if(label === "地") {
            return "chi";
        } else if(label === "天") {
            return "ten";
        } else if(label === "人") {
            return "jin";
        } else if(label === "星") {
            return "hoshi";
        }
    };

    var classToLabel = function (clazz) {
        if (clazz === "saber") {
            return "剣";
        } else if (clazz === "archer") {
            return "弓";
        } else if (clazz === "luncer") {
            return "槍";
        } else if (clazz === "caster") {
            return "術";
        } else if (clazz === "rider") {
            return "騎";
        } else if (clazz === "asasin") {
            return "殺";
        } else if (clazz === "barserker") {
            return "狂";
        } else if (clazz === "ruler") {
            return "裁";
        } else if (clazz === "avenger") {
            return "讐";
        } else if (clazz === "alterego") {
            return "分";
        } else if (clazz === "monncanser") {
            return "月";
        } else if (clazz === "foreigner") {
            return "降";
        } else {
            return "UNKOWN";
        }

    };

    var enableEffect = (function () {

        var matrix = {
            org: {
                "self": true,
                "other-all": false,
                "self-other": true,
                "other-single": true,
                "enemy-single": true,
                "enemy-all": true
            },
            support: {
                "self": false,
                "other-all": true,
                "self-other": true,
                "other-single": true,
                "enemy-single": true,
                "enemy-all": true
            }
        };

        return function (target, mode) {
            return matrix[mode][target];
        };
    });

    var efectTypes = [
        {
            key: "攻撃",
            apply: function (card, target, magnification, buf) { }
        },
        {
            key: "Artsカード性能アップ",
            apply: function (card, target, magnification, buf) {
                if (card === "a" && target.indexOf("enemy") === -1) {
                    buf.card += parseFloat(magnification);
                }
            }
        },
        {
            key: "Busterカード性能アップ",
            apply: function (card, target, magnification, buf) {
                if (card === "b" && target.indexOf("enemy") === -1) {
                    buf.card += parseFloat(magnification);
                }
            }
        },
        {
            key: "Quickカード性能アップ",
            apply: function (card, target, magnification, buf) {
                if (card === "q" && target.indexOf("enemy") === -1) {
                    buf.card += parseFloat(magnification);
                }
            }
        },
        {
            key: "攻撃力アップ",
            apply: function (card, target, magnification, buf) {
                if (target.indexOf("enemy") === -1) {
                    buf.atk += parseFloat(magnification);
                }
            }
        },
        {
            key: "宝具威力アップ",
            apply: function (card, target, magnification, buf) {
                if (target.indexOf("enemy") === -1) {
                    buf.hogu += parseFloat(magnification);
                }
            }
        },
        {
            key: "防御力アップ",
            apply: function () { }
        },
        {
            key: "防御力ダウン",
            apply: function (card, target, magnification, buf) {
                if (target.indexOf("enemy") !== -1) {
                    buf.atk += parseFloat(magnification);
                }
            },
        },
        {
            key: "ダメージカット付与",
            apply: function () { }
        },
        {
            key: "与ダメージプラス付与",
            apply: function (card, target, magnification, buf) {
                if (target.indexOf("enemy") === -1) {
                    buf.damage += parseFloat(magnification);
                }
            }
        },
        {
            key: "スター獲得",
            apply: function () { }
        },
        {
            key: "スター集中度アップ",
            apply: function () { }
        },
        {
            key: "最大HP増加",
            apply: function () { }
        },
        {
            key: "HP回復",
            apply: function () { }
        },
        {
            key: "NP増加",
            apply: function () { }
        },
        {
            key: "(アルゴー号ゆかりの者)NP増加",
            apply: function () { }
        },
        {
            key: "NP獲得量アップ",
            apply: function (card, target, magnification, buf) {
                if (target.indexOf("enemy") === -1) {
                    buf.np += parseFloat(magnification);
                }
            }
        },
        {
            key: "被ダメ獲得量アップ",
            apply: function () { }
        },
        {
            key: "スキルチャージ",
            apply: function () { }
        },
        {
            key: "クリティカル威力アップ",
            apply: function () { }
        },
        {
            key: "(狂のみ)クリティカル威力アップ",
            apply: function () { }
        },
        {
            key: "(Qのみ)クリティカル威力アップ",
            apply: function () { }
        },
        {
            key: "クリティカル発生率ダウン",
            apply: function () { }
        },
        {
            key: "スター発生率アップ",
            apply: function () { }
        },
        {
            key: "無敵貫通付与",
            apply: function () { }
        },
        {
            key: "無敵付与",
            apply: function () { }
        },
        {
            key: "回避付与",
            apply: function () { }
        },
        {
            key: "弱体解除",
            apply: function () { }
        },
        {
            key: "弱体耐性アップ",
            apply: function () { }
        },
        {
            key: "弱体耐性ダウン",
            apply: function () { }
        },
        {
            key: "弱体付与成功率アップ",
            apply: function () { }
        },
        {
            key: "強化成功率をアップ",
            apply: function () { }
        },
        {
            key: "チャージ減",
            apply: function () { }
        },
        {
            key: "スタン付与",
            apply: function () { }
        },
        {
            key: "呪い付与",
            apply: function () { }
        },
        {
            key: "呪厄付与",
            apply: function () { }
        },
        {
            key: "即死",
            apply: function () { }
        },
        {
            key: "即死無効付与",
            apply: function () { }
        },
        {
            key: "ターゲット集中付与",
            apply: function () { }
        },
    ];

    var bufMerge = (function () {
        return function (mode, context, type, magnification, effect) {
            console.log(mode + ":" + type);

            var efectType = efectTypes.find(function (e) {
                return e.key == type;
            });

            if (efectType === null) {
                return;
            }

            var target = effect === undefined ? "self" : effect.target;
            if (enableEffect(target, mode) === false) {
                return;
            }

            var card = context.card;
            efectType.apply(card, target, magnification, context.buf);
        };

    })();

    constData = (function() {
        var data = {};

        data.servantClass = [
            {label:"剣", id:"saber"},
            {label:"弓", id:"archer"},
            {label:"槍", id:"luncer"},
            {label:"騎", id:"rider"},
            {label:"術", id:"caster"},
            {label:"殺", id:"asasin"},
            {label:"狂", id:"barserker"},
            {label:"裁", id:"ruler"},
            {label:"讐", id:"avenger"},
            {label:"月", id:"monncanser"},
            {label:"分", id:"alterego"},
            {label:"降", id:"foreigner"}
        ];

        data.tenchizin = [
            {label:"天", id:"ten"},
            {label:"地", id:"chi"},
            {label:"人", id:"hito"},
            {label:"星", id:"hoshi"}
        ];

        data.effects = efectTypes.map(function(e) {
            return e.key;
        });
        
        return function() {
            return JSON.parse(JSON.stringify(data));
        };
    })();

    exports.calcDamage = calcDamage;
    exports.calcNp = calcNp;
    exports.data = data;
    exports.classToLabel = classToLabel;
    exports.getClassHosei = getClassHosei;
    exports.getCardMag = getCardMag;
    exports.bufMerge = bufMerge;
    exports.getCardNp = getCardNp;
    exports.classLableFrom = classLableFrom;
    exports.tenchizinLabelFrom = tenchizinLabelFrom;

    exports.constData = constData;

})(typeof exports === 'undefined' ? window.fgo = {} : exports);
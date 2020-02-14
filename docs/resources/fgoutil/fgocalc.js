
(function (exports) {

    function min(v1, v2) {
        return v1 > v2 ? v2 : v1;
    };

    function containAllText(target, finds) {
        for (let i = 0; i < finds.length; i++) {
            const f = finds[i];
            if (target.indexOf(f) === -1) {
                return false;
            }
        }
        return true;
    };

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
        var data = constData().servantClass.find(function (d) {
            return d.id === clazz;
        });
        return data.hosei;
    };

    var getCardMag = (function () {
        var data = { "a": 1.0, "q": 0.8, "b": 1.5 };
        return function (card) {
            return data[card];
        };
    })();

    var getCardNp = (function () {
        var data = { "a": 3, "q": 1, "b": 0 };
        return function (card) {
            return data[card];
        };
    })();

    var getCompatibility = (function () {

        var map = {
            "saber": ["1.0", "2.0", "0.5"],
            "archer": ["1.0", "2.0", "0.5"],
            "luncer": ["1.0", "2.0", "0.5"],
            "rider": ["1.0", "2.0", "0.5"],
            "caster": ["1.0", "2.0", "0.5"],
            "asasin": ["1.0", "2.0", "0.5"],
            "barserker": ["1.0", "1.5", "0.5"],
            "ruler": ["1.0", "2.0", "0.5"],
            "avenger": ["1.0", "2.0", "0.5"],
            "monncanser": ["1.0", "2.0", "0.5"],
            "alterego": ["1.0", "2.0", "0.5"],
            "foreigner": ["1.0", "2.0", "0.5"],
            "shielder": ["1.0", "1.0", "1.0"],
        };

        return function (mode, clazz) {
            return map[clazz][mode];
        };
    })();

    var classLableFrom = function (desc) {
        var data = constData().servantClass.find(function (d) {
            return d.desc === desc;
        });
        return data.id;
    };

    var classToLabel = function (id) {
        var data = constData().servantClass.find(function (d) {
            return d.id === id;
        });
        return data.label;
    };

    var tenchizinLabelFrom = function (label) {
        var data = constData().tenchizin.find(function (d) {
            return d.label === label;
        });
        return data.id;
    };

    var matchText = function (text, finds) {
        for (var i = 0; i < finds.length; i++) {
            if (finds[i] === text) {
                return true;
            }
        }
        return false;
    };

    var efectTypes = [
        {
            key: "攻撃",
            is: function (desc) {
                return containAllText(desc, ["強力な", "攻撃"]);
            },
            apply: function (context, magnification, servantData, buf) {
                if(context.mode === "own" && context.type === "hogu") {
                    buf.hogumag +=  magnification; 
                }
            }
        },
        {
            key: "A攻撃",
            is: function (desc) {
                return containAllText(desc, ["強力な", "攻撃"]);
            },
            apply: function (context, magnification, servantData, buf) {
                if(context.mode === "own" && context.type === "hogu" && context.card === "a") {
                    buf.hogumag +=  magnification; 
                }
            }
        },
        {
            key: "B攻撃",
            is: function (desc) {
                return containAllText(desc, ["強力な", "攻撃"]);
            },
            apply: function (context, magnification, servantData, buf) {
                if(context.mode === "own" && context.type === "hogu" && context.card === "b") {
                    buf.hogumag +=  magnification; 
                }
            }
        },
        {
            key: "Q攻撃",
            is: function (desc) {
                return containAllText(desc, ["強力な", "攻撃"]);
            },
            apply: function (context, magnification, servantData, buf) {
                if(context.mode === "own" && context.type === "hogu" && context.card === "q") {
                    buf.hogumag +=  magnification; 
                }
            }
        },
        {
            key: "威力アップ",
            is: function (desc) {
                return containAllText(desc, ["OC", "威力アップ"]);
            },
            apply: function (context, magnification, servantData, buf) {
                if(context.mode === "own" && context.type === "hogu") {
                    buf.hogumag +=  magnification; 
                }
            }
        },
        {
            key: "攻撃強化成功率ダウン",
            is: function (desc) {
                return containAllText(desc, ["攻撃強化成功率", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "強化成功率アップ",
            is: function (desc) {
                return containAllText(desc, ["強化成功率", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "強化成功率ダウン",
            is: function (desc) {
                return containAllText(desc, ["強化成功率", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "強化無効付与",
            is: function (desc) {
                return containAllText(desc, ["強化無効状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "強化解除",
            is: function (desc) {
                return containAllText(desc, ["強化状態", "解除"]) || containAllText(desc, ["強化全解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "強化解除耐性アップ",
            is: function (desc) {
                return containAllText(desc, ["強化解除耐性", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "精神異常付与成功率アップ",
            is: function (desc) {
                return containAllText(desc, ["精神異常付与成功率", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "精神異常状態解除",
            is: function (desc) {
                return containAllText(desc, ["精神異常状態", "解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "精神異常無効付与",
            is: function (desc) {
                return containAllText(desc, ["精神異常無効状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "精神異常耐性アップ",
            is: function (desc) {
                return containAllText(desc, ["精神異常耐性", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "精神異常耐性解除",
            is: function (desc) {
                return containAllText(desc, ["精神異常耐性", "解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "弱体耐性アップ",
            is: function (desc) {
                return containAllText(desc, ["弱体耐性", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "弱体耐性ダウン",
            is: function (desc) {
                return containAllText(desc, ["弱体耐性", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "弱体解除",
            is: function (desc) {
                return containAllText(desc, ["弱体状態", "解除"]) || containAllText(desc, ["弱体解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "毒・呪い・やけど状態解除",
            is: function (desc) {
                return containAllText(desc, ["毒・呪い・やけど", "解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "弱体付与成功率アップ",
            is: function (desc) {
                return containAllText(desc, ["弱体付与成功率", "アップ"]) || containAllText(desc, ["弱体成功率", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "弱体無効付与",
            is: function (desc) {
                return containAllText(desc, ["弱体無効状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "与ダメージアップ",
            is: function (desc) {
                return containAllText(desc, ["与ダメージ", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.damage += magnification;
                }
            }
        },
        {
            key: "被ダメージアップ",
            is: function (desc) {
                return containAllText(desc, ["被ダメージ", "増える状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "ダメージカット付与",
            is: function (desc) {
                return containAllText(desc, ["ダメージカット状態", "付与"]) || containAllText(desc, ["ダメージ", "カットする状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "攻撃力アップ",
            is: function (desc) {
                return containAllText(desc, ["攻撃力", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.atkbuf += magnification;
                }
            }
        },
        {
            key: "攻撃力ダウン",
            is: function (desc) {
                return containAllText(desc, ["攻撃力", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "防御力アップ",
            is: function (desc) {
                return containAllText(desc, ["防御力", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "防御力ダウン",
            is: function (desc) {
                return containAllText(desc, ["防御力", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.beforeafter == "before"
                    && matchText(context.target, ["enemy-single", "enemy-all"]);
                if (check1) {
                    buf.atkbuf += magnification;
                }
            }
        },
        {
            key: "宝具威力アップ",
            is: function (desc) {
                return containAllText(desc, ["宝具威力", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.hogubuf += magnification;
                }
            }
        },
        {
            key: "宝具威力ダウン",
            is: function (desc) {
                return containAllText(desc, ["宝具威力", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "Artsカード性能アップ",
            is: function (desc) {
                return containAllText(desc, ["Artsカード", "性能", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && context.card === "a"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && context.card === "a"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.cardbuf += magnification;
                }

            }
        },
        {
            key: "Artsカード耐性ダウン",
            is: function (desc) {
                return containAllText(desc, ["Artsカード", "耐性", "ダウン"]) || containAllText(desc, ["Arts攻撃", "耐性", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && context.card === "a"
                    && matchText(context.target, ["enemy-all", "enemy-single"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && context.card === "a"
                    && matchText(context.target, ["enemy-all", "enemy-single"]);
                if (check1 || check2) {
                    buf.cardbuf += magnification;
                }
            }
        },
        {
            key: "Quickカード性能アップ",
            is: function (desc) {
                return containAllText(desc, ["Quickカード", "性能", "アップ"]) || containAllText(desc, ["クイックカード", "性能", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && context.card === "q"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && context.card === "q"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.cardbuf += magnification;
                }
            }
        },
        {
            key: "Quickカード耐性ダウン",
            is: function (desc) {
                return containAllText(desc, ["Quickカード", "耐性", "ダウン"]) || containAllText(desc, ["Quick攻撃", "耐性", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && context.card === "q"
                    && matchText(context.target, ["enemy-all", "enemy-single"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && context.card === "q"
                    && matchText(context.target, ["enemy-all", "enemy-single"]);
                if (check1 || check2) {
                    buf.cardbuf += magnification;
                }
            }
        },
        {
            key: "Busterカード性能アップ",
            is: function (desc) {
                return containAllText(desc, ["Busterカード", "性能", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && context.card === "b"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && context.card === "b"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.cardbuf += magnification;
                }
            }
        },
        {
            key: "Busterカード耐性ダウン",
            is: function (desc) {
                return containAllText(desc, ["Busterカード", "耐性", "ダウン"]) || containAllText(desc, ["Buster攻撃", "耐性", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && context.card === "b"
                    && matchText(context.target, ["enemy-all", "enemy-single"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && context.card === "b"
                    && matchText(context.target, ["enemy-all", "enemy-single"]);
                if (check1 || check2) {
                    buf.cardbuf += magnification;
                }
            }
        },
        {
            key: "ExtraAttack威力アップ",
            is: function (desc) {
                return containAllText(desc, ["Extra", "Attack", "威力", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "クリティカル威力アップ",
            is: function (desc) {
                return containAllText(desc, ["クリティカル威力", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "クリティカル威力ダウン",
            is: function (desc) {
                return containAllText(desc, ["クリティカル威力", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "クリティカル発生率ダウン",
            is: function (desc) {
                return containAllText(desc, ["クリティカル発生率", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "与ダメージプラス付与",
            is: function (desc) {
                return containAllText(desc, ["与ダメージプラス", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.damage += magnification;
                }
            }
        },
        {
            key: "スター獲得",
            is: function (desc) {
                return containAllText(desc, ["スター", "獲得"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スター減少",
            is: function (desc) {
                return containAllText(desc, ["スター", "減らす"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スター発生率アップ",
            is: function (desc) {
                return containAllText(desc, ["スター", "発生率", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スター発生率ダウン",
            is: function (desc) {
                return containAllText(desc, ["スター", "発生率", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スター集中アップ",
            is: function (desc) {
                return containAllText(desc, ["スター", "集中", "付与"]) || containAllText(desc, ["スター", "集中", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スター集中ダウン",
            is: function (desc) {
                return containAllText(desc, ["スター", "集中", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "被ダメNP獲得量アップ",
            is: function (desc) {
                return containAllText(desc, ["NPアップ", "被ダメージ時"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "NP獲得",
            is: function (desc) {
                return containAllText(desc, ["NP", "増やす"])
                    || containAllText(desc, ["NP", "リチャージ"])
                    || containAllText(desc, ["NP", "増える"])
                    || containAllText(desc, ["NPを獲得"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "after"
                    && context.type === "hogu"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                if (check1) {
                    buf.npget += magnification;
                }
            }
        },
        {
            key: "NP吸収",
            is: function (desc) {
                return containAllText(desc, ["NP", "吸収"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "NP減少",
            is: function (desc) {
                return containAllText(desc, ["NP", "減らす"])
                    || containAllText(desc, ["NP", "減少"])
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "NP獲得量アップ",
            is: function (desc) {
                return containAllText(desc, ["NP獲得量", "アップ"])
                    || containAllText(desc, ["NP獲得アップ状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.npbuf += magnification;
                }
            }
        },
        {
            key: "NP獲得状態付与",
            is: function (desc) {
                return containAllText(desc, ["NP獲得状態", "付与"])
                || containAllText(desc, ["NP", "毎ターン", "増やす"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.npget += magnification;
                }
            }
        },
        {
            key: "スキルチャージ",
            is: function (desc) {
                return containAllText(desc, ["スキルチャージ", "進める"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "ガッツ付与",
            is: function (desc) {
                return containAllText(desc, ["ガッツ状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "ターゲット集中付与",
            is: function (desc) {
                return containAllText(desc, ["ターゲット集中", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "回避付与",
            is: function (desc) {
                return containAllText(desc, ["回避状態", "付与"])
                    || containAllText(desc, ["回避付与"])
                    || containAllText(desc, ["回避", "確率"])
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "回避解除",
            is: function (desc) {
                return containAllText(desc, ["回避状態", "解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "必中付与",
            is: function (desc) {
                return containAllText(desc, ["必中状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "無敵付与",
            is: function (desc) {
                return containAllText(desc, ["無敵状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "無敵解除",
            is: function (desc) {
                return containAllText(desc, ["無敵状態", "解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "無敵貫通付与",
            is: function (desc) {
                return containAllText(desc, ["無敵貫通状態", "付与"])
                    || containAllText(desc, ["無敵貫通を付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "防御無視付与",
            is: function (desc) {
                return containAllText(desc, ["防御無視状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スタン付与",
            is: function (desc) {
                return containAllText(desc, ["スタン状態", "付与"])
                    || containAllText(desc, ["行動不能状態にする"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "即死付与成功率アップ",
            is: function (desc) {
                return containAllText(desc, ["即死付与成功率", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "即死無効付与",
            is: function (desc) {
                return containAllText(desc, ["即死無効状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "即死耐性アップ",
            is: function (desc) {
                return containAllText(desc, ["即死耐性", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "即死耐性ダウン",
            is: function (desc) {
                return containAllText(desc, ["即死耐性", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "即死",
            is: function (desc) {
                return containAllText(desc, ["確率", "即死"])
                    || containAllText(desc, ["即死効果"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "チャージ減",
            is: function (desc) {
                return containAllText(desc, ["チャージ", "減らす"])
                    || containAllText(desc, ["チャージ", "減る"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "チャージ増",
            is: function (desc) {
                return containAllText(desc, ["チャージ", "増やす"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "宝具封印付与",
            is: function (desc) {
                return containAllText(desc, ["宝具封印状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スキル封印付与",
            is: function (desc) {
                return containAllText(desc, ["スキル封印状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "スキル封印無効付与",
            is: function (desc) {
                return containAllText(desc, ["スキル封印無効状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "混乱状態付与",
            is: function (desc) {
                return containAllText(desc, ["混乱状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "呪い付与(通常攻撃時)",
            is: function (desc) {
                return containAllText(desc, ["通常攻撃時", "呪い状態", "付与する状態を付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "呪い付与",
            is: function (desc) {
                return containAllText(desc, ["呪い状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "呪厄付与",
            is: function (desc) {
                return containAllText(desc, ["呪厄状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "やけど状態付与",
            is: function (desc) {
                return containAllText(desc, ["やけど", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "延焼状態付与",
            is: function (desc) {
                return containAllText(desc, ["延焼状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "帯電状態付与",
            is: function (desc) {
                return containAllText(desc, ["帯電", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "恐怖状態付与",
            is: function (desc) {
                return containAllText(desc, ["恐怖状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "魅了無効状態付与",
            is: function (desc) {
                return containAllText(desc, ["魅了無効", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "魅了耐性アップ",
            is: function (desc) {
                return containAllText(desc, ["魅了耐性", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "魅了耐性ダウン",
            is: function (desc) {
                return containAllText(desc, ["魅了耐性", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "魅了状態付与",
            is: function (desc) {
                return containAllText(desc, ["魅了状態", "付与"])
                    || containAllText(desc, ["魅了付与"])
                    || containAllText(desc, ["魅了状態にする"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "毒状態付与",
            is: function (desc) {
                return containAllText(desc, ["毒状態", "付与"])
                    || containAllText(desc, ["毒付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "毒状態解除",
            is: function (desc) {
                return containAllText(desc, ["毒状態", "解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "毒耐性アップ",
            is: function (desc) {
                return containAllText(desc, ["毒耐性", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "冥界の護り状態付与",
            is: function (desc) {
                return containAllText(desc, ["冥界の護り状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "(悪)特性付与",
            is: function (desc) {
                return containAllText(desc, ["特性", "付与", "悪"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "(竜)特性付与",
            is: function (desc) {
                return containAllText(desc, ["特性", "付与", "竜"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "(急所判明)状態付与",
            is: function (desc) {
                return containAllText(desc, ["状態", "付与", "急所判明"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "豚化状態付与",
            is: function (desc) {
                return containAllText(desc, ["豚化状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "朔月の加護状態付与",
            is: function (desc) {
                return containAllText(desc, ["朔月の加護", "状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "無限増殖・増殖状態解除",
            is: function (desc) {
                return containAllText(desc, ["無限増殖", "解除"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "ヒット数2倍状態付与",
            is: function (desc) {
                return containAllText(desc, ["ヒット数", "2倍", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "陽射しフィールド特性付与",
            is: function (desc) {
                return containAllText(desc, ["陽射し", "特性にする状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "水辺フィールド特性付与",
            is: function (desc) {
                return containAllText(desc, ["水辺", "特性にする状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "炎上フィールド特性付与",
            is: function (desc) {
                return containAllText(desc, ["炎上", "特性にする状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "最大HPアップ",
            is: function (desc) {
                return containAllText(desc, ["最大HP", "アップ"])
                    || containAllText(desc, ["最大HP", "増やす"])
                    || containAllText(desc, ["最大HP", "増える状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "最大HPダウン",
            is: function (desc) {
                return containAllText(desc, ["最大HP", "減る", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "与回復量アップ",
            is: function (desc) {
                return containAllText(desc, ["与回復量", "アップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "HP回復状態付与",
            is: function (desc) {
                return containAllText(desc, ["ＨＰ", "回復", "状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "HP回復",
            is: function (desc) {
                return containAllText(desc, ["HP", "回復"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "HP吸収",
            is: function (desc) {
                return containAllText(desc, ["HP", "吸収する"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "HP回復量ダウン",
            is: function (desc) {
                return containAllText(desc, ["HP回復量", "ダウン"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "HP減少",
            is: function (desc) {
                return containAllText(desc, ["HP", "減少"]) || containAllText(desc, ["HP", "減らす"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "クラス相性の防御不利を打ち消す状態付与",
            is: function (desc) {
                return containAllText(desc, ["クラス相性の防御不利を打ち消す状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "キャスターに対する相性不利を打ち消す状態付与",
            is: function (desc) {
                return containAllText(desc, ["キャスター", "クラスに対する相性不利を打ち消す状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "アルターエゴに対する相性有利状態付与",
            is: function (desc) {
                return containAllText(desc, ["アルターエゴ", "クラスに対して相性有利になる状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "予告状送付状態付与",
            is: function (desc) {
                return containAllText(desc, ["予告状送付", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "OC増加",
            is: function (desc) {
                return containAllText(desc, ["宝具使用時のチャージ段階", "引き上げる"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "効果なし",
            is: function (desc) {
                return containAllText(desc, ["効果なし"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "人格入れ替え",
            is: function (desc) {
                return containAllText(desc, ["自身の人格を入れ替える"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "コマンドカード配り直し",
            is: function (desc) {
                return containAllText(desc, ["コマンドカード", "配り直す"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "コマンドカード固定",
            is: function (desc) {
                return containAllText(desc, ["手札", "固定"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "宝具カード変更",
            is: function (desc) {
                return containAllText(desc, ["宝具カード", "変化"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "追加ダメージ",
            is: function (desc) {
                return containAllText(desc, ["絆獲得量をアップ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "絆獲得量アップ",
            is: function (desc) {
                return containAllText(desc, ["追加ダメージ"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "特攻付与",
            is: function (desc) {
                return containAllText(desc, ["特攻状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && matchText(context.target, ["self", "other-single", "self-other"]);
                var check2 = context.mode === "support" && context.beforeafter == "before"
                    && matchText(context.target, ["self-other", "other-single", "other-all"]);
                if (check1 || check2) {
                    buf.tokkoubuf += magnification;
                }
            }
        },
        {
            key: "特防付与",
            is: function (desc) {
                return containAllText(desc, ["特防状態", "付与"]);
            },
            apply: function (context, magnification, servantData, buf) { }
        },
        {
            key: "特攻",
            is: function (desc) {
                return containAllText(desc, ["特攻"]);
            },
            apply: function (context, magnification, servantData, buf) {
                var check1 = context.mode === "own" && context.beforeafter == "before"
                    && context.type === "hogu";

                if(check1) {
                    buf.tokkou = magnification;
                }
            }
        },
    ];

    var getEffectType = function (desc) {
        var data = efectTypes.find(function (e) {
            return e.is(desc);
        });

        if (data === undefined) {
            return "";
        }

        return data.key;
    };

    var getEffectMeta = function (key) {
        var result = efectTypes.find(function (e) {
            return e.key == key;
        });
        return result ? result : null;
    };

    constData = (function () {
        var data = {};

        data.servantClass = [
            { desc: "セイバー", label: "剣", id: "saber", hosei: 1.0 },
            { desc: "アーチャー", label: "弓", id: "archer", hosei: 0.95 },
            { desc: "ランサー", label: "槍", id: "luncer", hosei: 1.05 },
            { desc: "ライダー", label: "騎", id: "rider", hosei: 1.0 },
            { desc: "キャスター", label: "術", id: "caster", hosei: 0.9 },
            { desc: "アサシン", label: "殺", id: "asasin", hosei: 0.9 },
            { desc: "バーサーカー", label: "狂", id: "barserker", hosei: 1.1 },
            { desc: "ルーラー", label: "裁", id: "ruler", hosei: 1.1 },
            { desc: "アヴェンジャー", label: "讐", id: "avenger", hosei: 1.1 },
            { desc: "ムーンキャンサー", label: "月", id: "monncanser", hosei: 1.0 },
            { desc: "アルターエゴ", label: "分", id: "alterego", hosei: 1.0 },
            { desc: "フォーリナー", label: "降", id: "foreigner", hosei: 1.0 },
            { desc: "シールダー", label: "盾", id: "shielder", hosei: 1.0 }
        ];

        data.tenchizin = [
            { label: "天", id: "ten" },
            { label: "地", id: "chi" },
            { label: "人", id: "hito" },
            { label: "星", id: "hoshi" },
            { label: "獣", id: "juu" }
        ];

        data.effects = efectTypes.map(function (e) {
            return e.key;
        });

        return function () {
            return JSON.parse(JSON.stringify(data));
        };
    })();

    exports.calcDamage = calcDamage;
    exports.calcNp = calcNp;
    exports.data = data;
    exports.classToLabel = classToLabel;
    exports.getClassHosei = getClassHosei;
    exports.getCardMag = getCardMag;
    exports.getCardNp = getCardNp;
    exports.classLableFrom = classLableFrom;
    exports.tenchizinLabelFrom = tenchizinLabelFrom;
    exports.getEffectType = getEffectType;
    exports.getCompatibility = getCompatibility;
    exports.getEffectMeta = getEffectMeta;

    exports.constData = constData;

})(typeof exports === 'undefined' ? window.fgo = {} : exports);
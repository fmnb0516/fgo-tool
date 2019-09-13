
var fgo = (function() {

    function min(v1, v2) {
        return v1 > v2 ? v2 : v1;
    }

    var data = (function() {
        var holder = null;
        return function() {
            if(arguments.length === 0) {
                return JSON.parse(JSON.stringify(holder));
            } else if(arguments.length === 1) {
                holder = JSON.parse(JSON.stringify(arguments[0]));
            }
        };
    })();

    var calcDamage = function(atk, hoguMagnification, card, cardBuf, classCorrection, classCompatibility, attrCompatibility, atkBuf, tokkouBuf, tokubouBuf, hoguBuf, tokkou, damageBuf) {
        var hosei = 0.23;

        return (atk * hoguMagnification * hosei * (card * min(5, 1 + cardBuf))
            * classCorrection * classCompatibility * attrCompatibility * (1 + atkBuf) 
            * (1 + min(5, tokkouBuf) + (5, tokubouBuf) + min(5, hoguBuf))
            * tokkou) + min(1000, damageBuf);
    };

    var getClassHosei = function(clazz) {
        if(clazz === "saber") {
            return 1.0;
        } else if(clazz === "archer") {
            return 0.95;
        } else if(clazz === "luncer") {
            return 1.05;
        } else if(clazz === "caster") {
            return 0.9;
        } else if(clazz === "rider") {
            return 1.0;
        } else if(clazz === "asasin") {
            return 0.9;
        } else if(clazz === "barserker") {
            return 1.1;
        } else if(clazz === "ruler") {
            return 1.1;
        } else if(clazz === "avenger") {
            return 1.1;
        } else if(clazz === "alterego") {
            return 1.0;
        } else if(clazz === "monncanser") {
            return 1.0;
        } else if(clazz === "foreigner") {
            return 1.0;
        } else {
            return 1.0;
        }
    };

    var getCardMag = function(card) {
        if(card === "a") {
            return 1.0;
        } else if(clazz === "q") {
            return 0.8;
        } else if(clazz === "b") {
            return 1.5;
        }
    };
    
    var classToLabel = function(clazz) {
        if(clazz === "saber") {
            return "剣";
        } else if(clazz === "archer") {
            return "弓";
        } else if(clazz === "luncer") {
            return "槍";
        } else if(clazz === "caster") {
            return "術";
        } else if(clazz === "rider") {
            return "騎";
        } else if(clazz === "asasin") {
            return "殺";
        } else if(clazz === "barserker") {
            return "狂";
        } else if(clazz === "ruler") {
            return "裁";
        } else if(clazz === "avenger") {
            return "讐";
        } else if(clazz === "alterego") {
            return "分";
        } else if(clazz === "monncanser") {
            return "月";
        } else if(clazz === "foreigner") {
            return "降";
        } else {
            return "UNKOWN";
        }

    };

    var enableEffect = (function() {

        var matrix = {
            org : {
                "self" : true,
                "other-all" : false,
                "self-other" : true,
                "other-single" : true,
                "enemy-single" : true,
                "enemy-all" : true
            },
            support : {
                "self" : false,
                "other-all" : true,
                "self-other" : true,
                "other-single" : true,
                "enemy-single" : true,
                "enemy-all" : true
            }
        };

        return function(target, mode) {
            return matrix[mode][target];
        };
    });

    var bufMerge = function(mode, context, type, magnification, effect) {
        console.log(mode + ":" + type + ":" + magnification);
    };

    return {
        calcDamage : calcDamage,
        data : data,
        classToLabel : classToLabel,
        getClassHosei: getClassHosei,
        getCardMag : getCardMag,
        bufMerge : bufMerge,
        enableEffect : enableEffect 
    };
})();
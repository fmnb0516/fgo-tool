
var fgo = (function() {

    function min(v1, v2) {
        return v1 > v2 ? v2 : v1;
    }

    var data = (function() {
        var holder = null;
        return function() {
            if(arguments.length === 0) {
                return holder;
            } else if(arguments.length === 1) {
                holder = arguments[0];
            }
        };
    });

    calcDamage = function(atk, hoguMagnification, card, cardBuf, classCorrection, classCompatibility, attrCompatibility, atkBuf, tokkouBuf, tokubouBuf, hoguBuf, tokkou, damageBuf) {
        var hosei = 0.23;

        return (atk * hoguMagnification * hosei * (card * min(5, 1 + cardBuf))
            * classCorrection * classCompatibility * attrCompatibility * (1 + atkBuf) 
            * (1 + min(5, tokkouBuf) + (5, tokubouBuf) + min(5, hoguBuf))
            * tokkou) + min(1000, damageBuf);
    };

    return {
        calcDamage : calcDamage,
        data : data
    };
})();
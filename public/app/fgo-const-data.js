
var fgoConstData = (function() {
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

    data.effects = [
        "弱体耐性アップ",
        "Quickカード性能アップ",
        "Artsカード性能アップ",
        "Busterカード性能アップ",
        "攻撃力アップ",
        "スター獲得",
        "NP増加",
        "攻撃"
    ];

    data.tenchizin = [
        {label:"天", id:"ten"},
        {label:"地", id:"chi"},
        {label:"人", id:"hito"},
        {label:"星", id:"hoshi"}
    ];

    return function() {
        return JSON.parse(JSON.stringify(data));
    };
})();
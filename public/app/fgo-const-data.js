
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
        "攻撃",
        "Artsカード性能アップ",
        "Busterカード性能アップ",
        "Quickカード性能アップ",
        "攻撃力アップ",
        "宝具威力アップ",
        "防御力アップ",
        "防御力ダウン",
        "ダメージカット付与",
        "与ダメージプラス付与",
        "スター獲得",
        "最大HP増加",
        "HP回復",
        "NP増加",
        "NP獲得量アップ",
        "被ダメ獲得量アップ",
        "スキルチャージ",
        "クリティカル威力アップ",
        "(狂のみ)クリティカル威力アップ",
        "(Qのみ)クリティカル威力アップ",
        "クリティカル発生率ダウン",
        "スター発生率アップ",
        "無敵貫通付与",
        "無敵付与",
        "回避付与",
        "弱体解除",
        "弱体耐性アップ",
        "弱体耐性ダウン",
        "弱体付与成功率アップ",
        "チャージ減",
        "スタン付与",
        "呪い付与",
        "呪厄付与",
        "即死",
        "即死無効付与",
        "ターゲット集中付与",
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
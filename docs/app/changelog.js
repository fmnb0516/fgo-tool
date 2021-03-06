(function() {

    var changelog = [
        {
            date : "2020年2月14日",
            desc : "ナイチンゲール〔サンタ〕のデータを追加"
        },
        {
            date : "2020年2月14日",
            desc : "剣アストルフォのデータを追加"
        },
        {
            date : "2020年2月14日",
            desc : "ラミティ・ジェーンのS3のスター集中度倍率の誤りを修正"
        },
        {
            date : "2019年11月1日",
            desc : "カード耐性ダウンが計算結果に反映されていない問題を修正"
        },
        {
            date : "2019年11月1日",
            desc : "カラミティ・ジェーンのデータを追加"
        },
        {
            date : "2019年10月31日",
            desc : "スペース・イシュタルのデータを追加"
        },

        {
            date : "2019年10月23日",
            desc : "宝具ダメージ計算機能を搭載"
        },

        {
            date : "2019年10月16日",
            desc : "宝具NP計算機能を搭載"
        },

        {
            date : "2019年10月1日",
            desc : "初版公開"
        }
    ];

    var result = {};

    result.load = function() {
        result.template = Handlebars.compile($("#template-changelog-page").html());
    };

    result.rerender = function(query) {
        return result.template(changelog);
    };

    result.rendered = function() {
    };

    applications("changelog", function() {
        return result;
    });

})();
const cheerio = require('cheerio')
const path = require('path');
const fs = require('fs');
const util = require('util');

const fgo = require(path.join(__dirname, 'docs/fgocalc.js'));

const publicDir = path.join(__dirname, 'docs');
const sourceDir = path.join(__dirname, 'source');

const file = process.argv[2];

const zeroPadding　= (num,length) => {
    return ('0000000000' + num).slice(-length);
}

const findDataDiv = ($, tag, text, callback) => {
    $(tag).each(function () {
        const selector = $(this);
        if (selector.text().trim().indexOf(text) !== -1) {
            callback(selector.next(), selector.text().trim());
        }
    });
};

const betweenLastDataDiv = ($, from, to, callback) => {
    const cache = [];
    betweenDataDiv($, from, to, (selector) => {
        cache.push(selector);
    });
    callback(cache.pop());
};

const betweenDataDiv = ($, from, to, callback) => {
    let start = null;

    $(from.tag).each(function () {
        const selector = $(this);
        if (selector.text().trim().indexOf(from.text) !== -1) {
            start = selector;
            return false;
        }
    });

    if (start === null) {
        return;
    }

    let next = start.next();

    while (next !== null && next[0].tagName !== to.tag && next.text().trim().indexOf(to.text) === -1) {
        callback(next);
        next = next.next();
    }
};

const rareToMaxLevel = (rare) => {
    if (rare === 1) {
        return "Lv60"
    }
    if (rare === 2) {
        return "Lv65"
    }
    if (rare === 3) {
        return "Lv70"
    }
    if (rare === 4) {
        return "Lv80"
    }
    if (rare === 5) {
        return "Lv90"
    }
};

const ternCountParse = (desc) => {
    const startIndex = desc.lastIndexOf("(");
    const endIndex = desc.lastIndexOf(")");

    if(startIndex === -1) {
        return {tern:0, count:0};
    }

    const text = desc.substring(startIndex+1, endIndex);

    const tIndex = text.indexOf("T");
    const kIndex = text.indexOf("回");

    const tern = tIndex === -1 ? 0 : text.substr(tIndex-1, 1);
    const count = kIndex === -1 ? 0 : text.substr(kIndex-1, 1);
    return {tern:tern, count:count};
};

const containAllText = (target, finds) => {
    for (let i = 0; i < finds.length; i++) {
        const f = finds[i];
        if(target.indexOf(f) === -1) {
            return false;
        }
    }

    return true;
};

const LOG = [];
const parseEffectType = (function() {
    return (desc) => {

        if(containAllText(desc, ["強力な", "攻撃"])) {
            return "攻撃";
        }

        if(containAllText(desc, ["攻撃強化成功率", "ダウン"])) {
            return "攻撃強化成功率ダウン";
        }

        if(containAllText(desc, ["強化成功率", "アップ"])) {
            return "強化成功率アップ";
        }

        if(containAllText(desc, ["強化成功率", "ダウン"])) {
            return "強化成功率ダウン";
        }

        if(containAllText(desc, ["強化無効状態", "付与"])) {
            return "強化無効付与";
        }

        if(containAllText(desc, ["強化状態", "解除"])
                || containAllText(desc, ["強化全解除"])) {
            return "強化解除";
        }

        if(containAllText(desc, ["強化解除耐性", "アップ"])) {
            return "強化解除耐性アップ";
        }

        if(containAllText(desc, ["精神異常付与成功率", "アップ"])) {
            return "精神異常付与成功率アップ";
        }

        if(containAllText(desc, ["精神異常状態", "解除"])) {
            return "精神異常状態解除";
        }

        if(containAllText(desc, ["精神異常無効状態", "付与"])) {
            return "精神異常無効付与";
        }

        if(containAllText(desc, ["精神異常耐性", "アップ"])) {
            return "精神異常耐性アップ";
        }

        if(containAllText(desc, ["精神異常耐性", "解除"])) {
            return "精神異常耐性解除";
        }

        if(containAllText(desc, ["弱体耐性", "アップ"])) {
            return "弱体耐性アップ";
        }

        if(containAllText(desc, ["弱体耐性", "ダウン"])) {
            return "弱体耐性ダウン";
        }

        if(containAllText(desc, ["弱体状態", "解除"])
                || containAllText(desc, ["弱体解除"])) {
            return "弱体解除";
        }

        if(containAllText(desc, ["弱体付与成功率", "アップ"])
            || containAllText(desc, ["弱体成功率", "アップ"])) {
            return "弱体付与成功率アップ";
        }

        if(containAllText(desc, ["弱体無効状態", "付与"])) {
            return "弱体無効付与";
        }

        if(containAllText(desc, ["与ダメージ", "アップ"])) {
            return "与ダメージアップ";
        }

        if(containAllText(desc, ["被ダメージ", "増える状態", "付与"])) {
            return "被ダメージアップ";
        }

        if(containAllText(desc, ["ダメージカット状態", "付与"])
                || containAllText(desc, ["ダメージ", "カットする状態", "付与"])) {
            return "ダメージカット付与";
        }

        if(containAllText(desc, ["攻撃力", "アップ"])) {
            return "攻撃力アップ";
        }

        if(containAllText(desc, ["攻撃力", "ダウン"])) {
            return "攻撃力ダウン";
        }

        if(containAllText(desc, ["防御力", "アップ"])) {
            return "防御力アップ";
        }
        

        if(containAllText(desc, ["防御力", "ダウン"])) {
            return "防御力ダウン";
        }

        if(containAllText(desc, ["宝具威力", "アップ"])) {
            return "宝具威力アップ";
        }

        if(containAllText(desc, ["宝具威力", "ダウン"])) {
            return "宝具威力ダウン";
        }

        if(containAllText(desc, ["Artsカード", "性能", "アップ"])) {
            return "Artsカード性能アップ";
        }

        if(containAllText(desc, ["Artsカード", "耐性", "ダウン"])) {
            return "Artsカード耐性ダウン";
        }

        if(containAllText(desc, ["Quickカード", "性能", "アップ"])
                || containAllText(desc, ["クイックカード", "性能", "アップ"])) {
            return "Quickカード性能アップ";
        }

        if(containAllText(desc, ["Quickカード", "耐性", "ダウン"])
                || containAllText(desc, ["Quick攻撃", "耐性", "ダウン"])) {
            return "Quickカード耐性ダウン";
        }

        if(containAllText(desc, ["Busterカード", "性能", "アップ"])) {
            return "Busterカード性能アップ";
        }

        if(containAllText(desc, ["Busterカード", "耐性", "ダウン"])) {
            return "Busterカード耐性ダウン";
        }

        if(containAllText(desc, ["クリティカル威力", "アップ"])) {
            return "クリティカル威力アップ";
        }

        if(containAllText(desc, ["クリティカル威力", "ダウン"])) {
            return "クリティカル威力ダウン";
        }

        if(containAllText(desc, ["クリティカル発生率", "ダウン"])) {
            return "クリティカル発生率ダウン";
        }

        if(containAllText(desc, ["与ダメージプラス", "付与"])) {
            return "与ダメージプラス付与";
        }

        if(containAllText(desc, ["スター", "獲得"])) {
            return "スター獲得";
        }

        if(containAllText(desc, ["スター", "減らす"])) {
            return "スター減少";
        }

        if(containAllText(desc, ["スター", "発生率", "アップ"])) {
            return "スター発生率アップ";
        }

        if(containAllText(desc, ["スター", "集中", "付与"]) || containAllText(desc, ["スター", "集中", "アップ"])) {
            return "スター集中アップ";
        }

        if(containAllText(desc, ["スター", "集中", "ダウン"])) {
            return "スター集中ダウン";
        }

        if(containAllText(desc, ["NPアップ", "被ダメージ時"])) {
            return "被ダメNP獲得量アップ";
        }

        if(containAllText(desc, ["NP", "増やす"]) || containAllText(desc, ["NP", "リチャージ"])) {
            return "NP獲得";
        }

        if(containAllText(desc, ["NP", "減らす"])
                || containAllText(desc, ["NP", "減少"])) {
            return "NP減少";
        }

        if(containAllText(desc, ["NP獲得量", "アップ"])
                || containAllText(desc, ["NP獲得アップ状態", "付与"])) {
            return "NP獲得量アップ";
        }

        if(containAllText(desc, ["NP獲得状態", "付与"])) {
            return "NP獲得状態付与";
        }

        if(containAllText(desc, ["スキルチャージ", "進める"])) {
            return "スキルチャージ";
        }

        if(containAllText(desc, ["ガッツ状態", "付与"])) {
            return "ガッツ付与";
        }

        if(containAllText(desc, ["ターゲット集中", "付与"])) {
            return "ターゲット集中付与";
        }

        if(containAllText(desc, ["回避状態", "付与"])
                || containAllText(desc, ["回避付与"])
                || containAllText(desc, ["回避", "確率"])) {
            return "回避付与";
        }

        if(containAllText(desc, ["回避状態", "解除"])) {
            return "回避解除";
        }

        if(containAllText(desc, ["必中状態", "付与"])) {
            return "必中付与";
        }

        if(containAllText(desc, ["無敵状態", "付与"])) {
            return "無敵付与";
        }

        if(containAllText(desc, ["無敵状態", "解除"])) {
            return "無敵解除";
        }

        if(containAllText(desc, ["無敵貫通状態", "付与"])
                || containAllText(desc, ["無敵貫通を付与"])) {
            return "無敵貫通付与";
        }

        if(containAllText(desc, ["防御無視状態", "付与"])) {
            return "防御無視付与";
        }

        if(containAllText(desc, ["スタン状態", "付与"])
                || containAllText(desc, ["行動不能状態にする"])) {
            return "スタン付与";
        }

        if(containAllText(desc, ["即死付与成功率", "アップ"])) {
            return "即死付与成功率アップ";
        }

        if(containAllText(desc, ["即死無効状態", "付与"])) {
            return "即死無効付与";
        }

        if(containAllText(desc, ["即死耐性", "アップ"])) {
            return "即死耐性アップ";
        }

        if(containAllText(desc, ["即死耐性", "ダウン"])) {
            return "即死耐性ダウン";
        }

        if(containAllText(desc, ["確率", "即死"])
                || containAllText(desc, ["即死効果"])) {
            return "即死";
        }

        if(containAllText(desc, ["チャージ", "減らす"])) {
            return "チャージ減";
        }

        if(containAllText(desc, ["チャージ", "増やす"])) {
            return "チャージ増";
        }

        if(containAllText(desc, ["宝具封印状態", "付与"])) {
            return "宝具封印付与";
        }

        if(containAllText(desc, ["スキル封印状態", "付与"])) {
            return "スキル封印付与";
        }

        if(containAllText(desc, ["混乱状態", "付与"])) {
            return "混乱状態付与";
        }

        if(containAllText(desc, ["通常攻撃時", "呪い状態", "付与する状態を付与"])) {
            return "呪い付与(通常攻撃時)";
        }

        if(containAllText(desc, ["呪い状態", "付与"])) {
            return "呪い付与";
        }

        if(containAllText(desc, ["呪厄状態", "付与"])) {
            return "呪厄付与";
        }

        if(containAllText(desc, ["やけど", "付与"])) {
            return "やけど状態付与";
        }

        if(containAllText(desc, ["延焼状態", "付与"])) {
            return "延焼状態付与";
        }
        
        if(containAllText(desc, ["帯電", "付与"])) {
            return "帯電状態付与";
        }

        if(containAllText(desc, ["恐怖状態", "付与"])) {
            return "恐怖状態付与";
        }

        if(containAllText(desc, ["魅了耐性", "アップ"])) {
            return "魅了耐性アップ";
        }

        if(containAllText(desc, ["魅了耐性", "ダウン"])) {
            return "魅了耐性ダウン";
        }

        if(containAllText(desc, ["魅了状態", "付与"])
                || containAllText(desc, ["魅了付与"])
                || containAllText(desc, ["魅了状態にする"])) {
            return "魅了状態付与";
        }

        if(containAllText(desc, ["毒状態", "付与"])
                || containAllText(desc, ["毒付与"])) {
            return "毒状態付与";
        }

        if(containAllText(desc, ["毒状態", "解除"])) {
            return "毒状態解除";
        }

        if(containAllText(desc, ["毒耐性", "アップ"])) {
            return "毒耐性アップ";
        }

        if(containAllText(desc, ["冥界の護り状態", "付与"])) {
            return "冥界の護り状態付与";
        }

        if(containAllText(desc, ["特性", "付与", "悪"])) {
            return "(悪)特性付与";
        }

        if(containAllText(desc, ["特性", "付与", "竜"])) {
            return "(竜)特性付与";
        }

        if(containAllText(desc, ["豚化状態", "付与"])) {
            return "豚化状態付与";
        }

        if(containAllText(desc, ["ヒット数", "2倍", "付与"])) {
            return "ヒット数2倍状態付与";
        }

        if(containAllText(desc, ["陽射し", "特性にする状態", "付与"])) {
            return "陽射しフィールド特性付与";
        }

        if(containAllText(desc, ["最大HP", "アップ"])
                || containAllText(desc, ["最大HP", "増やす"])
                || containAllText(desc, ["最大HP", "増える状態", "付与"])) {
            return "最大HPアップ";
        }

        if(containAllText(desc, ["与回復量", "アップ"])) {
            return "与回復量アップ";
        }

        if(containAllText(desc, ["ＨＰ", "回復", "状態", "付与"])) {
            return "HP回復状態付与";
        }

        if(containAllText(desc, ["HP", "回復"])) {
            return "HP回復";
        }

        if(containAllText(desc, ["HP回復量", "ダウン"])) {
            return "HP回復量ダウン";
        }
        

        if(containAllText(desc, ["HP", "減少"])||containAllText(desc, ["HP", "減らす"])) {
            return "HP減少";
        }

        if(containAllText(desc, ["クラス相性の防御不利を打ち消す状態", "付与"])) {
            return "クラス相性の防御不利を打ち消す状態付与";
        }

        if(containAllText(desc, ["宝具使用時のチャージ段階", "引き上げる"])) {
            return "OC増加";
        }

        if(containAllText(desc, ["効果なし"])) {
            return "効果なし";
        }

        if(containAllText(desc, ["自身の人格を入れ替える"])) {
            return "人格入れ替え";
        }

        if(containAllText(desc, ["追加ダメージ"])) {
            return "追加ダメージ";
        }

        if(containAllText(desc, ["絆獲得量をアップ"])) {
            return "絆獲得量アップ";
        }

        if(containAllText(desc, ["特攻状態", "付与"])) {
            return "特攻付与";
        }

        if(containAllText(desc, ["特防状態", "付与"])) {
            return "特防付与";
        }

        if(containAllText(desc, ["特攻"])) {
            return "特攻";
        }

        LOG.push(desc);
        return "";
    };

})();

const parseEffectTarget = (desc, old) => {
    if(desc.indexOf("敵全体") !== -1) {
        return "enemy-all";
    } else if(desc.indexOf("敵単体") !== -1) {
        return "enemy-single";
    } else if(desc.indexOf("自身をのぞく味方全体") !== -1) {
        return "other-all";
    } else if(desc.indexOf("味方全体") !== -1) {
        return "self-other";
    } else if(desc.indexOf("味方単体") !== -1) {
        return "other-single";
    } else if(desc.indexOf("＆") !== -1) {
        return old;
    } else {
        return "self";
    }
};

const contentsText = (contents) => {
    const ary = [];
    for (let i = 0; i < contents.length; i++) {
        const tag = contents.eq(i);
        const text = contents.eq(i).text().trim();
        ary.push(tag[0].tagName === "span" ? text.split(",")[1] : text);
    }
    return ary.join("");
};

const parseSkillData =  (json, $) => {

    findDataDiv($, "h4", "Skill", (selector, text) => {
        const tr = selector.find("tbody tr");

        const slikkIndex = "skill" + text.substr(5, 1);
        const name = text.substring(text.indexOf("：") + 1).replace(/\r?\n/g, '').replace(/\s+/g, "");
        const ct = parseInt(tr.eq(1).find("td").eq(0).text().trim());
        
        const effects = [];
        const meta = {target : ""};

        for (let i = 1; i < tr.length; i++) {
            const add = i == 1 ? 1 : 0;
            const desc = contentsText(tr.eq(i).find("td").eq(0 + add).contents());

            const v1 = tr.eq(i).find("td").eq(1 + add).text().trim();
            const v2 = tr.eq(i).find("td").eq(2 + add).text().trim();
            const v3 = tr.eq(i).find("td").eq(3 + add).text().trim();
            const v4 = tr.eq(i).find("td").eq(4 + add).text().trim();
            const v5 = tr.eq(i).find("td").eq(5 + add).text().trim();
            const v6 = tr.eq(i).find("td").eq(6 + add).text().trim();
            const v7 = tr.eq(i).find("td").eq(7 + add).text().trim();
            const v8 = tr.eq(i).find("td").eq(8 + add).text().trim();
            const v9 = tr.eq(i).find("td").eq(9 + add).text().trim();
            const v10 = tr.eq(i).find("td").eq(10 + add).text().trim();

            const type = parseEffectType(desc);
            const ternCount = ternCountParse(desc);

            meta.target = parseEffectTarget(desc, meta.target);

            effects.push({
                type : type,
                tern : ternCount.tern,
                count : ternCount.count,
                target: meta.target,
                desc : desc,
                v1 : v1,
                v2 : v2=== "" ? v1 :v2,
                v3 : v3 === "" ? v1 :v3,
                v4 : v4 === "" ? v1 :v4,
                v5 : v5 === "" ? v1 :v5,
                v6 : v6 === "" ? v1 :v6,
                v7 : v7 === "" ? v1 :v7,
                v8 : v8 === "" ? v1 :v8,
                v9 : v9 === "" ? v1 :v9,
                v10 : v10 === "" ? v1 :v10,
            });
        }

        json[slikkIndex] = {
            name : name,
            ct : ct,
            effects : effects
        };
    });
};

const parseHoguData = (json, $) => {
   
    const from = { tag: "h3", text: "宝具" };
    const to = { tag: "h3", text: "保有スキル" };

    const hogu = {};

    betweenLastDataDiv($, from, to, (selector) => {
        const table = selector.find("table").last();
        const tr = table.find("tbody tr");

        const name = tr.eq(0).find("th").eq(0).contents().first().text().trim().replace(/\r?\n/g, '').replace(/\s+/g, "");
        const waname = tr.eq(0).find("th").eq(0).contents().last().text().trim().replace(/\r?\n/g, '').replace(/\s+/g, "");
        hogu.name = waname + "(" + name + ")";
        hogu.card = tr.eq(2).find("td").eq(0).text().trim().substring(0, 1).toLowerCase();

        hogu.effect = [];

        const meta = {
            isAtkStart: false,
            target : ""
        };

        for (let i = 2; i < tr.length; i++) {
            const add = i == 2 ? 3 : 0;

            const desc = contentsText(tr.eq(i).find("td").eq(0 + add).contents());
            const v1 = tr.eq(i).find("td").eq(1 + add).text().trim();
            const v2 = tr.eq(i).find("td").eq(2 + add).text().trim();
            const v3 = tr.eq(i).find("td").eq(3 + add).text().trim();
            const v4 = tr.eq(i).find("td").eq(4 + add).text().trim();
            const v5 = tr.eq(i).find("td").eq(5 + add).text().trim();

            const type = parseEffectType(desc);

            const lvoc = desc.indexOf("<OC:効果UP>") !== -1 ? "oc" : "lv";
            const beforeafter = meta.isAtkStart ? "after" : "before";

            const ternCount = ternCountParse(desc);
            
            meta.target = parseEffectTarget(desc, meta.target);

            hogu.effect.push({
                type: type,
                tern: ternCount.tern,
                count: ternCount.count,
                target: meta.target,
                beforeafter: beforeafter,
                lvoc: lvoc,
                desc: desc,
                v1: v1,
                v2: v2 === "" ? v1 :v2,
                v3: v3 === "" ? v1 :v3,
                v4: v4 === "" ? v1 :v4,
                v5: v5 === "" ? v1 :v5
            });

            if (type === "攻撃") {
                meta.isAtkStart = true;
            }
        }
    });

    findDataDiv($, "h4", "隠しステータス", (selector) => {
        hogu.hit = parseInt(selector.find("tbody tr").eq(4).find("td").eq(4).text().trim());
    });

    json.hogu = hogu;
};

const parseClassSkillData = (json, $) => {

    const classskill = [];
    const from = { tag: "h3", text: "クラススキル" };
    const to = { tag: "h2", text: "育成" };

    betweenDataDiv($, from, to, (selector) => {

        const tr = selector.find("table tbody tr");

        const rank = tr.eq(0).find("td").eq(0).text().trim().replace(/\r?\n/g, '').replace(/\s+/g, "");;
        const name = tr.eq(0).find("td").eq(1).text().trim();

        const fullname = name + (rank.indexOf(",") !== -1 ? rank.split(",")[1].trim() : rank);
        const effects = [];

        for (let i = 1; i < tr.length; i++) {
            const td = tr.eq(i).find("td");
            const desc = td.eq(0).text().trim();
            const magnification = td.eq(1).text().trim();

            effects.push({
                type: parseEffectType(desc),
                desc: desc,
                magnification: magnification,
            });
        }

        classskill.push({
            name: fullname,
            effect: effects
        })
    });

    json.classskill = classskill;
};

const parseCommonData = (json, $) => {
    const servant = {};
    const card = { arts: {}, quick: {}, buster: {} };
    const status = [];
    const hidden = {};

    findDataDiv($, "h3", "基本情報", (selector) => {
        servant.no = zeroPadding(parseInt(selector.find("tbody tr").eq(0).find("td").eq(0).text().trim().substring(3)), 4);
        servant.name = selector.find("tbody tr").eq(1).find("td").eq(1).text().trim().replace(/\r?\n/g, '').replace(/\s+/g, "");
        servant.clazz = fgo.classLableFrom(selector.find("tbody tr").eq(2).find("td").eq(1).text().trim());
        servant.rare = parseInt(selector.find("tbody tr").eq(2).find("td").eq(3).text().trim());
        servant.cost = parseInt(selector.find("tbody tr").eq(2).find("td").eq(5).text().trim());

        card.quick.count = parseInt(selector.find("tbody tr").eq(5).find("td").eq(0).text().trim());
        card.arts.count = parseInt(selector.find("tbody tr").eq(5).find("td").eq(1).text().trim());
        card.buster.count = parseInt(selector.find("tbody tr").eq(5).find("td").eq(2).text().trim());

        status.push({
            level: rareToMaxLevel(servant.rare),
            hp: parseInt(selector.find("#hpmax").text()),
            atk: parseInt(selector.find("#atkmax").text())
        });
    });

    findDataDiv($, "h4", "隠しステータス", (selector) => {
        servant.tenchizin = fgo.tenchizinLabelFrom(selector.find("tbody tr").eq(1).find("td").eq(1).text().trim());
        card.quick.hit = parseInt(selector.find("tbody tr").eq(4).find("td").eq(0).text().trim());
        card.arts.hit = parseInt(selector.find("tbody tr").eq(4).find("td").eq(1).text().trim());
        card.buster.hit = parseInt(selector.find("tbody tr").eq(4).find("td").eq(2).text().trim());

        hidden.na = parseFloat(selector.find("tbody tr").eq(5).find("td").eq(1).text().trim());
        hidden.nd = parseFloat(selector.find("tbody tr").eq(5).find("td").eq(3).text().trim());
        hidden.dr = parseFloat(selector.find("tbody tr").eq(4).find("td").eq(6).text().trim());
        hidden.starcollection = parseFloat(selector.find("tbody tr").eq(3).find("td").eq(7).text().trim());
        hidden.staroccurrence = parseFloat(selector.find("tbody tr").eq(2).find("td").eq(6).text().trim());

        hidden.tag = [];
        hidden.tag.push(selector.find("tbody tr").eq(2).find("td").eq(2).text().trim());
        hidden.tag.push(selector.find("tbody tr").eq(2).find("td").eq(3).text().trim());
        hidden.tag.push(selector.find("tbody tr").eq(2).find("td").eq(4).text().trim());

        selector.find("tbody tr").eq(6).find("td").eq(1).text().trim().split("/").forEach(t => {
            hidden.tag.push(t.trim());
        });
    });

    json.servant = servant;
    json.card = card;
    json.status = status;
    json.hidden = hidden;
};

const run = async () => {
    const readdir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    const files = await readdir(sourceDir);

    const allData = [];

    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const data = await readFile(sourceDir + "/" + f);

        const $ = cheerio.load(data);
        const json = {};
        
        parseCommonData(json, $);
        parseClassSkillData(json, $);
        parseHoguData(json, $);
        parseSkillData(json, $);

        const filename = json.servant.no +"-"+ fgo.classToLabel(json.servant.clazz) + "-" + json.servant.rare + "-" + json.servant.name;
        console.log(filename);
        if(LOG.length !== 0) {
            console.log(f);
            console.log(LOG);
            LOG.length = 0;
        }

        allData.push(json);
        await writeFile(publicDir + "/json/" + filename + ".json", JSON.stringify(json, null, "  "), "utf8");
    }

    const script = "fgo.data(" + JSON.stringify(allData, null, "  ") + ")"; 
    await writeFile(publicDir + "/servant.js", script, "utf8");
};

run();
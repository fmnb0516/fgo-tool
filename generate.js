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

const LOG = [];
const parseEffectType = (desc) => {
    const ret = fgo.getEffectType(desc);
    if(ret === "") {
        LOG.push(desc);
    }
    return ret;
};

const parseEffectTarget = (desc, old) => {
    if(desc.indexOf("敵全体") !== -1) {
        return "enemy-all";
    } else if(desc.indexOf("敵単体") !== -1
        || (desc.indexOf("予告状送付") !== -1 && desc.indexOf("自身") !== -1)) {
        return "enemy-single";
    } else if(desc.indexOf("自身をのぞく味方全体") !== -1) {
        return "other-all";
    } else if(desc.indexOf("味方全体") !== -1 || desc.indexOf("予告側全体") !== -1) {
        return "self-other";
    } else if(desc.indexOf("味方単体") !== -1) {
        return "other-single";
    } else if(desc.indexOf("自身") !== -1) {
        return "self";
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
        allData.push(json);
        await writeFile(publicDir + "/json/" + filename + ".json", JSON.stringify(json, null, "  "), "utf8");

        console.log(filename);
        if(LOG.length !== 0) {
            console.log("    " + f);
            console.log("    " + LOG.join());
            LOG.length = 0;
        }
    }

    const script = "fgo.data(" + JSON.stringify(allData, null, "  ") + ")"; 
    await writeFile(publicDir + "/servant.js", script, "utf8");
};

run();
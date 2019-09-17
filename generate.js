
const cheerio = require('cheerio')
const path = require('path');
const fs = require('fs');
const fgo = require(path.join(__dirname, 'docs/fgocalc.js'));

const publicDir = path.join(__dirname, 'docs');
const sourceDir = path.join(__dirname, 'source');

const file = process.argv[2];

const findDataDiv = ($, tag, text, callback) => {
    $(tag).each(function() {
        const selector = $(this);
        if(selector.text().trim().indexOf(text) !== -1) {
            callback(selector.next());
        }
    });
};

const rareToMaxLevel = (rare) => {
    if(rare === 1) {
        return "Lv60"
    }
    if(rare === 2) {
        return "Lv65"
    }
    if(rare === 3) {
        return "Lv70"
    }
    if(rare === 4) {
        return "Lv80"
    }
    if(rare === 5) {
        return "Lv90"
    }
};

const parseCommonData = (json, $) => {
    const servant = {};
    const card = {arts : {}, quick : {}, buster : {}};
    const status = [];
    const hidden = {};

    findDataDiv($, "h3", "基本情報", (selector) => {
        servant.no = selector.find("tbody tr").eq(0).find("td").eq(0).text().trim().substring(3);
        servant.name = selector.find("tbody tr").eq(1).find("td").eq(1).text().trim();
        servant.clazz = fgo.classLableFrom(selector.find("tbody tr").eq(2).find("td").eq(1).text().trim());
        servant.rare = parseInt(selector.find("tbody tr").eq(2).find("td").eq(3).text().trim());
        servant.cost = parseInt(selector.find("tbody tr").eq(2).find("td").eq(5).text().trim());

        card.quick.count = parseInt(selector.find("tbody tr").eq(5).find("td").eq(0).text().trim());
        card.arts.count = parseInt(selector.find("tbody tr").eq(5).find("td").eq(1).text().trim());
        card.buster.count = parseInt(selector.find("tbody tr").eq(5).find("td").eq(2).text().trim());

        status.push({
            level : rareToMaxLevel(servant.rare),
            hp : parseInt(selector.find("#hpmax").text()),
            atk : parseInt(selector.find("#atkmax").text())
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

    console.log(hidden);
};

fs.readFile(sourceDir +"/"+ file + ".html", 'utf-8', (err, data) => {
    const $ = cheerio.load(data);
    const json = {};

    parseCommonData(json, $);
});
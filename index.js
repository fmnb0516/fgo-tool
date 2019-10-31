
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const util = require('util');

const port = 8080;
const publicDir = path.join(__dirname, 'docs');
const docsDir = path.join(__dirname, 'docs');

app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const servantdata_gen = async () => {
    const readdir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    const files = (await readdir(publicDir + "/json")).filter(f => f.endsWith(".json"));

    const allData = [];

    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const data = await readFile(publicDir + "/json/" + f, "utf8");
        allData.push(JSON.parse(data));
    }

    const script = "fgo.data(" + JSON.stringify(allData, null, "  ") + ")"; 
    await writeFile(publicDir + "/servant.js", script, "utf8");
};

const articledata_gen = async () => {
    const allData = [];

    const readdir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    const files = (await readdir(publicDir + "/article")).filter(f => f.endsWith(".md"));
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const data = await readFile(publicDir + "/article/" + f, "utf8");

        const lines = data.match(/<!--([\s\S]*?)-->/g)[0].replace("<!--","").replace("-->","").trim().split("\r\n");

        const metadata = {};
        
        lines.forEach((line) => {
            const idx = line.indexOf(":");
            const key = line.substring(0, idx);
            const val = line.substring(idx+1).trim();
            metadata[key] = val;
        });

        const url = "article/"+f;

        allData.push({
            url : url,
            metadata : metadata
        });
    }

    const script = "var ARTICLE_ENTRIES = " + JSON.stringify(allData, null, "  ") + ";"; 
    await writeFile(publicDir + "/articles.js", script, "utf8");
};

const p1 = servantdata_gen();
const p2 = articledata_gen();

Promise.all([p1, p2]).then(() => {
    app.listen(port);
    console.log('listen on port ' + port);
});



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

const run = async () => {
    const readdir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    const files = (await readdir(publicDir + "/json")).filter(f => f.endsWith(".json"));

    const allData = [];

    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const data = await readFile(publicDir + "/json/" + f);
        allData.push(JSON.parse(data));
    }

    const script = "fgo.data(" + JSON.stringify(allData, null, "  ") + ")"; 
    await writeFile(publicDir + "/servant.js", script, "utf8");
};

run().then(() => {
    app.listen(port);
    console.log('listen on port ' + port);
});


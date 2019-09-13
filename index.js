
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const port = 8080;
const publicDir = path.join(__dirname, 'public');
const docsDir = path.join(__dirname, 'docs');

app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/v1/all',function(req,res){
    fs.readdir(publicDir + "/app", (err, files) => {
        files = files.filter(f => f.endsWith(".json"));
        res.json(files);
    });
});

app.get('/api/v1/:id',function(req,res){
    var id = req.params.id;
    fs.readFile(publicDir + "/app/" + id, 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.put('/api/v1/:id',function(req,res){
    var id = req.params.id;
    var json = req.body;
    fs.writeFile(publicDir + "/app/" + id, JSON.stringify(json, null , "\t"), 'utf-8', (err, data) => {
        res.json({"message":"更新しました"});
    });
});

const clazzTo = (function() {

    const data = {
        "saber" : "剣",
        "archer" : "弓",
        "luncer" : "槍",
        "rider" : "騎",
        "caster" : "術",
        "asasin" : "殺",
        "barserker" : "狂",
        "ruler" : "裁",
        "avenger" : "讐",
        "monncanser" : "月",
        "alterego" : "分",
        "foreigner" : "降",
    };

    return function(c) {
        return data[c];
    };
})();

app.post('/api/v1/create',function(req,res){
    var json = req.body;
    var id =　json.servant.no + "-" + clazzTo(json.servant.clazz) + "-" + json.servant.rare + "-" + json.servant.name + ".json";
    
    fs.writeFile(publicDir + "/app/" + id, JSON.stringify(json, null , "\t"), 'utf-8', (err, data) => {
        res.json({"message":"作成しました"});
    });
});

app.delete('/api/v1/:id',function(req,res){
    res.json({});
});

app.listen(port);
console.log('listen on port ' + port);

fs.readdir(publicDir + "/app", (err, files) => {
    files = files.filter(f => f.endsWith(".json"));
    const datas = [];

    for(var i=0; i<files.length; i++) {
        const content = fs.readFileSync(publicDir + "/app/" + files[i], 'utf8');
        datas.push(JSON.parse(content));
    }
    const script = "fgo.data(" + JSON.stringify(datas, null , "\t") + ")";
    fs.writeFileSync(docsDir + "/servant.js", script, 'utf-8');
});
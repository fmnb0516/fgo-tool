
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const port = 8080;
const publicDir = path.join(__dirname, 'public');

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
    res.json({});
});

app.post('/api/v1/create',function(req,res){
    res.json({});
});

app.delete('/api/v1/:id',function(req,res){
    res.json({});
});

app.listen(port);
console.log('listen on port ' + port);
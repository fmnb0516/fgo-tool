
const cheerio = require('cheerio')
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'docs');
const sourceDir = path.join(__dirname, 'source');

const file = process.argv[2];

fs.readFile(sourceDir +"/"+ file + ".html", 'utf-8', (err, data) => {
    const $ = cheerio.load(data);
    
    
});
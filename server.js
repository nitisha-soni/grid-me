var express = require('express');
var app = express();
var path = require('path');
var images = require('./productList.json')
var filterImages = [];
// app.use(express.static('public'))
// viewed at http://localhost:8080
app.get('/', function (req, res) {
    console.log("printing query param",req.query)
    filterImages = [];
    if (req.query.filter && req.query.filter !== 'All'){
        var filter = req.query.filter.toLowerCase();
        images.products.forEach((img) => {
            // console.log("iterating each image",filter,img.name);
            if (img.name.toLowerCase().indexOf(filter) > -1){
                filterImages.push(img)               
            }
        })
    }
    else{
        filterImages = images.products;
    }
    // res.render('index', { val: req.query });
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/productList.json', function (req, res) {
    // res.render('index', { val: req.query });
    res.send(filterImages)
});

app.listen(8080);
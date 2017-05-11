var mustacheExpress = require('mustache-express');
var express = require('express');
var app = express()

app.use(express.static('static'))

app.engine("html", mustacheExpress());

app.set("view engine", "html");

app.get('/', function (req, res) {
  res.render('InitialDropDown');
})

app.get('/taxdata', function (req, res) {
  var data = [1,1,1,1,1,1,1,1,1,1,1]; 

  res.render('home', {
    data: JSON.stringify(data),
    statename: req.param("state")
  });
})

app.get('/closing', function (req, res) {
  res.render('ClosingPage');
})

app.get('/userdata', function (req, res) {
  var data = [10,10,15,15,5,5,0,0,0,20,20];
  res.render('OurCollectedDataVis', {data: JSON.stringify(data)});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


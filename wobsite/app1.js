var mustacheExpress = require('mustache-express');
var express = require('express');
var app = express()

app.engine("html", mustacheExpress());

app.set("view engine", "html");

app.get('/', function (req, res) {
  res.render('InitialDropDown');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


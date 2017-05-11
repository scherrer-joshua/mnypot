var mustacheExpress = require('mustache-express');
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Project');
var app = express()

var dataSchema = mongoose.Schema({
    StateCode: String,
    Total: Number,
    Property: Number,
    Sales: Number,
    License: Number,
    Income: Number,
    Other: Number,
});
dataSchema.methods.toArray = function(){
    return [this.Property, this.Sales, this.License, this.Income, this.Other];
}

var Data = mongoose.model("state", dataSchema);

app.use(express.static('static'))

app.engine("html", mustacheExpress());

app.set("view engine", "html");

app.get('/', function (req, res) {
  res.render('InitialDropDown');
})

app.get('/taxdata', function (req, res) {
  Data.findOne({
    StateCode: req.param("state") 
  }, function(err, datum){
    if (err) return console.error(err);
    res.render('home', {
      data: JSON.stringify(datum.toArray()),
      statename: req.param("state")
    })
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


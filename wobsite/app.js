var mustacheExpress = require('mustache-express');
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project');
var app = express()

var taxdataSchema = mongoose.Schema({
    StateCode: String,
    Total: Number,
    Property: Number,
    Sales: Number,
    License: Number,
    Income: Number,
    Other: Number,
}, {collection: "taxdata"});

var userdataSchema = mongoose.Schema({
    state: String,
    infrastructure: Number,
    education: Number,
    healthcare: Number,
    libraries: Number,
    publictransportation: Number,
    economicdevelopment: Number,
    parksandrecreation: Number,
    pensions: Number,
    lowincomeassistance: Number,
    corrections: Number,
    urbanhousing: Number,
}, {collection: "userdata"});

taxdataSchema.methods.toArray = function(){
    return [this.Property, this.Sales, this.License, this.Income, this.Other];
}

function UserAgg(that){
    return [that.infrastructure, that.education, that.healthcare, that.libraries, that.publictransportation , that.economicdevelopment, that.parksandrecreation, that.pensions, that.lowincomeassistance, that.corrections, that.urbanhousing];
}

var Taxdata = mongoose.model("taxdata", taxdataSchema);
var Userdata = mongoose.model("userdata", userdataSchema);


app.use(express.static('static'))

app.engine("html", mustacheExpress());

app.set("view engine", "html");

app.get('/', function (req, res) {
  res.render('InitialDropDown');
})

app.get('/taxdata', function (req, res) {
  console.log(req.param("state"));
  Taxdata.findOne({
    StateCode: req.param("state") 
  }, function(err, datum){
    if (err) return console.error(err);
    if (!datum) {
        console.log(datum);
        return res.send("500 error");
    };
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
  console.log([(req.param('infrastructure')), (req.param('education')), (req.param('healthcare')), (req.param('libraries')), (req.param('publictransportation')), (req.param('economicdevelopment')), (req.param('parksandrecreation')), (req.param('pensions')), (req.param('lowincomeassistance')), (req.param('corrections')), (req.param('urbanhousing'))]);
  if ((Number(req.param('infrastructure'))+Number(req.param('education'))+Number(req.param('healthcare'))+Number(req.param('libraries'))+Number(req.param('publictransportation'))+Number(req.param('economicdevelopment'))+Number(req.param('parksandrecreation'))+Number(req.param('pensions'))+Number(req.param('lowincomeassistance'))+Number(req.param('corrections'))+Number(req.param('urbanhousing')))!=100)
    return res.send("Input must add up to 100");
  var datum = new Userdata ({
    state: req.param('state'),
    infrastructure: Number(req.param('infrastructure')),
    education: Number(req.param('education')),
    healthcare: Number(req.param('healthcare')),
    libraries: Number(req.param('libraries')),
    publictransportation: Number(req.param('publictransportation')),
    economicdevelopment: Number(req.param('economicdevelopment')),
    parksandrecreation: Number(req.param('parksandrecreation')),
    pensions: Number(req.param('pensions')),
    lowincomeassistance: Number(req.param('lowincomeassistance')),
    corrections: Number(req.param('corrections')),
    urbanhousing: Number(req.param('urbanhousing')),
  });
  datum.save(function(err){
    if (err) console.error(err);
    Userdata.aggregate([
      { $match: {state: req.param('state')} },
      { $group: {
        _id: "$state", 
        infrastructure: {$avg: "$infrastructure"},
        education: {$avg: "$education"},
        healthcare: {$avg: "$healthcare"},
        libraries: {$avg: "$libraries"},
        publictransportation: {$avg: "$publictransportation"},
        economicdevelopment: {$avg: "$economicdevelopment"},
        parksandrecreation: {$avg: "$parksandrecreation"},
        pensions: {$avg: "$pensions"},
        lowincomeassistance: {$avg: "$lowincomeassistance"},
        corrections: {$avg: "$corrections"},
        urbanhousing: {$avg: "$urbanhousing"},
      } }
    ], function(err, result){
      if (err) return res.send("500 error");
      if (!result) return res.send("No data on this state");
      result = result[0];
      res.render('OurCollectedDataVis', {data: JSON.stringify(UserAgg(result))});
    });
    
  })

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


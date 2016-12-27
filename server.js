var express = require('express')
var sugar = require('sugar')
var app = express()
app.use('/public', express.static(process.cwd() + '/public'));

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

app.get('/', function(req,res){
  res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:input', function (req, res) {
　　res.setHeader('Content-Type', 'application/json');
  var sdate = sugar.Date.create(req.params.input);
  var valid = sugar.Date.isValid(sdate);
  var unixre = /^[0-9]*$/
  var is_unix = unixre.test(req.params.input);


　　if (valid == true && is_unix == false){
	var unixdate = Date.parse(sdate);
	res.send(JSON.stringify({natural: req.params.input, unix: unixdate}));
  }
  if (valid == false && is_unix == true){
	var p = parseInt(req.params.input);
	var natural_date = new Date(p);
	var build = " " + natural_date.getDate() + ", " + natural_date.getFullYear()
	var m = natural_date.getMonth()
	var build = months[m] + build
	var natural_date = build
	res.send(JSON.stringify({natural: natural_date, unix: req.params.input}));
  }
　　if (valid == true && is_unix == true){
	var p = parseInt(req.params.input);
	var natural_date = new Date(p);
	var build = " " + natural_date.getDate() + ", " + natural_date.getFullYear()
	var m = natural_date.getMonth()
	var build = months[m] + build
	var natural_date = build
	res.send(JSON.stringify({natural: natural_date, unix: req.params.input}));
  }
  if (valid == false && is_unix == false) {
	res.send(JSON.stringify({unix: null, natural: null}));
  }

  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

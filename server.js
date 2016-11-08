var express = require('express')
var sugar = require('sugar')
var app = express()

var unixre = /^[0-9]*$/;
var nat

app.get('/:input', function (req, res) {
　　res.setHeader('Content-Type', 'application/json');
  console.log(req.params.input);

  var is_unixre = unixre.test(req.params.input);
  console.log(is_unixre);
  
  if (is_unixre == true){
	var d = new Date(req.params.input)
	res.send(JSON.stringify({unix: req.params.input, natural: d}));
	//Convert d to natual language
  }

  

  var nldate = sugar.Date.create(req.params.input);
  var is_nld = sugar.Date.isValid(nldate);
  console.log(is_nld);

  //If valid, display JSON

  //Otherwise, return null values for those properties
  res.send(JSON.stringify({a:1}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

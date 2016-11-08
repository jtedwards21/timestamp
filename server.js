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

  var d = sugar.Date.create("July 4, 1776");
  
  var is_nld = sugar.Date.isValid(d);
  console.log(is_nld);

  res.send(JSON.stringify({a:1}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var express = require('express')
var app = express()

var unixre = /$[0-9]*^/;

app.get('/:input', function (req, res) {
　　res.setHeader('Content-Type', 'application/json');
  console.log(req.params.input);
  res.send(JSON.stringify({a:1}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

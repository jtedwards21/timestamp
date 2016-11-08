var express = require('express')
var app = express()

app.get('/', function (req, res) {
　　res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({a:1}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

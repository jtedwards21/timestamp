var express = require('express')
var routes = require('./app/routes/index.js')
var sugar = require('sugar')
var app = express()
app.use('/public', express.static(process.cwd() + '/public'));
routes(app);

app.use(function(req, res) {
     res.send('404: Page not Found', 404);
  });




app.listen(process.env.PORT || 5000);

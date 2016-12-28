var express = require('express')
var routes = require('./app/routes/index.js')
var app = express()
app.use('/public', express.static(process.cwd() + '/public'));
routes(app);

app.use(function(req, res) {
     res.redirect('/');
  });




app.listen(process.env.PORT || 5000);

var express = require('express')
var sugar = require('sugar')
var app = express()
app.use('/public', express.static(process.cwd() + '/public'));

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var isNaturalLanguageDateF = function(input){
  var sdate = sugar.Date.create(input);
  var valid = sugar.Date.isValid(sdate);

　　var startsWithMonth = false;
  for(var i = 0;i < months.length; i++){
    var re = new RegExp("^" + months[i]);
    if(input.search(re) == 0){
	startsWithMonth = true;
    }
  }

  if(startsWithMonth == true && valid == true){return true} else {return false}

}

var unix2natural = function(unixTime){
  var p = parseInt(unixTime);
  var natural_date = new Date(p);
  var build = " " + natural_date.getDate() + ", " + natural_date.getFullYear()
  var m = natural_date.getMonth()
  build = months[m] + build
  natural_date = build;
  return {natural: natural_date, unix: unixTime}
}

var natural2unix = function(natural_date){
  var unixdate = Date.parse(natural_date);
  return {natural: natural_data, unix: unixdate};
};

app.get('/', function(req,res){
  res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:input', function (req, res) {
　　res.setHeader('Content-Type', 'application/json');

　　var isNaturalLanguageDate = isNaturalLanguageDateF(req.params.input);

  var unixre = /^[-]?[0-9]*$/;
  var is_unix = unixre.test(req.params.input);
  
  console.log('unix?' + is_unix);
  console.log('nat?' + isNaturalLanguageDate);
  var inputType;
  if (isNaturalLanguageDate == true && is_unix == false){
     inputType = "natural";
  } else if (isNaturalLanguageDate == false && is_unix == true){
	inputType = "unix";
  } else if (valid == false && is_unix == false) {
	inputType = "none";
  }


  switch(inputType){
    case "unix":
      var time = unix2natural(req.params.input);
      res.send(JSON.stringify(time));
      break;
    case "natural":
      var time = natural2unix(req.params.input);
      res.send(JSON.stringify(time));
      break;
    case "none":
      res.send(JSON.stringify({unix: null, natural: null}));
      break;
  }

　　

  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

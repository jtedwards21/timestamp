
var sugar = require('sugar')

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

  var natRe = /[0-9]?[0-9], [0-9]*$/;
  var followsFormat = input.search(natRe);
  

  if(startsWithMonth == true && valid == true && followsFormat !== -1){return true} else {return false}

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
  return {natural: natural_date, unix: unixdate};
};

module.exports = function(app) {
	app.route('/')
		.get(function(req,res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});
	app.route('/:input')
		.get(function (req, res) {
　　			res.setHeader('Content-Type', 'application/json');

　　			var isNaturalLanguageDate = isNaturalLanguageDateF(req.params.input);

  			var unixre = /^[-]?[0-9]*$/;
  			var is_unix = unixre.test(req.params.input);
  
  			var inputType;
  			if (isNaturalLanguageDate == true && is_unix == false){
     				inputType = "natural";
  			} else if (isNaturalLanguageDate == false && is_unix == true){
				inputType = "unix";
  			} else if (isNaturalLanguageDate == false && is_unix == false) {
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
};

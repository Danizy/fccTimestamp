var express = require('express')
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/site/' + 'main.html');
})

app.get('/*', function(req, res){

  if(Number.isInteger(+req.params[0])){

    res.send(fromUnix(req.params[0]));
  }
  else{
    res.send(req.params[0]);
  }
})

app.listen(8080, function(){
  console.log("Listening on port 8080");
})

function fromUnix(Unix){
  var date = new Date(+Unix * 1000);
  var mth = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var response = {natural: mth[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()};
  return JSON.stringify(response);
}

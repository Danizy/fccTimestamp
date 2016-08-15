var express = require('express')
var app = express();
var mth = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.use(express.static(__dirname + "/site"));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/site/' + 'main.html');
})

app.get('/*', function(req, res){

  if(Number.isInteger(+req.params[0])){

    res.send(fromUnix(req.params[0]));
  }
  else{
    var data = req.params[0].split(' ');
    if(dateVerify(data[0], data[1], data[2])){
      response = {unix: null, natural: null};
      response = JSON.stringify(response);
      res.send(response);
    }
    else{
      var date = new Date(data[0] + " " + data[1] + data[2]);
      var response = {unix: +(date.getTime()/1000).toFixed(0), natural: mth[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()};
      response = JSON.stringify(response);

      res.send(response);
    }
  }
})

app.listen(8080, function(){
  console.log("Listening on port 8080");
})

function fromUnix(Unix){
  var date = new Date(+Unix * 1000);
  var response = {unix: +Unix, natural: mth[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()};
  return JSON.stringify(response);
}

function dateVerify(m,d,y){
  m = m.split('');
  m[0] = m[0].toUpperCase();
  m = m.join('');
  if(y < 1970 || Number.parseInt(d) < 1) return true;
  if(mth.indexOf(m) < 0) return true;
  return false;
}

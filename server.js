var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var exec = require('child_process').exec;
var webPath = path.resolve('/home/pi/rcswitch-pi-web/web/');
var url = require('url');
var serverPort = 8080;
var pathToRCSwitchPiSend = '/home/pi/rcswitch-pi/send';

app.use('/send',function(req, res, next){
  var query = url.parse(req.url, true).query;
  var cmd = 'sudo ' + pathToRCSwitchPiSend + ' ' + query.code;
  if(!query.code || !query.code.match(/[01F]{12}/))
    res.end('Wrong parameter format.');
  else {
    console.log(cmd);
    exec(cmd, function puts(error, stdout, stderr) {
      res.end();
    });   
  }
});
app.use('/', express.static(webPath));

console.log('Start server on port: ' + serverPort);
server.listen(serverPort);
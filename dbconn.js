const https = require('https');
const http = require('http');

const express = require('express');
const fs = require('fs');
var path = require('path');

const hostname = '192.168.0.2';
const port = 3036;

let app = express();


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
// });

app.use('/html', express.static(__dirname + '/html'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/bootstrap-5.0.0-beta3-dist', express.static(__dirname + '/bootstrap-5.0.0-beta3-dist'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/pictures', express.static(__dirname + '/pictures'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));



app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getWarehouses', function(req,res){
    
});

app.use(function (req, res, next) {
  res.header('Access-Control-Origin', 'https://192.168.0.5:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  res.header('X-Frame-Options','sameorigin'); 
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'access-control-allow=origin', 'X-requested-with', 'Content-Type', 'Content-length', 'Connection');
  res.header('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg') ;
});

var options = {
    key: fs.readFileSync('rootCA-key.pem'),
    cert: fs.readFileSync('rootCA.pem')
  };

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

http.createServer(app).listen(3036);

https.createServer(options, app).listen(443);










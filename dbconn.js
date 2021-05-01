const https = require('https');

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


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });




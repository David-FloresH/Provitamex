// const https = require('https');
// const http = require('http');

// const express = require('express');
// const fs = require('fs');
// var path = require('path');

// const hostname = '192.168.0.2';
// const port = 3036;

// let app = express();


// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/plain');
// // });

// app.use('/html', express.static(__dirname + '/html'));
// app.use('/js', express.static(__dirname + '/js'));
// app.use('/bootstrap-5.0.0-beta3-dist', express.static(__dirname + '/bootstrap-5.0.0-beta3-dist'));
// app.use('/css', express.static(__dirname + '/css'));
// app.use('/pictures', express.static(__dirname + '/pictures'));
// app.use('/node_modules', express.static(__dirname + '/node_modules'));

// app.use(function (req, res, next) {
//   res.header('Access-Control-Origin', 'https://192.168.0.2:443');
//   res.header('Access-Control-Allow-Methods', 'GET, POST'); 
//   res.header('Access-Control-Allow-Headers', 'Content-Type'); 
//   res.header('X-Frame-Options','sameorigin'); 
//   res.header('Access-Control-Allow-Origin', '*'); 
//   res.header('Access-Control-Allow-Headers', 'access-control-allow=origin', 'X-requested-with', 'Content-Type', 'Content-length', 'Connection');
//   res.setHeader('Content-Type', 'text/plain');
//   res.header('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg') ;
// });

// https.createServer({
//    cert: fs.readFileSync('rootCA.pem'),
//    key: fs.readFileSync('rootCA-key.pem')
//  },app).listen(port, function(){
// 	console.log('Servidor https correindo en el puerto 443');
// });

// app.get('/', function(req, res){
// 	res.send('Hola, estas en la pagina inicial');
// });

var express = require('express');
var app = express();

const PUERTO = 443;

app.listen(PUERTO, function(){
	console.log('Servidor http correindo en el puerto 80');
});

app.get('/', function(req, res){
	res.send('Hola, estas en la pagina inicial');
	console.log('Se recibio una petición get');
});









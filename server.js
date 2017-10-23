var express = require('express');
var app = express();
// var pg = require('pg');
var bodyParser = require('body-parser');
// var Posts = require("./models/models.js");

app.set('view engine', 'pug');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response){
  response.render('homepage');
});

app.get('/profile', function(request, response){
  response.render('profile');
});

app.get('/upload', function(request, response){
  response.render('upload');
});

app.get('*', function(request, response){
  response.render('404');
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Your server is available at localhost:3000!");
	});

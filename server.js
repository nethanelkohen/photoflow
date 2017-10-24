var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sql = require('./utility/sql.js');

// cookies package, express-session?

// require authentication middleware

// routes
var photoRoutes = require("./Routes/photos.js");
var userRoutes = require("./Routes/users.js");
var apiRoutes = require("./Routes/api.js");

// middelware
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// include additional middleware?

// render index
app.get('/', function(req, res) {
  res.render('homepage');
});

// render api routes
app.use("/api", apiRoutes);

// render all user routes
app.use("/users", userRoutes);

// render photo routes
app.use("/photos", photoRoutes);

// catch 404 error
app.get("*", function(req, res) {
  res.send('404 error');
});

// set up database and server
sql.sync().then(function() {
  console.log("Database ready");
  var port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log("Listening at " + port);
  });
});

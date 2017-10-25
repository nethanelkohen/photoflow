var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize= require("sequelize");
var connection = require('./utility/sql.js');

// cookies package, express-session?

// require authentication middleware

// routes
var photoRoutes = require("./routes/photos.js");
var userRoutes = require("./routes/users.js");
var apiRoutes = require("./routes/api.js");




// middelware
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const User = connection.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(100),
    notNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(1000),
    notNull: true,
  }
}, {
  timestamps: false
});






// include additional middleware?

// render index
app.get('/', function(req, res) {
  res.render('home');
});
// render login

app.get('/login', function(req, res) {
  res.render('login');
});
// render register

app.get('/register', function(req, res) {
  res.render('register');
});

// render profile stuff
app.get('/gallery', function(req, res) {
  res.render('gallery');
});
// render profile

app.get('/profile', function(req, res) {
  res.render('profile');
});
// render upload form

app.get('/upload', function(req, res) {
  res.render('upload');
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


app.post("/submit", function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(function() {
        // req.session.userid = user.id;
        res.redirect("/gallery");
    })
    .catch(function(err) {
        res.send('404');
    });
});




// set up database and server
connection.sync().then(function() {
  console.log("Database ready");
  var port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log("Listening at " + port);
  });
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sql = require('./utility/sql.js');

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
    // .then(function(user) {
    //     req.session.userid = user.id;
    //     res.redirect("/home");
    // })
    // .catch(function(err) {
    //     console.log(err);
    //     renderTemplate(req, res, "Signup", "signup", {
    //         error: "Invalid username or password",
    //     });
    // });
});






// set up database and server
sql.sync().then(function() {
  console.log("Database ready");
  var port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log("Listening at " + port);
  });
});

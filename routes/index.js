var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var cookieParser = require("cookie-parser");
var connection = require('../utility/sql.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser');
// require models
var comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var User = require('../models/user.js');
var passport = require('passport');
var session = require("express-session"),
  bodyParser = require("body-parser");

router.use(express.static("public"));
router.use(session({
  secret: "photoflow"
}));
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(passport.initialize());
router.use(passport.session());

// Express Validator
router.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// get homepage
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        // add message to pug file
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

router.get('/', function(req, res) {
  res.render('home');
})

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/gallery', {
      currentuser: username
    });
  });

// render register

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  // req.checkBody('passwordmatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordmatch', 'Passwords do not match, please try again.').equals(req.body.password);
  const errors = req.validationErrors();
  if (errors){
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render("register", {
      title:"registration error",
      errors: errors
    });

  } else{

  const userName = req.body.username;
  const passWord = req.body.password;

var hash = bcrypt.hashSync(passWord, saltRounds);
  User.create({
      username: userName,
      password: hash
  }).then(function(results){
    const user_id = results.id;
    console.log(results.id);
    req.login(user_id, function(err){
      res.redirect('/user');
    });
  }
);
    // req.login(result.id, function(err){
    //   res.render('/users');
    // })
}
});


router.post("/submit", function(req, res) {

});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});
module.exports = router;

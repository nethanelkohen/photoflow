var express = require("express");
var router = express.Router();
var Sequelize= require("sequelize");
// var cookieParser= require("cookie-parser");
var connection = require('../utility/sql.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
// require models
var comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var users = require('../models/user.js');





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

// BodyParser Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// router.use(express.cookieParser());
// router.use(session({ secret: "photoflow" }));


// Passport init

router.use(passport.initialize());
router.use(passport.session());

// Express Validator
router.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// get homepage
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        // add message to pug file
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.get('/', function(req,res){
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
    res.redirect('/gallery',{currentuser:username});
  });

// render register

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;


	// Validation

	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
    // create if statement for errors on pug views
		res.render('register',{
			errors:errors
		});
	} else {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(function() {
        // req.session.userid = user.id;
        res.redirect("/user/gallery");
    })
    .catch(function(err) {
      res.render('register',{
        errors2:err
      });
    });
	}
});
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post("/submit", function(req, res) {

});
module.exports = router;

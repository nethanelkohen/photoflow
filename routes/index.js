var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var connection = require('../utility/sql.js');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var User = require('../models/user.js');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

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

router.post('/uploadfile', function(req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.render('upload', {
        msg: err
      });
    } else {
      console.log(req.file);
      res.render('gallery');
    }
  });
});



/////////////////////+++++++++   NO AUTH ROUTES +++++++++/////////////////

//////....HOMEPAGE.....
router.get('/', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  req.logout();
  req.session.destroy();
  res.render('home',{title:'Home Page'});
})
//////....LOGIN.....
router.get('/login', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());

  res.render('login',{title:'Login'});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: 'gallery',
  failureRedirect: 'login'
}));


router.get('/register', function(req, res, next) {
  res.render('register',{title:'Register'});
});

router.post('/register', function(req, res, next) {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody("password", "Password must be at least 8 characters and include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  // req.checkBody('passwordmatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordmatch', 'Passwords do not match, please try again.').equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render("register", {
      title: "registration error",
      errors: errors
    });
  } else {
    const userName = req.body.username;
    const passWord = req.body.password;
    var hash = bcrypt.hashSync(passWord, saltRounds);
    User.create({
      username: userName,
      password: hash
    }).then(function(results) {
      const user_id = results.id;
      console.log(results.id);
      req.login(user_id, function(err) {
        res.redirect('gallery');
      });
    });
  }
});

/////////////////////+++++++++    AUTH ROUTES +++++++++/////////////////

router.get('/gallery', authenticationMiddleware(), function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('gallery');
});
router.get('/upload', authenticationMiddleware(), function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('upload');
});

router.get('/logout',function(req,res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
})


///////////////////// ----- MIDDLEWARE


const storage = {
  storage: multer.diskStorage({
    destination: function(req, file, next) {
      next(null, './public/uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
};
function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('login')
  }
}
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});
module.exports = router;

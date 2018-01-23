var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var connection = require('../utility/sql.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var Comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var User = require('../models/user.js');
var Photos = require('../models/photos.js');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var fs = require('fs');
router.use(require('body-parser')());

router.use(express.static('public'));
router.use(
  session({
    secret: 'photoflow'
  })
);
// router.use(bodyParser.urlencoded({
//   extended: false
// }));
router.use(passport.initialize());
router.use(passport.session());

// Express Validator
router.use(
  expressValidator({
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
  })
);

/////////////////////+++++++++   NO AUTH ROUTES +++++++++/////////////////

//////....HOMEPAGE.....
router.get('/', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  req.logout();
  req.session.destroy();
  res.render('home', { title: 'Home Page' });
});
//////....LOGIN.....
router.get('/login', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());

  res.render('login', { title: 'Login' });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: 'gallery',
    failureRedirect: 'login'
  })
);

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  // req.checkBody("password", "Password must be at least 8 characters and include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  // req.checkBody('passwordmatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req
    .checkBody('passwordmatch', 'Passwords do not match, please try again.')
    .equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('register', {
      title: 'registration error',
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
      passport.authenticate('local', {
        successRedirect: 'gallery',
        failureRedirect: 'login'
      });
      req.login(user_id, function(err) {
        res.redirect('gallery');
      });
    });
  }
});

/////////////////////+++++++++    AUTH ROUTES +++++++++/////////////////

router.get('/gallery', authenticationMiddleware(), function(req, res) {
  // console.log(req.session.passport.user);
  console.log(`${req.session.passport.user} is logged in`);
  console.log(req.isAuthenticated());
  Photos.findAll().then(function(photos) {
    Comments.findAll().then(function(comments) {
      User.findById(req.session.passport.user).then(function(username) {
        // console.log(username.username);
        res.render('gallery', {
          databasePost: photos,
          // postusername: username.username,
          comments: comments
        });
      });
    });
  });
});

router.get('/upload', authenticationMiddleware(), function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('upload');
});

router.post('/upload', function(req, res) {
  var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
      var ext = path.extname(file.originalname);
      if (
        ext !== '.png' &&
        ext !== '.jpg' &&
        ext !== '.gif' &&
        ext !== '.jpeg'
      ) {
        return callback(res.end('Only images are allowed'), null);
      }
      callback(null, true);
    }
  }).single('myImage');
  upload(req, res, function(err) {
    var descriptionBody = req.body.description;

    User.findById(req.session.passport.user).then(function(userResult) {
      console.log(userResult.username);
      var userName = userResult;
      var fileSize = req.file.size;
      var originalName = req.file.originalname;
      var userposted = userResult.username;
      var mimeType = req.file.mimetype;
      var fileName = req.file.path;
      Photos.create({
        size: fileSize,
        userposted: userposted,
        originalName: originalName,
        userId: req.session.passport.user,
        mimeType: mimeType,
        description: descriptionBody,
        filename: fileName
      }).then(function(results) {
        console.log('added ' + results);
      });

      res.redirect('gallery');
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
router.post('/gallery', function(req, res) {
  var receivedComment = req.body.sendComment;
  var sendpostid = req.body.sendpostid;
  console.log(receivedComment);
  console.log(sendpostid);
  User.findById(req.session.passport.user).then(function(currUsername) {
    console.log(currUsername);
    Comments.create({
      userId: req.session.passport.user,
      comment: receivedComment,
      usercommented: currUsername.username,
      photoId: sendpostid
    }).then(function(results) {
      res.redirect('gallery');
    });
  });
});
router.post('/addLike', function(req, res) {
  var likeValue = req.body.likevalue;
  var sendpostid = req.body.sendpostid;
  Photos.findById(sendpostid).then(function(currentpostID) {
    console.log('found post with id', sendpostid);
    console.log('added ' + likeValue + ' like');
    console.log(currentpostID);
    console.log(currentpostID);

    var currentlikes = currentpostID.dataValues.likes;
    console.log(
      'the post ' + currentpostID + ' has ' + currentlikes + ' Likes'
    );
    var currentlikePlusOne = currentlikes + 1;
    Photos.update(
      {
        likes: currentlikePlusOne
      },
      {
        where: { id: sendpostid },
        returning: true,
        plain: true
      }
    ).then(function(result) {
      console.log(result);
      res.redirect('gallery');
      // result = [x] or [x, y]
      // [x] if you're not using Postgres
      // [x, y] if you are using Postgres
    });
  });

  // console.log(currentpostID);
  // Photos.update(
  //   {
  //     likes:
  //   },
  //   {
  //     where: { id: sendpostid },
  //     returning: true,
  //     plain: true
  //   }
  // ).then(function(result) {
  //   console.log(result);
  //   // result = [x] or [x, y]
  //   // [x] if you're not using Postgres
  //   // [x, y] if you are using Postgres
  // });
});

///////////////////// ----- MIDDLEWARE

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function(req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(
      `req.session.passport.user: ${JSON.stringify(req.session.passport)}`
    );

    if (req.isAuthenticated()) return next();
    res.redirect('login');
  };
}
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});
module.exports = router;

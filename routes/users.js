var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var connection = require('../utility/sql.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// require models
var Comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var Photos = require('../models/photos.js');
var User = require('../models/user.js');

// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);

router.get('/', authenticationMiddleware(), function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('gallery');
});

router.get('/gallery', function(req, res) {
  // Photos.findAll().then(function(photorows){
  res.render('gallery');
});

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

router.get('/upload', function(req, res) {
  res.render('upload');
});

router.post('/upload', multer(storage).single('myImage'), function(req, res, next) {
  console.log(req.file);
  console.log(req.body);
  res.redirect('gallery');
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/login')
  }
}

module.exports = router;

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const connection = require('../utility/sql.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// require models
const Comments = require('../models/comments.js');
const likes = require('../models/likes.js');
const Photos = require('../models/photos.js');
const User = require('../models/user.js');

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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
      cb(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
    }
  })
};

router.get('/upload', function(req, res) {
  res.render('upload');
});

router.post('/upload', multer(storage).single('myImage'), function(
  req,
  res,
  next
) {
  console.log(req.file);
  console.log(req.body);
  res.redirect('gallery');
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(
      `req.session.passport.user: ${JSON.stringify(req.session.passport)}`
    );

    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  };
}

module.exports = router;

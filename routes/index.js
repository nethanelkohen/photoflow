var express = require("express");
var router = express.Router();
var Sequelize= require("sequelize");
var connection = require('../utility/sql.js');
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

// get homepage

router.get('/', function(req,res){
  res.render('home');
})
router.get('/login', function(req, res) {
  res.render('login');
});
// render register

router.get('/register', function(req, res) {
  res.render('register');
});
router.post("/submit", function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(function() {
        // req.session.userid = user.id;
        res.redirect("/user/gallery");
    })
    .catch(function(err) {
        res.send('404');
    });
});
module.exports = router;

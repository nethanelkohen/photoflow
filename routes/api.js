var express = require('express');
var router = express.Router();
// require models
var comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var users = require('../models/user.js');

module.exports = router;

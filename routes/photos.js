var express = require('express');
var router = express.Router();
// require models
var comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var users = require('../models/user.js');
// require packages
var bodyParser = require("body-parser");
var multer = require('multer');
var jimp = require('jimp');



module.exports = router;

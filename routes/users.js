var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var connection = require('../utility/sql.js');
var cookieParser = require('cookie-parser');
// require models
var Comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var Photos = require('../models/photos.js');
var User = require('../models/user.js');

router.get('/', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('gallery');
});

router.get('/upload', function(req, res) {
  res.render('upload');
});

// template
// router.post("/upload", uploader.single("file"), function(req, res) {
// // Make sure they sent a file
// 	if (!req.file || !req. file.mimetype.includes("image/")) {
// 		return renderTemplate(res, "upload", "Upload", {
// 			username: req.user.get("username"),
// 			id: req.user.get("id"),
// 			error: "You must choose a photo to upload",
// 		});
// 	}
//
// 	// Otherwise, try an upload
// 	req.user.upload(req.file, req).then(function(photo) {
// 		res.redirect("preview/" + photo.get("id"));
// 	})
// 	.catch(function(err) {
// 		console.error("Something went wrong with upload", err);
// 		renderTemplate(res, "upload", "Upload", {
// 			error: "Something went wrong, please try a different file",
// 		});
// 	});
// });

router.get('/gallery', function(req, res) {
  // Photos.findAll().then(function(photorows){
  res.render('gallery');

});

module.exports = router;

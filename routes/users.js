var express = require("express");
var router = express.Router();
var Sequelize= require("sequelize");
var connection = require('../utility/sql.js');
var cookieParser = require('cookie-parser');
// require models
var Comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var Photos = require('../models/photos.js');
var User = require('../models/user.js');

router.get('/', authenticationMiddleware(), function(req,res){
  console.log(req.user);
  console.log(req.isAuthenticated());
       res.render('gallery');
})


router.get('/upload', function(req, res) {
  res.render('upload');
});

router.get('/gallery',function(req, res) {
  // Photos.findAll().then(function(photorows){
       res.render('gallery');

});

// router.get("/signup", function(req, res, error) {
// 	renderUserTemp(res, "signup", "Signup", {
// 	});
// });
// router.get('/register', function(req, res) {
//   res.render('register');
// });

//
// // render sign up
// router.post("/signup", function(req, res) {
// 	if (req.body.username === "" || req.body.password === "") {
// 		return profile(res, "signup", "Signup", {
// 			error: "Please fill in all required fields",
// 		});
// 	}
// 	else {
// 			User.signup(req)
// 			.then(function() {
// 				res.redirect("/photo/gallery");
// 			})
// 			.catch(function(err) {
// 				res.status(400);
// 				renderUserTemp(res, "signup", "Signup", {
// 					error: "Please ensure all fields are filled in properly",
// 				});
// 			});
// 		};
// 	});
//
// // render login
// router.get("/login", function(req, res) {
//   res.render('profile');
// });
//
// router.post("/login", function(req, res) {
// 	User.login(req)
// 		.then(function() {
// 			req.session.user;
// 			res.redirect("/homepage");
// 		})
// 		.catch(function(err) {
// 			res.status(400);
//       res.redirect("/homepage");
// 		});
// });
//
function authenticationMiddleware () {
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;

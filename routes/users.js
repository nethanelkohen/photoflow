var express = require("express");
var router = express.Router();
var Sequelize= require("sequelize");
var connection = require('../utility/sql.js');

// require models
var Comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');

var loggeduser = "lester"

router.get('/', function(req,res){
  Post.findAll({ where: {username: loggeduser} }).then(function(rows){
        console.log(rows);
       res.render('profile',{postData:rows});
  });
})


router.get('/upload', function(req, res) {
  res.render('upload');
});

router.get('/feed', function(req, res) {
  Post.findAll().then(function(rows){
        console.log(rows);
       res.render('gallery',{postData:rows});
  });

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


module.exports = router;

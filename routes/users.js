var express = require("express");
var router = express.Router();
// require models
var comments = require('../models/comments.js');
var likes = require('../models/likes.js');
var photos = require('../models/photos.js');
var users = require('../models/user.js');

router.get("/signup", function(req, res, error) {
	renderUserTemp(res, "signup", "Signup", {
	});
});

// render sign up
router.post("/signup", function(req, res) {
	if (req.body.username === "" || req.body.password === "") {
		return profile(res, "signup", "Signup", {
			error: "Please fill in all required fields",
		});
	}
	else {
			User.signup(req)
			.then(function() {
				res.redirect("/photo/gallery");
			})
			.catch(function(err) {
				res.status(400);
				renderUserTemp(res, "signup", "Signup", {
					error: "Please ensure all fields are filled in properly",
				});
			});
		};
	});

// render login
router.get("/login", function(req, res) {
  res.render('profile');
});

router.post("/login", function(req, res) {
	User.login(req)
		.then(function() {
			req.session.user;
			res.redirect("/homepage");
		})
		.catch(function(err) {
			res.status(400);
      res.redirect("/homepage");
		});
});



module.exports = router;

var Sequelize = require("sequelize");
var sql = require("../utility/sql");
var Photos = require("./photos.js");
var Comments = require("./comments.js");
var Likes = require("./likes.js");

var User = sql.define("user", {
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
});

// User.hasMany(Photos);
// User.hasMany(Comments);
// Comments.belongsTo(User);
// Photos.belongsTo(User);


User.signup = function(req){
	return User.create({
		username: req.body.username,
		password: req.body.password,
	})
	.then(function(user){
		req.session.userid = user.id;
		return user;
	});
};


module.exports = User;

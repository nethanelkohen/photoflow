var Sequelize = require("sequelize");
var connection = require("../utility/sql");

const User = connection.define("user", {
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

// User.hasMany(Photos);
// User.hasMany(Comments);
// Comments.belongsTo(User);
// Photos.belongsTo(User);

// user sign up
// User.signup = function(req){
// 	return User.create({
// 		username: req.body.username,
// 		password: req.body.password,
// 	})
// 	// below is used for deSerialize middleware
// 	.then(function(user){
// 		req.session.userid = user.id;
// 		return user;
// 	});
// };
//
// // user log in
// User.login = function(req) {
// 	return User.findOne({
// 			where: {
// 				username: req.body.username,
// 			},
// 		})
// 		.then(function(user) {
// 			if (user) {
// 				return user.comparePassword(req.body.password).then(function(valid) {
// 					if (valid) {
// 						req.session.userid = user.get("id");
// 						return user;
// 					}
// 					else {
// 						throw new Error("Incorrect password");
// 					}
// 				});
// 			} else {
// 				throw new Error("Username not found. Have you signed up for an account?");
// 			}
// 		});
// };


module.exports = User;
// module.exports = Comments;

var sql = require("../utility/sql");
var Sequelize = require("sequelize");
// require other models
var User = require("./user.js");
var Comments = require("./comments.js");
var Likes = require("./likes.js");

var Photos = sql.define("photo", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	size: {
		type: Sequelize.INTEGER,
		notNull: true,
	},
	originalName: {
		type: Sequelize.STRING,
		notNull: true,
	},
	mimeType: {
		type: Sequelize.STRING,
		notNull: true,
	},
	description: {
		type: Sequelize.STRING(150),
	},
	filename: {
		type: Sequelize.STRING,
		notNull: true,
	},
});

Photos.belongsTo(User, {foreignKey: 'id'});
Photos.hasMany(Comments);
Photos.hasMany(Likes);

module.exports = Photos;

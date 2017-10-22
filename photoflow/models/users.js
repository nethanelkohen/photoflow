var Sequelize = require("sequelize");
var sql = require("../utility/sql");

var Users = sql.define("user", {
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

User.hasMany(Photos);
User.hasMany(Comments);
Comments.belongsTo(User);
Photos.belongsTo(User);

module.exports = Users;

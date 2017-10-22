var Sequelize = require("sequelize");
var sql = require("../utility/sql");

var Comments = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: Sequelize.STRING,
		notNull: true,
	},
});

module.exports = Comments;

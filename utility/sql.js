// var Sequelize = require("sequelize");
//
// var sql;
//
// if (process.env.DATABASE_URL) {
// 	sql = new Sequelize(process.env.DATABASE_URL);
// }
// else {
// 	sql = new Sequelize({
// 		database: "photoflow",
// 		username: "postgres",
// 		password: "blu",
// 		host: process.env.DB_HOST || "localhost",
// 		port: process.env.DB_PORT || 5432,
// 		dialect: "postgres",
// 		logging: false,
// 	});
// }
var Sequelize = require('sequelize');
var connection = new Sequelize('photoflow','postgres','blu',{
  dialect: 'postgres'
});
const User = connection.define("users", {
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

module.exports = connection;

var Sequelize = require("sequelize");
var sql = require("../utility/sql");

var Likes = sql.define("like", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

module.exports = Likes;

var Sequelize = require("sequelize");
var connection = require("../utility/sql");


const Post = connection.define("posts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(100),
    notNull: true,
    unique: false,
  },
  title: {
    type: Sequelize.STRING(150),
    notNull: true,
    unique: false,
  },
  description: {
    type: Sequelize.STRING(1000),
    notNull: true,
  }
}, {
  timestamps: false
});

module.exports = Post;

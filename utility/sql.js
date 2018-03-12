const Sequelize = require('sequelize');

var sql;

/*
DON'T CHANGE THIS - WE NEED IT FOR HEROKU, use sql connection below
*/

if (process.env.DATABASE_URL) {
  sql = new Sequelize(process.env.DATABASE_URL);
} else {
  sql = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  });
}

// if (process.env.DATABASE_URL) {
//   sql = new Sequelize(process.env.DATABASE_URL);
// } else {
//   sql = new Sequelize({
//     database: 'photoflow',
//     username: 'nethanelkohen',
//     password: '',
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 5432,
//     dialect: 'postgres',
//     logging: false
//   });
// }

module.exports = sql;

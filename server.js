var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var Sequelize = require("sequelize");
var connection = require('./utility/sql.js');
// var Comments = require('./models/comments.js');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var User = require('./models/user.js');
var bcrypt = require('bcrypt');
connection.sync();
// might be needed to deploy on heroku
const {
  Client
} = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

// require authentication middleware

// routes
var photoRoutes = require("./routes/photos.js");
// var userRoutes = require("./routes/users.js");
var indexroute = require("./routes/index.js");

// middleware
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set(express.static('./public'));

app.use(session({
  secret: "photoflow",
  store: new SequelizeStore({
    db: connection
  })
}));


//render non logged in home
app.use('/', indexroute);

//render users
// app.use('/user', userRoutes);

passport.use(new LocalStrategy(function(username, password, done) {
    console.log(username);
    console.log(password);
    User.findOne({where: {username: username}})
    .then(project =>{
      if(project === null){
        done(null,false);
      }else{
        console.log("username found in database");
          console.log(project.password)
          const hash = project.password
          const useridcurrent = project.id
          bcrypt.compare(password, hash, function(err, response){
            if(response === true){
              return done(null, {user_id: useridcurrent});
            }else{
              return done(null, false ,{message: "Incorrect Credentials"});
            }
          })
        }

    })


    }));
    passport.serializeUser(function(user_name, done) {
      done(null, user_name);
    });

    passport.deserializeUser(function(user_name, done) {
      done(null, user_name);
    });


// catch 404 error
app.get("*", function(req, res) {
  res.send('404 error');
});

// set up database and server
connection.sync().then(function() {
  console.log("Database ready");
  app.listen(process.env.PORT || 4000, function() {
    console.log("Listening at 3000");
  });
});

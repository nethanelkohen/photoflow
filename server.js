var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var Sequelize = require("sequelize");
var connection = require('./utility/sql.js');
var Comments = require('./models/comments.js');
var app = express();

// might be needed to deploy on heroku
const { Client } = require('pg');

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
var userRoutes = require("./routes/users.js");
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



//set storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename : function(req,file,cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//start upload based on name field
const upload = multer({
  storage:storage
}).single('myImage');



//render non logged in home
app.use('/', indexroute);

//render users
app.use('/user', userRoutes);

app.post('/uploads', function(req, res) {
  upload(req,res, (err) => {
    if(err){
      res.render('upload',{
        msg: err
      });
    } else {
      console.log(req.file);
      res.render('gallery');
    }
  });});





// // render api routes
// app.use("/api", apiRoutes);


// catch 404 error
app.get("*", function(req, res) {
  res.send('404 error');
});







// set up database and server
connection.sync().then(function() {
  console.log("Database ready");
  app.listen(process.env.PORT || 3000, function() {
    console.log("Listening at 3000");
  });
});

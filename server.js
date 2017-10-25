var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var Sequelize= require("sequelize");
var connection = require('./utility/sql.js');
var Comments = require('./models/comments.js');
var cookieParser = require('cookieparser');
var session = require('express-session');
var app = express();

// cookies package,

// require authentication middleware

// routes
var photoRoutes = require("./routes/photos.js");
var userRoutes = require("./routes/users.js");
var apiRoutes = require("./routes/api.js");
var indexroute = require("./routes/index.js");



const userID = 001;
// middelware
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set(express.static('./public'));


// express-session

//express validator

//connect flash

//global vars




//set storage
const storage = multer.diskStorage({
  destination: './public/uploads/' + userID,
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
      res.send('test');
    }
  });});



// render profile stuff


// render api routes
app.use("/api", apiRoutes);


// catch 404 error
app.get("*", function(req, res) {
  res.send('404 error');
});







// set up database and server
connection.sync().then(function() {
  console.log("Database ready");
  var port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log("Listening at " + port);
  });
});

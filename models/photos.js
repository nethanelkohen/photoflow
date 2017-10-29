var Sequelize = require("sequelize");
var connection = require("../utility/sql");
var fs = require("fs-extra");
var path = require("path");
var Comments = require("./comments");
var imagePath = "public/uploads/";
var bodyParser = require("body-parser");

const Photos = connection.define("photos", {
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
  userposted: {
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

Photos.hasMany(Comments);


// this isn't working - not sure why
// User.hasMany(Photos);
// User.hasMany(Comments);
// Comments.belongsTo(User);
// Photos.belongsTo(User);

// User.prototype.upload = function(file, req) {
// 	return this.createFile({
// 		id: file.filename,
// 		size: file.size,
// 		originalName: file.originalname,
// 		mimeType: file.mimetype,
// 		description: req.body.description,
//
// 	})
// 	.then(function() {
// 		var ext = path.extname(file.originalname);
// 		var dest = "public/uploads/" + file.filename + ext;
// 		return fs.copy(file.path, dest);
// 	})
// .then(function(req) {
// 	if (file.mimetype.includes("image/")) {
// 		Jimp.read(file.path).then(function(img) {
// 			img.quality(80);
// 			img.resize(Jimp.AUTO, 400);
// 			return img.write(imagePath + file.filename + ".jpg");
// 		})
// 	.then(function(img) {
// 		// create thumpnail
// 		img.cover(64,64);
// 		return img.write(imageTum + file.filename + ".jpg");
// 	});
// 	}
// });
// };

module.exports = Photos;

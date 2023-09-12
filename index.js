const { Sequelize } = require('sequelize');

require('dotenv').config();

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});



const port = process.env.PORT || 8084;
const express = require("express");


const app = express();


// set the view engine to ejs
app.set("views", [__dirname + "/views", __dirname + "/views/partials"]);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// db setup
var mysql = require('mysql2/promise');
var sequelize = new Sequelize("vigi", "user","password",{
  host: 3306,
  dialect: 'mysql'
});
(async () => {
	try {
	  await sequelize.authenticate();
	  console.log('Connection has been established successfully.');
	} catch (error) {
	  console.error('Unable to connect to the database:', error);
	}
})();

const params = {}
params.app = app
params.sequelize = sequelize
params.db = mysql
const indexRouter = require("./routes/main")(params);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






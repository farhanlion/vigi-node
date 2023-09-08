const { Sequelize } = require('sequelize');

const port = process.env.PORT || 8083;
const express = require("express");

const app = express();


// set the view engine to ejs
app.set("views", [__dirname + "/views", __dirname + "/views/partials"]);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'ejs');

// db setup
var mysql = require('mysql2/promise');
var sequelize = new Sequelize("ecom", "root", "Password_123", {
  host: 3306,
  dialect: 'mysql'
});

const params = {}
params.app = app
params.sequelize = sequelize
params.db = mysql
const indexRouter = require("./routes/main")(params);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






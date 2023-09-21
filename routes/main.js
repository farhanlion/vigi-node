const { sequelize } = require("../models/index.js");
const bodyParser = require("body-parser");

module.exports = (params) => {

  var bodyParser = require('body-parser')
  var jsonParser = bodyParser.json()
  var router = require("express").Router();
  var pages = require("../controllers/pagesController.js");
  var videos = require("../controllers/videosController.js");

  router.route("/").get(pages.index(params));
  router.route("/movementDetected").post(jsonParser,videos.new(params))
  router.route("/deletevideo/:id").post(jsonParser,videos.delete(params))

  params.app.use('/', router);
}



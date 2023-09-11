const db = require("../models");
const Video = db.Video;

exports.index = function (params) {
  return async function (req, res) {
        const videos = await Video.findAll().then()
        console.log(videos)
        res.render('index', {
          cloudinary: params.cloudinary,
          videos: videos
        })
    } 
}

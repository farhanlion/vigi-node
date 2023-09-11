const db = require("../models");
const Video = db.Video

exports.new = function (params) {
  return async function (req, res) {
        
        console.log(req.body)

        const video = Video.build({
          link: req.body.videolink,
          timestamp: req.body.timestamp,
          description: req.body.movements,
          area: '',
        })
        await video.save()

        console.log(video)

        res.send({ response: 'received' })
    } 
}
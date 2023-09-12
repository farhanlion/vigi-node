require('dotenv').config();
var nodemailer = require('nodemailer');
const db = require("../models");
const Video = db.Video;

function sendMail(movements) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  var smallmovements = 0
  var bigmovements = 0
  for (var i = 0;i<movements.length;i++){
    if (Object.values(movements[i])[1] == 'small'){
      smallmovements += 1
    }
    if (Object.values(movements[i])[1] == 'big'){
      bigmovements += 1
    }
  }

  message = movements.length +" movements detected in total. " + smallmovements + ' small movements were detected and ' + bigmovements+' big movements were detected.'

  var mailOptions = {
    from: 'farhannation1234@gmail.com',
    to: 'farhan.ahsan.md@gmail.com',
    subject: 'MOVEMENT DETECTED',
    text: 'A movement has been detected in the room. ' + message +' View recording now at http://localhost:8084/'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


exports.new = function (params) {
  return async function (req, res) {
        
        console.log(req.body)
        const video = Video.build({
          public_id: req.body.public_id,
          link: req.body.videolink,
          timestamp: req.body.timestamp,
          description: req.body.movements,
          area: '',
        })
        await video.save()
        
        sendMail(req.body.movements)
        console.log(video)

        res.send({ response: 'received' })
    } 
}
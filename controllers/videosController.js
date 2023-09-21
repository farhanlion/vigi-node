require('dotenv').config();
var customParseFormat = require('dayjs/plugin/customParseFormat')
var dayjs = require('dayjs')
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
        var date = req.body.timestamp.slice(0,10)
        var hours = req.body.timestamp.slice(12,14)
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        var minutes = req.body.timestamp.slice(15,17)
        hours = (hours % 12) || 12;
        time = hours + ":" + minutes + AmOrPm;

        var weekdays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
        dayjs.extend(customParseFormat)
        dayobj = dayjs(date,'MM/DD/YYYY')
        date = dayobj.format('DD/MM/YYYY')
        day = weekdays[dayobj.day()]

        var title = day + " " + date + " "+ time 
        debugger;

        console.log(title)
        const video = Video.build({
          title: title,
          public_id: req.body.public_id,
          link: req.body.videolink,
          timestamp: req.body.timestamp,
          description: req.body.movements,
          area: '',
        })
        await video.save();
        
        sendMail(req.body.movements)
        console.log(video)

        res.send({ response: 'received' })
    } 
}


exports.delete = function (params) {
  return async function (req, res) {
    try{
        const video = await Video.findOne({
          where: {
            id: req.params.id
          }
        });
        await video.destroy();
      }
      catch (err){
        console.error(err)
      }
        res.redirect('/');
    }
}
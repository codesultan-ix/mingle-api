
import models from "../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
import moment from "moment-timezone";
// const moment = require('moment-timezone');
/// Get All Chats///
const Schedule = models.Schedule;
const schedule = catchAsyncError(async (req, res) => {
  console.log("HEY=", (typeof (ObjectId(req.body.to))))
  var from = mongoose.Types.ObjectId(req.user._id)
  var to = mongoose.Types.ObjectId(req.body.to)
  var message = req.body.message
  var toSendAt = req.body.toSendAt
  var dateTime = moment(toSendAt)
  console.log(typeof (dateTime))
  console.log(toSendAt)
  var date = toSendAt.split(" ")[0]
  var time = dateTime.format("HH:mm")
  console.log(date)
  const newChat = new Schedule({
    from: from,
    to: to,
    message: message,
    toSendAtDate: date,
    toSendAtTime: time,
  })
  try {
    await newChat.save()
    res.send({ newChat })
  } catch (error) {

    res.send({ error })
  }
});

export default schedule;

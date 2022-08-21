// const mongoose = require('mongoose')
import mongoose from "mongoose";
// import moment from "moment";
const { ObjectId } = mongoose.Schema.Types
// const moment = require('moment-timezone');
// const dateIndia = moment.tz(Date.now(), "Asia/Calcutta");

const scheduleSchema = new mongoose.Schema({
   from: {
      type: ObjectId,
      required: true,
      ref: 'user',
   },
   to: {
      type: ObjectId,
      required: true,
      ref: 'user',
   },
   message: {
      type: String,
      required: true,
   },
   toSendAtDate: {
      type: String,
   },
   toSendAtTime: {
      type: String,
   },
   // sentAt: {
   //    type: Date,
   //    default: dateIndia
   // },
   seen:{
      type:Boolean,
      default:false,
   }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

export default Schedule;
// module.exports = Schedule
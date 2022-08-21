// const mongoose = require('mongoose')
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const callSchema = new mongoose.Schema({
   sender: {
      type: ObjectId,
      required: true,
      ref: 'user',
   },
   receiver: {
      type: ObjectId,
      required: true,
      ref: 'user',
   },
   sentAt: {
      type: Date,
      default: Date.now
   },
})

const Call = mongoose.model('Call', callSchema)
export default Call;
// module.exports = Call
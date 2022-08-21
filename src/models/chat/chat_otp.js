

// const mongoose = require('mongoose');
import mongoose from "mongoose";
// import uuid from "node-uuid";
// var uuid = require('node-uuid');
// const Chat = mongoose.model("Chat");


 var otpSchema = new mongoose.Schema({
   email: {type : String , unique : true, required : true},
   otp: {type : Number},
   otp_check: {type : Boolean, required : true},
   createdAt:{type : Number,expires: '600s', default: Date.now},
});

const ChatOTP = mongoose.model('ChatOTP', otpSchema)
export default ChatOTP;
// module.exports = OTP



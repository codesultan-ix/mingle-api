import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: String,

  expiresAt: Date,

  isVerified: {
    type: Boolean,
    default: false,
  },
  // otp_check: {type : Boolean, required : true},
  createdAt: {
    type: Date,
    expires: '600s',
    default: Date.now,
  },
  // email: {type : String , unique : true, required : true},
  // otp: {type : Number},
  // otp_check: {type : Boolean, required : true},
  // createdAt:{type : Number,expires: '600s', default: Date.now},
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;

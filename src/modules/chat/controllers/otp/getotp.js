
import models from "../../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
import nodemailer from "nodemailer";
/// Get All Chats///
const OTP = models.ChatOTP;
const getotp = catchAsyncError( async (req, res) => {
  console.log("VERIFY"+req.body);
  if (/\S+@\S+\.\S+/.test(req.body.email) && /^\d{10}$/.test(req.body.phone_num)) {
    console.log(req.body.email)
    console.log(req.body.phone_num)
    var otp = await generateOTP(req.body.email)
    const response = insertUserMongod(req.body.name, req.body.email, req.body.phone_num, otp)
    if (response)
      res.status(201).json({ 'message': "New person added", 'type': "success" });
    else
      res.status(500).json({ 'message': "Database error", 'type': "error" });
    // dbc=="m"?insertUserMongod(req.body.email,req.body.phone_num,otp):insertUserCass(req.body.email,req.body.phone_num,otp);
  } else {
    res.status(400).json({ "error": "Invalid details" });
  }
});

async function insertUserMongod(name, email, phone_num, otp) {
  const otp_generated = new OTP({ email: email, otp: otp, otp_check: false })
  try {
    // await newUser.save()
    await otp_generated.save()
    console.log("DONE")
    return true
  } catch (error) {
    return false
  }

}


async function generateOTP(email) {
  let OTP = 0;
  var d = 1
  for (let i = 0; i < 4; i++) {
    OTP = OTP * 10 + Math.floor(Math.random() * 10);
  }

  var transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ggmail,
      pass: ppassword
    }
  });

  var mailOptions = {
    from: ggmail,
    to: email,
    subject: 'OTP for ChatApp',
    text: ('Your OTP is ' + OTP)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return OTP;
}


export default getotp;

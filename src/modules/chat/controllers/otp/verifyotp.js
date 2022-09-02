
import models from "../../../../models/index.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
// import nodemailer from "nodemailer";
/// Get All Chats///
const OTP = models.ChatOTP;
const User = models.User;
const verifyotp = catchAsyncError( async (req, res) => {
  console.log("VErifyting otp")
  console.log(req.body);
  if (/^\d{4}$/.test(req.body.otp) && /\S+@\S+\.\S+/.test(req.body.email)) {
    console.log(req.body);
    try{
      var verified = await checkOTP(req.body.otp, req.body.email);
      console.log("verified bool: "+ verified);

    }
    catch(err)
    {
      console.log(err);
    }
    if (verified) {
      if (register(req.body.password, req.body.email, req.body.phone_num, req.body.name, req.body.publicKey, req.body.privateKey, req.body.hashedPass)) {
        console.log(" status : " + "Success")
        res.status(200).json({ "status": "Success" })
      } else {
        console.log(" status : " + "Error")
        res.status(400).json({ "status": "Registration Failed" })
      }
    }
    else {
      console.log(" status : " + "Retry")
      res.status(403).json({ "status": "Retry" })
    }
  }
  else {
    res.status(400).json({ "error": "Invalid details" });
  }
});

async function checkOTP(otp, email_id) {
  var result = true
  try{
    var id = await OTP.findOne({ email: email_id, otp: otp },
      function (err, response) {
        if (!err) {
          console.log("Retrieve Response check : " + response);
          if (response != null) {
            if (response['otp_check']) {
              result = false
            }
          }
        } else {
          console.log("Error" + err)
          result = false
        }
      });
  }
  catch(err){
    console.log(err)
  }
  console.log("DDDDDDDDDD-", id)
  if (otp == id.otp && result != false) {
    console.log("Inside IF")
    await OTP.findByIdAndUpdate(id._id, { otp_check: true }, function (err, response) {
      if (!err) {
        console.log("Retrieve Response update : " + response);
        if (response == null) {
          result = false
        }
      } else {
        console.log("Error : " + err)
        result = false
      }
    });
  }

  console.log(" result : " + result)
  return result;
}


async function register(pass, email, phone_num, name, publicKey, privateKey, hashedPass) {
  var result = true
  const newUser = new User({
    name: name,
    email: email,
    number: phone_num,
    password: pass,
    publicKey: publicKey,
    privateKey: privateKey,
    hashedPass: hashedPass,
  })
  try {
    await newUser.save()
    await OTP.findOneAndDelete({email:email}, function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          console.log("Deleted User : ", docs); 
      } 
  })
    // await otp_generated.save()
    console.log("DONE")
    return true
  } catch (error) {
    return false
  }
}




export default verifyotp;

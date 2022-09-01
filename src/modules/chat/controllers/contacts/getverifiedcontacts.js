
import models from "../../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
import nodemailer from "nodemailer";
/// Get All Chats///
const OTP = models.ChatOTP;
const getverifiedcontacts = catchAsyncError( async (req, res)=>{
  console.log("VERIFIEDDDDDDDDD")
  console.log(req.user.number)
  var result = false
  var verifiedContacts = []
  for(var i =0; i<req.body['contactlist'].length ;i++) {
    req.body['contactlist'][i]['number'] = req.body['contactlist'][i]['number'].replace(/\s/g, '')
    req.body['contactlist'][i]['number'] = req.body['contactlist'][i]['number'].replace('+91', '')
    // console.log("!!!!"+req.body['contactlist'][1]['number'])
    if(req.body['contactlist'][i]['number']!=req.user.number){
    await User.findOne({number : req.body['contactlist'][i]['number']})
    .then((verifiedUser)=>{
      //  console.log(verifiedUser.profile_pic)
       verifiedContacts.push({
         'profile_pic': verifiedUser.profile_pic,
         '_id': verifiedUser._id,
         'name': verifiedUser.name,
         'number': verifiedUser.number,
         'email': verifiedUser.email,
         'publicKey': verifiedUser.publicKey,
       }) 
    }).catch(err=>{
        console.log(err)
    })}
  }
 // console.log(verifiedContacts)
  res.send(verifiedContacts)
});


export default getverifiedcontacts;

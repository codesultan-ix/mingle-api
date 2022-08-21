
import models from "../../../models/index.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
/// Get All Chats///
const Chat = models.Chat;
const User = models.User;
const getAllChats = catchAsyncError( async (req, res) => {
  console.log("reqqqq=", req.user._id)
  Chat.find({ $or: [{ from: req.user._id }, { to: req.user._id }] })
    .populate("from", "_id name email publicKey profile_pic", User)
    .populate("to", "_id name email publicKey profile_pic", User)
    // .sort('-sentAt')
    .then((chats) => {
      console.log(chats)
      res.send({ chats })
    }).catch(err => {
      console.log(err)
    })
});

export default getAllChats;

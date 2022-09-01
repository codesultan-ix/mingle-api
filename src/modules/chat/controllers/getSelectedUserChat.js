
import models from "../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
/// Get All Chats///
const Chat = models.Chat;
const getSelectedUserChat = catchAsyncError( async (req, res) => {
  console.log(req.user._id)
  Chat.find({ $or: [{ $and: [{ from: req.user._id }, { to: req.body._id }] }, { $and: [{ to: req.user._id }, { from: req.body._id }] }] })
    .populate("from", "_id name email publicKey profile_pic")
    .populate("to", "_id name email publicKey profile_pic")
    .sort('-sentAt')
    .then((chats) => {
      res.send({ chats })
    }).catch(err => {
      console.log(err)
    })
});

export default getSelectedUserChat;

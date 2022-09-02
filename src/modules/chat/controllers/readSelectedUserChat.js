
import models from "../../../models/index.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
/// Read Selected Chats///
const Chat = models.Chat;
const readSelectedUserChat = catchAsyncError(async (req, res) => {
  console.log(req.user._id)

  Chat.updateMany({ $or: [{ $and: [{ from: req.user._id }, { to: req.body._id }] }, { $and: [{ to: req.user._id }, { from: req.body._id }] }] },
    { seen: true }, function (err, chats) {
      if (err) {
        console.log(err)
        res, send({ err })
      }
      else {
        console.log("Updated chats : ", chats);
        res.send({ chats })
      }
    });

  });

export default readSelectedUserChat;


import models from "../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
/// Get New Chats///
const Chat = models.Chat;
const User = models.User;
const getNewChats = catchAsyncError(async (req, res) => {
  console.log("reqqqq=", req.user._id)
  Chat.find({ $and: [{ to: req.user._id }, { isStored: false }] })
    .populate("from", "_id name email publicKey profile_pic number", User)
    .populate("to", "_id name email publicKey profile_pic number", User)
    // .sort('-sentAt')
    .then((chats) => {
      console.log(chats)
      const n = chats.length;
      var i;
      for (i = 0; i < n; i++) {

        chats[i].isStored = true
      }
      Chat.updateMany({ $and: [{ to: req.user._id }, { isStored: false }] },
        { isStored: true }, function (err, doc) {
          if (err) {
            console.log(err)
            res.send(err)
          }
          else {
            console.log(doc)
            res.send({ chats })
            // res.send(doc)
          }
        });
    }).catch(err => {
      console.log(err)
    })
});

export default getNewChats;

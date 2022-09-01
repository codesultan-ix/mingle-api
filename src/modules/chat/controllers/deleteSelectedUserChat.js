
import models from "../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
/// Delete Selected Chats///
const Chat = models.Chat;
const deleteSelectedUserChat = catchAsyncError( async (req, res) => {
  console.log(req.user._id)
  console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
  Chat.deleteMany({ $or: [{ $and: [{ from: req.user._id }, { to: req.body._id }] }, { $and: [{ to: req.user._id }, { from: req.body._id }] }] }).then(function () {
    res.status(200).send({ data: "Chats deleted successfully" });
    console.log("Data deleted"); // Success
  }).catch(function (error) {
    res.status(500).send({ data: "Server error" }); // Failure
  });

});

export default deleteSelectedUserChat;

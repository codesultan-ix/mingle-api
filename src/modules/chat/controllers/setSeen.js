
import models from "../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
/// set seen///
const Chat = models.Chat;
const setSeen = catchAsyncError(async (req, res) => {
  console.log(req.user._id)
  Chat.updateMany({ $and: [{ to: req.user._id }, { from: req.body._id }] },
    { seen: true }, function (err, doc) {
      if (err) {
        console.log(err)
        res.send(err)
      }
      else {
        console.log(doc)
        res.send(doc)
      }
    });

})
export default setSeen;
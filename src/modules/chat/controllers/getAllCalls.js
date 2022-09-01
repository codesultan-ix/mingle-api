
import models from "../../../models/index.js";
import catchAsyncError from "../../../Helpers/catchAsyncError.js";
/// Get All Callss///
const Call = models.Call;
const User = models.User;
const getAllCalls =  catchAsyncError(async (req, res) => {
  console.log("reqqqq=", req.user._id)
  Call.find({ $or: [{ sender: req.user._id }, { receiver: req.user._id }] })
    .populate("sender", "_id name email profile_pic number", User)
    .populate("receiver", "_id name email profile_pic number", User)
    .sort('-sentAt')
    .then((calls) => {
      console.log(calls)
      res.send({ calls })
    }).catch(err => {
      console.log(err)
    })
});

export default getAllCalls;

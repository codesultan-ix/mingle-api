
import models from "../../../models/index.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
/// Get All Chats///
const User = models.User;
const getSelectedUserProfile = catchAsyncError(async (req, res) => {
  console.log(req.user._id)
   User.find({_id:req.body._id})
    .then((user) => {
      console.log(user[0])
      user=user[0];
      res.send({ user })
    }).catch(err => {
      console.log(err)
    })
});

export default getSelectedUserProfile;

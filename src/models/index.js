import DeviceInfo from "./auth/deviceInfo.js";
import User from "./auth/user.js";
import Notification from "./notification/notification.js";
import Post from "./post/post.js";
import Comment from "./post/comment.js";
import OTP from "./otp/otp.js";
import Chat from "./chat/chat.js";
import Call from "./chat/call.js";
import Schedule from "./chat/schedule.js";
import ChatOTP from "./chat/chat_otp.js";


const models = {};

models.DeviceInfo = DeviceInfo;
models.User = User;
models.Notification = Notification;
models.Post = Post;
models.Comment = Comment;
models.OTP = OTP;

// chat related models
models.Chat = Chat;
models.Call = Call;
models.Schedule = Schedule;
models.ChatOTP  = ChatOTP;


export default models;

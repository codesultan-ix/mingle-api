import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.js";
import chatController from "../controllers/index.js";

const chatRouter = Router();

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

// Authenticated Routes -------------------------------------------------------

// chatRouter
//   .route("/create-post")
//   .post(
//     // multerMiddleware.array("mediaFiles"),
//     isAuthenticatedUser,
//     chatController.createNewPost
//   );

chatRouter
  .route("/addChat")
  .post(isAuthenticatedUser, chatController.addChat);

chatRouter
  .route("/schedule'")
  .post(isAuthenticatedUser, chatController.schedule);

chatRouter
  .route("/deleteSelectedUserChat")
  .post(isAuthenticatedUser, chatController.deleteSelectedUserChat);

chatRouter
  .route("/getAllChats")
  .get(isAuthenticatedUser, chatController.getAllChats);

chatRouter
  .route("/getAllCalls'")
  .get(isAuthenticatedUser, chatController.getAllCalls);

chatRouter
  .route("/getNewChats")
  .get(isAuthenticatedUser, chatController.getNewChats);
//   .delete(isAuthenticatedUser, chatController.deletePost);
// .put(isAuthenticatedUser, updatePost)

/// COMMENTS ///

chatRouter
  .route("/getSelectedUserChat")
  .get(isAuthenticatedUser, chatController.getSelectedUserChat);

chatRouter
  .route("/getSelectedUserProfile")
  .get(isAuthenticatedUser, chatController.getSelectedUserProfile);

chatRouter
  .route("/readSelectedUserChat")
  .post(isAuthenticatedUser, chatController.readSelectedUserChat);

chatRouter
  .route("/setSeen")
  .post(isAuthenticatedUser, chatController.setSeen);

export default chatRouter;

import addChat from "./addChat.js";
import getAllChats from "./getAllChats.js";
import getAllCalls from "./getAllCalls.js";
import deleteSelectedUserChat from "./deleteSelectedUserChat.js";
import getNewChats from "./getNewChats.js";
import getSelectedUserChat from "./getSelectedUserChat.js";
import schedule from "./schedule.js";
import setSeen from "./setSeen.js";
import getSelectedUserProfile from "./getSelectedUserProfile.js";
import readSelectedUserChat from "./readSelectedUserChat.js";

const chatController = {};

chatController.addChat = addChat;
chatController.getAllChats = getAllChats;
chatController.getAllCalls = getAllCalls;
chatController.deleteSelectedUserChat = deleteSelectedUserChat;
chatController.getNewChats = getNewChats;
chatController.getSelectedUserChat = getSelectedUserChat;
chatController.schedule = schedule;
chatController.setSeen = setSeen;
chatController.getSelectedUserProfile = getSelectedUserProfile;
chatController.readSelectedUserChat = readSelectedUserChat;

export default chatController;

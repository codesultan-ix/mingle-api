import chatRouter from "./routes/index.js";

// chatRouter = require('./controllers/chatController');
// chatController = require('./controllers/chatController');
// chatSettingsRouter = require('./controllers/chatSettingsController');
// chatUserRouter = require('./controllers/chatUserController');
const chatModule = {
  init: (app) => {
    app.use("/api/v1/chat", chatRouter);
    // app.use("/api/v1/chat/settings", chatSettingsRouter);
    // app.use("/api/v1/chat/user", chatUserRouter);
    console.log("[module]: chat module loaded");
  },
};

export default chatModule;
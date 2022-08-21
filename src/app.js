import express from "express";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cron from "node-cron";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import utility from "./utils/utility.js";
import http from "http";
import socketio from "socket.io";
import {error} from "console";
// var server = require("http").createServer(app);
// var server = http.createServer(app);
// var io = require("socket.io")(server);
// var io = socketio(server);
// const { error } = require("console");

export const runApp = () => {
  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      exposedHeaders: ["x-auth-token"],
    })
  );
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Schedule a task
  cron.schedule("59 23 * * *", () => {
    console.log("[cron]: task running every day at 11:59 PM");
    utility.deleteExpiredOTPs();
  });


//sockets
// const http = require("http");
var server = http.createServer(app);
var io = socketio(server);
// let ON_CONNECTION = "connection";
let ON_DISCONNECT = "disconnect";

// Main Events
let EVENT_IS_USER_ONLINE = "check_online";
let EVENT_SINGLE_CHAT_MESSAGE = "single_chat_message";

// Sub Events
let SUB_EVENT_RECEIVE_MESSAGE = "receive_message";
let SUB_EVENT_IS_USER_CONNECTED = "is_user_connected";
// const publicDirectoryPath = path.join(__dirname, "./public");
// app.use(express.static(publicDirectoryPath))
let listen_port = 3000;

let STATUS_MESSAGE_NOT_SENT = 10001;
let STATUS_MESSAGE_SENT = 10001;

const userMap = new Map();

// io.sockets.on(ON_CONNECTION, (socket) => {
//   console.log("HEEEEEEEY")
//   onEachUserConnection(socket);
// });

io.on("connection", (userSocket) => {
  console.log("CHECK-", userSocket.handshake.query.senderId);
  userSocket.join(userSocket.handshake.query.senderId);
  // console.log(io.sockets.clients().length)
  userSocket.on("send_message", async (data) => {
    console.log("IT WORKS");
    console.log(data);
    const newChat = new Chat({
      to: data.receiverId,
      from: data.senderId,
      message: data.message,
      sentAt: data.sentAt,
    });
    await newChat
      .save()
      .then((res) => {
        console.log(res), console.log("BROADCAST-" + data.receiverId);
        Chat.find({ $and: [{ to: res.to }, { from: res.from }] })
          .populate("from", "_id name email publicKey profile_pic", User)
          .populate("to", "_id name email publicKey profile_pic", User)
          .sort("-sentAt")
          .then((chats) => {
            //    console.log(chats)
            console.log("Chheck receive");
            console.log(chats[0]);
            userSocket.to(data.receiverId).emit("receive_message", chats[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
    //broadcast.to('ID')
    //io.in(data.receiverId).emit('receive_message', data)
  });

  userSocket.on("start_call", async (data) => {
    console.log("IT WORKS");
    console.log(data);
    const newCall = new Call({
      receiver: data.receiverId,
      sender: data.senderId,
      // sentAt: data.sentAt,
    });
    await newCall
      .save()
      .then((res) => {
        console.log(res), console.log("BROADCAST-" + data.receiverId);
      })
      .catch((err) => console.log(err));
      userSocket
      .to(data.receiverId)
      .emit("receive_call", data)
  });

  userSocket.on("read_message", async (data) => {
    console.log("inside on read message");
    console.log(data);
    Chat.updateMany(
      { $and: [{ to: data.receiverId }, { from: data.senderId }] },
      { seen: true },
      function (err, doc) {
        if (err) {
          console.log(error);
        } else {
          console.log(doc);
        }
      }
    );
    console.log("broadcasting read message==", data);
    userSocket.broadcast.to(data.senderId).emit("read_message", data);
  });

  userSocket.on("store_message", async (data) => {
    console.log("inside set store");
    console.log(data);
    Chat.updateMany(
      { $and: [{ to: data.receiverId }, { from: data.senderId }] },
      { isStored: true },
      function (err, doc) {
        if (err) {
          console.log(error);
        } else {
          console.log(doc);
        }
      }
    );
    console.log("broadcasting stored message==", data);
    userSocket.broadcast.to(data.senderId).emit("store_message", data);
  });
});

function onEachUserConnection(socket) {
  var query = stringifyJson(socket.handshake.query);
  print("-----");
  print("Connected => Socket ID: " + socket.id + ", Users: " + query);

  var from_user_id = socket.handshake.query.from;
  var userMapVal = { socket_id: socket.id };
  addUserToMap(from_user_id, userMapVal);
  printOnlineUser();

  onMessage(socket);
  checkOnline(socket);
  onDisconnect(socket);
}

function checkOnline(socket) {
  socket.on(EVENT_IS_USER_ONLINE, function (chat_message) {
    onlineCheckHandler(socket, chat_message);
  });
}

function onlineCheckHandler(socket, chat_user_details) {
  let to_user_id = chat_user_details.to;
  print("Checking Online User => " + to_user_id);
  let to_user_socket_id = getSocketIDFromMapForThisUser(to_user_id);
  let isOnline = undefined != to_user_socket_id;
  chat_user_details.to_user_online_status = isOnline;
  sendBackToClient(
    socket,
    to_user_socket_id,
    SUB_EVENT_IS_USER_CONNECTED,
    chat_user_details
  );
}

function sendBackToClient(socket, to_user_socket_id, event, chat_message) {
  socket.emit(event, stringifyJson(chat_message));
}

function onMessage(socket) {
  socket.on(EVENT_SINGLE_CHAT_MESSAGE, function (chat_message) {
    singleChatHandler(socket, chat_message);
  });
}

function singleChatHandler(socket, chat_message) {
  print("onMessage: " + stringifyJson(chat_message));
  let to_user_id = chat_message.to;
  let from_user_id = chat_message.from;
  print(from_user_id + "=>" + to_user_id);
  // to_user_id
  var to_user_socket_id = getSocketIDFromMapForThisUser(to_user_id);
  if (to_user_socket_id == undefined) {
    print("User not online");
    chat_message.to_user_online_status = false;
    return;
  }
  chat_message.to_user_online_status = true;
  sentToConnectedSocket(
    socket,
    to_user_socket_id,
    SUB_EVENT_RECEIVE_MESSAGE,
    chat_message
  );
}

function sentToConnectedSocket(socket, to_user_socket_id, event, chat_message) {
  socket.to(to_user_socket_id).emit(event, stringifyJson(chat_message));
  // socket.emit(event, stringifyJson(chat_message));

  //for saving the chat in database

  // const message = new Chat(parameters??)
  // try {
  //    await message.save()
  //    res.send({ message })
  // } catch (error) {
  //    res.status(400)
  //    res.send(error)
  // }
}

function getSocketIDFromMapForThisUser(to_user_id) {
  let userMapVal = userMap.get(to_user_id.toString());
  if (undefined == userMapVal) {
    return undefined;
  }
  return userMapVal.socket_id;
}

function onDisconnect(socket) {
  socket.on(ON_DISCONNECT, function () {
    removeUserWithSocketIDFromMap(socket.id);
    socket.removeAllListeners(SUB_EVENT_RECEIVE_MESSAGE);
    socket.removeAllListeners(SUB_EVENT_IS_USER_CONNECTED);
    socket.removeAllListeners(ON_DISCONNECT);
  });
}

function removeUserWithSocketIDFromMap(socket_id) {
  print("Deleting User : " + socket_id);
  let toDeleteUser;
  for (let key of userMap) {
    let userMapVal = key[1];
    if (userMapVal.socket_id == socket_id) {
      toDeleteUser = key[0];
    }
  }
  print("Deleting User : " + toDeleteUser);
  if (undefined != toDeleteUser) {
    userMap.delete(toDeleteUser);
  }
  print(userMap);
  printOnlineUser();
}

function addUserToMap(key_user_id, socket_id) {
  userMap.set(key_user_id, socket_id);
}

function printOnlineUser() {
  print("Online Users : " + userMap.size);
}

function print(txt) {
  console.log(txt);
}

function stringifyJson(data) {
  return JSON.stringify(data);
}
  // Index Route
  app.route("/").get(function (req, res) {
    res.status(200).json({
      success: true,
      message: "server is up and running",
    });
  });

  return app;
};

export const closeApp = (app) => {
  // Middleware for Errors
  app.use(errorMiddleware);
  app.use("*", (req, res, next) => {
    res.status(404).json({
      success: false,
      message: "api endpoint not found",
    });
  });
};

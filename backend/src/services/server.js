const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const ChatManager = require("./chat/sockets");
const { startMongoConnection } = require("./mongodb");
const { authRouter } = require("../router");
const messagesRouter = require("../router/message");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
  }

  setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(cors({ methods: "*" }));
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use("/auth", authRouter);
    this.app.use("/messages", messagesRouter);
  }

  setupSockets() {
    new ChatManager(this.io);
  }

  async start() {
    try {
      await startMongoConnection();
      this.setupMiddlewares();
      this.setupSockets();
      this.server.listen(this.port);
    } catch (er) {
      throw er;
    }
    return this;
  }
}

module.exports = Server;

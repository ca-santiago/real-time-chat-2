import express, { json, urlencoded } from "express";
import SocketIO from "socket.io";
import { resolve } from "path";
import cors from "cors";
import http from "http";
import morgan from "morgan";

import ChatManager from "./chat/sockets";
import { startMongoConnection } from "./mongodb";
import { authRouter, chatRouter } from "../router";
// import messagesRouter from "../router/message";

export default class Server {
  app: express.Application;
  port: number;
  server: http.Server;
  io: SocketIO.Server;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.server = http.createServer(this.app);
    this.io = new SocketIO.Server(this.server);
  }

  setupMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors({ methods: "*" }));
    this.app.use(express.static(resolve(__dirname, "../public")));
    this.app.use("/auth", authRouter);
    this.app.use("/chat", chatRouter);
    // this.app.use("/messages", messagesRouter);
  }

  setupSockets() {
    new ChatManager(this.io);
  }

  async start() {
    try {
      await startMongoConnection();
      this.setupMiddlewares();
      this.setupSockets();
      this.server.listen(this.port, () => {
        console.log(`[Server] Running on port ${this.port}`);
      });
      this.app.use("/ping", (req, res) => {
        res.send("pong");
      });
    } catch (er) {
      throw er;
    }
    return this;
  }
}

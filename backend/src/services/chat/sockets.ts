import IO from "socket.io";

export default class ChatManager {
  connection: IO.Server;
  constructor(ioConnection: IO.Server) {
    this.connection = ioConnection;
    this.socketEvents();
  }

  socketEvents() {
    this.connection.on("connection", (socket) => {
      socket.on("mensaje-to-server", (data: any) => {
        console.log(data);
        this.connection.emit("mensaje-from-server", data);
      });
    });
  }
}

class ChatManager {
  constructor(ioConnection) {
    this.connection = ioConnection;
    this.socketEvents();
  }

  socketEvents() {
    this.connection.on("connection", (socket) => {
      socket.on("mensaje-to-server", (data) => {
        console.log(data);
        this.connection.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = ChatManager;

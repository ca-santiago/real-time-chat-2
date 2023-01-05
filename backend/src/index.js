const Server = require("./services/server");

require("dotenv").config();

console.devlog = (msg = "") => {
  if (process.env.ENV === "DEV") {
    console.log(msg);
  }
};

const server = new Server().start();

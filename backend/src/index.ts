import Server from "./services/server";

require("dotenv").config();
const oldLog = console.log;
console.log = (msg = "") => {
  if (process.env.ENV === "DEV") {
    oldLog(msg);
  }
};

new Server().start();

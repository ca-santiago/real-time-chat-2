const { Schema, model } = require("mongoose");

const userSchema = Schema({
  id: String,
  email: String,
  name: String,
  password: String,
});

const UserModel = model("User", userSchema);
module.exports = UserModel;

const mongoose = require("mongoose");

const startMongoConnection = async () => {
  await mongoose.connect(`${process.env.MONGO_URL}`);
  console.devlog('[MONGNODB] Connection started');
};
 
module.exports = {
  startMongoConnection,
};

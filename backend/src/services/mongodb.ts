import mongoose from "mongoose";

export const startMongoConnection = async () => {
  await mongoose.connect(`${process.env.MONGO_URL}`);
  // @ts-ignore
  console.log("[MONGNODB] Connection started");
};

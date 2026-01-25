import mongoose from "mongoose";

export const dbconnect = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_DB_URL}`);
  } catch (err) {
    console.log("Error while connecting with database", err);
  }
};

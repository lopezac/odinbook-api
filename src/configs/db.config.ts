import mongoose from "mongoose";

const mongoDB =
  "mongodb+srv://lopezaxel:pantaleon1@cluster0.5lb2txv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

export default db;

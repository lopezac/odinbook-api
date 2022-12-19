import mongoose from "mongoose";
import { defaultPicture } from "../configs/default-picture";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, minLength: 2, maxLength: 120, required: true },
  lastName: { type: String, minLength: 2, maxLength: 120, required: true },
  password: { type: String, minLength: 7, required: false },
  email: { type: String, minLength: 5, maxLength: 150, required: true },
  birthday: { type: Date, required: false, default: new Date("2000-01-01") },
  gender: { type: String, required: false, default: "male" },
  picture: { type: String, required: false, default: defaultPicture },
  facebookID: { type: String, required: false },
});

const User = mongoose.model("User", UserSchema);

export default User;

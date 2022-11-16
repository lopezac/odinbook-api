import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, minLength: 2, maxLength: 120, required: true },
  lastName: { type: String, minLength: 2, maxLength: 120, required: true },
  password: { type: String, minLength: 7, required: true },
  email: { type: String, minLength: 5, maxLength: 150, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  picture: { type: Object, required: false },
  facebookID: { type: String, required: false },
});

const User = mongoose.model("User", UserSchema);

export default User;

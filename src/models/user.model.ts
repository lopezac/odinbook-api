import mongoose from "mongoose";

const Schema = mongoose.Schema;

const defaultImage =
  "https://scontent.faep31-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=12b3be&_nc_ohc=iLOcjgk38zkAX9-HNQN&_nc_ht=scontent.faep31-1.fna&edm=AP4hL3IEAAAA&oh=00_AfDRqOnOZ6b364Ki1y04kZ9JnQKBuIvuMDOa-P2AmhiNqQ&oe=639D8919";
const UserSchema = new Schema({
  firstName: { type: String, minLength: 2, maxLength: 120, required: true },
  lastName: { type: String, minLength: 2, maxLength: 120, required: true },
  password: { type: String, minLength: 7, required: false },
  email: { type: String, minLength: 5, maxLength: 150, required: true },
  birthday: { type: Date, required: false, default: new Date("2000-01-01") },
  gender: { type: String, required: false, default: "male" },
  picture: { type: String, required: false, default: defaultImage },
  facebookID: { type: String, required: false },
  friends: { type: Array, required: false },
  posts: { type: Array, required: false },
  comments: { type: Array, required: false },
  messages: { type: Array, required: false },
});

const User = mongoose.model("User", UserSchema);

export default User;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  receiver: { type: String, minLength: 24, maxLength: 24, required: true },
  emitter: { type: String, minLength: 24, maxLength: 24, required: true },
  picture: { type: String, required: true },
  text: { type: String, minLength: 1, maxLength: 300, required: true },
  type: { type: String, minLength: 1, maxLength: 100, required: true },
  created_at: { type: Date, required: false, default: new Date() },
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;

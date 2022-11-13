"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    firstName: { type: String, minLength: 2, maxLength: 120, required: true },
    lastName: { type: String, minLength: 2, maxLength: 120, required: true },
    password: { type: String, minLength: 7, required: true },
    email: { type: String, minLength: 5, maxLength: 150, required: true },
    gender: { type: String, required: true },
    birthday: {
        type: Date,
        min: "1900-01-01",
        max: "2000-02-02",
        required: true,
    },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;

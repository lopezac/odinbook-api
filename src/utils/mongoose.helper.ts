import mongoose from "mongoose";

export const isObjectId = (string: string) => {
  return mongoose.isObjectIdOrHexString(string);
};

export const createObjectId = (string: string | number) => {
  return new mongoose.Types.ObjectId(string);
};

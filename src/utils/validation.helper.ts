import mongoose from "mongoose";

export const checkIsObjectId = async (value: string) => {
  if (isObjectId(value)) return true;
  return Promise.reject();
};

export const isObjectId = (string: string) => {
  return mongoose.isObjectIdOrHexString(string);
};

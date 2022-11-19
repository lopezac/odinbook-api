import { body } from "express-validator";
import validationErrors from "./errors.validation";
import { isObjectId } from "../utils/mongoose.helper";

const checkIsObjectId = async (value: string) => {
  if (isObjectId(value)) return true;
  return Promise.reject();
};

const post = [
  body("receiver", "Receiver must be a valid ObjectId")
    .isLength({ min: 24, max: 24 })
    .custom(checkIsObjectId),
  body("emitter", "Emitter must be a valid ObjectId")
    .isLength({ min: 24, max: 24 })
    .custom(checkIsObjectId),
  validationErrors,
];

export default { post };

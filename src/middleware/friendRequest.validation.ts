import { body } from "express-validator";
import validationErrors from "./errors.validation";
import { checkIsObjectId } from "../utils/validation.helper";

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

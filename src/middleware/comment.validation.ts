import { body } from "express-validator";
import Comment from "../models/comment.model";
import { checkIsObjectId } from "../utils/validation.helper";
import validationErrors from "./errors.validation";

const create = [
  body("text", "Text must be at least 1 characters long")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .escape(),
  body("user", "Must provide an user id")
    .trim()
    .isLength({ min: 24, max: 24 })
    .custom(checkIsObjectId),
  body("post", "Must provide an post id")
    .trim()
    .isLength({ min: 24, max: 24 })
    .custom(checkIsObjectId),
  body("created_at", "Must select a valid created_at").optional(),
  validationErrors,
];

export default { create };

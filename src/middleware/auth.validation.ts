import { body } from "express-validator";
import validationErrors from "./errors.validation";
import User from "../models/user.model";

export const signUpValidation = [
  body("firstName", "First name must be at least 2 characters long")
    .trim()
    .isLength({ min: 2, max: 120 })
    .escape(),
  body("lastName", "Last name must be at least 2 characters long")
    .trim()
    .isLength({ min: 2, max: 120 })
    .escape(),
  body(
    "password",
    "Password must have at least 7 characters, a uppercase letter and a number"
  )
    .trim()
    .isLength({ min: 7 })
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .escape(),
  body("passwordConfirm", "Passwords do not match")
    .trim()
    .custom(async (value, { req }) => {
      if (value === req.body.password) return true;
      return Promise.reject();
    })
    .escape(),
  body("email", "Email must be a valid one")
    .normalizeEmail()
    .isEmail()
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value });
      if (user) return Promise.reject();
      return true;
    })
    .withMessage("Email is already in use"),
  body("gender"),
  body("birthday", "Must select a valid birthday").isISO8601().toDate(),
  validationErrors,
];

export const signInValidation = [
  body("email", "Incorrect email").normalizeEmail().isEmail(),
  body("password", "Incorrect password")
    .trim()
    .isLength({ min: 7 })
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .escape(),
];

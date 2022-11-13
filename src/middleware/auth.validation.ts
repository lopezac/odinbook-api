import { body } from "express-validator";
import User from "models/user.model";

const signUp = [
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
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    })
    .escape(),
  body("email", "Email must be a valid one").normalizeEmail().isEmail(),
  // .custom((value, { req }) => {
  //   return User.find({ email: value }).then((user) => {
  //     if (user) {
  //       return Promise.reject();
  //     }
  //   });
  // })
  body("gender"),
  body("birthday", "Must select a valid birthday").isISO8601().toDate(),
];

export default { signUp };

import { ValidationError } from "express-validator";

export const formatErrors = (errors: ValidationError[]) => {
  const result: { [key: string]: string } = {};

  errors.forEach((error) => {
    result[error.param] = error.msg;
  });

  return result;
};

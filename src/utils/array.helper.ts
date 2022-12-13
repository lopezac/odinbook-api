import { ValidationError } from "express-validator";

type ModelType = {
  users: string[];
};

export const formatErrors = (errors: ValidationError[]) => {
  const result: { [key: string]: string } = {};

  errors.forEach((error) => {
    result[error.param] = error.msg;
  });

  return result;
};

export const flattenFilterUsers = (array: ModelType[], filter: string) => {
  const flattened = array.reduce(
    (arr, value) => arr.concat(value.users),
    [] as any[]
  );
  const filtered = flattened.filter((user) => user.toString() !== filter);

  return filtered;
};

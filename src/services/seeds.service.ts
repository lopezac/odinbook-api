import { faker } from "@faker-js/faker/locale/es";
import { UserType } from "../types/user.types";
import User from "../models/user.model";

const users: UserType[] = [];

const createRandomUser = (): UserType => {
  const genders = ["male", "female"];
  const randomNum = Math.floor(Math.random() * genders.length);

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    birthday: faker.date.birthdate(),
    gender: genders[randomNum],
    picture: faker.image.avatar(),
  };
};

export const createFakeUsers = () => {
  console.log("createfakeusers");
  Array.from({ length: 10 }).forEach(async () => {
    await User.create(createRandomUser());
  });
};

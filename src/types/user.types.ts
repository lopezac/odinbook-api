export type UserType = {
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password: string;
  gender: string;
  _id?: string;
};

export type UserLogin = { email: string; password: string };

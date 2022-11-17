export type UserType = {
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password?: string;
  gender: string;
  _id?: string;
  facebookID?: string;
  picture?: string;
};

export type FBUser = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  picture: { data: { url: string } };
};

export type UserLogin = { email: string; password: string };

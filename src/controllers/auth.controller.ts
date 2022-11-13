import { Request, Response } from "express";

type User = {
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password: string;
  gender: boolean;
};

const sign_up_post = async (req: Request, res: Response) => {
  // const hashedPassword = hashPassword();
  const data: User = req.body;
  const user = await createUser(req.body);
};

export default {
  sign_up_post,
};

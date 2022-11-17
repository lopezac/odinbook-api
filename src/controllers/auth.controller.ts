import type { Request, Response } from "express";
import type { UserType } from "../types/user.types";
import { createUser } from "../services/user.service";
import { createToken, hashPassword } from "../services/auth.service";

const signUpPost = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, birthday, gender, password } =
      req.body as UserType;
    if (!password) return;
    const hashedPassword = await hashPassword(password);
    if (hashedPassword instanceof Error) return;
    const user = await createUser({
      firstName,
      lastName,
      email,
      birthday,
      gender,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Error at signUpPost controller auth", error });
  }
};

const signInPost = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const token = await createToken(user);
    return res.json({ token });
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Error at signInPost controller auth", error });
  }
};

const signOutPost = async (req: Request, res: Response) => {
  try {
    delete req.user;
    delete req.headers.authorization;
    return res.json("Succesfully signed out");
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Error at signOutPost controller auth", error });
  }
};

export default { signInPost, signUpPost, signOutPost };

import type { Request, Response } from "express";
import type { UserType } from "../types/user.types";
import UserService from "../services/user.service";
import { createToken, hashPassword } from "../services/auth.service";

const signUpPost = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, birthday, gender, password } =
      req.body as UserType;
    if (!password) return;

    const hashedPassword = await hashPassword(password);
    if (hashedPassword instanceof Error) return;

    await UserService.createUser({
      firstName,
      lastName,
      email,
      birthday,
      gender,
      password: hashedPassword,
    });

    return res.json({ message: "Success creating user" });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at signUpPost controller auth", err });
  }
};

const signInPost = async (req: Request, res: Response) => {
  try {
    const userLogin = req.body;
    const user = await UserService.getUserByEmail(userLogin.email);
    console.log("user at signInPost", user);

    const token = await createToken(userLogin);

    return res.json({ data: user, token });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at signInPost controller auth", err });
  }
};

const signOutPost = async (req: Request, res: Response) => {
  try {
    delete req.user;
    delete req.headers.authorization;
    return res.json("Succesfully signed out");
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at signOutPost controller auth", err });
  }
};

export default { signInPost, signUpPost, signOutPost };

import type { Request, Response } from "express";
import type { UserType } from "../types/user.types";
import { createUser } from "../services/user.service";
import { hashPassword } from "../services/auth.service";

export const signUpPost = async (req: Request, res: Response) => {
  try {
    const hashedPassword = hashPassword();
    const userData: UserType = req.body;
    console.log("run", userData);
    const user = await createUser(userData);
    console.log("after", user);
    return res.json(user);
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Error at signUpPost controller auth", error });
  }
};

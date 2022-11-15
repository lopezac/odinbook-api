import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserType } from "types/user.types";

export async function hashPassword(password: string) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    return new Error("Error creating the hashed password at auth service");
  }
}

export async function createToken(user: UserType) {
  try {
    return await jwt.sign(user, process.env.JWT_KEY);
  } catch (error) {
    return new Error("Error creating token at auth service");
  }
}

import { Request, Response } from "express";

async function posts_get(req: Request, res: Response) {
  try {
    return;
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at posts_get, post controller", err });
  }
}

export default { posts_get };

import { Request, Response } from "express";
import { Query } from "types/request.types";
import { getUsers } from "../services/user.service";
import { getQueryParams } from "../utils/query.helper";

async function users_get(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);
    const users = await getUsers(query);
    return res.json(users);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at getUsers, user controller", err });
  }
}

export default { users_get };

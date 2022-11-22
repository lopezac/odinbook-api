import { Request, Response } from "express";

async function messages_post(req: Request, res: Response) {
  try {
    return res.json({});
  } catch (err) {
    return res.status(503).json({ message: "Error at messages_post, chat controller", err });
  }
}

async function messages_id_delete(req: Request, res: Response) {
  try {
    return res.json({});
  } catch (err) {
    return res.status(503).json({ message: "Error at messages_id_delete, chat controller", err });
  }
}

export default { messages_post, messages_id_delete };

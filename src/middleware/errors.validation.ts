import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validationErrors(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      message: "There are errors in validation",
      errors: result.array(),
      data: req.body,
    });
  }
  next();
}

export default validationErrors;

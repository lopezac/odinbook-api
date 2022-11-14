import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "There are errors in validation",
      errors,
    });
  }
  next();
}

export default validationErrors;

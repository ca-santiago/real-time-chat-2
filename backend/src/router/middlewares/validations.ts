import express from 'express';
import { validationResult } from "express-validator";
import tokenService from "../../services/token";
import { saveUserId } from "../controllers/helpers";

export type AppMiddleware = (req: express. Request, res: express.Response, next: express.NextFunction) => express.Response | void;

export const validateBody: AppMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  next();
};

export const validateToken:AppMiddleware = (req, res, next) => {
  try {
    const token = req.header("x-session-token") || '';
    const tokenPayload = tokenService.verifyToken(token) as any;
    if (!tokenPayload) {
      return res.status(401).end();
    }
    saveUserId(req, tokenPayload.userId);
    next();
  } catch (err) {
    // @ts-ignore
    console.log("[validate-middleware] Error validating token");
    res.status(500).end();
  }
};

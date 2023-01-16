import { Request, Response } from "express";
export type AppController = (req: Request, res: Response) => any;
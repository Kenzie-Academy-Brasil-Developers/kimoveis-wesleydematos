import { createSessionService } from "../services/session/createSession.service";
import { Request, Response } from "express";

export const createSessionController = async (req: Request, res: Response) => {
  const data = await createSessionService(req.body);
  return res.status(200).json(data);
};

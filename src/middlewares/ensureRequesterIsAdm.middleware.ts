import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/userEntity";
import { AppError } from "../errors/AppError";

export const ensureRequesterIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({
    id: String(req.requesterId),
  });

  if (!foundUser?.isAdm) {
    throw new AppError("missing admin permissions", 403);
  }

  return next();
};

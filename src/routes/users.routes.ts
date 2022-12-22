import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import { ensureAuthMiddleWare } from "../middlewares/ensureAuth.middleware";
import { ensureRequesterIsAdmMiddleware } from "../middlewares/ensureRequesterIsAdm.middleware";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleWare,
  ensureRequesterIsAdmMiddleware,
  listUsersController
);
userRoutes.patch("/:id", ensureAuthMiddleWare, updateUserController);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleWare,
  ensureRequesterIsAdmMiddleware,
  deleteUserController
);

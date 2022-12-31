import { Router } from "express";
import {
  createScheduleController,
  listSchedulesByPropertyIdController,
} from "../controllers/schedules.controllers";
import { ensureAuthMiddleWare } from "../middlewares/ensureAuth.middleware";
import { ensureRequesterIsAdmMiddleware } from "../middlewares/ensureRequesterIsAdm.middleware";

export const schedulesRoutes = Router();

schedulesRoutes.post("", ensureAuthMiddleWare, createScheduleController);
schedulesRoutes.get(
  "/properties/:id",
  ensureAuthMiddleWare,
  ensureRequesterIsAdmMiddleware,
  listSchedulesByPropertyIdController
);

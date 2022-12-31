import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controllers";
import { ensureAuthMiddleWare } from "../middlewares/ensureAuth.middleware";
import { ensureRequesterIsAdmMiddleware } from "../middlewares/ensureRequesterIsAdm.middleware";

export const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  ensureAuthMiddleWare,
  ensureRequesterIsAdmMiddleware,
  createPropertyController
);
propertiesRoutes.get("", listPropertiesController);

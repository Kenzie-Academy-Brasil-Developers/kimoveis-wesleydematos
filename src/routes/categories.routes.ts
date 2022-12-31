import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listCategoryWithPropertyByIdController,
} from "../controllers/categories.controllers";
import { ensureAuthMiddleWare } from "../middlewares/ensureAuth.middleware";
import { ensureRequesterIsAdmMiddleware } from "../middlewares/ensureRequesterIsAdm.middleware";

export const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleWare,
  ensureRequesterIsAdmMiddleware,
  createCategoryController
);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/properties", listCategoryWithPropertyByIdController);

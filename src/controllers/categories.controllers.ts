import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listCategoryWithPropertyByIdService from "../services/categories/listCategoryWithPropertyById.service";

const createCategoryController = async (req: Request, res: Response) => {
  const categoryBody: ICategoryRequest = req.body;
  const data = await createCategoryService(categoryBody);

  return res.status(201).json(data);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const data = await listCategoriesService();

  return res.json(data);
};

const listCategoryWithPropertyByIdController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const data = await listCategoryWithPropertyByIdService(id);
  return res.json(data);
};

export {
  createCategoryController,
  listCategoriesController,
  listCategoryWithPropertyByIdController,
};

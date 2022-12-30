import AppDataSource from "../../data-source";
import { Category } from "../../entities/categoriesEntity";
import { AppError } from "../../errors/AppError";

const listCategoryWithPropertyByIdService = async (idCategory: string) => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const category = await categoriesRepository.findOne({
    where: {
      id: idCategory,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found!", 404);
  }

  return category;
};

export default listCategoryWithPropertyByIdService;

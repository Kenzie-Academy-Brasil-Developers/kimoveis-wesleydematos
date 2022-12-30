import AppDataSource from "../../data-source";
import { Category } from "../../entities/categoriesEntity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async (categoryBody: ICategoryRequest) => {
  const categoriesRepository = AppDataSource.getRepository(Category);
  const categoryExists = await categoriesRepository.findOneBy({
    name: categoryBody.name,
  });

  if (categoryExists) {
    throw new AppError("Category already exists!", 409);
  }

  const category = categoriesRepository.create(categoryBody);

  await categoriesRepository.save(category);

  return category;
};

export default createCategoryService;

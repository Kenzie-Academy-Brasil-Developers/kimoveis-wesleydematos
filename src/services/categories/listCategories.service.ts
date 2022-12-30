import AppDataSource from "../../data-source";
import { Category } from "../../entities/categoriesEntity";

const listCategoriesService = async () => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const categories = await categoriesRepository.find();

  return categories;
};

export default listCategoriesService;

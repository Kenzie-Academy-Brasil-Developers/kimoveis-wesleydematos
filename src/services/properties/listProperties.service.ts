import AppDataSource from "../../data-source";
import { Property } from "../../entities/propertiesEntity";

const listPropertiesService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Property);
  const properties = await propertiesRepository.find();

  return properties;
};

export default listPropertiesService;

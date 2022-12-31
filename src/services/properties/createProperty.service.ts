import AppDataSource from "../../data-source";
import { IPropertyRequest } from "../../interfaces/properties";
import { Property } from "../../entities/propertiesEntity";
import { Category } from "../../entities/categoriesEntity";
import { Address } from "../../entities/adressEntity";
import { AppError } from "../../errors/AppError";

const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  if (address.state.length > 2) {
    throw new AppError("Maximum state length is 2 characters!");
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Maximum zip code length is 8 characters!");
  }

  const categoryRepository = AppDataSource.getRepository(Category);
  const addressRepository = AppDataSource.getRepository(Address);
  const propertyRepository = AppDataSource.getRepository(Property);

  const categoryExists = await categoryRepository.findOneBy({
    id: categoryId,
  });

  if (!categoryExists) {
    throw new AppError("Invalid category id!", 404);
  }

  const addressAlreadyExists = await addressRepository.findOne({
    where: {
      district: address.district,
    },
  });

  if (addressAlreadyExists) {
    throw new AppError(
      "There is already a property with the same address!",
      409
    );
  }

  const newAdress = addressRepository.create({
    city: address.city,
    district: address.district,
    number: address.number,
    state: address.state,
    zipCode: address.zipCode,
  });

  await addressRepository.save(newAdress);

  const property = propertyRepository.create({
    value,
    size,
    address: newAdress,
    category: categoryExists,
  });

  await propertyRepository.save(property);

  return property;
};

export default createPropertyService;

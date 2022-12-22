import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { AppError } from "../../errors/AppError";

export const deleteUserService = async (id: string): Promise<{}> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user?.isActive) {
    throw new AppError("User not found", 400);
  }

  await userRepository.update(id, { isActive: false });
  return {};
};

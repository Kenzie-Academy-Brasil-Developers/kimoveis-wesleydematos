import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";

export const listUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  users.map((e: any) => delete e.password);

  return users;
};

import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { AppError } from "../../errors/AppError";
import { IUser, IUserRequest } from "../../interfaces/users";
import { userWithOutPasswordSerializer } from "../../serializers/users.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOneBy({ email: userData.email });

  if (!foundUser) {
    const user = userRepository.create(userData);
    await userRepository.save(user);

    const userWoP = await userWithOutPasswordSerializer.validate(user, {
      stripUnknown: true,
    });

    return userWoP;
  }

  throw new AppError("User already exists!", 409);
};

export default createUserService;

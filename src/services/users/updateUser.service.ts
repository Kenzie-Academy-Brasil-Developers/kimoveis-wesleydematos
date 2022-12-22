import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { AppError } from "../../errors/AppError";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { userWithOutPasswordSerializer } from "../../serializers/users.serializers";

export const updateUserService = async (
  id: string,
  body: IUserUpdate
): Promise<IUser> => {
  const bodyKeys = Object.keys(body);

  if (
    bodyKeys.includes("isAdm") ||
    bodyKeys.includes("isActive") ||
    bodyKeys.includes("id")
  ) {
    throw new AppError("Can`t update those fields", 401);
  }

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User don't exists", 404);
  }

  if (body.password) {
    body.password = hashSync(body.password, 10);
  }

  userRepository.update(user.id, { ...body });

  const userWoP = await userWithOutPasswordSerializer.validate(user, {
    stripUnknown: true,
  });

  return userWoP;
};

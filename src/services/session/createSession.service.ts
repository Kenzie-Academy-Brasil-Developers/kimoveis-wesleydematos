import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/AppError";

export const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<{ token: string }> => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ email: email });

  if (!foundUser) {
    throw new AppError("User or password invalid!", 403);
  }

  const passwordMatch = await compare(password, foundUser.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid!", 403);
  }

  if (!foundUser.isActive) {
    throw new AppError("Inactive User");
  }

  const token = jwt.sign({ foundUser: foundUser }, process.env.SECRET_KEY!, {
    subject: String(foundUser.id),
    expiresIn: "24h",
  });

  return { token: token };
};

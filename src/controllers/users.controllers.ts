import { Request, Response } from "express";
import { User } from "../entities/userEntity";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const data = await createUserService(userData);

  return res.status(201).json(data);
};

const listUsersController = async (req: Request, res: Response) => {
  const data: User[] = await listUsersService();

  return res.json(data);
};

const updateUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const userData: IUserUpdate = req.body;
  const data = await updateUserService(userId, userData);
  return res.json(data);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const data = await deleteUserService(userId);
  return res.status(204).json(data);
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};

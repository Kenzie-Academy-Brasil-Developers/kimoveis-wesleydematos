import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser } from "../interfaces/users";

const userWithOutPasswordSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required(),
});

export { userWithOutPasswordSerializer };

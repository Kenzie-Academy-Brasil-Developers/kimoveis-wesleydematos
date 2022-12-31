import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/properties/createProperty.service";
import listPropertiesService from "../services/properties/listProperties.service";

const createPropertyController = async (req: Request, res: Response) => {
  const propertyData: IPropertyRequest = req.body;
  const data = await createPropertyService(propertyData);
  return res.status(201).json(data);
};

const listPropertiesController = async (req: Request, res: Response) => {
  const data = await listPropertiesService();
  return res.json(data);
};

export { createPropertyController, listPropertiesController };

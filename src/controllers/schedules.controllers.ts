import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/schedules/createSchedule.service";
import listSchedulesByPropertyIdService from "../services/schedules/listSchedulesByPropertyId.service";

const createScheduleController = async (req: Request, res: Response) => {
  const scheduleData: IScheduleRequest = req.body;
  const id = req.requesterId;
  const data = await createScheduleService(scheduleData, id);
  return res.status(201).json({
    message: data,
  });
};

const listSchedulesByPropertyIdController = async (
  req: Request,
  res: Response
) => {
  const propertyId: string = req.params.id;
  const data = await listSchedulesByPropertyIdService(propertyId);
  return res.json({ schedules: data });
};

export { createScheduleController, listSchedulesByPropertyIdController };

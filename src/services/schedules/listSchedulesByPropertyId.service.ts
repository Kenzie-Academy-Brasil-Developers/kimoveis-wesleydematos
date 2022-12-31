import AppDataSource from "../../data-source";
import { Property } from "../../entities/propertiesEntity";
import { Schedules } from "../../entities/schedulesEntity";
import { AppError } from "../../errors/AppError";

const listSchedulesByPropertyIdService = async (propertyId: string) => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(Schedules);

  const propertyExists = await propertyRepository.findOneBy({
    id: propertyId,
  });

  if (!propertyExists) {
    throw new AppError("Property do not exist", 404);
  }

  const scheduledVisits = await scheduleRepository.find({
    where: {
      property: {
        id: propertyExists.id,
      },
    },
    relations: {
      user: true,
    },
  });

  console.log(scheduledVisits);

  return scheduledVisits;
};

export default listSchedulesByPropertyIdService;

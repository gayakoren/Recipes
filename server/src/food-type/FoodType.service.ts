import { AppDataSource } from '../data-source';
import { FoodType } from './FoodType.entity';

const foodTypeRepo = AppDataSource.getRepository(FoodType);

export const createFoodType = (type: string): Promise<FoodType> => {
  const newFoodType = foodTypeRepo.create({ type });
  return foodTypeRepo.save(newFoodType);
};

export const getFoodTypes = (): Promise<FoodType[]> => {
  return foodTypeRepo.find();
};

export const getFoodTypeById = (id: string): Promise<FoodType | null> => {
  return foodTypeRepo.findOneBy({ uuid: id });
};
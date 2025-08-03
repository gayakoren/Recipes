import { AppDataSource } from '../data-source';
import { FoodRestriction } from './FoodRestriction.entity';

const foodRestrictionRepo = AppDataSource.getRepository(FoodRestriction);

export const createFoodRestriction = (restriction: string): Promise<FoodRestriction> => {
  const newFoodRestriction = foodRestrictionRepo.create({ restriction });
  return foodRestrictionRepo.save(newFoodRestriction);
};

export const getFoodRestrictions = (): Promise<FoodRestriction[]> => {
  return foodRestrictionRepo.find();
};

export const getFoodRestrictionById = (id: string): Promise<FoodRestriction | null> => {
  return foodRestrictionRepo.findOneBy({ uuid: id });
};

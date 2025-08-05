import { FoodType } from '@shared/types/foodType.type';

import Api from '../../../api/api';

export const getFoodTypes = async (): Promise<FoodType[]> =>
  (await Api.get<FoodType[]>(`/food-types`)).data;

export const getFoodTypeById = async (id: string): Promise<FoodType> => 
  (await Api.get<FoodType>(`/food-types/${id}`)).data;
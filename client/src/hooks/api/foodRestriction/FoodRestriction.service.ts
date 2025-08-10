import { FoodRestriction } from '@shared/types/foodRestriction.type';

import Api from '../../../api/api';

export const getFoodRestrictions = async (): Promise<FoodRestriction[]> =>
  (await Api.get<FoodRestriction[]>(`/food-restrictions`)).data;

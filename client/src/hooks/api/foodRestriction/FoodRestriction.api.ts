import { useQuery } from '@tanstack/react-query';

import { getFoodRestrictions } from './FoodRestriction.service';

const USE_FOOD_RESTRICTIONS_KEY = 'useFoodRestrictions';

export const useGetFoodRestrictions = () =>
  useQuery({
    queryFn: () => getFoodRestrictions(),
    queryKey: [USE_FOOD_RESTRICTIONS_KEY],
    staleTime: 10 * 60 * 1000,
  });

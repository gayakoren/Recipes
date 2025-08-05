import { useQuery } from '@tanstack/react-query';

import { getFoodTypes } from './foodType.service';

const USE_FOOD_TYPES_KEY = 'useFoodTypes';

export const useGetFoodTypes = () =>
  useQuery({
    queryFn: () => getFoodTypes(),
    queryKey: [USE_FOOD_TYPES_KEY],
    staleTime: 10 * 60 * 1000,
  });

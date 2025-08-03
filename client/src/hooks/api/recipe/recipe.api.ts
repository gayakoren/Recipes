import { useQuery } from '@tanstack/react-query';

import { getRecipes } from './recipe.service';

const USE_RECIPES_KEY = 'useRecipes';

export const useGetRecipes = () =>
  useQuery({
    queryFn: () => getRecipes(),
    queryKey: [USE_RECIPES_KEY],
    staleTime: 10 * 60 * 1000,
  });

import { useMutation, useQuery } from '@tanstack/react-query';
import { Recipe } from '@shared/types/recipe.type'
import { addRecipe, getRecipes } from './recipe.service';
import { getRecipesByType } from "./recipe.service";
import { getRecipeById } from "./recipe.service";


const USE_RECIPES_KEY = 'useRecipes';
const USE_RECIPES_TYPE_KEY = 'useRecipesType';
const USE_RECIPE_ID_KEY = 'useRecipeId';

export const useGetRecipes = () =>
  useQuery<Recipe[], Error>({
    queryFn: () => getRecipes(),
    queryKey: [USE_RECIPES_KEY],
    staleTime: 10 * 60 * 1000,
  });

export const useRecipesByType = (type: string) => {
  return useQuery<Recipe[], Error>({
    queryKey: [USE_RECIPES_TYPE_KEY, type],         
    queryFn: () => getRecipesByType(type),
    enabled: !!type,                     
    staleTime: 5 * 60 * 1000,            
  });
};

export const useRecipeById = (uuid: string) => {
  return useQuery<Recipe, Error>({
    queryKey: [USE_RECIPE_ID_KEY, uuid],         
    queryFn: () => getRecipeById(uuid),
    enabled: !!uuid,                     
    staleTime: 5 * 60 * 1000,            
  });
};

export const useAddRecipe = () => {
  return useMutation({
    mutationFn: addRecipe,
  });
};
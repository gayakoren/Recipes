import { Recipe } from '@shared/types/recipe.type';
  import { CreateRecipeDto } from "@shared/types/dto/createRecipe.dto";

import Api from '../../../api/api';

export const getRecipes = async (): Promise<Recipe[]> =>
  (await Api.get<Recipe[]>(`/recipes`)).data;

export const getRecipeById = async (id: string): Promise<Recipe> => 
  (await Api.get<Recipe>(`/recipes/${id}`)).data;

export const getRecipesByType = async (type: string): Promise<Recipe[]> => 
   (await Api.get<Recipe[]>(`/recipes/type/${encodeURIComponent(type)}`)).data;
   
export const addRecipe = async (newRecipe: CreateRecipeDto) => {
  const { data } = await Api.post("/recipes", newRecipe);
  return data;
};
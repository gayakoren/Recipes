import { Recipe } from '@shared/types/recipe.type';

import Api from '../../../api/api';

export const getRecipes = async (): Promise<Recipe[]> =>
  (await Api.get<Recipe[]>(`/recipes`)).data;

export const getRecipeById = async (id: string): Promise<Recipe> => 
  (await Api.get<Recipe>(`/recipes/${id}`)).data;
import Recipe from './recipe.type';

export type FoodType = {
  type: string;
  recipes: Recipe[];
  uuid: string;
};
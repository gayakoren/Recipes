import Recipe from './recipe.type';

export type FoodRestriction = {
  restriction: string;
  recipes: Recipe[];
  uuid: string;
};
import Recipe from './recipe.type';

export interface FoodRestriction {
  restriction: string;
  recipes: Recipe[];
  uuid: string;
};

import Recipe from './recipe.type';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  recipe: Recipe;
  uuid: string;
};
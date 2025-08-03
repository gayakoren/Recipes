import Recipe from './recipe.type';

export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
  recipe: Recipe;
  uuid: string;
};
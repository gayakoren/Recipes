import Recipe from './recipe.type';

export interface FoodType {
  type: string;
  recipes: Recipe[];
  uuid: string;
  pictureUrl: string;
};
import Recipe from './recipe.type';

export interface Instruction {
  step: number;
  description: string;
  recipe: Recipe;
  uuid: string;
};
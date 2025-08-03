import Recipe from './recipe.type';

export type Instruction = {
  step: number;
  description: string;
  recipe: Recipe;
  uuid: string;
};
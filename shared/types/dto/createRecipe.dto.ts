import { DifficultyLevel } from "../../enums/difficultyLevel.enum";
import { Kosher } from "../../enums/Kosher.enum";

export interface CreateIngredientDto {
  name: string;
  amount: string;
  unit: string;
}

export interface CreateInstructionDto {
  step: number;
  description: string;
}

export interface CreateRecipeDto {
  name: string;
  workingTime: number;
  makingTime: number;
  difficultyLevel: DifficultyLevel;
  kosher: Kosher;
  pictureUrl: string;
  ingredients: CreateIngredientDto[];
  instructions: CreateInstructionDto[];
  foodTypes: { uuid: string }[];
  foodRestrictions: { uuid: string }[];
}

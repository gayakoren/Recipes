import { DifficultyLevel } from "../enums/difficultyLevel.enum";
import { Kosher } from "../enums/Kosher.enum";
import { FoodRestriction } from "./foodRestriction.type";
import { FoodType } from "./foodType.type";
import { Ingredient } from "./ingredient.type";
import { Instruction } from "./instruction.type";

export interface Recipe {
  uuid: string;
  name: string;
  workingTime: number;
  makingTime: number;
  difficultyLevel: DifficultyLevel;
  kosher: Kosher;
  pictureUrl: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  foodTypes: FoodType[];
  foodRestrictions: FoodRestriction[];
};

export default Recipe;

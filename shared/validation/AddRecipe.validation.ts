import { z as zod } from "zod";
import { DifficultyLevel } from "../enums/difficultyLevel.enum";
import { Kosher } from "../enums/Kosher.enum";

export const recipeSchema = zod.object({
  name: zod.string().min(1, "Recipe name is required"),
  workingTime: zod.number().min(1).max(600),
  makingTime: zod.number().min(1).max(600),
  difficultyLevel: zod.nativeEnum(DifficultyLevel, {
    errorMap: () => ({ message: "Please select a difficulty level" }),
  }),
  kosher: zod.nativeEnum(Kosher, {
    errorMap: () => ({ message: "Please select kosher type" }),
  }),
  foodTypes: zod.array(zod.object({ uuid: zod.string().uuid() })),
  foodRestrictions: zod.array(zod.object({ uuid: zod.string().uuid() })),
  ingredients: zod.array(
    zod.object({
      name: zod.string().min(1, "Ingredient name required"),
      amount: zod.union([zod.string(), zod.number()]),
      unit: zod.string().optional(),
    })
  ),
  instructions: zod.array(
    zod.object({
      step: zod.number(),
      description: zod.string().min(1, "Instruction required"),
    })
  ),
  pictureUrl: zod.string().url().nullable().optional(),
});

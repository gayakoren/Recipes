import zod from "zod";
import { DifficultyLevel } from "../enums/difficultyLevel.enum";
import { Kosher } from "../enums/Kosher.enum";

const arrSchame = zod.array(zod.object({ uuid: zod.string().uuid() }));

export const recipeSchema = zod.object({
  name: zod.string().min(1, "שדה זה הוא חובה"),
  workingTime: zod.number(),
  makingTime: zod.number(),
  difficultyLevel: zod.enum(DifficultyLevel)
  .refine((val) => !!val, { message: "בבקשה תבחר רמת קושי" }),
  kosher: zod.enum(Kosher)
  .refine((val) => !!val, { message: "בבקשה תבחר סוג כשרות" }),
  foodTypes: arrSchame,
  foodRestrictions: arrSchame,
  ingredients: zod.array(
    zod.object({
      name: zod.string().min(1, "שדה חובה"),
      amount: zod.union([zod.string(), zod.number()]),
      unit: zod.string().optional(),
    })
  ),
  instructions: zod.array(
    zod.object({
      step: zod.number(),
      description: zod.string().min(1, "שלב הוא שדה חובה"),
    })
  ),
  pictureUrl: zod.string().url().nullable().optional(),
});

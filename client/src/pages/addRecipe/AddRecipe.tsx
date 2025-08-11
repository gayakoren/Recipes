import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useAddRecipe } from "../../hooks/api/recipe/recipe.api";
import { DifficultyLevel } from "@shared/enums/difficultyLevel.enum";
import { Kosher } from "@shared/enums/Kosher.enum";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import FoodTypeDropdown from "../../components/foodTypeDropdown/FoodTypeDropdown";
import FoodRestrictionDropdown from "../../components/foodRestrictionDropdown/FoodRestrictionDropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema } from "@shared/validation/AddRecipe.validation"; 
import zod from "zod";
import { USE_RECIPES_KEY } from "../../hooks/api/recipe/recipe.api"

import { useForm, Controller, useFieldArray } from "react-hook-form";

type RecipeFormValues = zod.infer<typeof recipeSchema>;

const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: addRecipe, isPending } = useAddRecipe();
  const queryClient = useQueryClient();

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<RecipeFormValues>({
  resolver: zodResolver(recipeSchema),
  defaultValues: {
    name: "",
    workingTime: 1,
    makingTime: 1,
    difficultyLevel: DifficultyLevel.EASY,
    kosher: Kosher.NOT_KOSHER,
    pictureUrl: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: [{ step: 1, description: "" }],
    foodTypes: [],
    foodRestrictions: [],
  },
});

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: instructionFields,
    append: addInstruction,
    remove: removeInstruction,
  } = useFieldArray({ control, name: "instructions" });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      workingTime: Number(data.workingTime),
      makingTime: Number(data.makingTime),
      foodTypes: data.foodTypes.map((uuid: string) => ({ uuid })),
      foodRestrictions: data.foodRestrictions.map((uuid: string) => ({ uuid })),
    };

    addRecipe(payload, {
      onSuccess: () => {
        reset();
        Swal.fire({
          icon: "success",
          title: "איזה כיף",
          text: "המתכון נוסף בהצלחה.",
          timer: 2000,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries({ queryKey: [USE_RECIPES_KEY] });
        navigate("/recipes/home");
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "אופס...",
          text: "משהו השתבש במהלך העלאת המתכון.",
        });
        navigate("/recipes/home");
      },
    });
  };

  return (
    <Box p={3} maxWidth={700} mx="auto" dir="rtl">
      <Typography variant="h4" mb={3}>
        הוספת מתכון חדש
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="שם המתכון"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField label="זמן עבודה (דקות)" type="number" {...register("workingTime", { valueAsNumber: true })} error={!!errors.workingTime}
            helperText={errors.name?.message}/>

          <TextField label="זמן הכנה (דקות)" type="number" {...register("makingTime", { valueAsNumber: true })} error={!!errors.makingTime}
            helperText={errors.name?.message}/>

          <Controller
            name="foodTypes"
            control={control}
            render={({ field }) => (
              <FoodTypeDropdown
                value={field.value?.map((ft) => ft.uuid) || []}
                onChange={(uuids) => field.onChange(uuids.map((uuid) => ({ uuid })))}
              />
            )}
          />

          <Controller
            name="foodRestrictions"
            control={control}
            render={({ field }) => (
              <FoodRestrictionDropdown
                value={field.value?.map((ft) => ft.uuid) || []}
                onChange={(uuids) => field.onChange(uuids.map((uuid) => ({ uuid })))}
              />
            )}
          />

          <Controller
            name="difficultyLevel"
            control={control}
            render={({ field }) => (
              <TextField select label="רמת קושי" {...field}>
                {Object.values(DifficultyLevel).map((level) => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="kosher"
            control={control}
            render={({ field }) => (
              <TextField select label="כשרות" {...field}>
                {Object.values(Kosher).map((k) => (
                  <MenuItem key={k} value={k}>{k}</MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField label="כתובת תמונה" {...register("pictureUrl")} />

          <Typography variant="h6" mt={2}>מרכיבים</Typography>
          {ingredientFields.map((field, i) => (
            <Stack key={field.id} direction="row" spacing={1}>
              <TextField label="שם" {...register(`ingredients.${i}.name`)} />
              <TextField label="כמות" {...register(`ingredients.${i}.amount`)} />
              <TextField label="יחידה" {...register(`ingredients.${i}.unit`)} />
              <IconButton onClick={() => removeIngredient(i)}><DeleteIcon /></IconButton>
            </Stack>
          ))}
          <Button variant="outlined" onClick={() => addIngredient({ name: "", amount: "", unit: "" })}>
            הוסף מרכיב
          </Button>

          <Typography variant="h6" mt={2}>אופן ההכנה</Typography>
          {instructionFields.map((field, i) => (
            <Stack key={field.id} direction="row" spacing={1}>
              <TextField fullWidth label={`שלב ${i + 1}`} {...register(`instructions.${i}.description`)} />
              <IconButton onClick={() => removeInstruction(i)}><DeleteIcon /></IconButton>
            </Stack>
          ))}
          <Button
            variant="outlined"
            onClick={() =>
              addInstruction({
                step: instructionFields.length + 1,
                description: "",
              })
            }
          >
            הוסף שלב
          </Button>

          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "שומר..." : "שמור מתכון"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddRecipePage;

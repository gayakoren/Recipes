import React, { useState } from "react";
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
import { FoodType } from "@shared/types/foodType.type";
import { FoodRestriction } from "@shared/types/foodRestriction.type";
import { Ingredient } from "@shared/types/ingredient.type";
import { Instruction } from "@shared/types/instruction.type";
import Swal from 'sweetalert2';
import { useQueryClient } from "@tanstack/react-query";
import FoodTypeDropdown  from "../../components/foodTypeDropdown/FoodTypeDropdown"
import FoodRestrictionDropdown from "../../components/foodRestrictionDropdown/FoodRestrictionDropdown";

interface RecipeFormState {
  name: string;
  workingTime: string;
  makingTime: string;
  difficultyLevel: DifficultyLevel;
  kosher: Kosher;
  pictureUrl: string;
  ingredients: Partial<Ingredient>[];
  instructions: Partial<Instruction>[];
  foodTypes: FoodType[];
  foodRestrictions: FoodRestriction[];
}

const USE_RECIPES_KEY = 'useRecipes';

const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: addRecipe, isPending } = useAddRecipe();
  const queryClient = useQueryClient();
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [selectedFoodRestrictions, setSelectedFoodRestrictions] = useState<string[]>([]);

  const [recipe, setRecipe] = useState<RecipeFormState>({
    name: "",
    workingTime: "",
    makingTime: "",
    difficultyLevel: DifficultyLevel.EASY,
    kosher: Kosher.NOT_KOSHER,
    pictureUrl: "",
    ingredients: [
    { name: "", amount: "", unit: "" }   
    ],
    instructions: [
      { description: "" }                  
    ],
    foodTypes: [],
    foodRestrictions: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const addIngredient = () => {
    setRecipe((p) => ({
      ...p,
      ingredients: [...p.ingredients, { name: "", amount: "", unit: "" }],
    }));
  };

  const updateIngredient = (i: number, field: "name" | "amount" | "unit", value: string) => {
    const copy = [...recipe.ingredients];
    copy[i][field] = value;
    setRecipe({ ...recipe, ingredients: copy });
  };

  const removeIngredient = (i: number) => {
    const copy = [...recipe.ingredients];
    copy.splice(i, 1);
    setRecipe({ ...recipe, ingredients: copy });
  };

  const addInstruction = () => {
    setRecipe((p) => ({
      ...p,
      instructions: [...p.instructions, { step: p.instructions.length + 1, description: "" }],
    }));
  };

  const updateInstruction = (i: number, value: string) => {
    const copy = [...recipe.instructions];
    copy[i].description = value;
    setRecipe({ ...recipe, instructions: copy });
  };

  const removeInstruction = (i: number) => {
    const copy = [...recipe.instructions];
    copy.splice(i, 1);
    setRecipe({ ...recipe, instructions: copy });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: recipe.name,
      workingTime: Number(recipe.workingTime),
      makingTime: Number(recipe.makingTime),
      difficultyLevel: recipe.difficultyLevel,
      kosher: recipe.kosher,
      pictureUrl: recipe.pictureUrl,
      ingredients: recipe.ingredients.map((ing) => ({
        name: ing.name ?? "",
        amount: ing.amount ?? "",
        unit: ing.unit ?? "",
      })),
      instructions: recipe.instructions.map((ins, index) => ({
        step: ins.step ?? index + 1,
        description: ins.description ?? "",
      })),
      foodTypes: selectedFoodTypes.map((uuid) => ({ uuid })),
      foodRestrictions: selectedFoodRestrictions.map((uuid) => ({ uuid })),
    };

   addRecipe(payload, {
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'איזה כיף',
        text: 'המתכון נוסף בהצלחה.',
        timer: 2000,
        showConfirmButton: false,
      });
      
      queryClient.invalidateQueries({ queryKey: [USE_RECIPES_KEY] });
      navigate("/recipes/home");
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'אופס...',
        text: 'משהו השתבש במהלך העלאת המתכון.',
      });

      navigate("/recipes/home");
    }
  });
  };

  return (
    <Box p={3} maxWidth={700} mx="auto" dir="rtl">
      <Typography variant="h4" mb={3}>
        הוספת מתכון חדש
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="שם המתכון" name="name" value={recipe.name} onChange={handleChange} required />
          <TextField label="זמן עבודה (דקות)" name="workingTime" type="number" value={recipe.workingTime} onChange={handleChange} required />
          <TextField label="זמן הכנה (דקות)" name="makingTime" type="number" value={recipe.makingTime} onChange={handleChange} required />

          <FoodTypeDropdown
            value={selectedFoodTypes}
            onChange={setSelectedFoodTypes}
          />

          <FoodRestrictionDropdown
            value={selectedFoodRestrictions}
            onChange={setSelectedFoodRestrictions}
          />

          <TextField select label="רמת קושי" name="difficultyLevel" value={recipe.difficultyLevel} onChange={handleChange}>
            {Object.values(DifficultyLevel).map((level) => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </TextField>

          <TextField select label="כשרות" name="kosher" value={recipe.kosher} onChange={handleChange}>
            {Object.values(Kosher).map((k) => (
              <MenuItem key={k} value={k}>{k}</MenuItem>
            ))}
          </TextField>

          <TextField label="כתובת תמונה" name="pictureUrl" value={recipe.pictureUrl} onChange={handleChange} />

          <Typography variant="h6" mt={2}>מרכיבים</Typography>
          {recipe.ingredients.map((ing, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField label="שם" required value={ing.name ?? ""} onChange={(e) => updateIngredient(i, "name", e.target.value)} />
              <TextField label="כמות" required value={ing.amount ?? ""} onChange={(e) => updateIngredient(i, "amount", e.target.value)} />
              <TextField label="יחידה" required value={ing.unit ?? ""} onChange={(e) => updateIngredient(i, "unit", e.target.value)} />
              <IconButton onClick={() => removeIngredient(i)}><DeleteIcon /></IconButton>
            </Stack>
          ))}
          <Button variant="outlined" onClick={addIngredient}> הוסף מרכיב</Button>

          <Typography variant="h6" mt={2}>אופן ההכנה</Typography>
          {recipe.instructions.map((ins, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField fullWidth required label={`שלב ${i + 1}`} value={ins.description ?? ""} 
              onChange={(e) => updateInstruction(i, e.target.value)} />
              <IconButton onClick={() => removeInstruction(i)}><DeleteIcon /></IconButton>
            </Stack>
          ))}
          <Button variant="outlined" onClick={addInstruction}> הוסף שלב</Button>

          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "שומר..." : "שמור מתכון"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddRecipePage;

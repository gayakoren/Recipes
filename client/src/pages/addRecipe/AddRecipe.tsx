import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAddRecipe } from "../../hooks/api/recipe/recipe.api"; // we'll create this hook
// import { Kosher } from "@shared/enums/Kosher.enum";
import Recipe from "@shared/types/recipe.type";
// import { DifficultyLevel } from "@shared/enums/difficultyLevel.enum";

const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();

  interface RecipeFormState {
    name: string;
    workingTime: string;
    makingTime: string;
    // difficultyLevel: DifficultyLevel;
    // kosher: Kosher;
    pictureUrl: string;
  }

  const [recipe, setRecipe] = useState<RecipeFormState>({
    name: "",
    workingTime: "",
    makingTime: "",
    // difficultyLevel: DifficultyLevel.EASY,
    // kosher: Kosher.MEAT,
    pictureUrl: "",
  });

  const { mutate: addRecipe, isPending } = useAddRecipe();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Partial<Recipe> = {
    ...recipe,
    workingTime: Number(recipe.workingTime),
    makingTime: Number(recipe.makingTime),
    // difficultyLevel: recipe.difficultyLevel as DifficultyLevel,
    // kosher: recipe.kosher as Kosher,
  };

  

    addRecipe(payload, {
      onSuccess: () => navigate("/recipes"),
    });
  };

  // const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRecipe((prev) => ({
  //     ...prev,
  //     difficultyLevel: e.target.value as DifficultyLevel,
  //   }));
  // };

  // const handleKosherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRecipe((prev) => ({
  //     ...prev,
  //     kosher: e.target.value as Kosher,
  //   }));
  // };


  return (
    <Box p={3} maxWidth={600} mx="auto" dir="rtl">
      <Typography variant="h4" mb={3}>
        הוספת מתכון חדש
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="שם המתכון"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="זמן עבודה (דקות)"
            name="workingTime"
            type="number"
            value={recipe.workingTime}
            onChange={handleChange}
            required
          />
          <TextField
            label="זמן הכנה (דקות)"
            name="makingTime"
            type="number"
            value={recipe.makingTime}
            onChange={handleChange}
            required
          />
          {/* <TextField
            select
            label="רמת קושי"
            name="difficultyLevel"
            value={recipe.difficultyLevel}
            onChange={handleDifficultyChange}
          >
            {Object.values(DifficultyLevel).map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="כשרות"
            name="kosher"
            value={recipe.kosher}
            onChange={handleKosherChange}
          >
            {Object.values(Kosher).map((k) => (
              <MenuItem key={k} value={k}>
                {k}
              </MenuItem>
            ))}
          </TextField> */}
          <TextField
            label="כתובת תמונה"
            name="pictureUrl"
            value={recipe.pictureUrl}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "שומר..." : "שמור מתכון"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddRecipePage;

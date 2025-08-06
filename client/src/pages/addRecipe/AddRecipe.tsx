// import React, { useState } from "react";
// import {
//   Box, TextField, Button, MenuItem, Typography, Stack
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Kosher } from "@shared/enums/Kosher.enum";
// import { DifficultyLevel } from "@shared/enums/difficultyLevel.enum";
// import { useAddRecipe } from "../../hooks/api/recipe/recipe.api";
// import { FoodType } from "@shared/types/foodType.type";
// import { FoodRestriction } from "@shared/types/foodRestriction.type";
// import { Ingredient } from "@shared/types/ingredient.type";
// import { Instruction } from "@shared/types/instruction.type";

// const mockFoodTypes: FoodType[] = [
//   {
//     uuid: "1", type: "עוגות",
//     recipes: [],
//     pictureUrl: ""
//   },
//   {
//     uuid: "2", type: "מרקים",
//     recipes: [],
//     pictureUrl: ""
//   },
// ];
// const mockRestrictions: FoodRestriction[] = [
//   {
//     uuid: "1", restriction: "ללא גלוטן",
//     recipes: []
//   },
//   {
//     uuid: "2", restriction: "צמחוני",
//     recipes: []
//   },
// ];

// interface RecipeFormState {
//   name: string;
//   workingTime: string;
//   makingTime: string;
//   difficultyLevel: DifficultyLevel;
//   kosher: Kosher;
//   pictureUrl: string;
//   ingredients: Partial<Ingredient>[];
//   instructions: Partial<Instruction>[];
//   foodTypes: FoodType[];
//   foodRestrictions: FoodRestriction[];
// }

// const AddRecipePage: React.FC = () => {
//   const navigate = useNavigate();
//   const { mutate: addRecipe, isPending } = useAddRecipe();

//   const [recipe, setRecipe] = useState<RecipeFormState>({
//     name: "",
//     workingTime: "",
//     makingTime: "",
//     difficultyLevel: DifficultyLevel.EASY,
//     kosher: Kosher.MEAT,
//     pictureUrl: "",
//     ingredients: [],
//     instructions: [],
//     foodTypes: [],
//     foodRestrictions: [],
//   });

//   // 🔹 Handlers for basic fields
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setRecipe({ ...recipe, [e.target.name]: e.target.value });

//   const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setRecipe((prev) => ({ ...prev, difficultyLevel: e.target.value as DifficultyLevel }));

//   const handleKosherChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setRecipe((prev) => ({ ...prev, kosher: e.target.value as Kosher }));

//   // 🔹 Ingredient & Instruction handlers (same as before)
//   const addIngredient = () => setRecipe((p) => ({ ...p, ingredients: [...p.ingredients, { name: "", amount: "", unit: "" }] }));
//   const updateIngredient = (i: number, f: keyof Partial<Ingredient>, v: string) => {
//     const copy = [...recipe.ingredients]; 
//     copy[i][f] = v; 
//     setRecipe({ ...recipe, ingredients: copy });
//   };
//   const removeIngredient = (i: number) => setRecipe({ ...recipe, ingredients: recipe.ingredients.filter((_, idx) => idx !== i) });

//   const addInstruction = () => setRecipe((p) => ({ ...p, instructions: [...p.instructions, { step: p.instructions.length + 1, description: "" }] }));
//   const updateInstruction = (i: number, v: string) => {
//     const copy = [...recipe.instructions]; 
//     copy[i].description = v; 
//     setRecipe({ ...recipe, instructions: copy });
//   };
//   const removeInstruction = (i: number) => setRecipe({ ...recipe, instructions: recipe.instructions.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, step: idx + 1 })) });

//   // 🔹 Submit
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     addRecipe({
//       ...recipe,
//       workingTime: Number(recipe.workingTime),
//       makingTime: Number(recipe.makingTime),
//     }, { onSuccess: () => navigate("/recipes") });
//   };

//   return (
//     <Box p={3} maxWidth={700} mx="auto" dir="rtl">
//       <Typography variant="h4" mb={3}>הוספת מתכון חדש</Typography>

//       <form onSubmit={handleSubmit}>
//         <Stack spacing={2}>
//           {/* Basic Info */}
//           <TextField label="שם המתכון" name="name" value={recipe.name} onChange={handleChange} required />
//           <TextField label="זמן עבודה (דקות)" name="workingTime" type="number" value={recipe.workingTime} onChange={handleChange} required />
//           <TextField label="זמן הכנה (דקות)" name="makingTime" type="number" value={recipe.makingTime} onChange={handleChange} required />

//           {/* Select Enums */}
//           <TextField select label="רמת קושי" name="difficultyLevel" value={recipe.difficultyLevel} onChange={handleDifficultyChange}>
//             {Object.values(DifficultyLevel).map((lvl) => <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>)}
//           </TextField>

//           <TextField select label="כשרות" name="kosher" value={recipe.kosher} onChange={handleKosherChange}>
//             {Object.values(Kosher).map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}
//           </TextField>

//           <TextField label="כתובת תמונה" name="pictureUrl" value={recipe.pictureUrl} onChange={handleChange} />

//           {/* ✅ Multi-select FoodTypes & Restrictions */}
//           <TextField select label="סוגי מאכל" SelectProps={{ multiple: true }}
//             value={recipe.foodTypes.map((ft) => ft.uuid)}
//             onChange={(e) => {
//               const selected = e.target.value as unknown as string[];
//               setRecipe((p) => ({ ...p, foodTypes: mockFoodTypes.filter((ft) => selected.includes(ft.uuid)) }));
//             }}>
//             {mockFoodTypes.map((ft) => <MenuItem key={ft.uuid} value={ft.uuid}>{ft.type}</MenuItem>)}
//           </TextField>

//           <TextField select label="מגבלות תזונה" SelectProps={{ multiple: true }}
//             value={recipe.foodRestrictions.map((fr) => fr.uuid)}
//             onChange={(e) => {
//               const selected = e.target.value as unknown as string[];
//               setRecipe((p) => ({ ...p, foodRestrictions: mockRestrictions.filter((fr) => selected.includes(fr.uuid)) }));
//             }}>
//             {mockRestrictions.map((fr) => <MenuItem key={fr.uuid} value={fr.uuid}>{fr.restriction}</MenuItem>)}
//           </TextField>

//           {/* ✅ Ingredients Section */}
//           <Typography variant="h6">מרכיבים</Typography>
//           {recipe.ingredients.map((ing, i) => (
//             <Stack direction="row" spacing={1} key={i}>
//               <TextField label="כמות" value={ing.amount} onChange={(e) => updateIngredient(i, "amount", e.target.value)} />
//               <TextField label="יחידה" value={ing.unit} onChange={(e) => updateIngredient(i, "unit", e.target.value)} />
//               <TextField label="שם" value={ing.name} onChange={(e) => updateIngredient(i, "name", e.target.value)} />
//               <Button color="error" onClick={() => removeIngredient(i)}>X</Button>
//             </Stack>
//           ))}
//           <Button onClick={addIngredient}>➕ הוסף מרכיב</Button>

//           {/* ✅ Instructions Section */}
//           <Typography variant="h6">אופן ההכנה</Typography>
//           {recipe.instructions.map((inst, i) => (
//             <Stack direction="row" spacing={1} key={i}>
//               <TextField fullWidth label={`שלב ${i + 1}`} value={inst.description} onChange={(e) => updateInstruction(i, e.target.value)} />
//               <Button color="error" onClick={() => removeInstruction(i)}>X</Button>
//             </Stack>
//           ))}
//           <Button onClick={addInstruction}>➕ הוסף שלב</Button>

//           {/* ✅ Submit */}
//           <Button type="submit" variant="contained" disabled={isPending}>
//             {isPending ? "שומר..." : "שמור מתכון"}
//           </Button>
//         </Stack>
//       </form>
//     </Box>
//   );
// };

// export default AddRecipePage;


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

const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: addRecipe, isPending } = useAddRecipe();

  // ✅ Initial empty form state
  const [recipe, setRecipe] = useState<RecipeFormState>({
    name: "",
    workingTime: "",
    makingTime: "",
    difficultyLevel: DifficultyLevel.EASY,
    kosher: Kosher.MEAT,
    pictureUrl: "",
    ingredients: [],
    instructions: [],
    foodTypes: [],
    foodRestrictions: [],
  });

  // ✅ Generic input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // ✅ Ingredient Handlers
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

  // ✅ Instruction Handlers
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

  // ✅ Submit Handler (convert Partial to DTO)
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
      foodTypes: recipe.foodTypes,
      foodRestrictions: recipe.foodRestrictions,
    };

    addRecipe(payload, {
      onSuccess: () => navigate("/recipes"),
    });
  };

  return (
    <Box p={3} maxWidth={700} mx="auto" dir="rtl">
      <Typography variant="h4" mb={3}>
        הוספת מתכון חדש
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Basic Info */}
          <TextField label="שם המתכון" name="name" value={recipe.name} onChange={handleChange} required />
          <TextField label="זמן עבודה (דקות)" name="workingTime" type="number" value={recipe.workingTime} onChange={handleChange} required />
          <TextField label="זמן הכנה (דקות)" name="makingTime" type="number" value={recipe.makingTime} onChange={handleChange} required />

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

          {/* Ingredients Section */}
          <Typography variant="h6" mt={2}>מרכיבים</Typography>
          {recipe.ingredients.map((ing, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField label="שם" value={ing.name ?? ""} onChange={(e) => updateIngredient(i, "name", e.target.value)} />
              <TextField label="כמות" value={ing.amount ?? ""} onChange={(e) => updateIngredient(i, "amount", e.target.value)} />
              <TextField label="יחידה" value={ing.unit ?? ""} onChange={(e) => updateIngredient(i, "unit", e.target.value)} />
              <IconButton onClick={() => removeIngredient(i)}><DeleteIcon /></IconButton>
            </Stack>
          ))}
          <Button variant="outlined" onClick={addIngredient}>➕ הוסף מרכיב</Button>

          {/* Instructions Section */}
          <Typography variant="h6" mt={2}>אופן ההכנה</Typography>
          {recipe.instructions.map((ins, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField fullWidth label={`שלב ${i + 1}`} value={ins.description ?? ""} onChange={(e) => updateInstruction(i, e.target.value)} />
              <IconButton onClick={() => removeInstruction(i)}><DeleteIcon /></IconButton>
            </Stack>
          ))}
          <Button variant="outlined" onClick={addInstruction}>➕ הוסף שלב</Button>

          {/* Submit Button */}
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "שומר..." : "שמור מתכון"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddRecipePage;

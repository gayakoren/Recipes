import React from "react";
// import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "../../hooks/api/recipe/recipe.service";
import { Recipe } from "@shared/types/recipe.type";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
} from "@mui/material";

const RecipeDetailsPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); //todo
  const  id  = 'fda9433f-0818-4b49-923e-0b6966794c4d';

  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id!),
    enabled: !!id,
  });


  if (isLoading) {
    return (
      <Box p={3}>
        <Skeleton variant="rectangular" height={300} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
      </Box>
    );
  }

  if (error) return <Typography color="error">Failed to load recipe.</Typography>;
  if (!recipe) return <Typography>No recipe found.</Typography>;

  return (
    <Box p={3} maxWidth={800} mx="auto">
      <Card>
        <CardMedia 
            component="img" 
            height="300" image={
            recipe.pictureUrl ??
            "https://www.shutterstock.com/image-vector/one-line-continuous-waiter-tray-600nw-2288214767.jpg"} 
            alt={recipe.name} />
        <CardContent>
          <Typography variant="h4" gutterBottom>{recipe.name}</Typography>

          {/* Times + Difficulty + Kosher */}
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            <Chip label={`Working Time: ${recipe.workingTime} min`} color="primary" />
            <Chip label={`Making Time: ${recipe.makingTime} min`} color="info" />
            <Chip label={`Difficulty: ${recipe.difficultyLevel}`} color="secondary" />
            <Chip label={`Kosher: ${recipe.kosher}`} color="success" />
          </Stack>

          {/* Food Types and Restrictions */}
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {recipe.foodTypes.map((ft) => (
              <Chip key={ft.uuid} label={ft.type} variant="outlined" />
            ))}
            {recipe.foodRestrictions.map((fr) => (
              <Chip key={fr.uuid} label={fr.restriction} variant="outlined" color="error" />
            ))}
          </Stack>

          {/* Ingredients */}
          <Typography variant="h6">מרכיבים</Typography>
          <List>
            {recipe.ingredients.map((ing) => (
              <ListItem key={ing.uuid}>
                <ListItemText primary={`${ing.amount} ${ing.unit} ${ing.name}`} />
              </ListItem>
            ))}
          </List>

          {/* Instructions */}
          <Typography variant="h6">אופן ההכנה</Typography>
          <List>
            {recipe.instructions
              .sort((a, b) => a.step - b.step)
              .map((step) => (
                <ListItem key={step.step}>
                  <ListItemText primary={`${step.step}. ${step.description}`} />
                </ListItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetailsPage;

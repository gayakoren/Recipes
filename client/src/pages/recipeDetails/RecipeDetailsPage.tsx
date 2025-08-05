import React from "react";
import { useParams } from "react-router-dom";
import { useRecipeById } from "../../hooks/api/recipe/recipe.api"

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
import BackButton from "../../components/backButton/BackButton";

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 

  const { data: recipe, isLoading, error } = useRecipeById(id?? "");


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
    <div>
      <BackButton/>
      <Box p={3} maxWidth={800} mx="auto" dir="rtl">
        <Card>
          <CardMedia 
              component="img" 
              height="300" image={
              recipe.pictureUrl ??
              "https://www.shutterstock.com/image-vector/one-line-continuous-waiter-tray-600nw-2288214767.jpg"} 
              alt={recipe.name} />
          <CardContent>
            <Typography variant="h4" gutterBottom>{recipe.name}</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
              <Chip label={`זמן עבודה: ${recipe.workingTime} דקות`} color="primary" />
              <Chip label={`זמן הכנה: ${recipe.makingTime} דקות`} color="info" />
              <Chip label={`רמת קושי: ${recipe.difficultyLevel}`} color="secondary" />
              <Chip label={`כשרות: ${recipe.kosher}`} color="success" />
            </Stack>

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
                <ListItem key={ing.uuid} sx={{ display: "block", textAlign: "right" }}>
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
                  <ListItem key={step.step} sx={{ display: "block", textAlign: "right" }}>
                    <ListItemText primary={`${step.step}. ${step.description}`} />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default RecipeDetailsPage;

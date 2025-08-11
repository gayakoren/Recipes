import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipesByType } from "../../hooks/api/recipe/recipe.api";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import RecipeCardSkeleton from "../../components/recipeCard/RecipeCardSkeleton";
import BackButton from "../../components/backButton/BackButton";

const RecipesPage: React.FC = () => {
  const { foodTypeUuid } = useParams<{ foodTypeUuid: string }>();
  const navigate = useNavigate();

  const { data: recipes, isLoading, error } = useRecipesByType(foodTypeUuid ?? "");

  const handleView = (id: string) => {
    navigate(`/recipes/${encodeURIComponent(id)}`);
  };

  if (error) return <p>Failed to load recipes.</p>;

return (
    <Box p={3}>
      <BackButton/>
      {isLoading ? (
        <Grid container spacing={2} justifyContent="flex-end">
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={i}>
              <RecipeCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : recipes && recipes.length === 0 ? (
        <p>לא נמצאו מתכונים לקטגוריה זו</p>
      ) : (
        <Grid container spacing={2} justifyContent="flex-end">
          {recipes?.map((recipe) => (
            <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={recipe.uuid}>
              <RecipeCard recipe={recipe} onView={handleView} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecipesPage;
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useGetRecipes } from "../../hooks/api/recipe/recipe.api";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import RecipeCardSkeleton from "../../components/recipeCard/RecipeCardSkeleton";

const RecipesPage: React.FC = () => {
  const { data: recipes, isLoading, error } = useGetRecipes();

  const handleView = (id: string) => {
    alert(`View recipe with ID: ${id}`);
  };

  if (error) return <p>Failed to load recipes.</p>;

return (
    <Box p={3}>
      <Grid container spacing={2}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={i}>
                <RecipeCardSkeleton />
              </Grid>
            ))
          : recipes?.map((recipe) => (
              <Grid  size={{ xs:12, sm:6, md:4, lg:3 }} key={recipe.uuid}>
                <RecipeCard recipe={recipe} onView={handleView} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default RecipesPage;
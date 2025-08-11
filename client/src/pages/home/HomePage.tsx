import React, { useState } from "react";
import { useGetFoodTypes } from "../../hooks/api/foodType/foodType.api";
import { Grid, Container, CircularProgress, Typography } from "@mui/material";
import FoodTypeCard from "../../components/foodTypeCard/FoodTypeCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import { useGetRecipes } from "../../hooks/api/recipe/recipe.api";
import RecipeCardSkeleton from "../../components/recipeCard/RecipeCardSkeleton";
import RecipeCard from "../../components/recipeCard/RecipeCard";

const HomePage: React.FC = () => {
  const { data: foodTypes, isLoading, error } = useGetFoodTypes();
  const { data: recipes, isLoading: loadingRecipes } = useGetRecipes();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleCardClick = (typeUuid: string) => {
    navigate(`/recipes/type/${encodeURIComponent(typeUuid)}`);
  };
  
  const filteredRecipes =
    searchTerm.trim() === ""
      ? []
      : recipes?.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
  
  const handleView = (id: string) => {
    navigate(`/recipes/${encodeURIComponent(id)}`);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Failed to load recipes.</p>;

  return (
    
    <Container sx={{ mt: 4 }} dir="rtl">
      <SearchBar onSearch={setSearchTerm}/>
       
       {searchTerm === "" ? (
        <Grid container spacing={2} justifyContent="flex-start">
          {foodTypes?.map((type) => (
          <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={type.uuid} onClick={() => handleCardClick(type.uuid)}> 
            <FoodTypeCard name={type.type} image={type.pictureUrl} /> 
          </Grid>
        ))}
        </Grid>
      ) : (
        <Grid container spacing={-2} mt={-20} justifyContent="flex-start">
          {loadingRecipes ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={i}>
                <RecipeCardSkeleton />
              </Grid>
            ))
          ) : filteredRecipes.length === 0 ? (
            <Typography>לא נמצאו מתכונים</Typography>
          ) : (
            filteredRecipes.map((recipe) => (
              <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={recipe.uuid}>
              <RecipeCard recipe={recipe} onView={handleView} />
            </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;

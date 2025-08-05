import React from "react"
import { useGetFoodTypes } from "../../hooks/api/foodType/foodType.api"
import { Grid, Container, CircularProgress } from "@mui/material";
import FoodTypeCard from "../../components/foodTypeCard/FoodTypeCard";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { data: foodTypes, isLoading, error } = useGetFoodTypes();
  const navigate = useNavigate();

  const handleCardClick = (typeUuid: string) => {
    navigate(`/recipes/type/${encodeURIComponent(typeUuid)}`);
  };
  
  if (isLoading) return <CircularProgress />;
  if (error) return <p>Failed to load recipes.</p>;

  return (
    
    <Container sx={{ mt: 4 }} dir="rtl">
      <Grid container spacing={2} justifyContent="center">
        {foodTypes?.map((type) => (
          <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={type.uuid} onClick={() => handleCardClick(type.uuid)}> 
            <FoodTypeCard name={type.type} image={type.pictureUrl} /> 
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;

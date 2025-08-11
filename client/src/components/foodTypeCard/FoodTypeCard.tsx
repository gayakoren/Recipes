import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface FoodTypeCardProps {
  name: string;
  image: string;
}

const FoodTypeCard: React.FC<FoodTypeCardProps> = ({ name, image }) => {
  return (
    <Card sx={{ maxWidth: 300, m: 1, cursor: "pointer" }}>
      <CardMedia component="img" height="180" image={image} alt={name} />
      <CardContent>
        <Typography variant="h6" align="center">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default FoodTypeCard;

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export interface Recipe {
  uuid: string;
  name: string;
  pictureUrl: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onView?: (id: string) => void; // optional callback when clicking "View"
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="180"
        image={
            recipe.pictureUrl ??
            "https://www.shutterstock.com/image-vector/one-line-continuous-waiter-tray-600nw-2288214767.jpg"} 
            alt={recipe.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {recipe.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onView?.(recipe.uuid)}>
          View Recipe
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;

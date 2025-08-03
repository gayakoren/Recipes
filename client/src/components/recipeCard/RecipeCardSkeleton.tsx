import React from "react";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";

const RecipeCardSkeleton: React.FC = () => (
  <Card sx={{ maxWidth: 300, m: 1 }}>
    <Skeleton variant="rectangular" height={180} />
    <CardContent>
      <Skeleton width="60%" />
      <Skeleton width="80%" />
    </CardContent>
  </Card>
);

export default RecipeCardSkeleton;

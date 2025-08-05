import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        top: (theme) => theme.spacing(9),
        right: (theme) => theme.spacing(4),
        zIndex: 1000,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        חזור
      </Button>
    </Box>
  );
};

export default BackButton;
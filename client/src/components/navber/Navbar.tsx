// src/components/Navbar.tsx
import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { Link as RouterLink } from "react-router-dom"
// import { BASE_PATH, HOME_BASE_PATH } from "../../router/routes.const";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          מתכונים
        </Typography>

        <Box>
          <Button color="inherit" component={RouterLink} to="/addRecipe">
            הוספת מתכון
          </Button>
          <Button color="inherit" component={RouterLink} to="/searchRecipe">
            חיפוש
          </Button>
          <Button color="inherit" component={RouterLink} to="/">
            בית
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

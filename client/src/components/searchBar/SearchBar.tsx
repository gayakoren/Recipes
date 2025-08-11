import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    onSearch(term);
  };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);
  }; 

  return (
    <Box sx={{ display: "flex", ml: 5, mb: 20 }}>
      <IconButton color="primary" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <TextField
        variant="outlined"
        size="small"
        value={term}
        onChange={handleChange}
        sx={{ flex: 1 }}
      />
    </Box>
  );
};

export default SearchBar;

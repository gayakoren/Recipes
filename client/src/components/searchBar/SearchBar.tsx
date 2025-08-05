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

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }} dir="rtl">
      <TextField
        label="חפש מתכון"
        variant="outlined"
        size="small"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        sx={{ flex: 1 }}
      />
      <IconButton color="primary" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;

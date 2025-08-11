import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useGetFoodRestrictions } from "../../hooks/api/foodRestriction/FoodRestriction.api";
import { FoodRestriction } from "@shared/types/foodRestriction.type";

interface FoodRestrictionDropdownProps {
  value: string[];              // array of selected UUID strings
  onChange: (value: string[]) => void;
}

const FoodRestrictionDropdown: React.FC<FoodRestrictionDropdownProps> = ({ value, onChange }) => {
  const { data: foodRestrictions } = useGetFoodRestrictions();

  const handleChange = (event: any) => {
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth required>
      <InputLabel id="food-restriction-label">הגבלות מזון</InputLabel>
      <Select
        labelId="food-restriction-label"
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) =>
          foodRestrictions
            ?.filter((fr) => selected.includes(fr.uuid))
            .map((fr) => fr.restriction) 
            .join(", ")
        }
      >
        {foodRestrictions?.map((fr) => (
          <MenuItem key={fr.uuid} value={fr.uuid}>
            {fr.restriction}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FoodRestrictionDropdown;

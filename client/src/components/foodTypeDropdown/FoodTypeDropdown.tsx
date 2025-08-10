import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useGetFoodTypes } from "../../hooks/api/foodType/foodType.api";

interface FoodTypeDropdownProps {
  value: string[];                // array of selected UUIDs
  onChange: (value: string[]) => void;
}

const FoodTypeDropdown: React.FC<FoodTypeDropdownProps> = ({ value, onChange }) => {
  const { data: foodTypes } = useGetFoodTypes();

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement> | (Event & { target: { value: string[]; name: string; } })) => {
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth required>
      <InputLabel id="food-type-label">קטגוריה</InputLabel>
      <Select
        labelId="food-type-label"
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) =>
          foodTypes
            ?.filter((ft) => selected.includes(ft.uuid))
            .map((ft) => ft.type)
            .join(", ")
        }
      >
        {foodTypes?.map((ft) => (
          <MenuItem key={ft.uuid} value={ft.uuid}>
            {ft.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


export default FoodTypeDropdown;

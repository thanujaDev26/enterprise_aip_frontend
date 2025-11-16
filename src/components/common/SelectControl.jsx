import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function SelectControl({ label, name, value, onChange, options = [], ...rest }) {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      size="small"
      {...rest}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </MenuItem>
      ))}
    </TextField>
  );
}

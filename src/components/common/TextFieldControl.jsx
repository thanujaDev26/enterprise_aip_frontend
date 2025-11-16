import React from 'react';
import TextField from '@mui/material/TextField';

export default function TextFieldControl({ label, value, onChange, name, type = 'text', ...rest }) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      fullWidth
      variant="outlined"
      size="small"
      {...rest}
    />
  );
}

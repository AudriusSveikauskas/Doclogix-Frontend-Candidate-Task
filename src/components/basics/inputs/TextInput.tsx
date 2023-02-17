import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

type TextInputElProps = {
  id: string;
  label: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
};

const TextInput: React.FC<TextInputElProps> = ({
  id,
  label,
  value,
  onChange,
}) => (
  <FormControl variant="outlined">
    <InputLabel htmlFor={id}>Username</InputLabel>
    <OutlinedInput
      id={id}
      type="text"
      label={label}
      value={value}
      onChange={onChange}
    />
  </FormControl>
);

export default TextInput;

import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

type OtherFileSelectProps = {
  otherFormat: string;
  handleSelectChange: (event: SelectChangeEvent) => void;
};

const OtherFileSelect: React.FC<OtherFileSelectProps> = ({
  otherFormat,
  handleSelectChange,
}) => (
  <FormControl sx={{ m: 1, minWidth: 120 }}>
    <Select
      value={otherFormat}
      onChange={handleSelectChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem value="">
        <em>Other formats</em>
      </MenuItem>
      <MenuItem value="png">PNG</MenuItem>
      <MenuItem value="jpg">JPG</MenuItem>
      <MenuItem value="gif">GIF</MenuItem>
    </Select>
  </FormControl>
);

export default OtherFileSelect;

import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fileActions } from '../../store/file/file';
import OtherFileSelect from '../basics/selects/OtherFileSelect';

const TypeOfDocument = () => {
  const [otherFormat, setOtherFormat] = useState('');

  const dispatch = useDispatch();

  const showFilesType = useSelector<RootState, string>(
    (state) => state.file.showFilesType,
  );

  const setShowFilesType = (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    if (typeof event === 'string') {
      dispatch(fileActions.setShowFilesType(event));
    } else {
      dispatch(
        fileActions.setShowFilesType((event.target as HTMLInputElement).value),
      );
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setOtherFormat(event.target.value);
  };

  useEffect(() => {
    setShowFilesType(otherFormat);
  }, [otherFormat]);

  return (
    <Paper elevation={2} sx={{ padding: '20px', borderRadius: '10px' }}>
      <Typography sx={{ mb: 2 }}>Type of Document</Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={showFilesType}
          onChange={setShowFilesType}
        >
          <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
          <FormControlLabel
            value={otherFormat}
            control={<Radio />}
            label={
              <OtherFileSelect
                otherFormat={otherFormat}
                handleSelectChange={handleSelectChange}
              />
            }
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default TypeOfDocument;

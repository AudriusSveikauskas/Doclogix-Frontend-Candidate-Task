import React from 'react';
import { Box, Typography } from '@mui/material';
import UnderConstructionImg from '../assets/under-construction.gif';

const FakePage = () => (
  <Box sx={{ position: 'relative' }}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
        textAlign: 'center',
      }}
    >
      <img src={UnderConstructionImg} alt="Under Construction" />
      <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
        Page Under Construction
      </Typography>
    </Box>
  </Box>
);

export default FakePage;

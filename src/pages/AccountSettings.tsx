import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { RootState } from '../store/store';

const AccountSettings = () => {
  const [userData, setUserData] = useState({});

  const userId = useSelector<RootState, number>((state) => state.user.userId);

  useEffect(() => {
    if (userId !== -1) {
      fetch(`https://dummyjson.com/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [userId]);

  return (
    <Box>
      <Typography sx={{ marginBottom: 2, fontSize: '20px', fontWeight: '600' }}>
        Fetched User Data:
      </Typography>
      <ReactJson src={userData} />
    </Box>
  );
};

export default AccountSettings;

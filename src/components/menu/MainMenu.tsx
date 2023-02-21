import React from 'react';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import CircleIcon from '@mui/icons-material/Circle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import { RootState } from '../../store/store';

const MainMenu = () => {
  const isDrawerOpen = useSelector<RootState, boolean>(
    (state) => state.menu.isDrawerOpen,
  );

  return (
    <Box>
      <List>
        <MenuItem title="Upload">
          <HomeIcon />
        </MenuItem>

        <MenuItem title="Documents">
          <DescriptionIcon />
        </MenuItem>

        <Box sx={{ display: `${isDrawerOpen ? 'block' : 'none'}` }}>
          <MenuItem title="Inbox">
            <CircleIcon
              sx={{ width: '10px', height: '10px', marginLeft: '50px' }}
            />
          </MenuItem>

          <MenuItem title="Sent">
            <CircleIcon
              sx={{ width: '10px', height: '10px', marginLeft: '50px' }}
            />
          </MenuItem>

          <MenuItem title="Drafts">
            <CircleIcon
              sx={{ width: '10px', height: '10px', marginLeft: '50px' }}
            />
          </MenuItem>
        </Box>

        <Divider />

        <MenuItem title="Account settings">
          <SettingsIcon />
        </MenuItem>

        <MenuItem title="Sign out">
          <LogoutIcon />
        </MenuItem>
      </List>
    </Box>
  );
};
export default MainMenu;

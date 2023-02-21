import React, { ReactNode } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { RootState } from '../../store/store';
import { menuActions } from '../../store/menu/menu';

type MenuItemProps = {
  title: string;
  children: ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ title, children }) => {
  const dispatch = useDispatch();

  const isDrawerOpen = useSelector<RootState, boolean>(
    (state) => state.menu.isDrawerOpen,
  );

  const selectedTab = useSelector<RootState, string>(
    (state) => state.menu.selectedTab,
  );

  const setSelectedTab = () => {
    dispatch(menuActions.setSelectedTab(title));
  };

  const clickHandler = () => {
    setSelectedTab();
  };

  return (
    <ListItem
      disablePadding
      sx={{
        display: 'block',
        color: `${selectedTab === title ? '#8f278b' : '#637381'}`,
        backgroundColor: `${selectedTab === title ? '#dfcce2' : '#ffffff'}`,
      }}
      onClick={clickHandler}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          // justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isDrawerOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{ color: `${selectedTab === title ? '#8f278b' : '#637381'}` }}
          >
            {children}
          </Box>
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;

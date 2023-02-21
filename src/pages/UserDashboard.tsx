import * as React from 'react';
import {
  styled, useTheme, Theme, CSSObject,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Badge } from '@mui/material';
import MainMenu from '../components/menu/MainMenu';
import { RootState } from '../store/store';
import { menuActions } from '../store/menu/menu';
import Upload from '../components/upload/Upload';
import AccountSettings from './AccountSettings';
import FakePage from './FakePage';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const UserDashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isDrawerOpen = useSelector<RootState, boolean>(
    (state) => state.menu.isDrawerOpen,
  );

  const userAvatar = useSelector<RootState, string>(
    (state) => state.user.userAvatar,
  );

  const setIsDrawerOpen = (value: boolean) => {
    dispatch(menuActions.setIsDrawerOpen(value));
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const selectedTab = useSelector<RootState, string>(
    (state) => state.menu.selectedTab,
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        open={isDrawerOpen}
        sx={{
          backgroundColor: '#ffffff',
        }}
      >
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isDrawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Typography color="secondary">EN</Typography>

            <Badge badgeContent={1} overlap="circular" color="error">
              <NotificationsIcon color="action" />
            </Badge>

            <Avatar
              sx={{ border: '1px solid #637381' }}
              alt="Profile Photo"
              src={userAvatar}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isDrawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <MainMenu />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background:
            'rgb(253,247,252) linear-gradient(90deg, rgba(253,247,252,1) 0%, rgba(237,201,236,1) 100%)',
          minHeight: '100vh',
        }}
      >
        <DrawerHeader />

        <Box
          sx={{
            width: '100%',
            minHeight: 'calc(100% - 64px)',
            backgroundColor: '#fff',
            borderRadius: '30px',
            padding: '30px',
          }}
        >
          <Box display={selectedTab === 'Upload' ? 'block' : 'none'}>
            <Upload />
          </Box>

          <Box display={selectedTab === 'Account settings' ? 'block' : 'none'}>
            <AccountSettings />
          </Box>

          <Box
            display={
              selectedTab === 'Documents'
              || selectedTab === 'Inbox'
              || selectedTab === 'Sent'
              || selectedTab === 'Drafts'
                ? 'block'
                : 'none'
            }
          >
            <FakePage />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;

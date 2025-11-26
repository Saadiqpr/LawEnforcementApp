import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useLocation } from 'react-router-dom';

// --- IMPORT ICONS ---
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment'; // Incidents, Cases, Reports
import PeopleIcon from '@mui/icons-material/People'; // People, Officers
import GavelIcon from '@mui/icons-material/Gavel'; // Arrests, Charges, Sentences
import BusinessIcon from '@mui/icons-material/Business'; // Departments, Prisons
import PlaceIcon from '@mui/icons-material/Place'; // Locations
import ScienceIcon from '@mui/icons-material/Science'; // Evidence, Forensics
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // Vehicles
import SecurityIcon from '@mui/icons-material/Security'; // Weapons

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

// --- DEFINE ALL 15 COLLECTIONS HERE ---
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  // Core
  { text: 'Incidents', icon: <AssignmentIcon />, path: '/incidents' },
  { text: 'People', icon: <PeopleIcon />, path: '/people' },
  { text: 'Reports', icon: <AssignmentIcon />, path: '/reports' },
  // Legal & Justice
  { text: 'Arrests', icon: <GavelIcon />, path: '/arrests' },
  { text: 'Charges', icon: <GavelIcon />, path: '/charges' },
  { text: 'Cases', icon: <AssignmentIcon />, path: '/cases' },
  { text: 'Sentences', icon: <GavelIcon />, path: '/sentences' },
  // Organizational
  { text: 'Departments', icon: <BusinessIcon />, path: '/departments' },
  { text: 'Officers', icon: <PeopleIcon />, path: '/officers' },
  { text: 'Prisons', icon: <BusinessIcon />, path: '/prisons' },
  // Details & Assets
  { text: 'Locations', icon: <PlaceIcon />, path: '/locations' },
  { text: 'Evidence', icon: <ScienceIcon />, path: '/evidence' },
  { text: 'Forensics', icon: <ScienceIcon />, path: '/forensics' },
  { text: 'Vehicles', icon: <DirectionsCarIcon />, path: '/vehicles' },
  { text: 'Weapons', icon: <SecurityIcon />, path: '/weapons' },
];

export default function MainLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true); // Sidebar open by default
  const location = useLocation();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">CrimeDB Admin</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))}
                sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
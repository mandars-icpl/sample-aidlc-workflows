import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScannerIcon from '@mui/icons-material/Scanner';
import WarningIcon from '@mui/icons-material/Warning';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@services/store/useAppStore';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Scan Management', icon: <ScannerIcon />, path: '/scan' },
  { text: 'Alerts', icon: <WarningIcon />, path: '/alerts' },
  { text: 'High-Risk Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Attack Analysis', icon: <SecurityIcon />, path: '/attacks' },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

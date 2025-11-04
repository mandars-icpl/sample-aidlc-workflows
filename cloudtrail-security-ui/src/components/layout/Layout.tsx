import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { useAppStore } from '@services/store/useAppStore';

export const Layout = () => {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Navigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 0.3s',
          marginLeft: sidebarOpen ? 0 : '-240px',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppStore } from '@services/store/useAppStore';

export const Header = () => {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          CloudTrail Security Monitor
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

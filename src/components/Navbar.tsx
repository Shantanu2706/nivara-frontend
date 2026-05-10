import { AppBar, Avatar, Box, Button, Container, IconButton,Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React,{useState,useContext} from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ColorModeContext } from '../context';
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { toggleTheme, mode } = useContext(ColorModeContext);
  

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
          { id: 'home', text: 'Home', icon: <HomeIcon />, path: '/home' },
          { id: 'history', text: 'History', icon: <HistoryIcon />, path: '/history' },
          { id: 'transactions', text: 'Transactions', icon: <PaidIcon />, path: '/transactions' },
          { id: 'feedback', text: 'Feedback', icon: <FeedbackIcon />, path: '/feedback' },
          // { text: 'Premium Plans', icon: <StarIcon />, path: '/plans/' },
      ];

      const settings = [
          { id: 'my-profile', text: 'My Profile', icon: <AccountCircleIcon />, path: '/my-profile/' },
          // { text: 'Premium Plans', icon: <StarIcon />, path: '/plans/' },
      ];



//   const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const handleLogout = () => {
        logout();
        navigate("/login");
    }

  return (
    <AppBar position="static" sx={{ backgroundColor: mode === 'light' ? 'white' : undefined, 
        color: mode === 'light' ? 'black' : undefined
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters variant='dense'>
          <AutoAwesomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            //   fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
            //   letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Proposal<span style={{color: 'orange'}}>Wala</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={() => {handleCloseNavMenu(); navigate(page.path); }}>
                  <Typography sx={{ textAlign: 'center' }}>{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AutoAwesomeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            //   fontFamily: 'monospace',
              fontWeight: 700,
            //   letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Proposal<span style={{color: 'orange'}}>Wala</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => {handleCloseUserMenu(); navigate(page.path); }}
                sx={{ my: 1, mr:1,
                    color: mode === 'light' ? 'black' : 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon  />
              </IconButton>            <Menu
            //   sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
            //   anchorOrigin={{
            //     vertical: 'top',
            //     horizontal: 'right',
            //   }}
              keepMounted
            //   transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'right',
            //   }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={() => {handleCloseUserMenu(); navigate(setting.path); }}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.text}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={toggleTheme}>
                  <Typography sx={{ textAlign: 'center' }}>Toggle Theme</Typography>
                </MenuItem>
              <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar

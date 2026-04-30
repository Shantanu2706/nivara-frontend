import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import { logout } from "../utils";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PremiumPlans from '../pages/PremiumPlans';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../context';
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleTheme, mode } = useContext(ColorModeContext);

    const mainListItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/home' },
        { text: 'My Profile', icon: <AccountCircleIcon />, path: '/my-profile/' },
        { text: 'History', icon: <HistoryIcon />, path: '/history' },
        { text: 'Transactions', icon: <PaidIcon />, path: '/transactions' },
        {text: 'Feedback', icon: <FeedbackIcon />, path: '/feedback' },
        // { text: 'Premium Plans', icon: <StarIcon />, path: '/plans/' },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <Drawer
            sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
            variant='permanent'>
            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List dense sx={{ flexGrow: 1 }}>
                    {mainListItems.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton selected={location.pathname.startsWith(item.path)} onClick={() => navigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List dense>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={toggleTheme}>
                            <ListItemIcon>{mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</ListItemIcon>
                            <ListItemText primary={mode === "light" ? 'Dark Mode' : 'Light Mode'} />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon/></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar;
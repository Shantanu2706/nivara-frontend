import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import { logout } from "../utils/auth";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PremiumPlans from '../pages/PremiumPlans';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const mainListItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'My Profile', icon: <AccountCircleIcon />, path: '/my-profile' },
        { text: 'History', icon: <HistoryIcon />, path: '/history' },
        { text: 'Premium Plans', icon: <StarIcon />, path: '/plans' },
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
                <List dense sx={{flexGrow:1}}>
                    {mainListItems.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List dense>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar;
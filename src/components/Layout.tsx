import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 1, pl: '250px' }}>
        <Outlet /> 
      </Box>
    </Box>
  );
}

export default Layout;

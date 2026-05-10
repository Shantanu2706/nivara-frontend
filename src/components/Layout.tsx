import React from 'react'
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 1 }}>
        <Navbar/>
        <Outlet /> 
      </Box>
    </Box>
  );
}

export default Layout;

import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          padding: 2,
        }}
      >
        <Toolbar /> 
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

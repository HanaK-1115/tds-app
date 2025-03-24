import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import SideNav from '../components/SideNav/SideNav';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: '280px', // サイドバーの幅に合わせる
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
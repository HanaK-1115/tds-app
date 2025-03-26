import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideNav from '../components/SideNav/SideNav';

const drawerWidth = 280; // SideNavのドロワー幅と合わせる

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* トップナビゲーション */}
      <Navbar />
      
      {/* サイドナビゲーション */}
      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerWidth }, 
          flexShrink: { sm: 0 },
          zIndex: 1000
        }}
      >
        <SideNav />
      </Box>
      
      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: '64px', // AppBarの高さに合わせる
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
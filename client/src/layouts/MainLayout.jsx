import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Outlet を追加
import SideNav from '../components/SideNav/SideNav';
import Navbar from '../components/Navbar';

const drawerWidth = 280; // サイドバーの幅

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* ナビゲーションバー（画面上部に固定、z-indexを高く設定） */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1200 
      }}>
        <Navbar />
      </Box>
      
      {/* サイドバー（画面左側に固定、z-indexをNavbarより低く設定） */}
      <Box sx={{ 
        position: 'fixed', 
        top: '64px', 
        left: 0, 
        height: 'calc(100vh - 64px)', 
        width: `${drawerWidth}px`,
        zIndex: 1100
      }}>
        <SideNav />
      </Box>
      
      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: `${drawerWidth}px`, // サイドバーの幅に合わせる
          marginTop: '64px', // Navbar の高さに合わせる（通常 64px）
          width: `calc(100% - ${drawerWidth}px)`,
          height: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}
      >
        <Outlet /> {/* children の代わりに Outlet を使用 */}
      </Box>
    </Box>
  );
};

export default MainLayout;
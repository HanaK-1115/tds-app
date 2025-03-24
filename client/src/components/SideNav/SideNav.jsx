import React, { useState } from 'react';
import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MainListItems, SecondaryListItems, ThirdListItems } from './SideNavItems';

const drawerWidth = 280;

const SideNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, backgroundColor: '#1e293b', color: '#ffffff', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ color: '#ffffff', padding: '16px' }}>
          申請メニュー
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: '#334155' }} />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <MainListItems /> {/* メインメニュー */}
        </List>
        <Divider sx={{ borderColor: '#334155' }} />
        <List>
          <SecondaryListItems /> {/* 勤怠申請メニュー */}
        </List>
        <Divider sx={{ borderColor: '#334155' }} />
        <List>
          <ThirdListItems /> {/* 経費申請メニュー */}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* ハンバーガーメニューアイコン */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: 'none' }, position: 'absolute', top: 16, left: 16 }}
      >
        <MenuIcon />
      </IconButton>

      {/* デスクトップ用の固定サイドバー */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }, // モバイルでは非表示
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e293b',
            color: '#ffffff',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* モバイル用のハンバーガーメニュー */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // モバイルパフォーマンス向上のため
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }, // モバイルでのみ表示
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e293b',
            color: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SideNav;
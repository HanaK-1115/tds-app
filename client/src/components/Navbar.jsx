import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout } = useAuth();
  
  // モバイルメニューの状態
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/'); // ログインページにリダイレクト
  };

  // ログイン状態に応じたナビゲーション項目
  const navItems = user
    ? [
        { text: 'ホーム', path: '/home', icon: <HomeIcon /> },
        { text: 'ログアウト', onClick: handleLogout, icon: <LogoutIcon /> },
      ]
    : [
        { text: 'ホーム', path: '/', icon: <HomeIcon /> },
        { text: 'ログイン', path: '/', icon: <LoginIcon /> },
        { text: '登録', path: '/register', icon: <PersonAddIcon /> },
      ];

  const handleNavigation = (item) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
    handleMobileMenuClose();
  };

  // 現在のパスがナビゲーションアイテムと一致するか確認
  const isActive = (path) => location.pathname === path;

  // モバイルメニュー
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {navItems.map((item) => (
        <MenuItem 
          key={item.text} 
          onClick={() => handleNavigation(item)}
          sx={{ 
            backgroundColor: item.path && isActive(item.path) ? 'rgba(0, 0, 0, 0.04)' : 'transparent' 
          }}
        >
          <IconButton
            size="large"
            color="inherit"
          >
            {item.icon}
          </IconButton>
          <p>{item.text}</p>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <AppBar 
        position="fixed"
        sx={{ 
          backgroundColor: '#1e293b',
          zIndex: theme.zIndex.drawer + 1,
          width: '100%'
        }}
      >
        <Toolbar>
          {/* ハンバーガーメニューアイコン（サイドバー用） */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={() => document.dispatchEvent(new CustomEvent('toggle-side-drawer'))}
          >
            <MenuIcon />
          </IconButton>
          
          {/* アプリ名 */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            TDS App
          </Typography>
          
          {/* デスクトップ表示のナビゲーションボタン */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <Button 
                key={item.text}
                color="inherit"
                onClick={() => handleNavigation(item)}
                sx={{ 
                  mx: 1,
                  backgroundColor: item.path && isActive(item.path) ? 'rgba(255, 255, 255, 0.08)' : 'transparent'
                }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          {/* モバイル表示のメニューアイコン */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* モバイルメニューのレンダリング */}
      {renderMobileMenu}
    </>
  );
};

export default Navbar;
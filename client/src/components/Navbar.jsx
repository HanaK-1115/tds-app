import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e293b' }}>
      <Toolbar>
        {/* ハンバーガーメニュー（モバイル用） */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuItem onClick={() => handleNavigation('/')}>ホーム</MenuItem>
          <MenuItem onClick={() => handleNavigation('/SignUpForm')}>ログイン</MenuItem>
          <MenuItem onClick={() => handleNavigation('/sign-up-form')}>登録</MenuItem>
        </Menu>

        {/* ロゴ */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TDS App
        </Typography>

        {/* デスクトップ用ナビゲーションボタン */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" onClick={() => handleNavigation('/')}>
            ホーム
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/example')}>
            ログイン
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/sign-up-form')}>
            登録
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
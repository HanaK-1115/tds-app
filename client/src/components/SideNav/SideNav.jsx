import React, { useState } from 'react';
import { 
  Box, 
  Divider, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  Collapse
} from '@mui/material';
// ダッシュボード関連アイコン
import DashboardIcon from '@mui/icons-material/Dashboard';

// 勤怠申請関連アイコン
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import NightShelterIcon from '@mui/icons-material/NightShelter';

// 経費申請関連アイコン
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';

// その他のアイコン
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { useNavigate, useLocation } from 'react-router-dom';
import UserInfo from '../UserInfo';

const drawerWidth = 280;

const SideNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // メニュー開閉状態の管理
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleAttendanceClick = () => {
    setAttendanceOpen(!attendanceOpen);
  };
  
  const handleExpenseClick = () => {
    setExpenseOpen(!expenseOpen);
  };
  
  const handleNavigation = (path) => {
    navigate(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };
  
  // 現在のパスがナビゲーションアイテムと一致するか確認
  const isActive = (path) => location.pathname === path;
  
  // 親メニュー項目
  const mainMenuItems = [
    { text: 'ダッシュボード', path: '/dashboard', icon: <DashboardIcon /> },
  ];
  
  // 勤怠申請サブメニュー項目（アイコン改善）
  const attendanceMenuItems = [
    { text: '有給申請', path: '/attendance/register', icon: <HolidayVillageIcon /> },
    { text: '休日出勤申請', path: '/attendance/leave', icon: <AccessTimeFilledIcon /> },
    { text: '残業申請', path: '/attendance/history', icon: <NightShelterIcon /> },
  ];
  
  // 経費申請サブメニュー項目（アイコン改善）
  const expenseMenuItems = [
    { text: '会議費申請', path: '/expense/request', icon: <RestaurantIcon /> },
    { text: '通勤費申請', path: '/expense/history', icon: <DirectionsSubwayIcon /> },
  ];
  
  // その他のメニュー項目
  const otherMenuItems = [
    { text: '設定', path: '/settings', icon: <SettingsIcon /> },
    { text: 'ヘルプ', path: '/help', icon: <HelpIcon /> },
  ];

  // カスタムイベントのリスナーを設定
  React.useEffect(() => {
    const handleToggleDrawer = () => {
      setMobileOpen(prevState => !prevState);
    };
    
    // カスタムイベントをリッスン
    document.addEventListener('toggle-side-drawer', handleToggleDrawer);
    
    // クリーンアップ
    return () => {
      document.removeEventListener('toggle-side-drawer', handleToggleDrawer);
    };
  }, []);

  const drawerContent = (
    <Box sx={{ width: drawerWidth, backgroundColor: '#1e293b', color: '#ffffff', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ color: '#ffffff', padding: '16px' }}>
          申請メニュー
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: '#334155' }} />
      
      {/* ユーザー情報の追加 */}
      <UserInfo />
      
      {/* メインメニュー */}
      <List>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{ 
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.16)' }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ borderColor: '#334155', my: 1 }} />
      
      {/* 勤怠申請メニュー（折りたたみ可能） */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleAttendanceClick}>
            <ListItemIcon sx={{ color: 'white' }}>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="勤怠申請" />
            {attendanceOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={attendanceOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {attendanceMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{ 
                    pl: 4,
                    backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.16)' }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      
      {/* 経費申請メニュー（折りたたみ可能） */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleExpenseClick}>
            <ListItemIcon sx={{ color: 'white' }}>
              <ReceiptLongIcon />
            </ListItemIcon>
            <ListItemText primary="経費申請" />
            {expenseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={expenseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {expenseMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{ 
                    pl: 4,
                    backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.16)' }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      
      <Divider sx={{ borderColor: '#334155', my: 1 }} />
      
      {/* その他のメニュー */}
      <List>
        {otherMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{ 
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.16)' }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
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
            top: '64px', // AppBarの高さ
            height: 'calc(100% - 64px)', // AppBarの高さを引いた高さ
            zIndex: 1000,
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
    </>
  );
};

export default SideNav;
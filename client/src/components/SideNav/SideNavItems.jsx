import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrainIcon from '@mui/icons-material/Train';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import WorkIcon from '@mui/icons-material/Work';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate, useLocation } from 'react-router-dom';

const listItemStyle = {
  color: '#ffffff',
  transition: 'background-color 0.3s ease', // 背景色の変更をスムーズに
  '&:hover': {
    backgroundColor: '#334155', // ホバー時の背景色
  },
};

const activeListItemStyle = {
  backgroundColor: '#334155', // アクティブな項目の背景色
  color: '#ffffff',
  transition: 'background-color 0.3s ease', // 背景色の変更をスムーズに
  '& .MuiListItemIcon-root': {
    color: '#ffffff', // アクティブなアイコンの色
  },
};

const subheaderStyle = {
  backgroundColor: '#1e293b', // サブヘッダーの背景色を暗めに設定
  color: '#94a3b8', // テキストの色を調整
  fontSize: '0.875rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  padding: '8px 16px', // 内側の余白を追加
  marginTop: '16px',
  transition: 'color 0.3s ease', // テキスト色の変更をスムーズに
};

export const MainListItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePaidLeaveClick = () => {
    navigate('/applications-Overview');
  };

  return (
    <React.Fragment>
      <ListItemButton
        onClick={handlePaidLeaveClick}
        sx={location.pathname === '/applications-Overview' ? activeListItemStyle : listItemStyle}
      >
        <ListItemIcon sx={{ color: location.pathname === '/applications-Overview' ? '#ffffff' : '#94a3b8' }}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="申請一覧" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePaidLeaveClick = () => {
    navigate('/paid-leave-request');
  };

  return (
    <React.Fragment>
      <ListSubheader component="div" inset sx={subheaderStyle}>
        勤怠申請
      </ListSubheader>
      <ListItemButton
        onClick={handlePaidLeaveClick}
        sx={location.pathname === '/paid-leave-request' ? activeListItemStyle : listItemStyle}
      >
        <ListItemIcon sx={{ color: location.pathname === '/paid-leave-request' ? '#ffffff' : '#94a3b8' }}>
          <InsertInvitationIcon />
        </ListItemIcon>
        <ListItemText primary="有給休暇" />
      </ListItemButton>
      <ListItemButton sx={listItemStyle}>
        <ListItemIcon sx={{ color: '#94a3b8' }}>
          <EventRepeatIcon />
        </ListItemIcon>
        <ListItemText primary="振替休暇" />
      </ListItemButton>
      <ListItemButton sx={listItemStyle}>
        <ListItemIcon sx={{ color: '#94a3b8' }}>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="休日出勤" />
      </ListItemButton>
      <ListItemButton sx={listItemStyle}>
        <ListItemIcon sx={{ color: '#94a3b8' }}>
          <DarkModeIcon />
        </ListItemIcon>
        <ListItemText primary="残業" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const ThirdListItems = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <ListSubheader component="div" inset sx={subheaderStyle}>
        経費申請(未実装)
      </ListSubheader>
      <ListItemButton sx={listItemStyle}>
        <ListItemIcon sx={{ color: '#94a3b8' }}>
          <TrainIcon />
        </ListItemIcon>
        <ListItemText primary="通勤費" />
      </ListItemButton>
      <ListItemButton sx={listItemStyle}>
        <ListItemIcon sx={{ color: '#94a3b8' }}>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="会議費" />
      </ListItemButton>
    </React.Fragment>
  );
};
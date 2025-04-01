import React from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  Divider 
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  // departmentとroleがオブジェクトの場合の処理
  const departmentName = user.department && typeof user.department === 'object' 
    ? user.department.name 
    : user.departmentName || '未設定';
    
  const roleName = user.role && typeof user.role === 'object' 
    ? user.role.name 
    : user.roleName || '未設定';

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 1,
      mb: 2
    }}>
      <Avatar 
        sx={{ 
          width: 64, 
          height: 64,
          mb: 1,
          bgcolor: 'primary.light'
        }}
      >
        {user.firstName && user.lastName 
          ? user.firstName.charAt(0) + user.lastName.charAt(0)
          : user.username.charAt(0)
        }
      </Avatar>
      <Typography variant="h6">
        {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.username}
      </Typography>
      <Divider sx={{ width: '100%', my: 1 }} />
      <Typography variant="body2" color="text.secondary">
        部署: {departmentName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        役職: {roleName}
      </Typography>
    </Box>
  );
};

export default UserInfo;
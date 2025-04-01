import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        ページが見つかりません
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        お探しのページは存在しないか、移動された可能性があります。
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        ホームに戻る
      </Button>
    </Box>
  );
};

export default NotFound;
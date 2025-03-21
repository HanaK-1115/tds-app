import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const HomePage = () => {
    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                社内申請Webアプリへようこそ
            </Typography>
            <Typography variant="body1" paragraph>
                このアプリは、社内申請プロセスを簡素化するために設計されています。
            </Typography>
            <Button variant="contained" color="primary">
                申請を開始する
            </Button>
        </Container>
    );
};

export default HomePage;
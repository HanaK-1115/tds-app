import React from 'react';
import { Container, Typography } from '@mui/material';
import MainLayout from '../layouts/MainLayout';

const AddedToHomePage = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                ホーム画面に追加されました！
            </Typography>
            <Typography variant="body1" paragraph>
                このアプリをホーム画面に追加していただきありがとうございます！<br />
                これからは、ブラウザを開かずにアプリをすぐに起動できます。
            </Typography>
        </Container>
    );
};

export default AddedToHomePage;
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const AppInstallPage = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                ホーム画面に追加する方法
            </Typography>
            <Typography variant="body1" paragraph>
                このアプリをより便利に使うために、スマートフォンのホーム画面に追加してください。
            </Typography>

            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Android の場合:
                </Typography>
                <Typography variant="body2" paragraph>
                    1. 画面右上のメニュー（3点アイコン）をタップします。<br />
                    2. 「ホーム画面に追加」を選択します。<br />
                    3. 名前を入力して「追加」をタップします。
                </Typography>
                {/* Android スクリーンショットをここに表示 */}
                <Box
                    component="img"
                    src="/images/android-add-to-home.png" // スクリーンショットのパス
                    alt="Android のホーム画面に追加"
                    sx={{ width: '100%', maxWidth: 300, borderRadius: 2, boxShadow: 3 }}
                />
            </Box>

            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>
                    iPhone の場合:
                </Typography>
                <Typography variant="body2" paragraph>
                    1. 画面下部の共有アイコン（四角と上矢印）をタップします。<br />
                    2. 「ホーム画面に追加」を選択します。<br />
                    3. 名前を入力して「追加」をタップします。
                </Typography>
                {/* iPhone スクリーンショットをここに表示 */}
                <Box
                    component="img"
                    src="/images/iphone-add-to-home.png" // スクリーンショットのパス
                    alt="iPhone のホーム画面に追加"
                    sx={{ width: '100%', maxWidth: 300, borderRadius: 2, boxShadow: 3 }}
                />
            </Box>

            <Typography variant="body1" paragraph>
                ホーム画面に追加すると、ブラウザを開かずにアプリをすぐに起動できます。
            </Typography>
        </Container>
    );
};

export default AppInstallPage;
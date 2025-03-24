import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e293b', // サイドバーの背景色
    },
    secondary: {
      main: '#94a3b8', // サブヘッダーやアイコンの色
    },
    text: {
      primary: '#ffffff', // テキストの色
      secondary: '#94a3b8', // サブヘッダーのテキスト色
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none', // ボタンのテキストを大文字にしない
    },
  },
});

export default theme;
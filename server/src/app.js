const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // HTTPリクエストログ用
const exampleRoutes = require('./routes/exampleRoutes');
const errorRoutes = require('./routes/errorRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // 認証ルートのインポート
const corsConfig = require('./middleware/corsConfig');

// 定期処理
// 毎日午前0時に有給日数を更新するタスク
require('./tasks/updatePaidLeave');

const app = express();

// 複数のオリジンを許可するCORS設定
const allowedOrigins = [
  'http://localhost:3000',         // ローカル開発環境
  'http://localhost:3001',         // 別のローカルポート
  'https://tds-app-lg8l.onrender.com' // 本番環境
];

// CORSミドルウェア設定
app.use(cors({
  origin: function(origin, callback) {
    // オリジンがない場合（直接リクエストなど）は許可
    if (!origin) return callback(null, true);
    
    // 許可されたオリジンかチェック
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS制限: 不許可なオリジン:', origin);
      callback(new Error('CORS制限によって許可されていないオリジンからのリクエストです'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // クッキーを許可（必要な場合）
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // HTTPリクエストログを追加

// 全リクエストをログ出力
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/examples', exampleRoutes);
app.use('/api/log-error', errorRoutes);
app.use('/api/users', userRoutes); // このパスが/api/usersになっているか確認
app.use('/api/auth', authRoutes); // 認証ルートのマウント

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'APIサーバーは正常に動作しています' });
});

// 404エラーハンドリング - 全てのルーティングの後に配置
app.use((req, res) => {
  console.log(`404エラー: ${req.method} ${req.originalUrl} が見つかりません`);
  res.status(404).json({ 
    success: false, 
    message: 'リクエストされたリソースが見つかりません',
    path: req.originalUrl
  });
});

// グローバルエラーハンドラー
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'サーバーエラーが発生しました。管理者にお問い合わせください。' 
  });
});

module.exports = app;
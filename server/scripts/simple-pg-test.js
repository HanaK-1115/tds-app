require('dotenv').config();
const { Sequelize } = require('sequelize');
const express = require('express');

// express アプリケーションの作成
const app = express();
const PORT = process.env.PORT || 5000;

// 基本的なミドルウェア
app.use(express.json());

// データベース設定を出力
console.log('データベース設定:', {
  database: process.env.DB_NAME || 'tds_app',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD ? '***' : 'Fe87c21349',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432
});

// PostgreSQL接続
const sequelize = new Sequelize(
  process.env.DB_NAME || 'tds_app',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Fe87c21349',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log
  }
);

// データベース接続テスト
app.get('/api/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ 
      success: true, 
      message: 'PostgreSQL接続に成功しました' 
    });
  } catch (error) {
    console.error('データベース接続エラー:', error);
    res.status(500).json({ 
      success: false, 
      message: 'データベース接続に失敗しました', 
      error: error.message 
    });
  }
});

// 単純なテストルート
app.get('/api/test', (req, res) => {
  res.json({ message: 'サーバーは正常に動作しています' });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`簡易サーバーがポート${PORT}で起動しました`);
});
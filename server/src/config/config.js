require('dotenv').config();

module.exports = {
  // 環境設定
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // サーバー設定
  server: {
    port: process.env.PORT || 5000
  },
  
  // データベース設定 (PostgreSQL)
  database: {
    name: process.env.DB_NAME || 'tds_app',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Fe87c21349',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  },
  
  // JWT設定
  jwt: {
    secret: process.env.JWT_SECRET || 'tds-app-super-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  }
};
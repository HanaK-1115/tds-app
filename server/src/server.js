require('dotenv').config();

const express = require('express');
const { Pool } = require('pg'); // PostgreSQL 用のライブラリ
const exampleRoutes = require('./routes/exampleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL 接続設定
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 接続テスト
pool.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/examples', exampleRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
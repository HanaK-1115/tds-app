require('dotenv').config();

const express = require('express');
const { Pool } = require('pg'); // PostgreSQL 用のライブラリ

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL 接続設定
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Render のデータベースでは SSL が必要
    },
});

// 接続テスト
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('PostgreSQL connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/examples', exampleRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
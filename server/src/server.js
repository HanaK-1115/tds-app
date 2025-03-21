require('dotenv').config();

const express = require('express');
const { Pool } = require('pg'); // PostgreSQL 用のライブラリ
const cors = require('cors');

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

// CORS 設定
app.use(cors({
    origin: 'https://tds-app-lg8l.onrender.com', // フロントエンドの URL を指定
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/examples', exampleRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
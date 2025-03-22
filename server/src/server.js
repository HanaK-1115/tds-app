require('dotenv').config();
const app = require('./app');
const { connectToDatabase } = require('./config/db');

const PORT = process.env.PORT || 5000;

// データベース接続
connectToDatabase();

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
require('dotenv').config();
const app = require('./app');
const { connectToDatabase, sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

// データベース接続
connectToDatabase();

sequelize.sync({ alter: true }) // データベースをモデルに同期
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Database synchronization error:', err));

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
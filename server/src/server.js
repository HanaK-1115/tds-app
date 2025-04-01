require('dotenv').config();
const app = require('./app');
const config = require('./config/config');
const db = require('./models'); // models全体をインポート

const PORT = config.server.port || 5000;

// データベース接続テスト関数を定義
const connectToDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('データベース接続が成功しました');
    
    // 開発環境の場合、テーブルを同期（force:falseは既存のテーブルを保持）
    if (config.nodeEnv === 'development') {
      await db.sequelize.sync({ force: false });
      console.log('データベースモデルが同期されました');
    }
  } catch (error) {
    console.error('データベース接続エラー:', error);
    process.exit(1); // エラーが発生したらプロセスを終了
  }
};

// データベース接続してからサーバー起動
(async () => {
  try {
    // データベース接続
    await connectToDatabase();
    
    // サーバー起動
    app.listen(PORT, () => {
      console.log(`サーバーがポート${PORT}で起動しました`);
      console.log(`環境: ${config.nodeEnv || 'development'}`);
    });
  } catch (error) {
    console.error('サーバー起動エラー:', error);
    process.exit(1);
  }
})();
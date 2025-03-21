const express = require('express');
const router = express.Router();

// サンプルの GET エンドポイント
router.get('/', (req, res) => {
    res.json({ message: 'Hello from /api/examples!' });
});

module.exports = router;
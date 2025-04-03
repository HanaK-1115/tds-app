/**
 * ユーザー作成のバリデーションミドルウェア
 */
exports.validateUserCreate = (req, res, next) => {
  const { username, password, firstName, lastName, departmentId, roleId } = req.body;
  const errors = [];

  // 必須フィールドのチェック
  if (!username) errors.push('ユーザー名は必須です');
  if (!password) errors.push('パスワードは必須です');
  if (!firstName) errors.push('名は必須です');
  if (!lastName) errors.push('姓は必須です');
  if (!departmentId) errors.push('部署IDは必須です');
  if (!roleId) errors.push('役職IDは必須です');

  // パスワードの強度チェック
  if (password && password.length < 8) {
    errors.push('パスワードは8文字以上必要です');
  }

  // バリデーションエラーがあれば400エラーを返す
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'バリデーションエラー',
      errors
    });
  }

  next();
};

/**
 * ユーザー更新のバリデーションミドルウェア
 */
exports.validateUserUpdate = (req, res, next) => {
  const { username, password, firstName, lastName, departmentId, roleId } = req.body;
  const errors = [];

  // パスワードが含まれる場合、強度チェック
  if (password !== undefined) {
    if (password.length < 8) {
      errors.push('パスワードは8文字以上必要です');
    }
  }

  // バリデーションエラーがあれば400エラーを返す
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'バリデーションエラー',
      errors
    });
  }

  next();
};

/**
 * ログインのバリデーションミドルウェア
 */
exports.validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username) errors.push('ユーザー名は必須です');
  if (!password) errors.push('パスワードは必須です');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'バリデーションエラー',
      errors
    });
  }

  next();
};
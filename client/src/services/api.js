import axios from 'axios';

// APIのベースURL（.envファイルから読み込むと良い）
const API_BASE_URL = 'http://localhost:3001/api'; // 適宜、実際のAPIのURLに変更

// Axiosインスタンスの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター（認証トークンの追加などが必要な場合）
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター（エラーハンドリングなど）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // エラーレスポンスの標準化
    const customError = {
      message: error.response?.data?.message || '予期せぬエラーが発生しました',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

/**
 * ユーザー登録API
 * @param {Object} userData ユーザー登録データ
 * @returns {Promise} 登録結果
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * ログインAPI
 * @param {Object} credentials ログイン情報
 * @returns {Promise} ログイン結果
 */
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    // 認証トークンをローカルストレージに保存
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * ログアウトAPI
 * @returns {void}
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  // 必要に応じてサーバーサイドのセッションを無効化するAPI呼び出し
  // apiClient.post('/auth/logout');
};

/**
 * ユーザー情報取得API
 * @returns {Promise} ユーザー情報
 */
export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// その他必要なAPI関数を追加

export default apiClient;
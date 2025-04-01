import axios from 'axios';

// APIのベースURL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('Using API URL:', API_URL); // デバッグ用

// Axiosインスタンスを作成
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
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
    // フォーマット済みデータを作成
    const formattedData = {
      username: userData.username,
      password: userData.password,
      departmentId: userData.departmentId, 
      lastName: userData.lastName,
      firstName: userData.firstName,
      join_date: userData.join_date,
      remaining_leave_days: userData.remaining_leave_days,
      roleId: userData.roleId
    };
    const response = await apiClient.post('/users/register', formattedData);
    console.log('APIレスポンス:', response.data);
    return response.data;
  } catch (error) {
    console.error('ユーザー登録エラー詳細:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      requiredFields: error.response?.data?.requiredFields
    });
    
    if (error.response && error.response.data) {
      // サーバーからのエラーメッセージを使用
      throw {
        message: error.response.data.message || 'サーバーエラーが発生しました',
        status: error.response.status,
        data: error.response.data
      };
    }
    
    throw {
      message: error.message || '予期せぬエラーが発生しました',
      status: undefined,
      data: undefined
    };
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
 * ユーザーサインインAPI
 * @param {Object} credentials ログイン情報
 * @returns {Promise} ログイン結果
 */
export const signInUser = async (credentials) => {
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

export default apiClient;
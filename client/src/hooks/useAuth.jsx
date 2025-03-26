import React, { createContext, useState, useContext, useEffect } from 'react';

// 認証コンテキストの作成
const AuthContext = createContext(null);

// 認証プロバイダーコンポーネント
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初期化時にローカルストレージからユーザー情報を取得
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('ユーザー情報の解析に失敗しました', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // ログイン処理
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // ログアウト処理
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // コンテキスト値の提供
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuthフックの定義
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
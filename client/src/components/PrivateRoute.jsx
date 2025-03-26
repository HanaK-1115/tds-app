import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // 認証状態を確認中の場合はローディング表示
  if (isLoading) {
    return <div>Loading...</div>; // ローディングコンポーネントに置き換え可能
  }

  // 認証されていない場合はログインページにリダイレクト
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
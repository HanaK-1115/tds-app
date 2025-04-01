import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import MainLayout from '../../layouts/MainLayout';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // 認証中は何も表示しない
  if (loading) {
    return <div>Loading...</div>;
  }

  // 認証されていない場合はログインページにリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 認証済みの場合はメインレイアウトでコンテンツを表示
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PrivateRoute;
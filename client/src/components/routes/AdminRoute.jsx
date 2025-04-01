import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import MainLayout from '../../layouts/MainLayout';

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  console.log('AdminRoute: ユーザー情報', user);
  console.log('AdminRoute: 認証状態', isAuthenticated);

  // 認証中は何も表示しない
  if (loading) {
    return <div>Loading...</div>;
  }

  // 認証されていない場合はログインページにリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 管理者権限がない場合はダッシュボードにリダイレクト
  // roleId が 1 でない場合はアクセス不可
  if (!user || user.roleId !== 1) {
    console.log('権限エラー: 管理者権限が必要です。現在の権限:', user?.roleId);
    return <Navigate to="/dashboard" />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AdminRoute;
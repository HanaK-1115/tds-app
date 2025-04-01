import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/routes/PrivateRoute';
import AdminRoute from '../components/routes/AdminRoute';

// ページコンポーネント
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import SignUpForm from '../pages/SignUpForm';
import AttendanceList from '../pages/attendance/AttendanceList';
import AttendanceForm from '../pages/attendance/AttendanceForm';
// 管理者ページ
import InvitationCodeManager from '../pages/admin/InvitationCodeManager';
import UserManager from '../pages/admin/UserManager';
import NotFound from '../pages/NotFound'; // NotFoundコンポーネントをインポート

/**
 * アプリケーションのルート定義
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* 公開ルート */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpForm />} />
      
      {/* 認証済みユーザー向けルート */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance/list" element={<AttendanceList />} />
        <Route path="/attendance/new" element={<AttendanceForm />} />
        {/* その他の認証必須ルート */}
      </Route>
      
      {/* 管理者専用ルート */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/invitations" element={<InvitationCodeManager />} />
        <Route path="/admin/users" element={<UserManager />} />
      </Route>
      
      {/* 404ページ - 最後に配置 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
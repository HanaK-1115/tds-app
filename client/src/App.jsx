import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AppInstallPage from './pages/AppInstallPage';
import ExampleComponent from './components/ExampleComponent';
import MainLayout from './layouts/MainLayout';
import AddedToHomePage from './pages/AddedToHomePage';
import SignUpForm from './pages/SignUpForm';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';
import SignInPage from './pages/SignInPage';
import { AuthProvider } from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/register" element={<SignUpForm />} />
              
              {/* 認証が必要なルート */}
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<MainLayout />}>
                  {/* MainLayoutの子ルート */}
                  {/* <Route index element={<Dashboard />} /> */}
                  {/* 他のルート... */}
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}

// スタンドアロンモード（Appインストール済み）かどうかを判定してリダイレクト
function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      navigate('/added-to-home');
    }
  }, [navigate]);

  return <AppInstallPage />;
}

export default App;
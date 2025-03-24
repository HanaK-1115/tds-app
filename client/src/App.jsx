import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AppInstallPage from './pages/AppInstallPage';
import ExampleComponent from './components/ExampleComponent';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary'; // エラーバウンダリをインポート
import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<RedirectToHome />} /> {/* リダイレクトロジック */}
            <Route path="/example" element={<ExampleComponent />} />
            <Route path="/added-to-home" element={<MainLayout />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// スタンドアロンモード（Appインストール済み）かどうかを判定してリダイレクト
function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      navigate('/added-to-home'); // スタンドアロンモードなら /added-to-home にリダイレクト
    }
  }, [navigate]);

  return <AppInstallPage />; // 通常モードでは AppInstallPage を表示
}

export default App;
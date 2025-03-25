import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AppInstallPage from './pages/AppInstallPage';
import ExampleComponent from './components/ExampleComponent';
import MainLayout from './layouts/MainLayout';
import AddedToHomePage from './pages/AddedToHomePage';
import SignUpForm from './pages/SignUpForm';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<RedirectToHome />} />
            <Route element={<MainLayout />}>
              <Route path="/example" element={<ExampleComponent />} />
              <Route path="/sign-up-form" element={<SignUpForm />} />
              <Route path="/added-to-home" element={<AddedToHomePage />} />
              <Route path="/register" element={<SignUpForm />} />
            </Route>
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
      navigate('/added-to-home');
    }
  }, [navigate]);

  return <AppInstallPage />;
}

export default App;
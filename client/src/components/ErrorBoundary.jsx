import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // エラーが発生した場合に state を更新
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 開発環境ではエラーをコンソールに出力
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // サーバーにエラーを送信
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.toString(), // エラーメッセージ
        stack: error.stack, // スタックトレース
        componentStack: errorInfo.componentStack, // コンポーネントスタック
        url: window.location.href, // 現在のページの URL
        userAgent: navigator.userAgent, // ユーザーのブラウザ情報
        timestamp: new Date().toISOString(), // タイムスタンプ
      }),
    }).catch((err) => {
      console.error('Failed to send error to server:', err);
    });
  }

  render() {
    if (this.state.hasError) {
      // ユーザー向けのフォールバック UI を表示
      return <h1>何か問題が発生しました。後でもう一度お試しください。</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
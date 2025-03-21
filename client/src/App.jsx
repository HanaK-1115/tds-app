import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExampleComponent from './components/ExampleComponent';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/example" element={<ExampleComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuotesPage from './pages/QuotesPage';

function App() {
  return (
    <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
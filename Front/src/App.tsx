import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PublicLayout from './layouts/PublicLayout';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout><Navigate to="/all" /></PublicLayout>} />
        <Route path="/:category" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/product/:productId" element={<PublicLayout><ProductDetailPage /></PublicLayout>} />
      </Routes>
    </Router>
  );
}

export default App;

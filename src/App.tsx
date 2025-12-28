import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import ComponentsPage from './pages/ComponentsPage';
import TemplatesPage from './pages/TemplatesPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/components" element={<ComponentsPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import ComponentsPage from './pages/ComponentsPage';
import ProjectPage from './pages/ProjectPage';
import AIImagesPage from './pages/AIImagesPage';
import PhotographyPage from './pages/PhotographyPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/components" element={<ComponentsPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/ai-images" element={<AIImagesPage />} />
      <Route path="/photography" element={<PhotographyPage />} />
    </Routes>
  );
}

export default App;

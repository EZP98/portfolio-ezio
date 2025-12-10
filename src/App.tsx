import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Showcase from './components/Showcase';
import WorksTicker from './components/WorksTicker';
import Works from './components/Works';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import Stack from './components/Stack';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BlurController from './components/BlurController';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <Hero />
        <Introduction />
        <Showcase />
        <WorksTicker />
        <Works />
        <Projects />
        <About />
        <Experience />
        <Stack />
        <CTA />
      </main>

      <Footer />
      
      {/* Dynamic Layered Blur Effect at Bottom */}
      <BlurController />
    </div>
  );
}

export default App;
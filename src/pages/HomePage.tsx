import Header from '../components/Header';
import Hero from '../components/Hero';
import Showcase from '../components/Showcase';
import Works from '../components/Works';
import About from '../components/About';
import Experience from '../components/Experience';
import Stack from '../components/Stack';
import CreativeWork from '../components/CreativeWork';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import BlurController from '../components/BlurController';

const HomePage = () => {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Hero />
        <Works />
        <Showcase />
        <About />
        <Experience />
        <Stack />
        <CreativeWork />
        <CTA />
      </main>

      <Footer />

      <BlurController />
    </div>
  );
};

export default HomePage;

import Header from '../components/Header';
import Hero from '../components/Hero';
import ServicesTicker from '../components/ServicesTicker';
import Introduction from '../components/Introduction';
import Showcase from '../components/Showcase';
import WorksTicker from '../components/WorksTicker';
import Works from '../components/Works';
import Components from '../components/Components';
import PhotoGallery from '../components/PhotoGallery';
import About from '../components/About';
import Experience from '../components/Experience';
import Stack from '../components/Stack';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import BlurController from '../components/BlurController';

const HomePage = () => {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Hero />
        <ServicesTicker />
        <Introduction />
        <WorksTicker />
        <Works />
        <Components />
        <PhotoGallery />
        <Showcase />
        <About />
        <Experience />
        <Stack />
        <CTA />
      </main>

      <Footer />

      <BlurController />
    </div>
  );
};

export default HomePage;

import Header from '../components/Header';
import Hero from '../components/Hero';
import ServicesTicker from '../components/ServicesTicker';
import Introduction from '../components/Introduction';
import Showcase from '../components/Showcase';
import WorksTicker from '../components/WorksTicker';
import Works from '../components/Works';
import ComponentsSection from '../components/ComponentsSection';
import About from '../components/About';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
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
        <ComponentsSection />
        <Showcase />
        <About />
        <Experience />
        <Testimonials />
        <Stack />
        <CTA />
      </main>

      <Footer />

      <BlurController />
    </div>
  );
};

export default HomePage;

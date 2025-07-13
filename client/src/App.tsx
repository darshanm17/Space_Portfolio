import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Loader from './components/Loader';
import './index.css';
import CodingJourney from './components/CodingJourney';
// import EyeGlowEffect from './components/EyeGlowEffect';
// import LeetCodeSection from './components/LeetCodeSection';
// import LeetCodeChart from './components/LeetCodeChart';

function App() {
  return (
    <Router>
      <Loader/>
      {/* <EyeGlowEffect/> */}
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Experience />
              <Projects />
              <CodingJourney/>
              {/* <LeetCodeSection/>
              <LeetCodeChart/> */}
              <Contact />
            </>
          } />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;

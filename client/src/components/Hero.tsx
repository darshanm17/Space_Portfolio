import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeroSection = styled(motion.section)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  margin: 0;
  background: linear-gradient(to right, #00ff88, #00ffee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 2rem;
  margin: 1rem 0;
  color: #ffffff;
  opacity: 0.8;

  @media (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 0.75rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 1.5rem 0;
  color: #ffffff;
  opacity: 0.7;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 1rem 0;
    max-width: 100%;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const ExploreButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff88, #00ffee);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  color: #0B0B1F;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;
  font-weight: bold;
  margin-top: 2rem;
  text-decoration: none;
  display: inline-block;

  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    margin-top: 1rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HeroTitle
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Exploring the Digital Universe
      </HeroTitle>
      <HeroSubtitle
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Full-Stack Developer & Space Enthusiast
      </HeroSubtitle>
      <HeroText
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Welcome to my cosmic corner of the web. I craft digital experiences
        that push the boundaries of what's possible in web development.
      </HeroText>
      <ExploreButton
        onClick={scrollToProjects}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore My Work
      </ExploreButton>
    </HeroSection>
  );
};

export default Hero; 
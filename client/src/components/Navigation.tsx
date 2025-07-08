import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
  }
`;

const Brand = styled(Link)`
  color: #00ffee;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  text-decoration: none;
  text-shadow: 0 0 10px #00ffee;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Hamburger = styled.button<{ isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #00ffee;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1100;
  padding: 0.3rem;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 20px;
    height: 2px;
    background-color: ${({ isOpen }) => (isOpen ? '#00ff88' : '#ffffff')};
    margin: 3px 0;
    border-radius: 1px;
    transition: all 0.3s ease;
  }

  div:nth-of-type(1) {
    transform: ${({ isOpen }) =>
      isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
  }

  div:nth-of-type(2) {
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }

  div:nth-of-type(3) {
    transform: ${({ isOpen }) =>
      isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'};
  }
`;

const NavList = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 60px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    background: rgba(0, 0, 0, 0.95);
    width: 220px;
    padding: 2rem 1.5rem;
    height: 100vh;
    gap: 1.5rem;
    z-index: 1050;
    box-shadow: -5px 0 20px rgba(0, 255, 255, 0.1);
    transition: right 0.3s ease;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  font-family: 'Share Tech Mono', monospace;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(to right, #00ffee, #00ff88);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.3rem 0;
  }
`;

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Experience', path: '/#experience' },
  { title: 'Projects', path: '/#projects' },
  { title: 'Contact', path: '/#contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const offset = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path === '/') {
      navigate('/');
    } else if (path.startsWith('/#')) {
      const sectionId = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        scrollToSection(sectionId);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowHamburger(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      scrollToSection(sectionId);
    }
  }, []);

  return (
    <NavContainer
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Brand to="/">404DevFound</Brand>

      {showHamburger && (
        <Hamburger isOpen={isOpen} onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </Hamburger>
      )}

      <NavList isOpen={showHamburger ? isOpen : true}>
        {navItems.map((item, index) => (
          <NavItem
            key={item.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <NavLink
              to={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.path);
              }}
            >
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

export default Navigation;

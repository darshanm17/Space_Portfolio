import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  padding: 2rem;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
  }
`;

const NavList = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: ${props => props.isOpen ? '0' : '-100%'};
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    padding: 1rem;
    gap: 1rem;
    width: 200px;
    transition: right 0.3s ease;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #00ff88, #00ffee);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 1rem;
    width: 100%;
  }
`;

const HamburgerButton = styled.button<{ isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 20;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  div {
    width: 25px;
    height: 2px;
    background: #ffffff;
    margin: 5px 0;
    transition: all 0.3s ease;

    &:nth-of-type(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
    }

    &:nth-of-type(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:nth-of-type(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'};
    }
  }
`;

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Experience', path: '/#experience' },
  { title: 'Projects', path: '/#projects' },
  { title: 'Contact', path: '/#contact' },
];

interface NavigationProps {
  showHamburger?: boolean;
}

const Navigation = ({ showHamburger = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Approximate height of the navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    
    if (path === '/') {
      navigate('/');
    } else if (path.startsWith('/#')) {
      const sectionId = path.substring(2);
      
      if (location.pathname !== '/') {
        // If we're not on the home page, navigate to home first
        navigate('/');
        // Wait for the page to load before scrolling
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        // If we're already on the home page, just scroll
        scrollToSection(sectionId);
      }
    }
  };

  // Handle hash changes for direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        scrollToSection(sectionId);
      }
    };

    // Initial check for hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {showHamburger && (
        <HamburgerButton onClick={toggleMenu} isOpen={isOpen}>
          <div />
          <div />
          <div />
        </HamburgerButton>
      )}
      <NavList isOpen={isOpen}>
        {navItems.map((item, index) => (
          <NavItem
            key={item.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
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
    </Nav>
  );
};

export default Navigation; 
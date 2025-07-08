import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectsSection = styled(motion.section)`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: var(--mission-green);
  text-align: center;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px var(--mission-glow);
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--mission-green);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px var(--mission-glow);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 255, 0, 0.1),
      transparent
    );
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  color: var(--mission-green);
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectDescription = styled.p`
  font-family: 'Share Tech Mono', monospace;
  color: var(--mission-green);
  opacity: 0.8;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechItem = styled.span`
  background: rgba(0, 255, 0, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  border: 1px solid var(--mission-green);
`;

interface Coding {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  Url: string;
  liveUrl?: string;
}

const CodingJourney = () => {
  const navigate = useNavigate();
  const [codings, setCodings] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://darshans-portfolio-info-backend.onrender.com/api/coding');
        setCodings(response.data || []); // Ensure we always have an array
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        setCodings([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <ProjectsSection>
        <Container>
          <Title>Loading Mission Data...</Title>
        </Container>
      </ProjectsSection>
    );
  }

  if (error) {
    return (
      <ProjectsSection>
        <Container>
          <Title>Mission Data Unavailable</Title>
          <ProjectDescription>{error}</ProjectDescription>
        </Container>
      </ProjectsSection>
    );
  }
console.log(codings);
  return (
    <ProjectsSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Title
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Coding Journey
        </Title>
        <ProjectsGrid>
          {codings && codings.length > 0 ? (
            
            codings.map((coding) => (
             
              <ProjectCard
                key={coding._id}
                onClick={() => window.location.href=`${coding.Url}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
              
                <ProjectImage>
                  <img 
                    src={`https://darshans-portfolio-info-backend.onrender.com${coding.imageUrl}`} 
                    alt={coding.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Project+Image';
                    }}
                  />
                </ProjectImage>
                <ProjectInfo>
                  <ProjectTitle>{coding.title}</ProjectTitle>
                  <ProjectDescription>
                    {coding.description.length > 100
                      ? `${coding.description.substring(0, 100)}...`
                      : coding.description}
                  </ProjectDescription>
                </ProjectInfo>
              </ProjectCard>
            ))
          ) : (
            <ProjectDescription>No projects available at the moment.</ProjectDescription>
          )}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default CodingJourney; 
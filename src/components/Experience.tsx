import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ExperienceSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;
  background: transparent;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--mission-green);
  text-shadow: 0 0 10px var(--mission-glow);
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: glow 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

const Timeline = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--mission-green);
    opacity: 0.3;
    box-shadow: 0 0 20px var(--mission-glow);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isLeft: boolean }>`
  display: flex;
  justify-content: ${props => props.isLeft ? 'flex-start' : 'flex-end'};
  padding-left: ${props => props.isLeft ? '0' : '50%'};
  padding-right: ${props => props.isLeft ? '50%' : '0'};
  margin-bottom: 4rem;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 50px !important;
    padding-right: 0 !important;
    margin-bottom: 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--mission-green);
    box-shadow: 0 0 20px var(--mission-glow);
    border: 2px solid var(--mission-dark);
    animation: glow 2s ease-in-out infinite;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 5px;
  border: 1px solid var(--mission-green);
  position: relative;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 30px var(--mission-glow);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--mission-green);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const JobTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--mission-green);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 10px var(--mission-glow);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Company = styled.h4`
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2rem;
  color: var(--mission-green);
  opacity: 0.9;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Duration = styled.p`
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  color: var(--mission-green);
  margin-bottom: 1rem;
  opacity: 0.7;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Description = styled.p`
  font-family: 'Share Tech Mono', monospace;
  color: var(--mission-green);
  line-height: 1.6;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

interface Experience {
  _id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  order: number;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/experiences');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch experiences');
      }
      const data = await response.json();
      setExperiences(data);
      setLoading(false);
    } catch (err) {
      let errorMessage = 'An error occurred while fetching experiences';
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to connect to the server. Please check if the server is running and try again.';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <ExperienceSection id="experience">
        <SectionTitle>Loading...</SectionTitle>
      </ExperienceSection>
    );
  }

  if (error) {
    return (
      <ExperienceSection id="experience">
        <SectionTitle>Error: {error}</SectionTitle>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={handleRetry}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Retry
          </button>
        </div>
      </ExperienceSection>
    );
  }

  return (
    <ExperienceSection id="experience">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Professional Journey
      </SectionTitle>
      <Timeline>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp._id}
            isLeft={index % 2 === 0}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TimelineContent
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <JobTitle>{exp.title}</JobTitle>
              <Company>{exp.company}</Company>
              <Duration>{exp.duration}</Duration>
              <Description>{exp.description}</Description>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </ExperienceSection>
  );
};

export default Experience; 
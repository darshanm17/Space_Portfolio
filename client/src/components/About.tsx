import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url('/images/ironman.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7); /* optional overlay for readability */
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    font-size:2 rem;
  }
`;



const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContentBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--mission-green);
  text-shadow: 0 0 10px var(--mission-glow);
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: glow 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Description = styled.p`
  font-family: 'Share Tech Mono', monospace;
  color: var(--mission-green);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 1rem;okay revert things nothing is working 
    margin-bottom: 1rem;
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const Skill = styled(motion.div)`
  font-family: 'Share Tech Mono', monospace;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  transition: all 0.3s ease;
okay revert things nothing is working 
  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px var(--mission-glow);
    transform: translateY(-2px);
  }
    @media (max-width: 768px){
      width:100%;
      display:flex;
      align-items:center;
      justify-content:center;
    }
`;
const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid var(--mission-green);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 30px var(--mission-glow);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 255, 0, 0.1),
      rgba(0, 255, 0, 0.05)
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    filter: grayscale(20%) contrast(120%);
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%) contrast(110%);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  border: 1px solid var(--mission-green);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px var(--mission-glow);
    transform: translateY(-2px);
  }

  h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    color: var(--mission-green);
    text-shadow: 0 0 10px var(--mission-glow);
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  p {
    font-family: 'Share Tech Mono', monospace;
    color: var(--mission-green);
    opacity: 0.7;
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2rem;
  text-shadow: 0 0 10px var(--mission-glow);
`;

const ErrorContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #ff4444;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2rem;
  text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
`;

const InterestsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const Interest = styled(motion.div)`
  font-family: 'Share Tech Mono', monospace;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 255, 0, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px var(--mission-glow);
    transform: translateY(-2px);

    &::before {
      transform: translateX(100%);
    }
  }
`;

const ResumeLink = styled(motion.a)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  border-radius: 5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 255, 0, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px var(--mission-glow);
    transform: translateY(-2px);

    &::before {
      transform: translateX(100%);
    }
  }
`;

interface AboutData {
  introduction: string;
  bio: string;
  skills: string[];
  interests: string[];
  profileImageUrl: string;
  resumeUrl: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('https://darshans-portfolio-info-backend.onrender.com/api/about');
        setAboutData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load mission data. Please try again later.');
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <AboutSection id="about">
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Initializing Mission Control...
        </LoadingContainer>
      </AboutSection>
    );
  }

  if (error) {
    return (
      <AboutSection id="about">
        <ErrorContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </ErrorContainer>
      </AboutSection>
    );
  }

  if (!aboutData) {
    return null;
  }
  {console.log(aboutData.profileImageUrl)}

  return (
    <AboutSection id="about">
      <Container>
        <ContentBox
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title>Mission Control</Title>
          <Description>
            {aboutData.introduction}
          </Description>
          <Description>
            {aboutData.bio}
          </Description>
          <SkillsContainer>
            {aboutData.skills.map((skill, index) => (
              <Skill
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </Skill>
            ))}
          </SkillsContainer>
          <InterestsContainer>
            {aboutData.interests.map((interest, index) => (
              <Interest
                key={interest}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {interest}
              </Interest>
            ))}
          </InterestsContainer>
          <ResumeLink
            href={aboutData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            Download Mission Brief
          </ResumeLink>
        </ContentBox>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={`https://darshans-portfolio-info-backend.onrender.com${aboutData.profileImageUrl}`}
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Profile+Image';
            }}
          />
        </ImageContainer>
      </Container>
    </AboutSection>
  );
};

export default About; 
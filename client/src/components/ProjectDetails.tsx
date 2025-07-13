import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import ProjectForm from './ProjectForm';
// import MissionQuiz from './MissionQuiz';
// import Navigation from './Navigation';

const ProjectDetailsSection = styled(motion.section)`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.95);
`;

// const BackButton = styled(motion.button)`
//   position: fixed;
//   top: 2rem;
//   left: 2rem;
//   background: rgba(0, 0, 0, 0.8);
//   border: 1px solid var(--mission-green);
//   color: var(--mission-green);
//   padding: 0.8rem 1.5rem;
//   font-family: 'Share Tech Mono', monospace;
//   cursor: pointer;
//   border-radius: 5px;
//   z-index: 10;
//   transition: all 0.3s ease;

//   &:hover {
//     background: rgba(0, 255, 0, 0.1);
//     box-shadow: 0 0 20px var(--mission-glow);
//   }

//   @media (max-width: 768px) {
//     top: 1rem;
//     left: 1rem;
//     padding: 0.6rem 1rem;
//   }
// `;

// const EditButton = styled(motion.button)`
//   position: fixed;
//   top: 2rem;
//   right: 2rem;
//   background: rgba(0, 0, 0, 0.8);
//   border: 1px solid var(--mission-green);
//   color: var(--mission-green);
//   padding: 0.8rem 1.5rem;
//   font-family: 'Share Tech Mono', monospace;
//   cursor: pointer;
//   border-radius: 5px;
//   z-index: 10;
//   transition: all 0.3s ease;

//   &:hover {
//     background: rgba(0, 255, 0, 0.1);
//     box-shadow: 0 0 20px var(--mission-glow);
//   }

//   @media (max-width: 768px) {
//     top: 1rem;
//     right: 1rem;
//     padding: 0.6rem 1rem;
//   }
// `;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem;

  @media (max-width: 768px) {
    padding: 5rem 1rem 1rem;
  }
`;

const ProjectTitle = styled(motion.h1)`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  color: var(--mission-green);
  text-shadow: 0 0 10px var(--mission-glow);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProjectImage = styled(motion.div)`
  width: 80%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 2rem;
  border: 1px solid var(--mission-green);
  box-shadow: 0 0 20px var(--mission-glow);

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
    @media (max-width: 768px) {
    width:100%;
    height:200px;
    font-size: 2.5rem;
  }
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Description = styled(motion.div)`
  font-family: 'Share Tech Mono', monospace;
  color: var(--mission-green);
  line-height: 1.8;
  font-size: 1.1rem;
  opacity: 0.8;
`;

const TechStack = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid var(--mission-green);
`;

const TechTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  color: var(--mission-green);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechItem = styled.span`
  background: rgba(0, 255, 0, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  border: 1px solid var(--mission-green);
`;

const Links = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProjectLink = styled(motion.a)`
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem 2rem;
  border-radius: 5px;
  color: var(--mission-green);
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  border: 1px solid var(--mission-green);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px var(--mission-glow);
  }
`;

const PasswordOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PasswordForm = styled.form`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid var(--mission-green);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PasswordTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: var(--mission-green);
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px var(--mission-glow);
`;

const PasswordInput = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--mission-green);
  padding: 0.8rem;
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 5px;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px var(--mission-glow);
  }
`;

const PasswordError = styled.div`
  color: #ff4444;
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
`;

const SubmitButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  padding: 0.8rem;
  font-family: 'Share Tech Mono', monospace;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px var(--mission-glow);
  }
`;

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  imageUrls: string[];
}

const ProjectDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [showQuiz, setShowQuiz] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // const [isAuthorized, setIsAuthorized] = useState(false);
  // const [showHamburger, setShowHamburger] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


 useEffect(() => {
  const fetchProject = async () => {
    try {
      const response = await axios.get(`https://darshans-portfolio-info-backend.onrender.com/api/projects/${id}`);
      console.log(response.data);
      setProject(response.data);
    } catch (err) {
      setError('Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, [id]);

useEffect(() => {

  if (project?.imageUrls && project.imageUrls.length > 1) {
   const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        (prev + 1) % project.imageUrls.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }
}, [project]);


  // const handleEditClick = () => {
  //   setShowPassword(true);
  // };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'DM171819') {
      setShowPassword(false);
      // setShowQuiz(true);
      setPasswordError(null);
    } else {
      setPasswordError('Incorrect password');
    }
  };

  // const handleQuizSuccess = () => {
  //   setIsAuthorized(true);
  //   setShowQuiz(false);
  //   console.log(`/project/${id}/edit`)
  //   navigate(`/project/${id}/edit`);
  // };

  // const handleQuizClose = () => {
  //   // setShowQuiz(false);
  //   setShowPassword(false);
  // };

  if (loading) {
    return (
      <ProjectDetailsSection>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.div>
        </Container>
      </ProjectDetailsSection>
    );
  }

  if (error || !project) {
    return (
      <ProjectDetailsSection>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error || 'Project not found'}
          </motion.div>
        </Container>
      </ProjectDetailsSection>
    );
  }
  console.log(`/project/${id}/edit`)

  return (
    <>
      {/* <Navigation showHamburger={showHamburger} /> */}
      <ProjectDetailsSection>
        {/* <BackButton onClick={() => navigate('/')}>← Back to Projects</BackButton> */}
        {/* <EditButton onClick={handleEditClick}>Edit Project</EditButton> */}
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectImage
  key={project.imageUrls[currentImageIndex]} // helps framer-motion re-render
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -50 }}
  transition={{ duration: 0.5 }}
>
  <img
    src={`http://darshans-portfolio-info-backend.onrender.com${project.imageUrls[currentImageIndex]}`}
    alt={`${project.title} Screenshot ${currentImageIndex + 1}`}
  />
</ProjectImage>
            <ProjectInfo>
              <Description>{project.description}</Description>
              <TechStack>
                <TechTitle>Technologies Used:</TechTitle>
                <TechList>
                  {project.technologies.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </TechStack>
              <Links>
                {project.githubUrl && (
                  <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View Source Code
                  </ProjectLink>
                )}
                {project.liveUrl && (
                  <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </ProjectLink>
                )}
              </Links>
            </ProjectInfo>
          </motion.div>
        </Container>
      </ProjectDetailsSection>
      <AnimatePresence>
        {showPassword && (
          <PasswordOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PasswordForm onSubmit={handlePasswordSubmit}>
              <PasswordTitle>Enter Edit Password</PasswordTitle>
              <PasswordInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              {passwordError && <PasswordError>{passwordError}</PasswordError>}
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit
              </SubmitButton>
            </PasswordForm>
          </PasswordOverlay>
        )}
      </AnimatePresence>
      {/* <AnimatePresence>
        {showQuiz && (
          <MissionQuiz
            onComplete={handleQuizSuccess}
            onClose={handleQuizClose}
          />
        )}
      </AnimatePresence> */}
    </>
  );
};

export default ProjectDetails; 
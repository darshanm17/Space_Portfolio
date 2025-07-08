import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

const FormContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--mission-green);
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: 'Share Tech Mono', monospace;
  color: var(--mission-green);
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 5px;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px var(--mission-glow);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 5px;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px var(--mission-glow);
  }
`;

const TechInput = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 0, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  border: 1px solid var(--mission-green);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--mission-green);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ff4444;
  }
`;

const SubmitButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  padding: 1rem;
  font-family: 'Share Tech Mono', monospace;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px var(--mission-glow);
  }
`;

interface ProjectFormProps {
  project?: {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl: string;
    liveUrl?: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSuccess, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies || [],
    imageUrl: project?.imageUrl || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
  });
  const [newTech, setNewTech] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (project) {
        await axios.put(`http://darshans-portfolio-info-backend.onrender.com/api/projects/${project._id}`, formData);
      } else {
        await axios.post('http://darshans-portfolio-info-backend.onrender.com/api/projects', formData);
      }
      onSuccess();
    } catch (err) {
      setError('Failed to save project. Please try again.');
      console.error('Error saving project:', err);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Technologies</Label>
          <TechInput>
            {formData.technologies.map(tech => (
              <TechTag key={tech}>
                {tech}
                <RemoveButton onClick={() => handleRemoveTech(tech)}>×</RemoveButton>
              </TechTag>
            ))}
          </TechInput>
          <form onSubmit={handleAddTech} style={{ display: 'flex', gap: '0.5rem' }}>
            <Input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="Add technology"
            />
            <SubmitButton type="submit">Add</SubmitButton>
          </form>
        </FormGroup>

        <FormGroup>
          <Label>Image URL</Label>
          <Input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>GitHub URL</Label>
          <Input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Live URL (Optional)</Label>
          <Input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
          />
        </FormGroup>

        {error && <div style={{ color: '#ff4444' }}>{error}</div>}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <SubmitButton type="button" onClick={onCancel}>
            Cancel
          </SubmitButton>
          <SubmitButton type="submit">
            {project ? 'Update Project' : 'Create Project'}
          </SubmitButton>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ProjectForm; 
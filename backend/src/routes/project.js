import express from 'express';
import { upload } from '../middleware/upload.js';
import Project from '../models/Project.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE project with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    const project = new Project({
      title,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()),
      githubUrl,
      liveUrl,
      imageUrl
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE project with image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl } = req.body;
    const updateData = {
      title,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()),
      githubUrl,
      liveUrl
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 
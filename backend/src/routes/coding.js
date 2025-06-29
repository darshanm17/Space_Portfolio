import express from 'express';
import { upload } from '../middleware/upload.js';
import Coding from '../models/Coding.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const codings = await Coding.find();
    res.json(codings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const coding = await Coding.findById(req.params.id);
    if (coding) {
      res.json(coding);
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
    const { title, description, imageUrl, Url } = req.body;
    
    const coding = new Coding({
      title,
      description,
      imageUrl,
      Url
    });

    const savedCoding = await coding.save();
    res.status(201).json(savedCoding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE project with image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
   const { title, description, imageUrl, Url } = req.body;
    const updateData = {
      title,
      description,
      imageUrl,
      Url
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedCoding = await Coding.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCoding) {
      return res.status(404).json({ message: 'not found' });
    }

    res.json(updatedCoding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const coding = await Coding.findByIdAndDelete(req.params.id);
    if (!coding) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json({ message: 'deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 
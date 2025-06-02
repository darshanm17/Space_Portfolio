import express from 'express';
import { upload } from '../middleware/upload.js';
import About from '../models/About.js';

const router = express.Router();

// GET about data
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (about) {
      res.json(about);
    } else {
      res.status(404).json({ message: 'About information not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE about information with image upload
router.post('/', upload.single('profileImage'), async (req, res) => {
  try {
    // Check if about information already exists
    const existingAbout = await About.findOne();
    if (existingAbout) {
      return res.status(400).json({ message: 'About information already exists. Use PATCH to update.' });
    }

    const aboutData = {
      ...req.body,
      profileImageUrl: req.file ? `/uploads/${req.file.filename}` : undefined
    };

    const about = new About(aboutData);
    const newAbout = await about.save();
    res.status(201).json(newAbout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE about data with image upload
router.put('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, skills } = req.body;
    const updateData = {
      title,
      description,
      skills: skills.split(',').map(skill => skill.trim())
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedAbout = await About.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );

    res.json(updatedAbout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE about information
router.delete('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (about) {
      await about.deleteOne();
      res.json({ message: 'About information deleted' });
    } else {
      res.status(404).json({ message: 'About information not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 
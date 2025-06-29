import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import experienceRoutes from './routes/experience.js';
import projectRoutes from './routes/project.js';
import aboutRoutes from './routes/about.js';
import codingRoutes from './routes/coding.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/coding', codingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB Atlas connection with retry logic
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://darshanmrd17:Y18Z90tJKuvnWUY3@cluster0.3hrumy7.mongodb.net/space-portfolio?retryWrites=true&w=majority';

const connectWithRetry = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('Connected to MongoDB Atlas');
      return;
    } catch (error) {
      retries++;
      console.error(`MongoDB connection attempt ${retries} failed:`, error.message);
      
      if (error.name === 'MongooseServerSelectionError') {
        console.error('\nPlease ensure that:');
        console.error('1. Your IP address is whitelisted in MongoDB Atlas');
        console.error('2. Your MongoDB Atlas cluster is running');
        console.error('3. Your network connection is stable\n');
      }
      
      if (retries === maxRetries) {
        console.error('Max retries reached. Could not connect to MongoDB.');
        process.exit(1);
      }
      
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Start server only after successful database connection
connectWithRetry().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); 
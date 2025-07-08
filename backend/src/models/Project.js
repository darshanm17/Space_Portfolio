import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  technologies: [{
    type: String,
    // required: true
  }],
  imageUrl: {
    type: String,
     required: true
  },
  imageUrls:[{
    type:String
  }],
  githubUrl: {
    type: String,
    // required: true
  },
  liveUrl: {
    type: String
  },
  order: {
    type: Number,
    // required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema); 
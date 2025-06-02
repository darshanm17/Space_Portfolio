import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  introduction: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  interests: [{
    type: String,
    required: true
  }],
  profileImageUrl: {
    type: String,
    required: true
  },
  resumeUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('About', aboutSchema); 
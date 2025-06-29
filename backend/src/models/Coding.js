import mongoose from 'mongoose';

const codingSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  imageUrl: {
    type: String,
     required: true
  },
  Url: {
    type: String,
    // required: true
  },
}, {
  timestamps: true
});

export default mongoose.model('Coding', codingSchema); 
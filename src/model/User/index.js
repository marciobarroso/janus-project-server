import mongoose from 'core/Connection';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', UserSchema);

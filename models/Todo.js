import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Assuming you want to associate todos with users (if you have authentication)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model if you have one
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;

// Import required modules and dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes  from './routes/auth.js';
import todoRoutes  from './routes/todos.js';


const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://adeosun01pluto:pluto123@cluster0.fs3qim5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})  .then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Session configuration


// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

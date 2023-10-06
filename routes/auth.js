import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Authenticate user and generate a token
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUsername = await User.findOne({ username });
    if(existingUsername){
      return res.status(400).json({message: "Username is taken"})
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user record
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
  }
});

// // Authenticate user and generate a token
router.post( "/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username.trim().toLowerCase();
    
    // Find the user by username or email
    const user = await User.findOne({username:trimmedUsername});
    if(!user) {
      return res.status(401).json({ message: 'Invalid username or email' });        
    }
    // Check if the user exists and the password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '6h' });

    res.status(200).json({ token , message: "Login successful", userId: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

export default router;

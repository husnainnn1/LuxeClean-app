const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  if (!password || !username || !firstname || !lastname) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });

    // Redirect to login page
    return res.render('login');
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Invalid credentials');
    }

    // Start session and save user info
    req.session.user = {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return res.redirect('/'); // Adjust to your app's dashboard URL
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).send('Error logging in');
  }
});

// Logout a user
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login'); // Adjust to your app's login URL
  });
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); // Assuming your database file is named db.js

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        // 1. Grab the credentials the user typed into the login form
        const { email, password } = req.body;

        // 2. Look up the user by their email
        const user = await db.getUserByEmail(email);

        // 3. If no user is found with that email, stop right here
        if (!user) {
            // Security Best Practice: Don't tell them the email doesn't exist.
            // Just say "Invalid credentials" to prevent hackers from guessing emails.
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 4. Compare the plain-text password they just typed with the hashed password in the DB
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Success! The passwords match. 
            // This is where you would log them in (e.g., create a session or token).
            return res.status(200).json({ message: 'Login successful!', userId: user.id });
        } else {
            // Failure! Passwords do not match.
            return res.status(401).json({ error: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
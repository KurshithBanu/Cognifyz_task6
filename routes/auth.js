const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err, results) => {
                if (err) return res.status(500).send({ message: 'Database error', error: err.message });
                res.status(201).send({ message: 'User registered successfully' });
            }
        );
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send({ message: 'Database error', error: err.message });

        if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token, message: 'Login successful' });
    });
});

module.exports = router;

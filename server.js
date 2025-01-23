const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path for handling file paths
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// API routes
app.use('/api/auth', authRoutes);

// Protected route
app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send({ message: 'You are authorized to access this route', user: req.user });
});

// Serve the main HTML file for unhandled routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

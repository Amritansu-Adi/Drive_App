const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration for custom domain and localhost
app.use(cors({
    origin: "https://drive-app-1.onrender.com",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests
app.options('*', cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Test routes first
app.get('/api/test', (req, res) => {
    res.json({ message: 'Test route working' });
});

// Import and use routes with error handling
try {
    const authRoutes = require('./routes/auth');
    app.use('/api/auth', authRoutes);
    console.log('Auth routes loaded successfully');
} catch (error) {
    console.error('Error loading auth routes:', error.message);
}

try {
    const folderRoutes = require('./routes/folders');
    app.use('/api/folders', folderRoutes);
    console.log('Folder routes loaded successfully');
} catch (error) {
    console.error('Error loading folder routes:', error.message);
}

try {
    const imageRoutes = require('./routes/images');
    app.use('/api/images', imageRoutes);
    console.log('Image routes loaded successfully');
} catch (error) {
    console.error('Error loading image routes:', error.message);
}

module.exports = app;
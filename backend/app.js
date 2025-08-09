const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const folderRoutes = require('./routes/folders');
const imageRoutes = require('./routes/images');

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://your-frontend-domain.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests
app.options('*', cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/images', imageRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;
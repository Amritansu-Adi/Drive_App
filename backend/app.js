const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const folderRoutes = require('./routes/folders');
const imageRoutes = require('./routes/images');

const app = express();

// CORS configuration for custom domain and localhost
app.use(cors({
    origin: [
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'https://your-frontend-domain.vercel.app',
        'https://your-frontend-domain.netlify.app',
        'https://drive-app-frontend.onrender.com'
    ],
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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/images', imageRoutes);

module.exports = app;
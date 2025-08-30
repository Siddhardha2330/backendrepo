const express = require('express');
const path = require('path');
const cors = require('cors');
const loginController = require('./controllers/Login'); // Ensure this path is correct
const quizRoutes = require('./routes/quizRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { authMiddleware, roleCheck } = require('./middleware/auth');
const app = express();
const dbPromise = require('./db');

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow Vercel domains and localhost
    const allowedOrigins = [
      'https://frontendrepo-a2hc.vercel.app',
      'https://frontendrepo-rzfs.vercel.app',
      'https://*.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173'
    ];
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        return origin.includes(allowed.replace('*', ''));
      }
      return origin === allowed;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API-only backend - frontend will be deployed separately
app.get('/', (req, res) => {
  res.json({ 
    message: 'Quiz Application Backend API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/login, /api/signup, /api/logout',
      quizzes: '/api/quizzes/*',
      admin: '/api/admin/*'
    }
  });
});

// API Routes
app.post('/api/login', loginController.login);
app.post('/api/signup', loginController.signup);
app.post('/api/logout', (req, res) => {
  // Implement logout logic if needed (e.g., clearing session)
  res.json({ message: 'Logged out successfully' });
});

// Health check for deployment verification
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.VERCEL ? 'vercel' : 'local' });
});

// Mount quiz routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/admin', adminRoutes);


// API-only backend - frontend routes removed
// These will be handled by the frontend application deployed separately

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server (only when not running on Vercel)
const PORT = process.env.PORT || 3000;
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

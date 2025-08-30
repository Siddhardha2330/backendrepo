# Quiz Application - Backend API

This is the backend API server for the Quiz Application, designed to be deployed on Render.

## 🚀 Quick Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Features

- **User Authentication**: JWT-based login/signup system
- **Role-based Access**: Admin and Employee roles
- **Quiz Management**: Create, edit, and manage quizzes
- **Question Management**: Multiple choice questions with options
- **Submission Tracking**: User quiz submissions and scoring
- **RESTful API**: Clean API endpoints for frontend integration

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `POST /api/logout` - User logout

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create new quiz
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz

### Admin
- `GET /api/admin/*` - Admin-specific endpoints

### Health Check
- `GET /api/health` - API health status

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database (PlanetScale recommended for Render)
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=quiz_application
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## Render Deployment

### 1. Database Setup
- Use **PlanetScale** (free tier available)
- Or any MySQL-compatible cloud database

### 2. Environment Variables on Render
Set these in your Render service:
- `NODE_ENV=production`
- `DB_HOST=your-db-host`
- `DB_PORT=3306`
- `DB_USER=your-db-username`
- `DB_PASSWORD=your-db-password`
- `DB_NAME=quiz_application`

### 3. Build Command
```bash
npm install
```

### 4. Start Command
```bash
npm start
```

## Database Schema

The application automatically creates these tables:
- `users` - User accounts and roles
- `quizzes` - Quiz information
- `questions` - Quiz questions and options
- `submissions` - User quiz submissions

## CORS Configuration

The API is configured to accept requests from any origin for development. For production, update the CORS settings in `app.js`.

## License

ISC

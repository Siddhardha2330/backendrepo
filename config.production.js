// Production database configuration for cloud deployment
// Uses environment variables for security
module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'quiz_application',
  ssl: process.env.DB_SSL === 'true' ? true : false
};

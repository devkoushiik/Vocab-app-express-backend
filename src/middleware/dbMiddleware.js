const connectDb = require('../config/db');

const ensureDbConnection = async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
};

module.exports = ensureDbConnection;


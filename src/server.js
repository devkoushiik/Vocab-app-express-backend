require('dotenv').config();
const app = require('./app');

// For Vercel serverless, export the app directly
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For traditional server, start listening
  const connectDb = require('./config/db');
  const PORT = process.env.PORT || 4000;

  const start = async () => {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  };

  start().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
}


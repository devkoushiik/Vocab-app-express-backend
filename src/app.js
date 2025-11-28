const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const vocabularyRoutes = require('./routes/vocabularyRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/vocabulary', vocabularyRoutes);

app.use(errorHandler);

module.exports = app;


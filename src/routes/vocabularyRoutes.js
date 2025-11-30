const express = require('express');
const {
  createVocabulary,
  getVocabulary,
  updateVocabulary,
  deleteVocabulary,
  deleteAllVocabulary,
} = require('../controllers/vocabularyController');
const ensureDbConnection = require('../middleware/dbMiddleware');

const router = express.Router();

// Ensure database connection before all routes
router.use(ensureDbConnection);

router.post('/', createVocabulary);
router.get('/', getVocabulary);
router.put('/:id', updateVocabulary);
router.delete('/all', deleteAllVocabulary); // Must be before /:id route
router.delete('/:id', deleteVocabulary);

module.exports = router;


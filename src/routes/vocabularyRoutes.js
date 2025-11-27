const express = require('express');
const {
  createVocabulary,
  getVocabulary,
  updateVocabulary,
  deleteVocabulary,
} = require('../controllers/vocabularyController');
const ensureDbConnection = require('../middleware/dbMiddleware');

const router = express.Router();

// Ensure database connection before all routes
router.use(ensureDbConnection);

router.post('/', createVocabulary);
router.get('/', getVocabulary);
router.put('/:id', updateVocabulary);
router.delete('/:id', deleteVocabulary);

module.exports = router;


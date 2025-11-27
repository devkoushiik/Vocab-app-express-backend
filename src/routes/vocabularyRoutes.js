const express = require('express');
const {
  createVocabulary,
  getVocabulary,
  updateVocabulary,
  deleteVocabulary,
} = require('../controllers/vocabularyController');

const router = express.Router();

router.post('/', createVocabulary);
router.get('/', getVocabulary);
router.put('/:id', updateVocabulary);
router.delete('/:id', deleteVocabulary);

module.exports = router;


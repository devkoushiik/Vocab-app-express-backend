const Vocabulary = require('../models/Vocabulary');
const {
  validateCreateVocabulary,
  validateUpdateVocabulary,
  validateQuery,
} = require('../validators/vocabularyValidator');

const formatError = (error) => ({
  message: 'Validation failed',
  details: error.details.map((detail) => detail.message),
});

const buildFilters = ({ sortType, month, year, search }) => {
  const query = {};

  if (sortType) {
    query.sortType = {
      $in: sortType
        .split(',')
        .map((value) => value.trim().toUpperCase())
        .filter(Boolean),
    };
  }

  if (month) {
    query.month = Number(month);
  }

  if (year) {
    query.year = Number(year);
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  return query;
};

const createVocabulary = async (req, res, next) => {
  const { error, value } = validateCreateVocabulary(req.body);

  if (error) {
    return res.status(400).json(formatError(error));
  }

  try {
    const vocabulary = await Vocabulary.create(value);
    return res.status(201).json({ data: vocabulary });
  } catch (err) {
    return next(err);
  }
};

const getVocabulary = async (req, res, next) => {
  const { error, value } = validateQuery(req.query);

  if (error) {
    return res.status(400).json(formatError(error));
  }

  const filters = buildFilters(value);
  const limit = value.limit;
  const page = value.page;
  const skip = (page - 1) * limit;

  try {
    const [total, items] = await Promise.all([
      Vocabulary.countDocuments(filters),
      Vocabulary.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    return res.json({
      meta: {
        totalItems: total,
        totalPages: Math.ceil(total / limit) || 1,
        currentPage: page,
        limit,
      },
      data: items,
    });
  } catch (err) {
    return next(err);
  }
};

const updateVocabulary = async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = validateUpdateVocabulary(req.body);

  if (error) {
    return res.status(400).json(formatError(error));
  }

  try {
    const updated = await Vocabulary.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }

    return res.json({ data: updated });
  } catch (err) {
    return next(err);
  }
};

const deleteVocabulary = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await Vocabulary.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createVocabulary,
  getVocabulary,
  updateVocabulary,
  deleteVocabulary,
};


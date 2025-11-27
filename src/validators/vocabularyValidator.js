const Joi = require('joi');

const sortTypeEnum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const vocabularySchema = Joi.object({
  name: Joi.string().trim().min(1).max(120).required(),
  meaning: Joi.string().trim().min(1).max(500).required(),
  sortType: Joi.string()
    .uppercase()
    .valid(...sortTypeEnum)
    .required(),
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().min(1900).max(2100).required(),
});

const querySchema = Joi.object({
  sortType: Joi.string()
    .trim()
    .custom((value, helpers) => {
      const items = value
        .split(',')
        .map((v) => v.trim().toUpperCase())
        .filter(Boolean);
      const invalid = items.filter((item) => !sortTypeEnum.includes(item));
      if (invalid.length) {
        return helpers.error('any.invalid');
      }
      return items.join(',');
    })
    .optional(),
  month: Joi.number().integer().min(1).max(12),
  year: Joi.number().integer().min(1900).max(2100),
  search: Joi.string().trim().max(120),
  limit: Joi.number().integer().min(1).max(50).default(10),
  page: Joi.number().integer().min(1).default(1),
});

const validateCreateVocabulary = (payload) =>
  vocabularySchema.validate(payload, { abortEarly: false });

const validateUpdateVocabulary = (payload) =>
  vocabularySchema.validate(payload, { abortEarly: false });

const validateQuery = (payload) =>
  querySchema.validate(payload, { abortEarly: false });

module.exports = {
  validateCreateVocabulary,
  validateUpdateVocabulary,
  validateQuery,
};


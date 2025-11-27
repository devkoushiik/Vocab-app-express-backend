const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 120,
    },
    meaning: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    sortType: {
      type: String,
      enum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      required: true,
      uppercase: true,
      trim: true,
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },
    year: {
      type: Number,
      min: 1900,
      max: 2100,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vocabulary', vocabularySchema);


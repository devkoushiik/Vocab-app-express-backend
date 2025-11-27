#!/usr/bin/env node
require('dotenv').config();
const connectDb = require('../src/config/db');
const Vocabulary = require('../src/models/Vocabulary');

const entries = [
  {
    name: 'Love',
    meaning: 'ভালোবাসা',
    sortType: 'L',
    month: 11,
    year: 2025,
  },
  {
    name: 'Friendship',
    meaning: 'বন্ধুত্ব',
    sortType: 'F',
    month: 11,
    year: 2025,
  },
  {
    name: 'Courage',
    meaning: 'সাহস',
    sortType: 'C',
    month: 11,
    year: 2025,
  },
  {
    name: 'Happiness',
    meaning: 'আনন্দ',
    sortType: 'H',
    month: 11,
    year: 2025,
  },
  {
    name: 'Wisdom',
    meaning: 'বুদ্ধি',
    sortType: 'W',
    month: 11,
    year: 2025,
  },
  {
    name: 'Peace',
    meaning: 'শান্তি',
    sortType: 'P',
    month: 11,
    year: 2025,
  },
  {
    name: 'Hope',
    meaning: 'আশা',
    sortType: 'H',
    month: 11,
    year: 2025,
  },
  {
    name: 'Dream',
    meaning: 'স্বপ্ন',
    sortType: 'D',
    month: 11,
    year: 2025,
  },
  {
    name: 'Freedom',
    meaning: 'স্বাধীনতা',
    sortType: 'F',
    month: 11,
    year: 2025,
  },
  {
    name: 'Knowledge',
    meaning: 'জ্ঞান',
    sortType: 'K',
    month: 11,
    year: 2025,
  },
  {
    name: 'Beauty',
    meaning: 'সৌন্দর্য',
    sortType: 'B',
    month: 11,
    year: 2025,
  },
  {
    name: 'Strength',
    meaning: 'শক্তি',
    sortType: 'S',
    month: 11,
    year: 2025,
  },
  {
    name: 'Truth',
    meaning: 'সত্য',
    sortType: 'T',
    month: 11,
    year: 2025,
  },
  {
    name: 'Respect',
    meaning: 'সম্মান',
    sortType: 'R',
    month: 11,
    year: 2025,
  },
  {
    name: 'Compassion',
    meaning: 'সহানুভূতি',
    sortType: 'C',
    month: 11,
    year: 2025,
  },
  {
    name: 'Gratitude',
    meaning: 'কৃতজ্ঞতা',
    sortType: 'G',
    month: 11,
    year: 2025,
  },
  {
    name: 'Patience',
    meaning: 'ধৈর্য',
    sortType: 'P',
    month: 11,
    year: 2025,
  },
  {
    name: 'Success',
    meaning: 'সাফল্য',
    sortType: 'S',
    month: 11,
    year: 2025,
  },
  {
    name: 'Trust',
    meaning: 'বিশ্বাস',
    sortType: 'T',
    month: 11,
    year: 2025,
  },
  {
    name: 'Unity',
    meaning: 'ঐক্য',
    sortType: 'U',
    month: 11,
    year: 2025,
  },
];

const seed = async () => {
  await connectDb();
  await Vocabulary.deleteMany({
    name: { $in: entries.map((entry) => entry.name) },
  });
  const result = await Vocabulary.insertMany(entries);
  console.log(`Inserted ${result.length} vocabulary records.`);
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});


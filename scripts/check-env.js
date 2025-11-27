#!/usr/bin/env node

require('dotenv').config();

const REQUIRED_VARS = ['PORT', 'MONGODB_URI'];

const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(
    `Missing required environment variables: ${missing.join(', ')}`
  );
  process.exit(1);
}

console.log('All required environment variables are set.');


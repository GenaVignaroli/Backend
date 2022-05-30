const dotenv = require('dotenv');

dotenv.config();

const a = {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongoSRV',
  PORT: process.env.PORT || 8080,
};

module.exports = {a}
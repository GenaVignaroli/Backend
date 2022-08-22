const mongoose = require ('mongoose');
const Config = require ('../config');

const connectDb = () => {
  return mongoose.connect(Config.MONGO_ATLAS_URL, { useNewUrlParser: true });
};

module.exports = {connectDb}
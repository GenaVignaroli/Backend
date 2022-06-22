const mongoose = require("mongoose");
require('dotenv').config();

const connectionString = process.env.MONGO_ATLAS_SRV 

const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
    await mongoose.connect(connectionString);

    console.log('YA ESTOY CONECTADO');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

module.exports = {
    initMongoDB
}
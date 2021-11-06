const mongoose = require('mongoose');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;

module.exports = async function connection() {
  console.log(dbUrl);
  try {
    await mongoose.connect(dbUrl, {
      dbName: dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection db successful');
  } catch (error) {
    console.log(error);
  }
};

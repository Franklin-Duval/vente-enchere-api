const mongoose = require('mongoose');

const dbName = 'kmt_sarl';
const dbUrl = 'mongodb://localhost:27017/';

module.exports = async function connection() {
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

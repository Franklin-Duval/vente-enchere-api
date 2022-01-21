const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  date_creation: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  createur: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model(COLLECTIONS.LOGS, LogSchema);

module.exports = Log;

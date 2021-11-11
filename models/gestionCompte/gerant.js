const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const GerantSchema = new Schema({
  nombreAccreditation: {
    type: Number,
    required: false,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
    required: true,
    unique: true,
  },
});

const Gerant = mongoose.model(COLLECTIONS.GERANTS, GerantSchema);

module.exports = Gerant;

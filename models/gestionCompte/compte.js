const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const CompteSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  isActivated: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Compte = mongoose.model(COLLECTIONS.COMPTES, CompteSchema);

module.exports = Compte;

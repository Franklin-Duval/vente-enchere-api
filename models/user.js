const mongoose = require('mongoose');
const COLLECTIONS = require('../database/collections');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  dateAjout: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const User = mongoose.model(COLLECTIONS.USERS, UserSchema);

module.exports = User;

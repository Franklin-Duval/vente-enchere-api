const mongoose = require('mongoose');
const COLLECTIONS = require('../database/collections');

const Schema = mongoose.Schema;

const GerantSchema = new Schema({
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
  pays: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  pseudo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateAjout: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Gerant = mongoose.model(COLLECTIONS.GERANTS, GerantSchema);

module.exports = Gerant;

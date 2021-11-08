const mongoose = require('mongoose');
const COLLECTIONS = require('../database/collections');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
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
  numero_compte: {
    type: String,
    required: true,
  },
  numero_momo: {
    type: String,
    required: true,
  },
  nombre_produits_achetes: {
    type: Number,
    required: true,
  },
  total_argent_depense: {
    type: Number,
    required: true,
  },
  dateAjout: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Client = mongoose.model(COLLECTIONS.CLIENT, ClientSchema);

module.exports = Client;

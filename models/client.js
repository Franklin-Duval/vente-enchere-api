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
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  numeroCompte: {
    type: String,
    required: false,
  },
  numeroMomo: {
    type: String,
    required: true,
  },
  nombreProduitsAchetes: {
    type: Number,
    required: true,
    default: 0,
  },
  totalArgentDepense: {
    type: Number,
    required: false,
    default: 0,
  },
  dateAjout: {
    type: Date,
    default: Date.now(),
  },
});

const Client = mongoose.model(COLLECTIONS.CLIENTS, ClientSchema);

module.exports = Client;

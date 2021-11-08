const mongoose = require('mongoose');
const COLLECTIONS = require('../database/collections');

const Schema = mongoose.Schema;

const VendeurSchema = new Schema({
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
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  accreditation: {
    type: Boolean,
    required: true,
    default: false,
  },
  numeroCNI: {
    type: String,
    required: true,
  },
  specialite: {
    type: String,
    required: true,
  },
  chiffreAffaire: {
    type: Number,
    required: false,
    default: 0,
  },
  nombreLotsVendu: {
    type: Number,
    required: false,
    default: 0,
  },
  gerant: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.GERANTS,
  },
  dateAjout: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Vendeur = mongoose.model(COLLECTIONS.VENDEURS, VendeurSchema);

module.exports = Vendeur;

const mongoose = require('mongoose');
const COLLECTIONS = require('../database/collections');

const Schema = mongoose.Schema;

const LotSchema = new Schema({
  prixFinalVente: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    required: true,
  },
  prixMin: {
    type: String,
    required: true,
  },
  nonVendu: {
    type: Boolean,
    required: true,
  },
  dateMiseEnchere: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  produits: [
    {
      type: Schema.Types.ObjectId,
      ref: COLLECTIONS.PRODUITS,
    },
  ],
  commentaireRefus: {
    type: String,
    required: false,
  },
  dateReception: {
    type: Date,
    required: true,
  },
  dateRefus: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  dateCreation: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateModification: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  dateSuppression: {
    type: Date,
    required: false,
    default: Date.now(),
  },
});

const Lot = mongoose.model(COLLECTIONS.LOTS, LotSchema);

module.exports = Lot;

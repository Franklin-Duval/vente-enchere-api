const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const LotSchema = new Schema({
  numeroLot: {
    type: Number,
    required: true,
    min: 100000,
    minlength: 6,
    unique: true,
  },
  prixFinalVente: {
    type: String,
    required: false,
  },
  statut: {
    type: String,
    required: true,
    enum: [
      'en_attente_selection',
      'en_attente_vente',
      'refuse',
      'rejete',
      'en_vente',
      'vendu',
      'livre',
      'retourne',
    ],
  },
  prixMin: {
    type: Number,
    required: false,
  },
  nonVendu: {
    type: Boolean,
    required: false,
  },
  dateMiseEnchere: {
    type: Date,
    required: false,
  },
  produits: [
    {
      type: Schema.Types.ObjectId,
      ref: COLLECTIONS.PRODUITS,
    },
  ],
  vendeur: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.VENDEURS,
  },
  commentaireRefus: {
    type: String,
    required: false,
  },
  dateReception: {
    type: Date,
    required: false,
  },
  dateRefus: {
    type: Date,
    required: false,
  },
  dateCreation: {
    type: Date,
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
  },
});

const Lot = mongoose.model(COLLECTIONS.LOTS, LotSchema);

module.exports = Lot;

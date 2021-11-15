const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const ProduitSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prixMin: {
    type: String,
    required: false,
  },
  vendeur: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.VENDEURS,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.CATEGORIES,
  },
  images: {
    type: Array,
    required: false,
    default: [],
  },
  estBio: {
    type: Boolean,
    required: true,
  },
  statut: {
    type: String,
    required: false,
  },
  dateCreation: {
    type: Date,
    default: Date.now(),
  },
  dateModification: {
    type: Date,
    required: false,
  },
  dateSuppression: {
    type: Date,
    required: false,
  },
});

const Produit = mongoose.model(COLLECTIONS.PRODUITS, ProduitSchema);

module.exports = Produit;

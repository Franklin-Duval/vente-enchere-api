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
    required: false,
  },
  prixMin: {
    type: Number,
    required: false,
  },
  quantite: {
    valeur: {
      type: Number,
      required: true,
    },
    unite: {
      type: String,
      required: true,
    },
  },
  vendeur: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.VENDEURS,
    required: true,
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
  favoris: [
    {
      type: Schema.Types.ObjectId,
      ref: COLLECTIONS.CLIENTS,
    },
  ],
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

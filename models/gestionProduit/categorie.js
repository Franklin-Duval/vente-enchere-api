const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const CategorieSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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

const Categorie = mongoose.model(COLLECTIONS.CATEGORIES, CategorieSchema);

module.exports = Categorie;

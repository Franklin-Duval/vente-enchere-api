const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const SalleEnchereSchema = new Schema({
  dateOuverture: {
    type: Date,
    required: true,
  },
  duree: {
    type: Number,
    required: true,
  },
  statut: {
    type: String,
    required: true,
    enum: ['en_cours', 'en_attente', 'termine'],
  },
});

const SalleEnchere = mongoose.model(
  COLLECTIONS.SALLEENCHERE,
  SalleEnchereSchema,
);

module.exports = SalleEnchere;

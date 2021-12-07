const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const SalleEnchereSchema = new Schema({
  lots: [
    {
      type: Schema.Types.ObjectId,
      ref: COLLECTIONS.LOTS,
    },
  ],
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
    enum: ['en_cours', 'termine'],
  },
});

const SalleEnchere = mongoose.model(
  COLLECTIONS.SALLEENCHERE,
  SalleEnchereSchema,
);

module.exports = SalleEnchere;

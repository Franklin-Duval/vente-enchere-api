const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const CommissaireSchema = new Schema({
  nombreEnchereOrganisee: {
    type: Number,
    required: false,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
    required: true,
    unique: true,
  },
});

const Commissaire = mongoose.model(
  COLLECTIONS.COMMISSAIREPRISEUR,
  CommissaireSchema,
);

module.exports = Commissaire;
